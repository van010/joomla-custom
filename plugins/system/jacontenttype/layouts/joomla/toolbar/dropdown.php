<?php
/**
 * ------------------------------------------------------------------------
 * Plugin JA Content Type
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2011 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites: http://www.joomlart.com - http://www.joomlancers.com
 * ------------------------------------------------------------------------
 */

defined('_JEXEC') or die;
$doc = JFactory::getDocument();
$doTask   = $displayData['doTask'];
$class    = $displayData['class'];
$text     = $displayData['text'];
$btnClass = $displayData['btnClass'];
$items    = $displayData['items'];
$attributes = 'data-toggle="dropdown"';
?>
<div class="btn-group">
	<button class="<?php echo $btnClass; ?> dropdown-toggle" <?php echo $attributes;?>>
		<span class="<?php echo trim($class); ?> icon-new icon-white"></span>
		<?php echo $text; ?>
		<span class="caret" style="margin-top: 12px; margin-left: 5px;"></span>
	</button>
	<ul class="dropdown-menu">
		<?php foreach($items as $item): ?>
			<?php if(trim($item['type']) == '') continue; ?>
			<?php if(isset($item['link']) && !empty($item['link'])): ?>
				<li>
					<a href="<?php echo $item['link']; ?>">
						<?php if(isset($item['icon'])): ?>
							<span class="icon icon-<?php echo $item['icon']; ?>" style="background: none; border: 0; margin-left: -5px; width: 18px;"></span>
						<?php endif; ?>
						<?php echo $item['title']; ?>
					</a>
				</li>
			<?php else: ?>
				<li>
					<a href="javascript:;" onclick="<?php echo $doTask; ?>">
						<?php if(isset($item['icon'])): ?>
							<span class="icon icon-<?php echo $item['icon']; ?>" style="background: none; border: 0; margin-left: -5px; width: 18px;"></span>
						<?php endif; ?>
						<?php echo $item['title']; ?>
					</a>
				</li>
			<?php endif; ?>
		<?php endforeach; ?>
	</ul>
</div>

<style>
	#toolbar-new {
		display: none;
	}
</style>