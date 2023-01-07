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
$config->set('container_id', 'tv-medium-widget-' . $module->id);
?>
<div class="tradingview-widget-container <?php echo $widget ?>">
  <div id="tv-medium-widget-<?php echo $module->id ?>"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.MediumWidget(<?php echo $config->toString() ?>);
  </script>
</div>
