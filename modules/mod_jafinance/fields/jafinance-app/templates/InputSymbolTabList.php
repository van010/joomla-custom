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

<div class="ja-input-symbol-tab-list">
  <div class="ja-asb-btns">
    <el-button
      type="success"
      size="small"
      @click="addTab">
      <?php echo JText::_('JAFINANCE_ADD_TAB') ?>
    </el-button>
  </div>
  <div>
    <i><small>** <?php echo JText::_('JAFINANCE_TABTITLE_HINIT') ?> **</small></i>
  </div>
  <el-tabs closable v-model="activetab" @tab-remove="removeTab" @tab-click="changeTabTitle">
    <el-tab-pane
      v-for="(item, index) in tabs"
      :key="item.title"
      :label="item.title"
      :name="item.title">
      
      <input-symbol-list 
        @removeSymbol="removeSymbol"
        @addSymbol="addSymbol" 
        :symbols="item.symbols">
      </input-symbol-list>

    </el-tab-pane>
  </el-tabs>
</div>