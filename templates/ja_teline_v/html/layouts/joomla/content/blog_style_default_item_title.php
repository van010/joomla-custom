<?php
/**
 * @package     Joomla.Site
 * @subpackage  Layout
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

// Create a shortcut for params.
$params = $displayData->params;
$canEdit = $displayData->params->get('access-edit');
JHtml::addIncludePath(JPATH_COMPONENT.'/helpers');
JHtml::addIncludePath(JPATH_COMPONENT.'/helpers/html');
?>

	<?php if ($params->get('show_title', 1) || $displayData->state == 0 || ($params->get('show_author') && !empty($displayData->author ))) : ?>
		<div class="article-title">

			<?php if ($params->get('show_title', 1)) : ?>
				<h3 itemprop="name">
					<?php if ($params->get('link_titles') && $params->get('access-view')) : ?>
						<a href="<?php echo JRoute::_(ContentHelperRoute::getArticleRoute($displayData->slug, $displayData->catid)); ?>" itemprop="url">
						<?php echo $this->escape($displayData->title); ?></a>
					<?php else : ?>
						<?php echo $this->escape($displayData->title); ?>
					<?php endif; ?>
				</h3>
			<?php endif; ?>

			<?php if ($displayData->state == 0) : ?>
				<span class="label label-warning"><?php echo JText::_('JUNPUBLISHED'); ?></span>
			<?php endif; ?>
			<?php if (strtotime($displayData->publish_up) > strtotime(JFactory::getDate())) : ?>
				<span class="label label-warning"><?php echo JText::_('JNOTPUBLISHEDYET'); ?></span>
			<?php endif; ?>
			<?php if ((strtotime($displayData->publish_down) < strtotime(JFactory::getDate())) &&  !in_array($displayData->publish_down, array("",'0000-00-00 00:00:00'))) : ?>
				<span class="label label-warning"><?php echo JText::_('JEXPIRED'); ?></span>
		<?php endif; ?>
		</div>
	<?php endif; ?>
