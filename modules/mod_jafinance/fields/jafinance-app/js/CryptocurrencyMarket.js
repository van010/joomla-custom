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


Vue.component('ja-cryptocurrency-market', {
  template: Joomla.getOptions('jafinance').tmpl.CryptocurrencyMarket,

  props: {
    viewdata: {
      type: Object,
      default: function() {
        return {
          "width": 1000,
          "height": 490,
          "defaultColumn": "overview",
          "screener_type": "crypto_mkt",
          "displayCurrency": "USD",
          "locale": "en"
        }
      }
    },
    preview: String,
  },

  data: function() {
    var width =this.viewdata.width;
    var height = this.viewdata.height;
    var autosize = width === '100%' && height === '100%';

    return {
      autosize: autosize,
      width: width,
      height: height,
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
      scriptEl.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js');
      scriptEl.innerHTML = this.jsonData;

      var $preview = document.querySelector('.ja-preview-content');
      $preview.innerHTML = '';
      setTimeout(function () {
        $preview.appendChild(scriptEl);
      }, 300)
    },

    changeDisplayCurrency: function(currency) {
      this.$emit('changeCMDisplayCurrency', currency);
    },

    changeDefaultColumn: function(column) {
      this.$emit('changeCMDefaultColumn', column);
    },

    changeLocale: function(locale) {
      this.$emit('changeCMLocale', locale);
    },

    changeSize: function() {
      this.$emit('changeCMSize', {
        autosize: this.autosize,
        width: this.width,
        height: this.height
      });
    },

    changeTransparent: function(value) {
      this.$emit('changeCMTransparent', value);
    }
  }
})
