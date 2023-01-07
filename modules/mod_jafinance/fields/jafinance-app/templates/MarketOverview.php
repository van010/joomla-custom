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

<div class="ja-market-overview ja-finance-config-wrap">
  <div class="ja-setting row-fluid">
    <div class="span6">
      <legend><?php echo JText::_('JAFINANCE_CONFIG_DATA') ?></legend>
      <input-symbol-tab-list
        :tabs="viewdata.tabs"
        @addTab="addTab"
        @removeTab="removeTab"
        @changeTabTitle="changeTabTitle"
        @addSymbol="addSymbol"
        @removeSymbol="removeSymbol">
      </input-symbol-tab-list>
    </div>
    <div class="span6">
      <legend><?php echo JText::_('JAFINANCE_CONFIG_UI') ?></legend>
      <input-locale @changeLocale="changeLocale" :locale="viewdata.locale"></input-locale>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_GRID') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
            show-alpha 
            color-format="rgb"
            @change="changeGridLineColor" 
            :value="viewdata.gridLineColor"
            :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_PRICE_LINE_GROWING') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
            show-alpha 
            color-format="rgb"
            @change="changePlotLineColorGrowing" 
            :value="viewdata.plotLineColorGrowing"
            :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_PRICE_LINE_FALLING') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
            show-alpha 
            color-format="rgb"
            @change="changePlotLineColorFalling" 
            :value="viewdata.plotLineColorFalling"
            :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_UNDER_LINE_AREA_GROWING') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
            show-alpha 
            color-format="rgb"
            @change="changeBelowLineFillColorGrowing" 
            :value="viewdata.belowLineFillColorGrowing"
            :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_UNDER_LINE_AREA_FALLING') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
            show-alpha 
            color-format="rgb"
            @change="changeBelowLineFillColorFalling" 
            :value="viewdata.belowLineFillColorFalling"
            :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_FONT') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
            show-alpha 
            color-format="rgb"
            @change="changeScaleFontColor" 
            :value="viewdata.scaleFontColor"
            :predefine="predefineColors"></el-color-picker>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_ACTIVE_TICKER') ?></label>
        </div>
        <div class="controls">
          <el-color-picker 
            show-alpha 
            color-format="rgb"
            @change="changeSymbolActiveColor" 
            :value="viewdata.symbolActiveColor"
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

          <el-checkbox @change="changeSize" v-model="autosize">
            <?php echo JText::_('JAFINANCE_AUTOSIZE') ?>
          </el-checkbox>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label for=""><?php echo JText::_('JAFINANCE_SHOW_CHART') ?></label>
        </div>
        <div class="controls">
          <el-switch :value="viewdata.showChart" @change="showChart"></el-switch>
        </div>
      </div>
    </div>
  </div>
</div>