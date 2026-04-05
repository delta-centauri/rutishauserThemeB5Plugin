<?php use_helper('Text'); ?>

<?php
// Get sibling navigation data
$siblings = [];
$currentIndex = -1;
$prevSibling = null;
$nextSibling = null;
$infoObject = null;

// $resource is the QubitDigitalObject (may be wrapped in sfOutputEscaperObjectDecorator)
// Get the InformationObject that this DigitalObject belongs to
if (isset($resource)) {
    // Get raw object if wrapped in output escaper
    $digitalObject = $resource;
    if ($resource instanceof sfOutputEscaperObjectDecorator) {
        $digitalObject = $resource->getRawValue();
    }

    // Get the related InformationObject using the objectId
    if (isset($digitalObject->objectId)) {
        $infoObject = QubitInformationObject::getById($digitalObject->objectId);
    }
}

if ($infoObject && $infoObject->parentId != QubitInformationObject::ROOT_ID) {
    $criteria = new Criteria();
    $criteria->add(QubitInformationObject::PARENT_ID, $infoObject->parentId);
    $criteria->addAscendingOrderByColumn(QubitInformationObject::LFT);
    $siblings = QubitInformationObject::get($criteria);

    foreach ($siblings as $index => $sibling) {
        if ($sibling->id == $infoObject->id) {
            $currentIndex = $index;
            if ($index > 0) {
                $prevSibling = $siblings[$index - 1];
            }
            if ($index < count($siblings) - 1) {
                $nextSibling = $siblings[$index + 1];
            }
            break;
        }
    }
}

// Build shared link attributes for GLightbox integration (used by all usage types below)
$linkAttrs = [
    'class' => 'glightbox',
    // Fallback: if GLightbox JS hasn't loaded yet (first visit, slow network),
    // open in new tab instead of navigating away from the AtoM page.
    // GLightbox intercepts the click and ignores target when it is ready.
    'target' => '_blank',
    'rel' => 'noopener noreferrer',
    'data-gallery' => 'digital-object-gallery',
    'data-description' => $infoObject ? esc_entities($infoObject->getTitle(['cultureFallback' => true])) : '',
    'data-label-open-tab' => esc_entities(__('Open image in separate tab')),
];

if (count($siblings) > 0) {
    $linkAttrs['data-sibling-index'] = $currentIndex + 1;
    $linkAttrs['data-sibling-total'] = count($siblings);
    $linkAttrs['data-image-count-label'] = esc_entities(
        __('%1% of %2%', ['%1%' => $currentIndex + 1, '%2%' => count($siblings)])
    );
}
if ($prevSibling) {
    $linkAttrs['data-prev-url'] = url_for([$prevSibling, 'module' => 'informationobject']);
    $linkAttrs['data-prev-title'] = esc_entities($prevSibling->getTitle(['cultureFallback' => true]));
}
if ($nextSibling) {
    $linkAttrs['data-next-url'] = url_for([$nextSibling, 'module' => 'informationobject']);
    $linkAttrs['data-next-title'] = esc_entities($nextSibling->getTitle(['cultureFallback' => true]));
}
?>

<?php if (QubitTerm::MASTER_ID == $usageType || QubitTerm::REFERENCE_ID == $usageType) { ?>

  <?php if (isset($link)) { ?>
    <?php
      echo link_to(
        image_tag($representation->getFullPath(), [
          'alt' => __($resource->getDigitalObjectAltText() ?: 'Open original %1%', ['%1%' => sfConfig::get('app_ui_label_digitalobject')]),
          'class' => 'img-thumbnail'
        ]),
        $link,
        $linkAttrs
      );
    ?>
  <?php } else { ?>
    <?php echo image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Original %1% not accessible', ['%1%' => sfConfig::get('app_ui_label_digitalobject')]), 'class' => 'img-thumbnail']); ?>
  <?php } ?>

<?php } elseif (QubitTerm::THUMBNAIL_ID == $usageType) { ?>

  <?php if ($iconOnly) { ?>
    <?php if (isset($link)) { ?>
      <?php
        echo link_to(
          image_tag($representation->getFullPath(), [
            'alt' => __($resource->getDigitalObjectAltText() ?: 'Open original %1%', ['%1%' => sfConfig::get('app_ui_label_digitalobject')]),
            'class' => 'img-thumbnail'
          ]),
          $link,
          $linkAttrs
        );
      ?>
    <?php } else { ?>
      <?php echo image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Original %1% not accessible', ['%1%' => sfConfig::get('app_ui_label_digitalobject')]), 'class' => 'img-thumbnail']); ?>
    <?php } ?>

  <?php } else { ?>

    <div class="digitalObject">

      <div class="digitalObjectRep">
        <?php if (isset($link)) { ?>
          <?php
            echo link_to(
              image_tag($representation->getFullPath(), [
                'alt' => __($resource->getDigitalObjectAltText() ?: 'Open original %1%', ['%1%' => sfConfig::get('app_ui_label_digitalobject')]),
                'class' => 'img-thumbnail'
              ]),
              $link,
              $linkAttrs
            );
          ?>
        <?php } else { ?>
          <?php echo image_tag($representation->getFullPath(), ['alt' => __($resource->getDigitalObjectAltText() ?: 'Original %1% not accessible', ['%1%' => sfConfig::get('app_ui_label_digitalobject')]), 'class' => 'img-thumbnail']); ?>
        <?php } ?>
      </div>

      <div class="digitalObjectDesc">
        <?php echo wrap_text($resource->name, 18); ?>
      </div>

    </div>

  <?php } ?>

<?php } ?>
