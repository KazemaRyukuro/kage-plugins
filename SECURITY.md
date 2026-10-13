# Sicherheit

Plugins laufen in Kage und bekommen Zugriff auf Dateien, Fenster oder Dienste. Sicherheit ist deshalb Teil jedes Plugins, nicht nachträglich dazu. Die Regeln für Kage selbst stehen in der [SECURITY.md von Kage](https://github.com/KazemaRyukuro/kage-island/blob/main/SECURITY.md).

## Sicherheitslücke melden

Bitte melde Sicherheitsprobleme **nicht** als öffentliches Ticket. Nutze unter *Security > Report a vulnerability* die private Meldung von GitHub.

Hilfreich sind: welches Plugin und welche Version, wie man es nachstellt und was ein Angreifer damit erreichen könnte. Schreibe keine echten Schlüssel oder Tokens in die Meldung.

## Was als Sicherheitsproblem zählt

- Ein Plugin tut mehr, als sein Manifest an **Berechtigungen** angibt, oder umgeht das Gate.
- Ein Paket lässt sich **manipulieren**, ohne dass Signatur oder Prüfsumme es bemerken (auch Downgrade auf eine ältere, verwundbare Version).
- Beim Entpacken landen Dateien **außerhalb** des Plugin-Ordners (Zip-Slip) oder ein Archiv füllt den Speicher (Zip-Bombe).
- Ein Vorschau-Plugin führt **Inhalt aus** (Skripte, Makros) oder öffnet eine **Netzwerkverbindung**.
- Der **Signaturschlüssel**, Zugangsdaten oder persönliche Daten liegen im Repository oder in einem Release.

## Regeln für Plugins in diesem Repository

- Berechtigungen im Manifest sind eine **Obergrenze**, nie eine Freigabe. Entscheidet wird zur Laufzeit durch das Gate von Kage.
- Standard ist: keine Berechtigung. Netzwerk nur zu ausdrücklich genannten Adressen.
- Vorschau-Plugins dürfen nur lesen und haben kein Netzwerk.
- Jede Datei eines Plugins hat eine SHA-256-Prüfsumme im Manifest. Der CI-Lauf prüft sie.
- Keine Abhängigkeiten von nachgeladenem Code zur Laufzeit.
- Zurückgezogene Versionen stehen in der Sperrliste (`revoked`) im Index und werden von Kage nicht mehr geladen.

## Unterstützte Versionen

Es zählt der aktuelle Stand von `main`. Ältere Plugin-Versionen werden bei Sicherheitsproblemen über die Sperrliste zurückgezogen.
