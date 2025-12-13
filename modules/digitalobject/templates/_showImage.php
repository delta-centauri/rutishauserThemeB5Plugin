<?php use_helper('Text'); ?>

<?php
// Get sibling navigation data
$siblings = [];
$currentIndex = -1;
$prevSibling = null;
$nextSibling = null;
$infoObject = null;

// $resource is the QubitDigitalObject, get the related InformationObject
if (isset($resource) && $resource instanceof QubitDigitalObject) {
    $infoObject = $resource->object;
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
?>

<?php if (QubitTerm::MASTER_ID == $usageType || QubitTerm::REFERENCE_ID == $usageType) { ?>

  <?php if (isset($link)) { ?>
    <?php
      $linkAttrs = [
        'class' => 'glightbox',
        'data-gallery' => 'digital-object-gallery',
        'data-description' => $infoObject ? esc_entities($infoObject->getTitle(['cultureFallback' => true])) : ''
      ];

      // Add sibling navigation data
      if (count($siblings) > 0) {
        $linkAttrs['data-sibling-index'] = $currentIndex + 1;
        $linkAttrs['data-sibling-total'] = count($siblings);
      }
      if ($prevSibling) {
        $linkAttrs['data-prev-url'] = url_for([$prevSibling, 'module' => 'informationobject']);
        $linkAttrs['data-prev-title'] = esc_entities($prevSibling->getTitle(['cultureFallback' => true]));
      }
      if ($nextSibling) {
        $linkAttrs['data-next-url'] = url_for([$nextSibling, 'module' => 'informationobject']);
        $linkAttrs['data-next-title'] = esc_entities($nextSibling->getTitle(['cultureFallback' => true]));
      }

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
        $linkAttrs = [
          'class' => 'glightbox',
          'data-gallery' => 'digital-object-gallery',
          'data-description' => $infoObject ? esc_entities($infoObject->getTitle(['cultureFallback' => true])) : ''
        ];
        if (count($siblings) > 0) {
          $linkAttrs['data-sibling-index'] = $currentIndex + 1;
          $linkAttrs['data-sibling-total'] = count($siblings);
        }
        if ($prevSibling) {
          $linkAttrs['data-prev-url'] = url_for([$prevSibling, 'module' => 'informationobject']);
          $linkAttrs['data-prev-title'] = esc_entities($prevSibling->getTitle(['cultureFallback' => true]));
        }
        if ($nextSibling) {
          $linkAttrs['data-next-url'] = url_for([$nextSibling, 'module' => 'informationobject']);
          $linkAttrs['data-next-title'] = esc_entities($nextSibling->getTitle(['cultureFallback' => true]));
        }
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
            $linkAttrs = [
              'class' => 'glightbox',
              'data-gallery' => 'digital-object-gallery',
              'data-description' => $infoObject ? esc_entities($infoObject->getTitle(['cultureFallback' => true])) : ''
            ];
            if (count($siblings) > 0) {
              $linkAttrs['data-sibling-index'] = $currentIndex + 1;
              $linkAttrs['data-sibling-total'] = count($siblings);
            }
            if ($prevSibling) {
              $linkAttrs['data-prev-url'] = url_for([$prevSibling, 'module' => 'informationobject']);
              $linkAttrs['data-prev-title'] = esc_entities($prevSibling->getTitle(['cultureFallback' => true]));
            }
            if ($nextSibling) {
              $linkAttrs['data-next-url'] = url_for([$nextSibling, 'module' => 'informationobject']);
              $linkAttrs['data-next-title'] = esc_entities($nextSibling->getTitle(['cultureFallback' => true]));
            }
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
