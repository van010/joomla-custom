<?php
/**
 * @package     Joomla.Cms
 * @subpackage  Layout
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('JPATH_BASE') or die;

JLoader::register('TagsHelperRoute', JPATH_BASE . '/components/com_tags/helpers/route.php');
$item = $displayData['item']->tags;
$tags = $item->itemTags;
if (!isset($tags)){return;}
?>

<?php if (!empty($displayData)) : ?>
	<div class="tags">

		<?php foreach($tags as $tag): ?>
				<?php $tagParams = new JRegistry($tag->params); ?>
				<?php $link_class = $tagParams->get('tag_link_class', 'label label-info'); ?>
				<span class="tag-<?php echo $tag->tag_id; ?>" itemprop="keywords">
					<a href="<?php echo JRoute::_(TagsHelperRoute::getTagRoute($tag->tag_id . '-' . $tag->alias)) ?>" 
						class="<?php echo $link_class; ?>">
						<?php echo $this->escape($tag->title); ?>
					</a>
				</span>
		<?php endforeach; ?>
	</div>
<?php endif; ?>