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

Vue.component('input-symbol-search', {
  template: Joomla.getOptions('jafinance').tmpl.InputSymbolSearch,

  props: {
    value: String,
    required: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      links: [],
      symbol: this.value,
      xhr: {}
    };
  },

  methods: {
    querySearch: function(queryString, cb) {
      var text = queryString.toUpperCase();
      var jafinance = Joomla.getOptions('jafinance');
      var uri = Joomla.getOptions('system.paths');
      var self = this;

      var url = uri.root + '/index.php?option=com_ajax&module=jafinance&format=json&token='+jafinance.token+'&symbol='+text;
      self.xhr.abort && self.xhr.abort();
      self.xhr = jQuery.get(url);
      self.xhr.done(function(response) {
        if (Array.isArray(response.data) && response.data.length) {
          var items = [];

          response.data.forEach(function(item) {
            if (item.contracts) {
              item.contracts.forEach(function(contract) {
                var value = self.stripTag(item.exchange) + ':' + self.stripTag(contract.symbol);
                items.push({
                  value: value,
                  description: contract.description
                });
              });
            } else {
              var prefix = item.prefix ? item.prefix : self.stripTag(item.exchange);
              var value = prefix + ':' + self.stripTag(item.symbol);
              items.push({
                value: value,
                description: item.description
              });
            }
          });

          cb(items);
        } else if (response.data === 'token error') {
          cb([{ 
            value: '',
            description: Joomla.JText._('JAFINANCE_SEARCH_TOKEN_ERROR')
          }]);
        } else {
          cb([{ 
            value: '',
            description: Joomla.JText._('JAFINANCE_SYMBOL_NOT_FOUND')
          }]);
        }
      })
    },

    stripTag: function(html) {
      return html.replace(/(<([^>]+)>)/ig,"");
    },

    handleSelect: function(item) {
      this.$emit('changeSymbol', item.value);
    },

    inputSymbol: function(value) {
      this.symbol = value.toUpperCase();
      this.$emit('changeSymbol', this.symbol);
    },
  },
})