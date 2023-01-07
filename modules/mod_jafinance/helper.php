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

class ModJaFinanceHelper {

  public static function getWidgetPath($module, $layout = 'ticker')
  {
    $template = \JFactory::getApplication()->getTemplate();
    $defaultLayout = $layout;

    if (strpos($layout, ':') !== false)
    {
      // Get the template and file name from the string
      $temp = explode(':', $layout);
      $template = $temp[0] === '_' ? $template : $temp[0];
      $layout = $temp[1];
      $defaultLayout = $temp[1] ?: 'default';
    }

    // Build the template and base path for the layout
    $tPath = JPATH_THEMES . '/' . $template . '/html/' . $module . '/widgets/' . $layout . '.php';
    $bPath = JPATH_BASE . '/modules/' . $module . '/tmpl/widgets/' . $defaultLayout . '.php';
    $dPath = JPATH_BASE . '/modules/' . $module . '/tmpl/widgets/ticker.php';

    // If the template has a layout override use it
    if (file_exists($tPath))
    {
      return $tPath;  
    }

    if (file_exists($bPath))
    {
      return $bPath;
    }

    return $dPath;
  }

  public static function getAjax() {
    $app = JFactory::getApplication();
    $input = $app->input;
    $token = $input->get('token');

    $config = JFactory::getConfig();
    $secret = $config->get('secret');
    $systemToken = md5(md5(md5(md5(md5(md5(md5(md5(md5(md5($secret . date('Y-m-d 00:00:00')))))))))));

    if ($token !== $systemToken) {
      return 'token error';
    }

    $symbol = $input->getString('symbol');

    if (strpos($symbol, ':') !== false) {
      list($exchange, $text) = explode(':', $symbol);
    } else {
      $exchange = '';
      $text = $symbol;
    }

    $text = urlencode(strtoupper($text));
    $exchange = strtoupper($exchange);
    $uri = "https://symbol-search.tradingview.com/symbol_search/?text=$text&exchange=$exchange&type=&hl=true&lang=en&domain=production";

    $headers = new stdClass;
    $headers->Origin = 'https://www.tradingview.com';

    $options = new JRegistry;
    $options->set('headers', $headers);
    $options->set('userAgent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');
    
    $http = JHttpFactory::getHttp($options);
    $response = $http->get($uri);

    return @json_decode($response->body);
  }
}