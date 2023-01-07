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

require_once __DIR__ . '/helper.php';
$doc = JFactory::getDocument();
$doc->addStyleSheet(JUri::root(true) . '/modules/mod_jafinance/assets/style.css');

require JModuleHelper::getLayoutPath('mod_jafinance', $params->get('layout', 'default'));