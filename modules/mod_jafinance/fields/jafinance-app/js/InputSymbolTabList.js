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

Vue.component('input-symbol-tab-list', {
  template: Joomla.getOptions('jafinance').tmpl.InputSymbolTabList,

  props: {
    tabs: Array
  },

  data: function() {
    if (this.tabs.length) {
      var activetab = this.tabs[0].title;
    } else {
      var activetab = '';
    }

    return {
      activetab: activetab,
      cache: 0,
    }
  },

  methods: {
    addTab: function() {
      var title = prompt('New tab title', '');
      title = title ? title.trim() : '';

      if (title) {
        var tabs = this.tabs;
        var existed = tabs.find(function(tab) {
          return tab.title === title;
        });

        if (existed) {
          this.$notify({
            title: 'Error',
            type: 'error',
            message: Joomla.JText._('JAFINANCE_TAB_TITLE_EXISTED')
          });
        } else {
          this.$emit('addTab', title);
        }
      } else {
        this.$notify({
          title: 'Error',
          type: 'error',
          message: Joomla.JText._('JAFINANCE_TAB_TITLE_EMPTY')
        });
      }
    },

    removeTab: function(tabtitle) {
      if (this.tabs.length === 1) {
        alert(Joomla.JText._('JAFINANCE_NOT_REMOVE_LAST_TAB'));
        return;
      }

      if (confirm(Joomla.JText._('JAFINANCE_REMOVE_TAB_CONFIRM'))) {
        this.$emit('removeTab', tabtitle);

        if (tabtitle === this.activetab) {
          this.activetab = this.tabs[0].title;
        }
      }
    },

    changeTabTitle: function() {
      this.cache = this.cache + 1;

      if (this.cache === 2) {
        var title = prompt(Joomla.JText._('JAFINANCE_CHANGE_TAB_TITLE'), '');
        title = title ? title.trim() : '';
        if (title) {
          var tabs = this.tabs;
          var existed = tabs.find(function(tab) {
            return tab.title === title;
          });

          if (existed) {
            this.$notify({
              title: 'Error',
              type: 'error',
              message: Joomla.JText._('JAFINANCE_TAB_TITLE_EXISTED')
            });
          } else {
            this.$emit('changeTabTitle', title, this.activetab);
            this.activetab = title;
          }
        } else {
          this.$notify({
            title: 'Error',
            type: 'error',
            message: Joomla.JText._('JAFINANCE_TAB_TITLE_EMPTY')
          });
        }
      }

      var self = this;
      setTimeout(function() {
        self.cache = 0;
      }, 300);
    },

    addSymbol: function(symbol) {
      this.$emit('addSymbol', {symbol: symbol, tab: this.activetab});
    },

    removeSymbol: function(symbol) {
      this.$emit('removeSymbol', {symbol: symbol, tab: this.activetab});
    },
  }
})