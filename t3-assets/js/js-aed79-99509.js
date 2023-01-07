

/*===============================
/dev/j4-templates/j4-teline-v/templates/ja_teline_v/acm/notification/js/script.js
================================================================================*/;
jQuery(document).ready(function($){$('.whatsnew-alert').on('click',function(){var $this=$(this),url=$this.data('url');if(!$this.data('getdata')){$this.data('getdata',true);var $i=$this.find('i'),iclass=$i.prop('className');$i.prop('className','fa fa-spinner fa-spin');$this.addClass('loading');var $whatnews=$('<div class="whatsnew-wrap"></div>').insertAfter($('#t3-header'));$.ajax(url).done(function(data){$whatnews.hide().html(data).slideDown('medium');$i.prop('className',iclass);$this.removeClass('loading');});return false;}
$('.whatsnew-wrap').slideToggle('medium');});})


/*===============================
/dev/j4-templates/j4-teline-v/templates/ja_teline_v/acm/topic/js/script.js
================================================================================*/;
