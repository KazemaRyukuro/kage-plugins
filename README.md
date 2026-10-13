# Kage Plugins

Das Plugin-Verzeichnis für [Kage](https://github.com/KazemaRyukuro/kage-island), den Sprachassistenten am oberen Bildschirmrand. Kage bringt nur das Gängige mit. Alles Weitere (zusätzliche Vorschau-Formate, weitere Panels der Island, zusätzliche Tools und Sprach-Engines) kommt als Plugin aus diesem Repository.

> **Stand:** Aufbau. Das Plugin-System in Kage selbst ist noch in Arbeit, deshalb liegen hier erst das Format, die Prüfungen und die Vorlage. Der Fahrplan steht im [GitHub-Projekt „Kage Roadmap“](https://github.com/users/KazemaRyukuro/projects/3).

## Wie es funktioniert

1. Kage lädt `plugins/index.json` von einer festen Adresse in diesem Repository und prüft dessen Signatur.
2. In den Einstellungen unter *Plugins* sieht man, was es gibt: Beschreibung, Größe, Version und die **Berechtigungen**, die ein Plugin braucht.
3. Installiert wird **nur nach einem Klick**. Kage lädt das Archiv aus den Releases dieses Repositorys und prüft Signatur und Prüfsumme, bevor es etwas entpackt.
4. Plugins laufen abgeschottet. Alles, was ein Plugin tun will, geht durch das Gate von Kage, mit Stufe, Rückfrage und Protokoll.

## Arten von Plugins

| Art | Was es tut | Beispiele |
|---|---|---|
| `viewer` | Zeigt Dateitypen in der Schnellvorschau | Office, 3D-Modelle, E-Mails, CAD |
| `panel` | Zusätzliche Fläche an der Island | Wetter, Musik, Kalender |
| `tool` | Zusätzliche Kage-Tools | Server-Anbindungen, eigene Befehle |
| `engine` | Zusätzliche Sprach-Engine | weitere Anbieter |
| `theme` | Aussehen der Island: Farben, Schrift, Größen, Bewegung. Nur Daten, kein Code, keine Berechtigungen | Neon Nacht, Papier |

## Aufbau des Repositorys

```
plugins/
  index.json            Verzeichnis aller veröffentlichten Plugins (wird signiert)
  _vorlage/             Vorlage für neue Plugins
  _vorlage-theme/       Vorlage für neue Themes
  <plugin-id>/          je Plugin ein Ordner mit plugin.json und seinen Dateien
schema/                 JSON-Schemas für Manifest, Index und Theme-Dateien
tools/validate.mjs      Prüfung von Manifesten, Prüfsummen und Index (läuft im CI)
docs/PLUGIN-FORMAT.md   Beschreibung des Formats
```

## Mitmachen

Ein eigenes Plugin vorschlagen oder einreichen: siehe [CONTRIBUTING.md](CONTRIBUTING.md). Sicherheitsprobleme bitte **nicht** öffentlich melden, sondern wie in [SECURITY.md](SECURITY.md) beschrieben.

## Lizenz

[MIT](LICENSE). Ein Plugin von Dritten darf eine eigene Lizenz mitbringen, die dann im Manifest unter `license` (SPDX-Kennung) steht und als Datei `LICENSE` im Plugin-Ordner liegt.

## Prüfen

```bash
npm ci
npm run pruefen
```
