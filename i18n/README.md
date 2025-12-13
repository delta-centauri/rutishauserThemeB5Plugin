# Übersetzungen / Translations

Dieses Verzeichnis enthält die Übersetzungsdateien für das rutishauserThemeB5Plugin.

## Verfügbare Sprachen / Available Languages

- **de/** - Deutsch (German)
- **en/** - English

## Verzeichnisstruktur / Directory Structure

```
i18n/
├── de/
│   └── messages.xml
├── en/
│   └── messages.xml
└── README.md
```

Jede Sprache hat ihr eigenes Unterverzeichnis mit einer `messages.xml` Datei.

## Neue Übersetzungen hinzufügen / Adding New Translations

1. Erstellen Sie ein neues Verzeichnis mit dem ISO-Sprachcode (z.B. `fr/` für Französisch)
2. Kopieren Sie `de/messages.xml` in das neue Verzeichnis
3. Ändern Sie im `<file>`-Tag: `target-language="de"` zu Ihrer Sprache (z.B. `target-language="fr"`)
4. Übersetzen Sie die `<target>`-Elemente in Ihre Sprache
5. Leeren Sie den Cache: `php symfony cc`

## Nach Änderungen / After Changes

Nach jeder Änderung an den Übersetzungsdateien muss der AtoM-Cache geleert werden:

```bash
cd /path/to/atom
php symfony cc
```

## Verwendung im Code / Usage in Code

```php
<?php echo __('Navigate siblings'); ?>
```

Die `__()` Funktion lädt automatisch die Übersetzung aus der entsprechenden XML-Datei basierend auf der aktuellen Spracheinstellung.

## Struktur / Structure

Jede `<trans-unit>` hat:
- `id` - Eindeutige ID
- `<source>` - Englischer Originaltext
- `<target>` - Übersetzter Text

Beispiel:
```xml
<trans-unit id="1">
  <source>Navigate siblings</source>
  <target>Geschwister-Navigation</target>
</trans-unit>
```
