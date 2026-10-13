// Prüft alle Plugin-Manifeste und den Index.
// - Manifest passt zum Schema, ID entspricht dem Ordnernamen
// - jede Datei im Manifest existiert und stimmt in Größe und SHA-256 (Vorlage ausgenommen)
// - keine Dateien im Plugin-Ordner, die nicht im Manifest stehen
// - Index passt zum Schema, jeder Eintrag hat einen Ordner, Sperrliste nennt nur bekannte Formate
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
const validateManifest = ajv.compile(readJson(join(root, 'schema', 'plugin.schema.json')))
const validateIndex = ajv.compile(readJson(join(root, 'schema', 'index.schema.json')))
const validateTheme = ajv.compile(readJson(join(root, 'schema', 'theme.schema.json')))

const problems = []
const fail = (where, text) => problems.push(`${where}: ${text}`)
const describe = (errors) => errors.map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ')

const listFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? listFiles(join(dir, entry.name)) : [join(dir, entry.name)]
  )

const pluginsDir = join(root, 'plugins')
const folders = readdirSync(pluginsDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())

for (const folder of folders) {
  const dir = join(pluginsDir, folder.name)
  const isTemplate = folder.name.startsWith('_')
  const where = `plugins/${folder.name}`
  const manifestPath = join(dir, 'plugin.json')
  if (!existsSync(manifestPath)) {
    fail(where, 'plugin.json fehlt')
    continue
  }
  let manifest
  try {
    manifest = readJson(manifestPath)
  } catch (error) {
    fail(where, `plugin.json ist kein gültiges JSON (${error.message})`)
    continue
  }
  if (!validateManifest(manifest)) {
    fail(where, `Manifest ungültig: ${describe(validateManifest.errors)}`)
    continue
  }
  if (!isTemplate && manifest.id !== folder.name) fail(where, `ID "${manifest.id}" passt nicht zum Ordnernamen`)
  if (!manifest.files.some((file) => file.path === manifest.entry)) fail(where, `entry "${manifest.entry}" steht nicht in files`)
  if (manifest.kind === 'theme') {
    // Ein Theme besteht nur aus Daten: Die Datei im Einstieg muss zum Theme-Schema passen.
    const themePath = resolve(dir, manifest.entry)
    if (!existsSync(themePath)) fail(where, `Theme-Datei fehlt: ${manifest.entry}`)
    else {
      try {
        const theme = readJson(themePath)
        if (!validateTheme(theme)) fail(where, `Theme ungültig: ${describe(validateTheme.errors)}`)
      } catch (error) {
        fail(where, `Theme-Datei ist kein gültiges JSON (${error.message})`)
      }
    }
  }
  if (isTemplate) continue

  const declared = new Set()
  for (const file of manifest.files) {
    const path = resolve(dir, file.path)
    // Pfade dürfen den Plugin-Ordner nie verlassen.
    if (!path.startsWith(dir + sep)) {
      fail(where, `Pfad außerhalb des Plugin-Ordners: ${file.path}`)
      continue
    }
    declared.add(file.path)
    if (!existsSync(path)) {
      fail(where, `Datei fehlt: ${file.path}`)
      continue
    }
    const data = readFileSync(path)
    if (data.length !== file.size) fail(where, `Größe von ${file.path} stimmt nicht (${data.length} statt ${file.size})`)
    const hash = createHash('sha256').update(data).digest('hex')
    if (hash !== file.sha256) fail(where, `Prüfsumme von ${file.path} stimmt nicht`)
  }
  for (const file of listFiles(dir)) {
    const name = relative(dir, file).split(sep).join('/')
    if (name === 'plugin.json' || name === 'README.md') continue
    if (!declared.has(name)) fail(where, `Datei nicht im Manifest: ${name}`)
    if (statSync(file).isSymbolicLink?.()) fail(where, `Verknüpfungen sind nicht erlaubt: ${name}`)
  }
}

const indexPath = join(pluginsDir, 'index.json')
const index = readJson(indexPath)
if (!validateIndex(index)) fail('plugins/index.json', `Index ungültig: ${describe(validateIndex.errors)}`)
else {
  const seen = new Set()
  for (const entry of index.plugins) {
    if (seen.has(entry.id)) fail('plugins/index.json', `ID doppelt: ${entry.id}`)
    seen.add(entry.id)
    if (!existsSync(join(pluginsDir, entry.id, 'plugin.json'))) fail('plugins/index.json', `Kein Ordner für ${entry.id}`)
    else {
      const manifest = readJson(join(pluginsDir, entry.id, 'plugin.json'))
      if (manifest.version !== entry.version) fail('plugins/index.json', `Version von ${entry.id} weicht vom Manifest ab`)
    }
  }
}

if (problems.length > 0) {
  console.error(problems.map((problem) => `✗ ${problem}`).join('\n'))
  process.exit(1)
}
console.log(`✓ ${folders.length} Ordner und der Index sind in Ordnung.`)
