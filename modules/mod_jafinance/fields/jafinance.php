<?php
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

defined('_JEXEC') or die;

class JFormFieldJaFinance extends JFormField {

	protected $type = "jafinance";

	function renderField($options = array()) {
		$this->loadAppAssets();
		$this->loadAppTemplates();
		$this->loadAppLanguage();

		$config = JFactory::getConfig();
		$secret = $config->get('secret');
		$token = md5(md5(md5(md5(md5(md5(md5(md5(md5(md5($secret . date('Y-m-d 00:00:00')))))))))));

		$doc = JFactory::getDocument();
		$doc->addScriptOptions('jafinance', array(
			'token' => $token,
			'value' => $this->value,
		));

		$html = '<div id="ja-finance"></div>';
		return $html;
	}

	function loadAppLanguage() {
		JText::script('JAFINANCE_OK');
		JText::script('JAFINANCE_CLEAR');
		JText::script('JAFINANCE_PREVIEW');
		JText::script('JAFINANCE_YOU_CAN_NOT_REMOVE_LAST_SYMBOL');
		JText::script('JAFINANCE_SYMBOL_SHOULD_NOT_BE_EMPTY');
		JText::script('JAFINANCE_NEW_TAB_TITLE');
		JText::script('JAFINANCE_TAB_TITLE_EXISTED');
		JText::script('JAFINANCE_TAB_TITLE_EMPTY');
		JText::script('JAFINANCE_NOT_REMOVE_LAST_TAB');
		JText::script('JAFINANCE_REMOVE_TAB_CONFIRM');
		JText::script('JAFINANCE_CHANGE_TAB_TITLE');
		JText::script('JAFINANCE_SYMBOL_NOT_FOUND');
		JText::script('JAFINANCE_PREVIEW_NOT_SUPPORT_IE');
		JText::script('JAFINANCE_SEARCH_TOKEN_ERROR');
	}

	function loadAppAssets() {
		JHtml::_('jquery.framework');
		$doc = JFactory::getDocument();
		$doc->addStyleSheet(JUri::root(true) . '/modules/mod_jafinance/fields/libs/element-ui.css');
		$doc->addStyleSheet(JUri::root(true) . '/modules/mod_jafinance/fields/css/style.css');

		$doc->addScript(JUri::root(true) . '/modules/mod_jafinance/fields/libs/polyfill.js');
		$doc->addScript(JUri::root(true) . '/modules/mod_jafinance/fields/libs/vue.js');
		$doc->addScript(JUri::root(true) . '/modules/mod_jafinance/fields/libs/element-ui.js');

		$path = JPATH_ROOT . '/modules/mod_jafinance/fields/jafinance-app/js/';
		$files = JFolder::files($path, '.js');
		foreach ($files as $file) {
			$doc->addScript(JUri::root(true) . '/modules/mod_jafinance/fields/jafinance-app/js/' . $file);
		}
	}

	function loadAppTemplates() {
		$doc = JFactory::getDocument();
		$templates = array();

		$path = JPATH_ROOT . '/modules/mod_jafinance/fields/jafinance-app/templates/';
		$files = JFolder::files($path, '.php');
		foreach ($files as $file) {
			ob_start();
			include $path . $file;
			$content = ob_get_clean();

			$info = pathinfo($file);
			$templates[$info['filename']] = trim($content);
		}

		$doc->addScriptOptions('jafinance', array('tmpl' => $templates));
	}
}