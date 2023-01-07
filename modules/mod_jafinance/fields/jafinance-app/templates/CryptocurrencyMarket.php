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

<div class="ja-cryptocurrency-market ja-finance-config-wrap">
  <div class="ja-setting row-fluid">
    <div class="span6">
      <legend><?php echo JText::_('JAFINANCE_CONFIG_UI') ?></legend>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_DISPLAY_CURRENCY') ?></label>
        </div>
        <div class="controls">
          <el-select :value="viewdata.displayCurrency" @change="changeDisplayCurrency">
            <el-option
              :key="'USD'"
              :label="'USD'"
              :value="'USD'">
            </el-option>
            <el-option
              :key="'BTC'"
              :label="'BTC'"
              :value="'BTC'">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_DEFAULT_COLUMNS') ?></label>
        </div>
        <div class="controls">
          <el-select :value="viewdata.defaultColumn" @change="changeDefaultColumn">
            <el-option
              :key="'overview'"
              :label="'Overview'"
              :value="'overview'">
            </el-option>
            <el-option
              :key="'performance'"
              :label="'Performance'"
              :value="'performance'">
            </el-option>
            <el-option
              :key="'oscillators'"
              :label="'Oscillators'"
              :value="'oscillators'">
            </el-option>
            <el-option
              :key="'moving_averages'"
              :label="'Trend-Following'"
              :value="'moving_averages'">
            </el-option>
          </el-select>
        </div>
      </div>
      <input-locale @changeLocale="changeLocale" :locale="viewdata.locale"></input-locale>
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
          <label><?php echo JText::_('JAFINANCE_TRANSPARENT_BACKGROUND') ?></label>
        </div>
        <div class="controls">
          <el-switch :value="viewdata.transparency" @change="changeTransparent"></el-switch>
        </div>
      </div>
    </div>
  </div>
</div>