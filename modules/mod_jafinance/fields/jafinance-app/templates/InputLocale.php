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

<div class="ja-input-locale control-group">
  <div class="control-label">
    <label><?php echo JText::_('JAFINANCE_LOCALE') ?></label>
  </div>
  <div class="controls">
    <el-select v-model="value" @change="onChange">
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value">
      </el-option>
    </el-select>
  </div>
</div>