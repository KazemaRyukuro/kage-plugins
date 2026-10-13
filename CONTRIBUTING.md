# Mitmachen

Danke, dass du ein Plugin beisteuern willst. Kage ist ein persönliches Projekt, Beiträge sind aber willkommen. Bitte lies zuerst die [Sicherheitsregeln](SECURITY.md).

## Ein Plugin vorschlagen

Lege ein Ticket mit der Vorlage **Plugin-Wunsch** an. Beschreibe, was das Plugin können soll und welche Dateitypen oder Dienste dazugehören.

## Ein Plugin einreichen

1. Kopiere `plugins/_vorlage/` nach `plugins/<deine-id>/`. Die ID besteht aus Kleinbuchstaben, Ziffern und Bindestrichen.
2. Fülle `plugin.json` aus. Beschreibungen auf Deutsch, Englisch ist optional.
3. Trage nur die Berechtigungen ein, die wirklich nötig sind. Begründe sie in der README des Plugins.
4. Trage die Prüfsummen deiner Dateien ein: `npm run pruefsummen -- plugins/<deine-id>` schreibt sie ins Manifest.
5. Prüfe lokal: `npm ci && npm run pruefen`.
6. Öffne einen Pull Request und fülle die Checkliste in der Vorlage aus.

## Regeln

- Keine Schlüssel, Tokens oder persönlichen Daten, auch nicht in Tests oder Beispielen.
- Kein Code, der zur Laufzeit etwas nachlädt oder ausführt, das nicht im Paket steht.
- Vorschau-Plugins nur lesend, ohne Netzwerk.
- Ein Pull Request, ein Plugin. Kleine, nachvollziehbare Änderungen.
- Commit-Nachrichten und Texte auf Deutsch, Code und Bezeichner auf Englisch oder Deutsch, aber einheitlich.

## Veröffentlichung

Veröffentlicht wird nur durch den Maintainer über den Workflow „Plugin veröffentlichen“. Er baut das Archiv, prüft es und hängt es an ein Release. Die Signatur des Indexes entsteht ausschließlich dort, der Schlüssel liegt nicht im Repository.
