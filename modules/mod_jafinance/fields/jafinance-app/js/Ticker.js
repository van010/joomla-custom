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

Vue.component('ja-ticker', {
  template: Joomla.getOptions('jafinance').tmpl.Ticker,

  props: {
    viewdata: {
      type: Object,
      default: function() {
        return {
          symbols: [],
          locale: 'en'
        }
      }
    },
    preview: String
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
      scriptEl.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js');
      scriptEl.innerHTML = this.jsonData;

      var $preview = document.querySelector('.ja-preview-content');
      $preview.innerHTML = '';
      setTimeout(function () {
        $preview.appendChild(scriptEl);
      }, 300)
    },

    removeSymbol: function(index) {
      this.$emit('removeTickerSymbol', index);
    },

    addSymbol: function(symbol) {
      this.$emit('addTickerSymbol', symbol);
    },

    changeLocale: function(locale) {
      this.$emit('changeTickerLocale', locale);
    }
  }
})
