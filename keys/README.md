# Signaturschlüssel

`kage-plugin-signing.pub.pem` ist der **öffentliche** Schlüssel (Ed25519), mit dem Kage Index und Plugin-Archive prüft. Er wird in Kage eingebaut.

Fingerabdruck (SHA-256 über den DER-kodierten öffentlichen Schlüssel):

```
76a926949080237fee06326224e0ee6fb2befa8509483c01d37908fc6c40d37d
```

Der private Schlüssel liegt **nicht** in diesem Repository. Er ist als Secret `KAGE_PLUGIN_SIGNING_KEY` in der Umgebung `veroeffentlichung` hinterlegt und wird nur vom Workflow „Plugin veröffentlichen“ benutzt. Eine Kopie liegt beim Maintainer an einem sicheren Ort außerhalb von GitHub.

Wechsel oder Verlust des Schlüssels: siehe das Ticket „Signaturschlüssel erzeugen und sicher aufbewahren“.
