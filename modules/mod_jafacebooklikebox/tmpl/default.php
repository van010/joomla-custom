<?php
/**
 * ------------------------------------------------------------------------
 * JA Facebook Like Box Module for Joonla 25 & 34
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2011 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites: http://www.joomlart.com - http://www.joomlancers.com
 * ------------------------------------------------------------------------
 */

// no direct access
defined('_JEXEC') or die('Restricted accessed');
?>
<div id="fb-root"></div>
<script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en/sdk.js#xfbml=1&version=v9.0&autoLogAppEvents=1&appId';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div id="ja-fblikebox-<?php echo $module->id ?>" class="<?php echo $moduleclass_sfx ?>">
    <div class="fb-page" 
        data-href="https://www.facebook.com/<?php echo $aParams['id'];?>" 
        data-tabs="<?php echo $aParams['tabs'];?>" 
        data-width="<?php  echo $aParams['width'];?>" 
        data-height="<?php  echo $aParams['height'];?>" 
        data-small-header="true" 
        data-adapt-container-width="<?php echo $aParams['adapt_container_width'];?>" 
        data-hide-cover="<?php echo $aParams['hide_cover'];?>" 
        data-show-facepile="<?php echo $aParams['show_facepile'];?>">
    </div>
</div>