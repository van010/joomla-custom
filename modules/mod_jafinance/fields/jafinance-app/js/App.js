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

jQuery(document).ready(function($) {
  ELEMENT.locale({
    el: {
      colorpicker: {
        confirm: Joomla.JText._('JAFINANCE_OK'),
        clear: Joomla.JText._('JAFINANCE_CLEAR')
      }
    }
  });

  var jafinance = Joomla.getOptions('jafinance');

  new Vue({
    el: '#ja-finance',

    template: jafinance.tmpl.App,

    data: function() {
      try {
        var rawData = JSON.parse(jafinance.value);
      } catch(error) {
        var rawData = {};
      }
      
      var data = {};
      var value = '';
      var widget = rawData.widget || 'ticker';
        
      data = this.validateData(widget, rawData);
      value = JSON.stringify(data);

      return {
        types: [
          {
            label: 'Ticker',
            value: 'ticker'
          },
          {
            label: 'Ticker Tape',
            value: 'ticker-tape'
          },
          {
            label: 'Market Overview',
            value: 'market-overview'
          },
          {
            label: 'Single Ticker',
            value: 'single-ticker'
          },
          {
            label: 'Mini Chart',
            value: 'mini-chart'
          },
          {
            label: 'Symbol Overview',
            value: 'symbol-overview'
          },
          {
            label: 'Cryptocurrency Market',
            value: 'cryptocurrency-market'
          }
        ],
        value: value,
        widget: widget,
        viewdata: data,
        preview: (new Date).toJSON(),
      }
    },

    methods: {
      openPreview: function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            alert(Joomla.JText._('JAFINANCE_PREVIEW_NOT_SUPPORT_IE'));
            return;
        }

        this.$confirm('<div class="ja-preview-content"></div>', Joomla.JText._('JAFINANCE_PREVIEW'), {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          showCancelButton: false,
          center: true,
        }).catch(function() {
          $('.el-message-box__wrapper').remove();
        });

        this.preview = (new Date).toJSON();
      },

      changeWidget: function() {
        this.viewdata = this.validateData(this.widget, this.viewdata);
        this.value = JSON.stringify(this.viewdata);
      },

      validateData: function(widget, data) {
        switch (widget) {
          case 'ticker':
            return this.validateTickerData(data);

          case 'ticker-tape':
            return this.validateTickerTapeData(data);

          case 'market-overview':
            return this.validateMarketOverviewData(data);

          case 'single-ticker':
            return this.validateSingleTickerData(data);

          case 'mini-chart':
            return this.validateMiniChartData(data);

          case 'symbol-overview':
            return this.validateSymbolOverviewData(data);

          case 'cryptocurrency-market':
            return this.validateCryptocurrencyMarketData(data);

          default:
            return {};
        }
      },

      // cryptocurrency market methods
      validateCryptocurrencyMarketData: function(rawData) {
        rawData = rawData || {};
        var defaultData = {width:1000,height:490,defaultColumn:"overview",screener_type:"crypto_mkt",displayCurrency:"USD",locale:"en",transparency:false};
        var data = jQuery.extend({}, defaultData, rawData);
        data.widget = 'cryptocurrency-market';

        return data;
      },

      changeCMDisplayCurrency: function(currency) {
        this.viewdata.displayCurrency = currency;
        this.value = JSON.stringify(this.viewdata);
      },

      changeCMDefaultColumn: function(column) {
        this.viewdata.defaultColumn = column;
        this.value = JSON.stringify(this.viewdata);
      },

      changeCMLocale: function(locale) {
        this.viewdata.locale = locale;
        this.value = JSON.stringify(this.viewdata);
      },

      changeCMSize: function(data) {
        var autosize = data.autosize;
        var width = data.width;
        var height = data.height;
        
        this.viewdata.height = autosize ? '100%' : height;
        this.viewdata.width = autosize ? '100%' : width;
        this.value = JSON.stringify(this.viewdata);
      },

      changeCMTransparent: function(value) {
        this.viewdata.transparency = value;
        this.value = JSON.stringify(this.viewdata);
      },

      // symbol overview methods
      validateSymbolOverviewData: function(rawData) {
        rawData = rawData || {};
        var defaultData = {container_id:"ja-preview-inner",chartOnly: false,symbols:[["Apple","AAPL "],["Google","GOOGL"],["Microsoft","MSFT"]],greyText:"Quotes by",gridLineColor:"#e9e9ea",fontColor:"#83888D",underLineColor:"#dbeffb",trendLineColor:"#4bafe9",width:"1000",height:"400",locale:"en"};
        var data = jQuery.extend({}, defaultData, rawData);
        data.widget = 'symbol-overview';

        if (!Array.isArray(data.symbols)) {
          data.symbols = defaultData.symbols;
        }

        var isListArray = data.symbols.every(function(s) {
          return Array.isArray(s);
        });

        if (!isListArray) {
          data.symbols = defaultData.symbols;
        }

        return data;
      },

      removeSOSymbol: function(idx) {
        this.viewdata.symbols.splice(idx, 1);
        this.value = JSON.stringify(this.viewdata);
      },

      addSOSymbol: function(symbol) {
        this.viewdata.symbols.push([symbol.description, symbol.proName]);
        this.value = JSON.stringify(this.viewdata);
      },

      changeSOLocale: function(locale) {
        this.viewdata.locale = locale;
        this.value = JSON.stringify(this.viewdata);
      },

      changeSOGridLineColor: function(color) {
        this.viewdata.gridLineColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeSOTrendLineColor: function(color) {
        this.viewdata.trendLineColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeSOUnderLineColor: function(color) {
        this.viewdata.underLineColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeSOFontColor: function(color) {
        this.viewdata.fontColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeSOSize: function(data) {
        var autosize = data.autosize;
        var width = data.width;
        var height = data.height;
        
        this.viewdata.height = autosize ? '100%' : height;
        this.viewdata.width = autosize ? '100%' : width;
        this.value = JSON.stringify(this.viewdata);
      },

      setSOChartOnly: function(chartonly) {
        this.viewdata.chartOnly = chartonly;
        this.value = JSON.stringify(this.viewdata);
      },

      // mini chart methods
      validateMiniChartData: function(rawData) {
        rawData = rawData || {};
        var defaultData = {symbol:"FX:EURUSD",width:350,height:220,locale:"en",dateRange:"1y",colorTheme:"light",trendLineColor:"#37a6ef",underLineColor:"#e3f2fd",isTransparent:!1,autosize:!1,largeChartUrl:""};
        
        var data = jQuery.extend({}, defaultData, rawData);
        data.widget = 'mini-chart';

        return data;
      },

      changeMiniChartSymbol: function(symbol) {
        this.viewdata.symbol = symbol;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMiniChartDateRange: function(range) {
        this.viewdata.dateRange = range;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMiniChartTheme: function(theme) {
        this.viewdata.colorTheme = theme;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMiniChartTransparent: function(isTransparent) {
        this.viewdata.isTransparent = isTransparent;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMiniChartLineColor: function(color) {
        this.viewdata.trendLineColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMiniChartUnderLineColor: function(color) {
        this.viewdata.underLineColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMiniChartSize: function(data) {
        var autosize = data.autosize;
        var width = data.width;
        var height = data.height;
        
        this.viewdata.height = autosize ? '100%' : height;
        this.viewdata.width = autosize ? '100%' : width;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMiniChartLocale: function(locale) {
        this.viewdata.locale = locale;
        this.value = JSON.stringify(this.viewdata);
      },

      // single ticker methods
      validateSingleTickerData: function(rawData) {
        rawData = rawData || {};
        var defaultData = {symbol:"FX:EURUSD",width:350,locale:"en"};
        var data = jQuery.extend({}, defaultData, rawData);
        data.widget = 'single-ticker';

        return data;
      },

      changeSingleTickerSize: function(width) {
        this.viewdata.width = width;
        this.value = JSON.stringify(this.viewdata);
      },

      changeSingleTickerSymbol: function(symbol) {
        this.viewdata.symbol = symbol;
        this.value = JSON.stringify(this.viewdata);
      },

      changeSingleTickerLocale: function(locale) {
        this.viewdata.locale = locale;
        this.value = JSON.stringify(this.viewdata);
      },

      // market overview methods
      validateMarketOverviewData: function(rawData) {
        rawData = rawData || {};
        var defaultData = {showChart:!0,locale:"en",largeChartUrl:"",width:"400",height:"660",plotLineColorGrowing:"rgba(33, 150, 243, 1)",plotLineColorFalling:"rgba(33, 150, 243, 1)",gridLineColor:"rgba(233, 233, 234, 1)",scaleFontColor:"rgba(131, 136, 141, 1)",belowLineFillColorGrowing:"rgba(5, 122, 205, 0.12)",belowLineFillColorFalling:"rgba(5, 122, 205, 0.12)",symbolActiveColor:"rgba(225, 239, 249, 1)",tabs:[{title:"Indices",symbols:[{s:"INDEX:SPX",d:"S&P 500"},{s:"INDEX:XLY0",d:"Shanghai Composite"},{s:"INDEX:DOWI",d:"Dow 30"},{s:"INDEX:NKY",d:"Nikkei 225"},{s:"INDEX:DAX",d:"DAX Index"}],originalTitle:"Indices"},{title:"Commodities",symbols:[{s:"CME_MINI:ES1!",d:"E-Mini S&P"},{s:"CME:E61!",d:"Euro"},{s:"COMEX:GC1!",d:"Gold"},{s:"NYMEX:CL1!",d:"Crude Oil"},{s:"NYMEX:NG1!",d:"Natural Gas"},{s:"CBOT:ZC1!",d:"Corn"}],originalTitle:"Commodities"},{title:"Bonds",symbols:[{s:"CME:GE1!",d:"Eurodollar"},{s:"CBOT:ZB1!",d:"T-Bond"},{s:"CBOT:UD1!",d:"Ultra T-Bond"},{s:"EUREX:GG1!",d:"Euro Bund"},{s:"EUREX:II1!",d:"Euro BTP"},{s:"EUREX:HR1!",d:"Euro BOBL"}],originalTitle:"Bonds"},{title:"Forex",symbols:[{s:"FX:EURUSD"},{s:"FX:GBPUSD"},{s:"FX:USDJPY"},{s:"FX:USDCHF"},{s:"FX:AUDUSD"},{s:"FX:USDCAD"}],originalTitle:"Forex"}]};
        var data = jQuery.extend({}, defaultData, rawData);

        data.widget = 'market-overview';
        if (!Array.isArray(data.tabs)) {
          data.tabs = defaultData.tabs;
        }

        return data;
      },

      changeMOLocale: function(locale) {
        this.viewdata.locale = locale;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOTabTitle: function(newtitle, currenttitle) {
        var tabs = this.viewdata.tabs;
        var tab = tabs.find(function(t) {
          return t.title === currenttitle;
        });

        if (tab) {
          tab.title = newtitle;
          tab.originalTitle = newtitle;
        }

        this.value = JSON.stringify(this.viewdata);
      },

      addMOTab: function(tabtitle) {
        var tab = {
          title: tabtitle,
          originalTitle: tabtitle,
          symbols: []
        };

        this.viewdata.tabs.push(tab);
        this.value = JSON.stringify(this.viewdata);
      },

      removeMOTab: function(tabtitle) {
        var tabs = this.viewdata.tabs;
        var tab = tabs.findIndex(function(t) {
          return t.title === tabtitle;
        });

        if (tab > -1) {
          tabs.splice(tab, 1);
        }

        this.value = JSON.stringify(this.viewdata);
      },

      addMOSymbol: function(payload) {
        var tab = payload.tab;
        var symbol = payload.symbol;
        var activeTab = this.viewdata.tabs.find(function(tab) {
          return tab.title === payload.tab
        });

        if (!activeTab) {
          return;
        }

        activeTab.symbols.push({
          s: symbol.proName,
          d: symbol.description
        });

        this.value = JSON.stringify(this.viewdata);
      },

      removeMOSymbol: function(payload) {
        var tab = payload.tab;
        var symbol = payload.symbol;
        var activeTab = this.viewdata.tabs.find(function(tab) {
          return tab.title === payload.tab
        });

        if (!activeTab) {
          return;
        }

        activeTab.symbols.splice(symbol, 1);
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOGridLineColor: function(color) {
        this.viewdata.gridLineColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOLineColorGrowing: function(color) {
        this.viewdata.plotLineColorGrowing = color;
        this.value = JSON.stringify(this.viewdata);
      },
      
      changeMOLineColorFalling: function(color) {
        this.viewdata.plotLineColorFalling = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOLineFillColorGrowing: function(color) {
        this.viewdata.belowLineFillColorGrowing = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOLineFillColorFalling: function(color) {
        this.viewdata.belowLineFillColorFalling = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOScaleFontColor: function(color) {
        this.viewdata.scaleFontColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOSymbolActiveColor: function(color) {
        this.viewdata.symbolActiveColor = color;
        this.value = JSON.stringify(this.viewdata);
      },

      changeMOSize: function(data) {
        var autosize = data.autosize;
        var width = data.width;
        var height = data.height;
        
        this.viewdata.height = autosize ? '100%' : height;
        this.viewdata.width = autosize ? '100%' : width;
        this.value = JSON.stringify(this.viewdata);
      },

      showMOChart: function(value) {
        this.viewdata.showChart = value;
        this.value = JSON.stringify(this.viewdata);
      },

      // ticker tape methods
      validateTickerTapeData: function(rawData) {
        rawData = rawData || {};
        var defaultData = {symbols:[{description:"S&P 500",proName:"INDEX:SPX"},{description:"Shanghai Composite",proName:"INDEX:XLY0"},{description:"EUR/USD",proName:"FX_IDC:EURUSD"},{description:"BTC/USD",proName:"BITFINEX:BTCUSD"},{description:"ETH/USD",proName:"BITFINEX:ETHUSD"}],theme:"light",isTransparent:!1,displayMode:"adaptive",locale:"en"};
        var data = jQuery.extend({}, defaultData, rawData);

        data.widget = 'ticker-tape';
        if (!Array.isArray(data.symbols)) {
          data.symbols = defaultData.symbols;
        }

        var isListObject = data.symbols.every(function(s) {
          return jQuery.type(s) === 'object';
        });

        if (!isListObject) {
          data.symbols = defaultData.symbols;
        }

        return data;
      },

      changeTickerTapeTheme: function(theme) {
        this.viewdata.theme = theme;
        this.value = JSON.stringify(this.viewdata);
      },

      changeTickerTapeMode: function(mode) {
        this.viewdata.displayMode = mode;
        this.value = JSON.stringify(this.viewdata);
      },

      changeTickerTapeTrans: function(isTrans) {
        this.viewdata.isTransparent = isTrans;
        this.value = JSON.stringify(this.viewdata);
      },

      // ticker methods
      validateTickerData: function(rawData) {
        rawData = rawData || {};
        var data = {};
        var defaultData = {symbols:[{description:"S&P 500",proName:"INDEX:SPX"},{description:"Shanghai Composite",proName:"INDEX:XLY0"},{description:"EUR/USD",proName:"FX_IDC:EURUSD"},{description:"BTC/USD",proName:"BITFINEX:BTCUSD"},{description:"ETH/USD",proName:"BITFINEX:ETHUSD"}],theme:"light",isTransparent:!1,displayMode:"adaptive",locale:"en"};
        var data = jQuery.extend({}, defaultData, rawData);
        
        data.widget = 'ticker';
        if (!Array.isArray(data.symbols)) {
          data.symbols = defaultData.symbols;
        }

        var isListObject = data.symbols.every(function(s) {
          return jQuery.type(s) === 'object';
        });

        if (!isListObject) {
          data.symbols = defaultData.symbols;
        }

        return data;
      },

      removeTickerSymbol: function(index) {
        this.viewdata.symbols.splice(index, 1);
        this.value = JSON.stringify(this.viewdata);
      },

      addTickerSymbol: function(symbol) {
        this.viewdata.symbols.push(symbol);
        this.value = JSON.stringify(this.viewdata);
      },

      changeTickerLocale: function(locale) {
        this.viewdata.locale = locale;
        this.value = JSON.stringify(this.viewdata);
      }
    }
  });
});
