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

defined('_JEXEC') or die; ?>

<div class="ja-ticker-container ja-finance-config-wrap">
  <div class="ja-setting row-fluid">
    <div class="span6">
      <legend><?php echo JText::_('JAFINANCE_CONFIG_DATA') ?></legend>
	    <input-symbol-list 
	      @removeSymbol="removeSymbol"
	      @addSymbol="addSymbol" 
	      :symbols="viewdata.symbols">
	    </input-symbol-list>
    </div>
    <div class="span6">
      <legend><?php echo JText::_('JAFINANCE_CONFIG_UI') ?></legend>
    	<input-locale @changeLocale="changeLocale" :locale="viewdata.locale"></input-locale>
  	</div>
  </div>
</div>