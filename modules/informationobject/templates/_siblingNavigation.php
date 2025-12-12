<?php
// Get siblings (same parent, same level)
$siblings = [];
$currentIndex = -1;
$prevSibling = null;
$nextSibling = null;

if (isset($resource) && $resource->parentId != QubitInformationObject::ROOT_ID) {
    // Get all siblings including current resource
    $criteria = new Criteria();
    $criteria->add(QubitInformationObject::PARENT_ID, $resource->parentId);
    $criteria->addAscendingOrderByColumn(QubitInformationObject::LFT);
    
    $siblings = QubitInformationObject::get($criteria);
    
    // Find current position and prev/next siblings
    foreach ($siblings as $index => $sibling) {
        if ($sibling->id == $resource->id) {
            $currentIndex = $index;
            
            // Get previous sibling
            if ($index > 0) {
                $prevSibling = $siblings[$index - 1];
            }
            
            // Get next sibling
            if ($index < count($siblings) - 1) {
                $nextSibling = $siblings[$index + 1];
            }
            
            break;
        }
    }
}
?>

<?php if ($prevSibling || $nextSibling) { ?>
  <section id="sibling-navigation" class="mb-3">
    <h4 class="h5 mb-2"><?php echo __('Navigate siblings'); ?></h4>
    
    <div class="d-flex gap-2">
      <?php if ($prevSibling) { ?>
        <a href="<?php echo url_for([$prevSibling, 'module' => 'informationobject']); ?>" 
           class="btn btn-sm btn-outline-secondary flex-fill" 
           title="<?php echo esc_entities($prevSibling->getTitle(['cultureFallback' => true])); ?>"
           data-bs-toggle="tooltip">
          <i class="fas fa-chevron-left me-1" aria-hidden="true"></i>
          <?php echo __('Previous'); ?>
        </a>
      <?php } else { ?>
        <button class="btn btn-sm btn-outline-secondary flex-fill" disabled>
          <i class="fas fa-chevron-left me-1" aria-hidden="true"></i>
          <?php echo __('Previous'); ?>
        </button>
      <?php } ?>
      
      <?php if ($nextSibling) { ?>
        <a href="<?php echo url_for([$nextSibling, 'module' => 'informationobject']); ?>" 
           class="btn btn-sm btn-outline-secondary flex-fill"
           title="<?php echo esc_entities($nextSibling->getTitle(['cultureFallback' => true])); ?>"
           data-bs-toggle="tooltip">
          <?php echo __('Next'); ?>
          <i class="fas fa-chevron-right ms-1" aria-hidden="true"></i>
        </a>
      <?php } else { ?>
        <button class="btn btn-sm btn-outline-secondary flex-fill" disabled>
          <?php echo __('Next'); ?>
          <i class="fas fa-chevron-right ms-1" aria-hidden="true"></i>
        </button>
      <?php } ?>
    </div>
    
    <?php if (count($siblings) > 0) { ?>
      <div class="text-muted small mt-2 text-center">
        <?php echo __('%1% of %2%', ['%1%' => $currentIndex + 1, '%2%' => count($siblings)]); ?>
      </div>
    <?php } ?>
  </section>
<?php } ?>
