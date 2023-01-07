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

Vue.component("ja-market-overview", {
  template: Joomla.getOptions("jafinance").tmpl.MarketOverview,
  props: {
    viewdata: {
      type: Object,
      default: function() {
        return {
          showChart: !0,
          locale: "en",
          largeChartUrl: "",
          width: "400",
          height: "660",
          plotLineColorGrowing: "rgba(33, 150, 243, 1)",
          plotLineColorFalling: "rgba(33, 150, 243, 1)",
          gridLineColor: "rgba(233, 233, 234, 1)",
          scaleFontColor: "rgba(131, 136, 141, 1)",
          belowLineFillColorGrowing: "rgba(5, 122, 205, 0.12)",
          belowLineFillColorFalling: "rgba(5, 122, 205, 0.12)",
          symbolActiveColor: "rgba(225, 239, 249, 1)",
          tabs: []
        };
      }
    },
    preview: String,
  },
  data: function() {
    var width = this.viewdata.width;
    var height = this.viewdata.height;
    var autosize = width === '100%' && height === '100%';
    
    return {
      cache: 0,
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
      autosize: autosize,
      width: width,
      height: height,
    };
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
      var scriptEl = document.createElement("script");
      scriptEl.setAttribute(
        "src",
        "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
      );
      scriptEl.innerHTML = this.jsonData;
      var $preview = document.querySelector(".ja-preview-content");
      $preview.innerHTML = "";
      setTimeout(function () {
        $preview.appendChild(scriptEl);
      }, 300)
    },

    addTab: function(title) {
      this.$emit('addMOTab', title);
    },

    removeTab: function(tabtitle) {
      this.$emit('removeMOTab', tabtitle);
    },

    changeTabTitle: function(newTitle, currentTitle) {
      this.$emit('changeMOTabTitle', newTitle, currentTitle);
    },

    addSymbol: function(payload) {
      this.$emit('addMOSymbol', payload);
    },

    removeSymbol: function(payload) {
      this.$emit('removeMOSymbol', payload);
    },

    changeLocale: function(locale) {
      this.$emit('changeMOLocale', locale);
    },

    changeGridLineColor: function(color) {
      this.$emit('changeMOGridLineColor', color);
    },

    changePlotLineColorGrowing: function(color) {
      this.$emit('changeMOLineColorGrowing', color);
    },

    changePlotLineColorFalling: function(color) {
      this.$emit('changeMOLineColorFalling', color);
    },

    changeBelowLineFillColorGrowing: function(color) {
      this.$emit('changeMOLineFillColorGrowing', color);
    },

    changeBelowLineFillColorFalling: function(color) {
      this.$emit('changeMOLineFillColorFalling', color);
    },

    changeScaleFontColor: function(color) {
      this.$emit('changeMOScaleFontColor', color);
    },

    changeSymbolActiveColor: function(color) {
      this.$emit('changeMOSymbolActiveColor', color);
    },

    changeSize: function() {
      this.$emit('changeMOSize', {
        autosize: this.autosize,
        width: this.width,
        height: this.height
      });
    },

    showChart: function(value) {
      this.$emit('showMOChart', value);
    }
  }
});
