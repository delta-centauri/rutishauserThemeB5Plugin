# Übersetzungen / Translations

Dieses Verzeichnis enthält die Übersetzungsdateien für das rutishauserThemeB5Plugin.

## Verfügbare Sprachen / Available Languages

- **de.xml** - Deutsch (German)

## Neue Übersetzungen hinzufügen / Adding New Translations

1. Kopieren Sie `de.xml` und benennen Sie sie nach dem ISO-Code (z.B. `fr.xml` für Französisch)
2. Ändern Sie im `<file>`-Tag: `target-language="de"` zu Ihrer Sprache (z.B. `target-language="fr"`)
3. Übersetzen Sie die `<target>`-Elemente in Ihre Sprache
4. Leeren Sie den Cache: `php symfony cc`

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
