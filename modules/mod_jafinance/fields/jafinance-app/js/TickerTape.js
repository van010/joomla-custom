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

Vue.component('ja-ticker-tape', {
  template: Joomla.getOptions('jafinance').tmpl.TickerTape,

  props: {
    viewdata: {
      type: Object,
      default: function() {
        return {
          symbols: [],
          locale: 'en',
          theme: "light",
          isTransparent: !1,
          displayMode: "adaptive",
        }
      }
    },
    preview: String
  },

  data: function() {
    return {
      tapeTheme: this.viewdata.theme,
      tapeTrans: this.viewdata.isTransparent,
      tapeMode: this.viewdata.displayMode
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
      scriptEl.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js');
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
    },

    changeTheme: function() {
      this.$emit('changeTickerTapeTheme', this.tapeTheme);
    },

    changeMode: function() {
      this.$emit('changeTickerTapeMode', this.tapeMode);
    },

    changeTrans: function() {
      this.$emit('changeTickerTapeTrans', this.tapeTrans);
    }
  }
})
