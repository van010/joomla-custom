/**
* ------------------------------------------------------------------------
* Copyright (C) 2004-2017 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
* @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
* Author: J.O.O.M Solutions Co., Ltd
* Websites: http://www.joomlart.com - http://www.joomlancers.com
* This file may not be redistributed in whole or significant part.
* ------------------------------------------------------------------------
* fix media field joomla 4 bug do not show image.
* fix media field with joomlart image field with clone effect.
* Version 0.0.1
*/

jQuery(window).on('load', function(){
	bindMediafield(jQuery('joomla-field-media'));
});

function bindMediafield($ele) {
	// get base path
	let getUrl = window.location;
	let baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
	let modal = $ele;
	if (modal != null && modal.length) {
		$.each(modal, function() {
			let $self = jQuery(this).find('.joomla-modal');
			let $id = jQuery(this).find('input[type="text"]').attr('id');
			$self.attr('id', $id);
			// remove all the event attach to modal
			$self.off('show.bs.modal').off('shown.bs.modal').off('hide.bs.modal');
			let $clone = $self.clone(false, false);
			$self.remove();
			jQuery(this).prepend($clone);
			
			// media refresh on first load. will be change in the future.
			let img = jQuery(this).find('img');
			let src = img.attr('src');
			if (src != undefined) {
				src = src.replace(baseUrl, '/');
				if (src.search(/\.\.\//g) === -1) {
					let now = new Date();
					img.removeAttr('src').attr('src', baseUrl+src+'?v='+now.getTime());
				}				
			}

			$clone.on('show.bs.modal', function() {
				if ($clone.data('url')) {
					let modalBody = $clone.find('.modal-body');
					modalBody.find('iframe').remove();
					modalBody.prepend($clone.data('iframe'));
				}
			}).on('shown.bs.modal', function() {
				let modalHeight = jQuery('div.modal:visible').outerHeight(true),
					modalHeaderHeight = jQuery('div.modal-header:visible').outerHeight(true),
					modalBodyHeightOuter = jQuery('div.modal-body:visible').outerHeight(true),
					modalBodyHeight = jQuery('div.modal-body:visible').height(),
					modalFooterHeight = jQuery('div.modal-footer:visible').outerHeight(true),
					padding = $clone.offsetTop,
					maxModalHeight = (jQuery(window).height()-(padding*2)),
					modalBodyPadding = (modalBodyHeightOuter-modalBodyHeight),
					maxModalBodyHeight = maxModalHeight-(modalHeaderHeight+modalFooterHeight+modalBodyPadding);
				if ($clone.data('url')) {
					let iframeHeight = jQuery('.iframe').height();
					if (iframeHeight > maxModalBodyHeight){
						jQuery('.modal-body').css({'max-height': maxModalBodyHeight, 'overflow-y': 'auto'});
						jQuery('.iframe').css('max-height', maxModalBodyHeight-modalBodyPadding);
					}
				}
			}).on('hide.bs.modal', function () {
				jQuery('.modal-body').css({'max-height': 'initial', 'overflow-y': 'initial'});
				jQuery('.modalTooltip').tooltip('dispose');
			}).on('hidden.bs.modal', function () {
				// media refresh after close modal. will be change in the future.
				if ($ele.hasClass('field-media-wrapper')) { // only using change image when image type.
// 					setTimeout(function(){
						$clone.parents('joomla-field-media').find('img').attr('src', baseUrl+$clone.parents('joomla-field-media').find('img').attr('src') );
// 					}, 1000);
				}
			});
		});
	}
}