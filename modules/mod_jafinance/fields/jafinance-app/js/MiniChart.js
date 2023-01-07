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

Vue.component('ja-mini-chart', {
  template: Joomla.getOptions('jafinance').tmpl.MiniChart,

  props: {
    viewdata: {
      type: Object,
      default: function() {
        return {
          symbol: 'FX:EURUSD',
          width: 350,
          locale: 'en'
        }
      }
    },
    preview: String,
  },

  data: function() {
    var symbol = this.viewdata.symbol;
    var width = this.viewdata.width;
    var height = this.viewdata.height;
    var autosize = width === '100%' && height === '100%';

    return {
      symbol: symbol,
      width: width,
      height: height,
      autosize: autosize,
      dateOptions: ['1d', '1m', '3m', '1y', '5y', 'max'],
      predefineColors: [
        'rgb(0, 0, 0)',
        'rgb(66, 66, 66)',
        'rgb(101, 101, 101)',
        'rgb(152, 152, 152)',
        'rgb(182, 182, 182)',
        'rgb(203, 203, 203)',
        'rgb(216, 216, 216)',
        'rgb(238, 238, 238)',
        'rgb(242, 242, 242)',
        'rgb(255, 255, 255)',
        'rgb(151, 0, 0)',
        'rgb(255, 0, 0)',
        'rgb(255, 152, 0)',
        'rgb(255, 255, 0)',
        'rgb(0, 255, 0)',
        'rgb(0, 255, 255)',
        'rgb(73, 133, 231)',
        'rgb(0, 0, 255',
        'rgb(152, 0, 255)',
        'rgb(255, 0, 255)'
      ],
    }
  },

  computed: {
    jsonData: function() {
      return JSON.stringify(this.viewdata);
    }
  },

  watch: {
    preview: function(value) {
      var self = this;
      setTimeout(function () {
        self.renderWidget();
      })
    }
  },

  methods: {
    renderWidget: function() {
      var scriptEl = document.createElement('script');
      scriptEl.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js');
      scriptEl.innerHTML = this.jsonData;

      var $preview = document.querySelector('.ja-preview-content');
      $preview.innerHTML = '';
      setTimeout(function () {
        $preview.appendChild(scriptEl);
      }, 300)
    },

    changeSymbol: function(value) {
      this.symbol = value.toUpperCase();
      this.$emit('changeMiniChartSymbol', this.symbol);
    },

    changeDateRange: function(range) {
      this.$emit('changeMiniChartDateRange', range);
    },

    changeColorTheme: function(theme) {
      this.$emit('changeMiniChartTheme', theme);
    },

    changeTransparent: function(isTransparent) {
      this.$emit('changeMiniChartTransparent', isTransparent);
    },

    changeTrendLineColor: function(color) {
      this.$emit('changeMiniChartLineColor', color);
    },

    changeUnderLineColor: function(color) {
      this.$emit('changeMiniChartUnderLineColor', color);
    },

    changeSize: function() {
      this.$emit('changeMiniChartSize', {
        autosize: this.autosize,
        width: this.width,
        height: this.height
      });
    },

    changeLocale: function(locale) {
      this.$emit('changeMiniChartLocale', locale);
    }
  }
})
