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
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
if(!class_exists('ContentHelperRoute')){
  if(version_compare(JVERSION, '4', 'ge')){
    abstract class ContentHelperRoute extends \Joomla\Component\content\Site\Helper\RouteHelper{};
  }else{
    JLoader::register('ContentHelperRoute', $com_path . '/helpers/route.php');
  }
}

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers');
JHtml::_('behavior.caption');
JHtml::_('behavior.core');
?>
<div class="categories-list<?php echo $this->pageclass_sfx; ?>">
<?php
echo JLayoutHelper::render('joomla.content.categories_default', $this);
echo $this->loadTemplate('items');
?>
</div>
