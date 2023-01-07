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

<div class="ja-single-ticker ja-finance-config-wrap">
  <div class="ja-setting row-fluid">
    <div class="span6">
      <legend><?php echo JText::_('JAFINANCE_CONFIG') ?></legend>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_SYMBOL') ?></label>
        </div>
        <div class="controls">
          <input-symbol-search 
            style="width:150px;"
            :required="true"
            :value="symbol" 
            @changeSymbol="changeSymbol"></input-symbol-search>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_WIDTH') ?></label>
        </div>
        <div class="controls">
          <el-input style="width: 100px;" v-model="width" :disabled="autosize" @change="changeSize"></el-input>
          <el-checkbox @change="changeSize" v-model="autosize"><?php echo JText::_('JAFINANCE_AUTOSIZE') ?></el-checkbox>
        </div>
      </div>
      <input-locale @changeLocale="changeLocale" :locale="viewdata.locale"></input-locale>
    </div>
  </div>
</div>