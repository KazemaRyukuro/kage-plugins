## Was ändert sich?

<!-- Kurz und konkret. -->

## Verknüpfte Tickets

Closes #

## Art der Änderung

- [ ] Neues Plugin
- [ ] Neue Version eines Plugins
- [ ] Fehlerbehebung
- [ ] Werkzeuge, Schema oder Dokumentation
- [ ] Abhängigkeiten, Build oder CI

## Bei Plugins

- [ ] Ordner `plugins/<id>/` mit `plugin.json` und README, ID entspricht dem Ordnernamen
- [ ] Prüfsummen eingetragen (`npm run pruefsummen -- plugins/<id>`)
- [ ] Nur Berechtigungen, die wirklich nötig sind, jede in der README begründet
- [ ] Vorschau-Plugins: nur lesen, kein Netzwerk, keine Skripte oder Makros ausgeführt
- [ ] Bibliotheken von Dritten mit Lizenz und Version in der README genannt
- [ ] Kein nachgeladener Code zur Laufzeit

## Sicherheit

- [ ] Keine Schlüssel, Tokens oder persönlichen Daten im Code, in Tests oder Beispielen
- [ ] Berührt nicht Signatur, Index-Prüfung oder Entpacken, oder ich habe beschrieben, was sich ändert und wie es geprüft wurde

## Geprüft

- [ ] `npm run pruefen` ist grün
- [ ] In Kage ausprobiert (sobald das Plugin-System läuft)

## Bilder

<!-- Bei Vorschau-Plugins: Beispiel der Darstellung. -->
