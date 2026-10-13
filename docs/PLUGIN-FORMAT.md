# Plugin-Format

Diese Beschreibung gehört zum Schema in `schema/plugin.schema.json`. Der Gesamtplan steht in [docs/PLUGINS.md](https://github.com/KazemaRyukuro/kage-island/blob/main/docs/PLUGINS.md) im Kage-Repository.

## plugin.json

| Feld | Bedeutung |
|---|---|
| `schema` | Version des Formats, aktuell `1` |
| `id` | Kleinbuchstaben, Ziffern, Bindestriche (3 bis 41 Zeichen), muss dem Ordnernamen entsprechen |
| `name`, `description` | Anzeigename und Beschreibung (`de` Pflicht, `en` optional) |
| `license` | SPDX-Kennung der Lizenz des Plugins (Standard: MIT wie das Repository) |
| `version`, `minKageVersion` | Version des Plugins und die kleinste Kage-Version, mit der es läuft |
| `kind` | `viewer`, `panel`, `tool`, `engine` oder `theme` |
| `platforms` | `windows`, `linux` |
| `permissions` | Liste der Berechtigungen, bei `network` zusätzlich `networkHosts`, dazu eine Begründung |
| `entry` | Einstiegspunkt innerhalb des Plugin-Ordners |
| `viewer.extensions` | Nur bei `viewer`: Dateiendungen, die das Plugin zeigt |
| `files` | Jede Datei mit Pfad, Größe und SHA-256 |

## Berechtigungen

| Wert | Bedeutung |
|---|---|
| `files.read.selected` | Liest die Datei, die gerade markiert oder geöffnet ist |
| `files.read.folders` | Liest in Ordnern, die der Nutzer freigegeben hat |
| `files.write.folders` | Schreibt in freigegebenen Ordnern (immer mit Rückfrage über das Gate) |
| `network` | Netzwerk, nur zu den Adressen in `networkHosts` |
| `clipboard.write` | Schreibt in die Zwischenablage |
| `run.process` | Startet Programme (immer mit Rückfrage über das Gate) |
| `island.panel` | Zeigt ein Panel an der Island |

Vorschau-Plugins (`viewer`) dürfen ausschließlich `files.read.selected` haben. Das erzwingt das Schema.

## plugins/index.json

Das Verzeichnis, das Kage lädt. Pro Plugin steht dort die aktuelle Version mit Größe, SHA-256 des Archivs und der Adresse des Release-Archivs. Unter `revoked` stehen zurückgezogene Versionen, die Kage nicht mehr lädt. Die Datei wird beim Veröffentlichen signiert (Ed25519), die Signatur liegt als `index.json.sig` daneben.

## Themes (`kind: "theme"`)

Ein Theme bestimmt, wie die Island aussieht. Es besteht nur aus Daten, nie aus Code, und braucht deshalb **keine Berechtigungen** (`permissions.list` ist leer, das erzwingt das Schema). `entry` zeigt auf die Theme-Datei, zum Beispiel `theme.json`. Sie muss zu `schema/theme.schema.json` passen, das prüft `npm run pruefen`.

```json
{
  "schema": 1,
  "name": "Neon Nacht",
  "colors": { "background": "#05060f", "text": "#e8fff9", "accent": "#00ffcc" },
  "island": { "idleWidth": 132, "idleHeight": 36, "expandedRadius": 30 },
  "typography": { "family": "'Segoe UI', sans-serif", "size": 13 },
  "motion": { "stiffness": 480, "damping": 28, "mass": 1 },
  "eye": { "glow": 1.6 }
}
```

- Alles ist optional. Was fehlt, übernimmt Kage vom eingebauten Apple-Stil.
- Farben: `#rgb`, `#rrggbb`, `#rrggbbaa` oder `rgb()` und `rgba()`. `accent` darf zusätzlich `"system"` sein (Akzentfarbe von Windows).
- Schrift: nur Schriftnamen und Kommas, keine Adressen und keine Klammern. Schriftdateien liefert ein Theme nicht mit.
- Was der Nutzer in den Einstellungen selbst geändert hat (zum Beispiel die Breite der Island), geht vor dem Theme.
- Das Schema wird aus dem Code von Kage erzeugt (`src/shared/theme.ts`), damit beide nicht auseinanderlaufen.

