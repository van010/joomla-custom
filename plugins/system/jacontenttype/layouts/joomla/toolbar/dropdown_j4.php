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
$attributes = 'data-bs-toggle="dropdown"';
$btnClass .= " btn-j4";
?>
<joomla-toolbar-button id="toolbar-ja-contenttype-new" class="btn-group">
	<button class="<?php echo $btnClass; ?> dropdown-toggle" <?php echo $attributes; ?>>
		<span class="<?php echo trim($class); ?> icon-new"></span>
		<?php echo $text; ?>
	</button>
	<div class="dropdown-menu">
		<?php foreach ($items as $item) : ?>
			<?php if (trim($item['type']) == '') continue; ?>
			<?php if (isset($item['link']) && !empty($item['link'])) : ?>
				<joomla-toolbar-button>
					<a href="<?php echo $item['link']; ?>" class="dropdown-item">
						<?php if (isset($item['icon'])) : ?>
							<span class="icon icon-<?php echo $item['icon']; ?>"></span>
						<?php endif; ?>
						<?php echo $item['title']; ?>
					</a>
				</joomla-toolbar-button>
			<?php else : ?>
				<joomla-toolbar-button>
					<a href="javascript:;" onclick="<?php echo $doTask; ?>" class="dropdown-item">
						<?php if (isset($item['icon'])) : ?>
							<span class="icon icon-<?php echo $item['icon']; ?>"></span>
						<?php endif; ?>
						<?php echo $item['title']; ?>
					</a>
				</joomla-toolbar-button>
			<?php endif; ?>
		<?php endforeach; ?>
	</div>
</joomla-toolbar-button>
<style>
	#toolbar-new {
		display: none;
	}

	#toolbar-ja-contenttype-new .btn-j4::after {
		width: 2.375rem;
		font-family: "Font Awesome 5 Free";
		font-weight: 900;
		content: "";
		border: 0;
		vertical-align: 0;
	}
</style>