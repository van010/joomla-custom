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



Vue.component('input-locale', {
  template: Joomla.getOptions('jafinance').tmpl.InputLocale,

  props: {
    locale: String,
  },

  data: function() {
    return {
      value: this.locale,
      options: [
        {
          label: 'English',
          value: 'en',
        },
        {
          label: 'English (UK)',
          value: 'uk',
        },
        {
          label: 'English (IN)',
          value: 'in',
        },
        {
          label: 'Deutsch',
          value: 'de_DE',
        },
        {
          label: 'Français',
          value: 'fr',
        },
        {
          label: 'Español',
          value: 'es',
        },
        {
          label: 'Italiano',
          value: 'it',
        },
        {
          label: 'Polski',
          value: 'pl',
        },
        {
          label: 'Svenska',
          value: 'sv_SE',
        },
        {
          label: 'Türkçe',
          value: 'tr',
        },
        {
          label: 'Русский',
          value: 'ru',
        },
        {
          label: 'Português',
          value: 'br',
        },
        {
          label: 'Bahasa Indonesia',
          value: 'id',
        },
        {
          label: 'Bahasa Melayu',
          value: 'ms_MY',
        },
        {
          label: 'ภาษาไทย',
          value: 'th_TH',
        },
        {
          label: 'Tiếng Việt',
          value: 'vi_VN',
        },
        {
          label: '日本語',
          value: 'ja',
        },
        {
          label: '한국어',
          value: 'kr',
        },
        {
          label: '简体中文',
          value: 'zh_CN',
        },
        {
          label: '繁體中文',
          value: 'zh_TW',
        },
        {
          label: 'العربية',
          value: 'ar_AE',
        },
        {
          label: 'עברית',
          value: 'he_IL',
        },
      ]
    }
  },

  methods: {
    onChange: function() {
      this.$emit('changeLocale', this.value);
    }
  }
})