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

Vue.component('ja-symbol-overview', {
  template: Joomla.getOptions('jafinance').tmpl.SymbolOverview,

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

  data: function() {
    var width = this.viewdata.width;
    var height = this.viewdata.height;
    var autosize = width === '100%' && height === '100%';

    return {
      autosize: autosize,
      width: width,
      height: height,
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
      var data = JSON.parse(JSON.stringify(this.viewdata));
      data.width = isNaN(data.width) ? data.width : data.width + 'px';
      data.height = isNaN(data.height) ? data.height : data.height + 'px';
      return JSON.stringify(data);
    },

    listSymbol: function() {
      var symbols = this.viewdata.symbols;
      return symbols.map(function(s) {
        return {
          description: s[0],
          proName: s[1]
        }
      });
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
      var scriptExecute = document.createElement('script');
      scriptExecute.innerHTML = 'new TradingView.MediumWidget('+this.jsonData+')';

      var $preview = document.querySelector('.ja-preview-content');
      $preview.innerHTML = '<div id="ja-preview-inner"></div>';

      jQuery.ajax({
        url: 'https://s3.tradingview.com/tv.js',
        dataType: "script",
        cache: true
      })
      .done(function() {
        setTimeout(function () {
          $preview.appendChild(scriptExecute);
        }, 300)
      })
    },

    removeSymbol: function(index) {
      this.$emit('removeSOSymbol', index);
    },

    addSymbol: function(symbol) {
      symbol.description = symbol.description ? symbol.description : symbol.proName;
      this.$emit('addSOSymbol', symbol);
    },

    changeLocale: function(locale) {
      this.$emit('changeSOLocale', locale);
    },

    changeGridLineColor: function(color) {
      this.$emit('changeSOGridLineColor', color);
    },

    changeTrendLineColor: function(color) {
      this.$emit('changeSOTrendLineColor', color);
    },

    changeUnderLineColor: function(color) {
      this.$emit('changeSOUnderLineColor', color);
    },

    changeFontColor: function(color) {
      this.$emit('changeSOFontColor', color);
    },

    changeSize: function() {
      this.$emit('changeSOSize', {
        autosize: this.autosize,
        width: this.width,
        height: this.height
      });
    },

    setChartOnly: function(chartonly) {
      this.$emit('setSOChartOnly', chartonly);
    }
  }
})
