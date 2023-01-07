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

Vue.component('input-symbol-list', {
  template: Joomla.getOptions('jafinance').tmpl.InputSymbolList,

  props: {
    symbols: Array
  },

  data: function() {
    return {
      symbolName: '',
      symbolDesc: '',
      forceRerenderSymbolSearch: ''
    }
  },

  methods: {
    removeSymbol: function(symbol) {
      if (this.symbols.length > 1) {
        this.$emit('removeSymbol', symbol);
      } else {
        alert(Joomla.JText._('JAFINANCE_YOU_CAN_NOT_REMOVE_LAST_SYMBOL'));
      }
    },

    addSymbol: function(event) {
      if (this.symbolName) {
        this.$emit('addSymbol', {
          "description": this.symbolDesc ? this.symbolDesc.trim() : '',
          "proName": this.symbolName ? this.symbolName.trim() : ''
        });

        this.forceRerenderSymbolSearch = (new Date).toJSON();
        this.symbolName = '';
        this.symbolDesc = '';
      } else {
        alert(Joomla.JText._('JAFINANCE_SYMBOL_SHOULD_NOT_BE_EMPTY'));
      }

      setTimeout(function () {
        var $panel = jQuery(event.target).parents('.ja-input-symbol-list');
        var $input = $panel.find('.symbol-list-search .el-input__inner[aria-autocomplete]');
        $input.focus();
      })
      
    },

    changeSymbolName: function(value) {
      this.symbolName = value.toUpperCase();
    }
  },
})