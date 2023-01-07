<?php
/**
 * ------------------------------------------------------------------------
 * JA Disqus Debate Echo plugin
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2018 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites: http://www.joomlart.com - http://www.joomlancers.com
 * ------------------------------------------------------------------------
 */
// no direct access
defined('_JEXEC') or die('Restricted access');

//Disqus config
$subdomain      	= $this->plgParams->get('provider-disqus-subdomain');
$devmode        	= $this->plgParams->get('provider-disqus-devmode',0);
$disqus_language	= $this->plgParams->get('pvovider-disqus-language','');
$lang = JFactory::getApplication()->getLanguage()->getTag();
$lang = substr($lang, 0, 2);

if (empty($disqus_language)) {
	$disqus_language = $lang;
}
?>

<?php if($devmode): ?>
var disqus_developer = 1;
<?php endif; ?>
var disqus_shortname = '<?php echo $subdomain; ?>';
var disqus_config = function(){
	this.language = '<?php echo trim($disqus_language) ?>';
};
window.addEventListener('load', function(){
	(function () {
	  var s = document.createElement('script'); s.async = true;
	  s.src = '//<?php echo $subdomain; ?>.disqus.com/count.js';
	  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
	}());
});
