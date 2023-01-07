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

<div class="ja-ticker-tape-container ja-finance-config-wrap">
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
      <div class="ja-color-theme control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_COLOR_THEME') ?></label>
        </div>
        <div class="controls">
          <el-select v-model="tapeTheme" @change="changeTheme">
            <el-option
              :key="'light'"
              :label="'Light'"
              :value="'light'">
            </el-option>
            <el-option
              :key="'dark'"
              :label="'Dark'"
              :value="'dark'">
            </el-option>
          </el-select>
        </div>
      </div>
      <br>
      <div class="control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_TRANSPARENT_BACKGROUND') ?></label>
        </div>
        <div class="controls">
          <el-switch v-model="tapeTrans" @change="changeTrans"></el-switch>
        </div>
      </div>
      <br>
      <input-locale @changeLocale="changeLocale" :locale="viewdata.locale"></input-locale>
      <br>
      <div class="ja-display-mode control-group">
        <div class="control-label">
          <label><?php echo JText::_('JAFINANCE_DISPLAY_MODE') ?></label>
        </div>
        <div class="controls">
          <el-select v-model="tapeMode" @change="changeMode">
            <el-option
              :key="'adaptive'"
              :label="'Adaptive'"
              :value="'adaptive'">
            </el-option>
            <el-option
              :key="'regular'"
              :label="'Regular'"
              :value="'regular'">
            </el-option>
            <el-option
              :key="'compact'"
              :label="'Compact'"
              :value="'compact'">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</div>