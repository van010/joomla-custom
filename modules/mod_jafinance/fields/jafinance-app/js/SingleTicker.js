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

Vue.component('ja-single-ticker', {
  template: Joomla.getOptions('jafinance').tmpl.SingleTicker,

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
    var locale = this.viewdata.locale;
    var autosize = width === '100%';

    return {
      symbol: symbol,
      width: width,
      locale: locale,
      autosize: autosize
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
      scriptEl.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js');
      scriptEl.innerHTML = this.jsonData;

      var $preview = document.querySelector('.ja-preview-content');
      $preview.innerHTML = '';
      setTimeout(function () {
        $preview.appendChild(scriptEl);
      }, 300)
    },

    changeSymbol: function(symbol) {
      this.symbol = symbol.toUpperCase();
      this.$emit('changeSingleTickerSymbol', this.symbol);
    },

    changeSize: function() {
      this.$emit('changeSingleTickerSize', this.width);
    },

    changeLocale: function(locale) {
      this.$emit('changeSingleTickerLocale', locale);
    }
  }
})
