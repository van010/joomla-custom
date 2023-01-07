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

<div class="ja-input-symbol-list">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th class="nowrap hidden-phone" width="50%">
          <?php echo JText::_('JAFINANCE_SYMBOL') ?>
        </th>
        <th class="nowrap hidden-phone" width="50%">
          <?php echo JText::_('JAFINANCE_DESCRIPTION') ?>
        </th>
        <th></th>
      </tr>
    </thead>

    <tr v-for="(symbol, index) in symbols">
      <td>{{symbol.proName || symbol.s}}</td>
      <td>{{symbol.description || symbol.d}}</td>
      <td><i @click="removeSymbol(index)" class="el-icon-remove"></i></td>
    </tr>
    <tr>
      <td>
        <input-symbol-search 
          class="symbol-list-search"
          :key="forceRerenderSymbolSearch"
          @changeSymbol="changeSymbolName"></input-symbol-search>
      </td>
      <td>
        <el-input 
          placeholder="<?php echo JText::_('JAFINANCE_DESCRIPTION') ?>" 
          v-model="symbolDesc"></el-input>
      </td>
      <td class="center"><i @click="addSymbol" class="el-icon-circle-plus"></i></td>
    </tr>
  </table>
</div>