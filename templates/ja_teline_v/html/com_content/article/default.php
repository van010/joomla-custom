<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_content
 *
 * @copyright   Copyright (C) 2005 - 2021 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\FileLayout;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;
//use Joomla\Component\Content\Administrator\Extension\ContentComponent;
use T4\Helper\J3J4;

if(!class_exists('ContentHelperRoute')){
	if(version_compare(JVERSION, '4', 'ge')){
		abstract class ContentHelperRoute extends \Joomla\Component\content\Site\Helper\RouteHelper{};
	}else{
		JLoader::register('ContentHelperRoute', $com_path . '/helpers/route.php');
	}
}
$params   = $this->item->params;
$urls     = json_decode($this->item->urls);
$images  = json_decode($this->item->images);

if ($params->get('show_intro')) {
	$separator = md5(time());
	$this->item->text = $this->item->introtext . $separator . $this->item->fulltext;
	$offset = $this->state->get('list.offset');
	$app = JFactory::getApplication();
	$app->triggerEvent('onContentPrepare', array ('com_content.article', &$this->item, &$this->item->params, $offset));
	$app->triggerEvent('onContentAfterTitle', array ('com_content.article', &$this->item, &$this->item->params, $offset));
	$app->triggerEvent('onContentBeforeDisplay', array ('com_content.article', &$this->item, &$this->item->params, $offset));
	$app->triggerEvent('onContentAfterDisplay', array ('com_content.article', &$this->item, &$this->item->params, $offset));
	$explode = explode($separator, $this->item->text);
	$this->item->introtext = array_shift($explode);
	$this->item->text = implode('', $explode);
}

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');
JHtml::addIncludePath(T3_PATH . '/html/com_content');
JHtml::addIncludePath(dirname(dirname(__FILE__)));

// Add Facebook tags
$doc = JFactory::getDocument();
$fblog = '<meta property="og:type" content="article" />'."\n";
$fblog .= '<link rel="image_src" content="'.JUri::base().$images->image_fulltext.'" />'."\n";
$fblog .= '<meta property="og:image" content="'.JUri::base().$images->image_fulltext.'" />'."\n";
if($this->item->tags->itemTags != null){
    $this->item->rawtagLayout = new JLayoutFile('joomla.content.rawtags');
    $fblog .= '<meta property="article:tag" content="'.$this->item->rawtagLayout->render($this->item->tags->itemTags).'" />'."\n";
}
$doc->addCustomTag($fblog);
?>

<?php if (JFactory::getApplication()->input->get ('tmpl') == 'component'): ?>

	<?php echo JATemplateHelper::render ($this->item, 'joomla.content.item', array('print' => $this->print, 'item' => $this->item, 'params' => $this->params)) ?>

<?php else: ?>

	<?php if (JATemplateHelper::countModules ('article-top')): ?>
		<div class="item-row row-top">
			<?php echo JATemplateHelper::renderModules('article-top') ?>
		</div>
	<?php endif ?>

	<div class="item-row row-main">
		<div class="article-main">
			<?php echo JATemplateHelper::render ($this->item, 'joomla.content.item', array('print' => $this->print, 'item' => $this->item, 'params' => $this->params)) ?>

			<?php if (isset($urls) && ((!empty($urls->urls_position) && ($urls->urls_position == '0')) || ($params->get('urls_position') == '0' && empty($urls->urls_position))) || (empty($urls->urls_position) && (!$params->get('urls_position')))): ?>
				<?php echo $this->loadTemplate('links'); ?>
			<?php endif; ?>
		</div>
	</div>

	<?php if (JATemplateHelper::countModules ('article-bottom')): ?>
		<div class="item-row row-bottom">
			<?php echo JATemplateHelper::renderModules('article-bottom') ?>
		</div>
	<?php endif ?>

<?php endif ?>