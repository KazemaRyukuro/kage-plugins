// Trägt Größe und SHA-256 aller Dateien eines Plugins in dessen plugin.json ein.
// Aufruf: npm run pruefsummen -- plugins/<id>
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

const target = process.argv[2]
if (!target) {
  console.error('Aufruf: npm run pruefsummen -- plugins/<id>')
  process.exit(1)
}
const dir = resolve(target)
const manifestPath = join(dir, 'plugin.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

const listFiles = (folder) =>
  readdirSync(folder, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? listFiles(join(folder, entry.name)) : [join(folder, entry.name)]
  )

manifest.files = listFiles(dir)
  .map((file) => relative(dir, file).split(sep).join('/'))
  .filter((name) => name !== 'plugin.json' && name !== 'README.md')
  .sort()
  .map((name) => {
    const data = readFileSync(join(dir, name))
    return { path: name, sha256: createHash('sha256').update(data).digest('hex'), size: data.length }
  })

writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`${manifest.files.length} Datei(en) eingetragen in ${manifestPath}`)
