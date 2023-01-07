<?php
/**
 * ------------------------------------------------------------------------
 * JA Finance Module for Joomla
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2019 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites: http://www.joomlart.com - http://www.joomlancers.com
 * ------------------------------------------------------------------------
 */


defined('_JEXEC') or die; 

$config = new JRegistry($params->get('jafinance'));
$widget = $config->get('widget', 'ticker');

?>
<div class="ja-finance" id="ja-finance-<?php echo $module->id ?>">
  <?php require ModJaFinanceHelper::getWidgetPath('mod_jafinance', $widget) ?>
</div>