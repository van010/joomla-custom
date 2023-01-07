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

<div class="ja-mini-chart ja-finance-config-wrap">
  <div class="ja-setting row-fluid">
    <div class="span6">
      <legend><?php echo JText::_('JAFINANCE_CONFIG_UI') ?></legend>
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

          <el-select 
            style="width: 60px;" 
            :value="viewdata.dateRange" 
            @change="changeDateRange">
            <el-option
              v-for="date in dateOptions"
              :key="date"
              :label="date"
              :value="date">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_COLOR_THEME') ?></label>
        </div>
        <div class="controls">
          <el-select style="width:150px;" :value="viewdata.colorTheme" @change="changeColorTheme">
            <el-option
              :key="'light'"
              :label="'<?php echo JText::_('JAFINANCE_LIGHT') ?>'"
              :value="'light'">
            </el-option>
            <el-option
              :key="'dark'"
              :label="'<?php echo JText::_('JAFINANCE_DARK') ?>'"
              :value="'dark'">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_TRANSPARENT_BACKGROUND') ?></label>
        </div>
        <div class="controls">
          <el-switch :value="viewdata.isTransparent" @change="changeTransparent"></el-switch>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_PRICE_LINE') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
              show-alpha 
              color-format="rgb"
              @change="changeTrendLineColor" 
              :value="viewdata.trendLineColor"
              :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_UNDER_LINE_AREA') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
              show-alpha 
              color-format="rgb"
              @change="changeUnderLineColor" 
              :value="viewdata.underLineColor"
              :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_SIZE') ?></label>
        </div>
        <div class="controls">
          <el-input
            style="width: 100px;"
            placeholder="Width"
            @change="changeSize"
            v-model="width"
            :disabled="autosize"></el-input>

          <span>x</span>

          <el-input
            style="width: 100px;"
            placeholder="Height"
            @change="changeSize"
            v-model="height"
            :disabled="autosize"></el-input>

          <el-checkbox @change="changeSize" v-model="autosize"><?php echo JText::_('JAFINANCE_AUTOSIZE') ?></el-checkbox>
        </div>
      </div>
      <input-locale @changeLocale="changeLocale" :locale="viewdata.locale"></input-locale>
    </div>
  </div>
</div>