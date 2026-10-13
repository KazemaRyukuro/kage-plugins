# Plugin-Format

Diese Beschreibung gehört zum Schema in `schema/plugin.schema.json`. Der Gesamtplan steht in [docs/PLUGINS.md](https://github.com/KazemaRyukuro/kage-island/blob/main/docs/PLUGINS.md) im Kage-Repository.

## plugin.json

| Feld | Bedeutung |
|---|---|
| `schema` | Version des Formats, aktuell `1` |
| `id` | Kleinbuchstaben, Ziffern, Bindestriche (3 bis 41 Zeichen), muss dem Ordnernamen entsprechen |
| `name`, `description` | Anzeigename und Beschreibung (`de` Pflicht, `en` optional) |
| `version`, `minKageVersion` | Version des Plugins und die kleinste Kage-Version, mit der es läuft |
| `kind` | `viewer`, `panel`, `tool` oder `engine` |
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
