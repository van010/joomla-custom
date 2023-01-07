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

<div id="ja-finance-app">
  <pre debug-purpose style="display: none;">{{value}}</pre>
  <textarea
      style="display: none;"
      name="jform[params][jafinance]"
      id="jform_params_jafinance"
      v-model="value"></textarea>
      
  <div class="ja-finance-selects well">
    <div class="control-group">
      <div class="control-label">
        <label><?php echo JText::_('JAFINANCE_CHART_TYPE') ?></label>
      </div>
      <div class="controls">
        <el-select v-model="widget" @change="changeWidget">
          <el-option
            v-for="type in types"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="openPreview">
          <?php echo JText::_('JAFINANCE_PREVIEW') ?>
        </el-button>
      </div>
    </div>
  </div>

  <ja-ticker 
    v-if="widget === 'ticker'" 
    :viewdata="viewdata"
    :preview="preview"
    @removeTickerSymbol="removeTickerSymbol"
    @addTickerSymbol="addTickerSymbol"
    @changeTickerLocale="changeTickerLocale">
  </ja-ticker>
  
  <ja-ticker-tape 
    v-if="widget === 'ticker-tape'"
    :viewdata="viewdata"
    :preview="preview"
    @changeTickerTapeTheme="changeTickerTapeTheme"
    @changeTickerTapeMode="changeTickerTapeMode"
    @changeTickerTapeTrans="changeTickerTapeTrans"
    @removeTickerSymbol="removeTickerSymbol"
    @addTickerSymbol="addTickerSymbol"
    @changeTickerLocale="changeTickerLocale">
  </ja-ticker-tape>

  <ja-market-overview
    v-if="widget === 'market-overview'"
    :viewdata="viewdata"
    :preview="preview"
    @changeMOGridLineColor="changeMOGridLineColor"
    @changeMOLineColorGrowing="changeMOLineColorGrowing"
    @changeMOLineColorFalling="changeMOLineColorFalling"
    @changeMOLineFillColorGrowing="changeMOLineFillColorGrowing"
    @changeMOLineFillColorFalling="changeMOLineFillColorFalling"
    @changeMOScaleFontColor="changeMOScaleFontColor"
    @changeMOSymbolActiveColor="changeMOSymbolActiveColor"
    @changeMOSize="changeMOSize"
    @showMOChart="showMOChart"
    @changeMOLocale="changeMOLocale"
    @changeMOTabTitle="changeMOTabTitle"
    @addMOTab="addMOTab"
    @removeMOTab="removeMOTab"
    @addMOSymbol="addMOSymbol"
    @removeMOSymbol="removeMOSymbol">
  </ja-market-overview>

  <ja-single-ticker
    v-if="widget === 'single-ticker'"
    :viewdata="viewdata"
    :preview="preview"
    @changeSingleTickerSize="changeSingleTickerSize"
    @changeSingleTickerSymbol="changeSingleTickerSymbol"
    @changeSingleTickerLocale="changeSingleTickerLocale"></ja-single-ticker>

  <ja-mini-chart
    v-if="widget === 'mini-chart'"
    :viewdata="viewdata"
    :preview="preview"
    @changeMiniChartLocale="changeMiniChartLocale"
    @changeMiniChartSize="changeMiniChartSize"
    @changeMiniChartSymbol="changeMiniChartSymbol"
    @changeMiniChartDateRange="changeMiniChartDateRange"
    @changeMiniChartTheme="changeMiniChartTheme"
    @changeMiniChartTransparent="changeMiniChartTransparent"
    @changeMiniChartLineColor="changeMiniChartLineColor"
    @changeMiniChartUnderLineColor="changeMiniChartUnderLineColor"></ja-mini-chart>

  <ja-symbol-overview
    v-if="widget === 'symbol-overview'"
    :viewdata="viewdata"
    :preview="preview"
    @removeSOSymbol="removeSOSymbol"
    @addSOSymbol="addSOSymbol"
    @changeSOLocale="changeSOLocale"
    @changeSOGridLineColor="changeSOGridLineColor"
    @changeSOTrendLineColor="changeSOTrendLineColor"
    @changeSOUnderLineColor="changeSOUnderLineColor"
    @changeSOFontColor="changeSOFontColor"
    @changeSOSize="changeSOSize"
    @setSOChartOnly="setSOChartOnly"></ja-symbol-overview>

  <ja-cryptocurrency-market
    v-if="widget === 'cryptocurrency-market'"
    :viewdata="viewdata"
    :preview="preview"
    @changeCMDisplayCurrency="changeCMDisplayCurrency"
    @changeCMDefaultColumn="changeCMDefaultColumn"
    @changeCMLocale="changeCMLocale"
    @changeCMSize="changeCMSize"
    @changeCMTransparent="changeCMTransparent"></ja-cryptocurrency-market>
</div>