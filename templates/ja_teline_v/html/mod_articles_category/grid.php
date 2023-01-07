<?php
/**
 * @package     Joomla.Site
 * @subpackage  mod_articles_category
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;
$doc = JFactory::getDocument();
$doc->addStyleSheet (T3_TEMPLATE_URL . '/css/mod_articles_category.css');
$moduleclass_sfx = $params->get('moduleclass_sfx');
?>
<div class="section-inner <?php echo $moduleclass_sfx; ?>">

    <div class="category-module<?php echo $moduleclass_sfx; ?> magazine-links">
        <ul class="item-list grid-view">
          <?php if ($grouped) : ?>
          	<?php foreach ($list as $group_name => $group) : ?>
          	<?php foreach ($group as $item) : ?>
                <li class="item">
                    <?php echo JLayoutHelper::render('joomla.content.link.default', array('item' => $item, 'params' => $params)); ?>
                </li>
            <?php endforeach; ?>
            <?php endforeach; ?>
          <?php else: ?>
            <?php foreach ($list as $item) : ?>
                <li class="item">
                    <?php echo JLayoutHelper::render('joomla.content.link.default', array('item' => $item, 'params' => $params)); ?>
                </li>
            <?php endforeach; ?>
          <?php endif ?>
        </ul>
    </div>
</div>
