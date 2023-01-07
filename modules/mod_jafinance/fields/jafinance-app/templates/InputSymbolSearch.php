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

  <el-autocomplete
    popper-class="ja-symbol-autocomplete"
    placeholder="<?php echo JText::_('JAFINANCE_SYMBOL') ?>"
    :required="required"
    :value="symbol"
    :debounce="500"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    @input="inputSymbol"
    @select="handleSelect">
    <template v-slot="slotProps">
      <div class="item-value">{{slotProps.item.value}}</div>
      <small class="item-desc" v-html="slotProps.item.description"></small>
    </template>
  </el-autocomplete>
