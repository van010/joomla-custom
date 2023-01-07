/**
 * $JA#COPYRIGHT$
 */


var JASliderCSS = function(elem, Options){
	var self = this;
	var $ = jQuery;
	this.Implements = Options;
	this.element = elem;
	var  options = {
		interval: 5000,
		duration: 2000,
		
		repeat: true,				//animation repeat or not
		autoplay: true,				//auto play
		
		navigation: false,			//show navigation controls or not
		thumbnail: false,			//show thumbnail or not
		
		urls: null,
		targets: null
	};
	this.options = Options ? Options : options;
	this.initialize = function () {
		var jslider = $(this.element);
		if(!jslider){
			return false;
		}
		
		// this.setOptions(options);
		var options = this.options,
			jmain = jslider.find('.ja-ss-items'),
			jitems = jslider.find('.ja-ss-item'),			
			vars = {
				jslider: jslider,
				jmain: jmain,
				jitems: jitems,
				
				total: jitems.length,
				curIdx: -1,
				nextIdx: -1,
				curImg: null,
				
				retain: 0,
				
				touch: 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion),
				
				running: 0,
				stop: 0,
				timer: 0,
				animFinished: this.animFinished.bind(this),
				vendor: (function () {
						var vendors = 't,webkitT,MozT,msT,OT'.split(','),
							dummyStyle = document.createElement('div').style,
							t, i = 0, l = vendors.length;

						for ( i; i < l; i++ ) {
							t = vendors[i] + 'ransform';
							if ( t in dummyStyle ) {
								return vendors[i].substr(0, vendors[i].length - 1).toLowerCase();
							}
						}

						return false;
					})()
			};
		if(!jitems) return;
		// if(vars.vendor !== false && !Browser.ie9){
		// 	vars.vendor = vars.vendor ? '-' + vars.vendor.toLowerCase() + '-' : '';
		// } else {
		// 	vars.vendor = false;
		// }

		// add a ghost item to solve the container width/height problem
		// $(jitems.get(0)).clone().css ({'position':'relative', 'visibility':'hidden', 'z-index': 1}).addClass('ja-ss-item-ghost');
		jmain.prepend($(jitems.get(0)).clone().css ({'position':'relative', 'visibility':'hidden', 'z-index': 1}).addClass('ja-ss-item-ghost'));
		
		// store original class 
		jitems.each (function(idx, item){
			item._className = item.className;
		});
		this.vars = vars;
		
		this.initItemAction();
		this.initThumbAction();
		this.initControlAction();
		this.initKbNav();
		
		if(vars.touch){
			this.initTouchDevice();
		}

		vars.direct = 'next';
		jslider.css('visibility', 'visible');
		
		this.prepare(vars.curIdx +1);
		this.animFinished();
	},
	
	this.stop = function(){
		clearTimeout(this.vars.timer);
		this.vars.stop = 1;
	},
	
	this.prev = function(){
		var vars = this.vars;
		if(vars.running){
			return false;
		}
		this.prepare(vars.curIdx -1);
	},
	
	this.next = function(){
		var vars = this.vars;
		if(vars.running){
			return false;
		}
		this.prepare(vars.curIdx +1);
	},
	
	this.playback = function(){
		this.vars.direct = 'prev';
		this.vars.stop = 0;
		this.prev();
	},
	
	this.play = function(){
		this.vars.direct = 'next';
		this.vars.stop = 0;
		this.next();
	},
	
	this.start = function(){
		var vars = this.vars;
		
		clearTimeout(vars.timer);
		vars.timer = setTimeout(this[this.vars.direct].bind(this), this.options.interval)
	},

	this.img = function(src, callback){
		var image = new Image();
		['load', 'abort', 'error'].forEach(function(name){
			var type = 'on' + name;

			image[type] = function(){
				if (!image) return;
				
				image = image.onload = image.onabort = image.onerror = null;
				
				if(typeof callback == 'function'){
					callback();

				}
			};
		});

		image.src = src;
		if (image && image.complete){
			image.onload();
		}
	},
	
	this.load = function(idx){
		var vars = this.vars;
		$(vars.jitems[idx]).attr('loaded', 1);	//mark it as loaded

		vars.retain = Math.max(0, vars.retain - 1); //remove reference count to loading
	
		if(vars.nextIdx == idx){	//check, we are waiting for the image loaded
			this.run(idx);
		} else if(vars.nextIdx == -1){	//already passed, do not have to check
			if(vars.retain == 0){
				vars.jslider.removeClass('ja-ss-loading');
			}
		}
	},
	
	this.prepare = function(idx){
		var vars = this.vars,
			options = this.options;
			
		if(idx >= vars.total){		
			idx = 0;
		}
		
		if(idx < 0){
			idx = vars.total - 1;
		}
		
		var	curImg = vars.jitems[idx];
		if(curImg.getAttribute('tag') != 'img'){
			curImg = curImg.querySelector('img');
		}
		
		//there was no image, we will run it immediately
		if (!curImg){
			return this.run(idx);
		}
		
		//if there was some image, preload it
		vars.nextIdx = idx;
		
		if(curImg.complete){	//already loaded			
			return this.run(idx);
		} else{
			vars.running = true;
			vars.retain++;		//increase reference count
			vars.jslider.addClass('ja-ss-loading');
			
			this.img(curImg.src, this.load.bind(this, idx));
		}
	},
	
	this.run = function(idx){
		var vars = this.vars,
			options = this.options;
			
		vars.retain = 0; //reset reference count, no matter how many item loading - just for animation look better
		vars.jslider.removeClass('ja-ss-loading');
			
		if(vars.curIdx == idx){
			return false;
		}
		
		vars.running = true;

		if (vars.jthumbitems) {
			vars.jthumbitems.removeClass('active');
			$(vars.jthumbitems[idx]).addClass('active');

			if(vars.thumbscroll && vars.jthumbs){
				if (idx <= (vars.startidx + 1) || idx >= (vars.startidx + vars.visible - 1)) {
					vars.startidx = Math.max(0, Math.min(idx - vars.visible + 2, vars.total - vars.visible));

					if(vars.vendor !== false){
						vars.jthumbs.css(vars.vendor + 'transform',
							'translate' + vars.thumborient + '(' + (-Math.min(vars.startidx, vars.maxpercent) * 100) + '%)');
					} else {
						vars.thumbsFx.start(vars.thumborient, -Math.min(vars.startidx, vars.maxpercent) * 100);
					}	
				}
			}
		}
		
		this.slide(idx);
		
		vars.jslider.removeClass('ja-ss-progress');
	},
	
	this.slide = function(idx){
		var options = this.options,
				vars = this.vars;
		
		vars.jitems.each(function(index, item){
			var cls = (idx == index) ? 'curr' : 
					(index < idx && (index != 0 || idx != vars.jitems.length-1)) ? 'prev' :
					(index > idx && (idx != 0 || index != vars.jitems.length-1)) ? 'next' :
					(idx == 0) ? 'prev' : 'next';
			// check if element move out/in
			if ($(item).hasClass ('curr') || cls.match(/curr/)) cls = 'animate ' + cls;

			// remove old classes and add new classes
			item.className = item._className + ' ' + cls;
			if(idx == index){
				setTimeout(function(){
					$(item).addClass('active');	
				}, 1000);
			}
		});
        
        //Pause slide on hovering
        vars.jslider.on('mouseenter', function(){
            clearTimeout(vars.timer);
            vars.timer = setTimeout(vars.animFinished, options.duration);
            if(vars.stop == 0 && options.autoplay == '1'){
                vars.stop = 1;
            }
		});
        vars.jslider.on('mouseleave', function(){
            clearTimeout(vars.timer);
            vars.timer = setTimeout(vars.animFinished, options.duration);
            if(vars.stop == 1 && options.autoplay == '1'){
                vars.stop = 0;
            }
        });
		
		clearTimeout(vars.timer);
		vars.timer = setTimeout(vars.animFinished, this.options.duration);
		vars.curIdx = idx;
	},
	
	this.animFinished = function(){ 
		var options = this.options,
			vars = this.vars;
			
		vars.running = false;
		
		if (!vars.stop && (options.autoplay && (vars.curIdx < vars.total -1 || options.repeat))) {
			this.start();
			
			vars.jslider.addClass('ja-ss-progress');
		}
	},
	
	this.initThumbAction = function () {
		var options = this.options;

		if (options.thumbnail) {
			var vars = this.vars,
				jslider = vars.jslider,
				jthumbs = vars.jslider.find('.ja-ss-thumbs'),
				jthumbwrap = vars.jslider.find('.ja-ss-thumbs-wrap'),
				jthumbitems = vars.jslider.find('.ja-ss-thumb');
				
				if(jthumbitems.length){
					jthumbitems.removeClass('active');
					for (var i = 0, il = jthumbitems.length; i < il; i++) {
						jthumbitems[i].addEventListener('click', this.prepare.bind(this, i));
					}

					jthumbs.on('mousewheel', function (e) {
						var currPos = e.originalEvent.wheelDeltaY;
						if (currPos > 0) {
							this.next(true);
						}else if (currPos < 0){
							this.prev(true);
						}
					}.bind(this));
					
					var jthumbimg = jthumbitems[0].querySelector('img');
					var	thumbready = function () {
						//check if need for animation
						var coord1 = jthumbitems[0].getBoundingClientRect(),
							coord2 = jthumbitems[1].getBoundingClientRect(),
							orient = 'width';

						if(Math.min(coord1.width, coord1.height) > 32){
							//has thumbnail
							if(coord1.top < coord2.top && coord1.left == coord2.left){
								orient = 'height';
							}

							var itemsize = coord1[orient],
								padd = 0;
							
							if(orient === 'width'){
								padd = parseInt(jthumbitems[0].style.marginLeft)
									+ parseInt(jthumbitems[0].style.marginRight);
							} else {
								padd = parseInt(jthumbitems[0].style.marginTop)
									+ parseInt(jthumbitems[0].style.marginBottom);
							}

							itemsize += padd;
							
							jthumbwrap.addClass('ja-ss-thumb-' + orient);
							jthumbs.css({orient: itemsize});

							var visiblesize = orient === 'width' ? jthumbwrap.width() : jthumbwrap.height() ;
							var visible = Math.floor(visiblesize / itemsize);
							var	maxsize = (itemsize * jthumbitems.length - visiblesize - padd);
							var	maxpercent = (maxsize <= 0 ? (maxsize / 2) : maxsize) / itemsize;

							if(vars.vendor === false && !vars.thumbsFx){
								var div_thumbie = $('<div>', {
									id: 'ja-ss-thumbie',
									class: 'ja-ss-thumbie',
								}).appendTo('div.ja-ss-thumbs-wrap');
								div_thumbie.prepend(jthumbs);
								div_thumbie.css({'position': 'relative', orient: itemsize})
								vars.thumbsFx = jthumbs.animate({opacity: '.9'});
							}

							Object.assign(vars, {
								thumbscroll: true,
								thumborient: (vars.vendor !== false ? (orient == 'width' ? 'X' : 'Y') : (orient == 'width' ? 'left' : 'top')),
								total: jthumbitems.length,
								visible: visible,
								maxpercent: maxpercent,
								jthumbs: jthumbs,
								startidx: vars.startidx || 0
							} || {});

							if(vars.vendor !== false){
								vars.jthumbs.css(vars.vendor + 'transform',
									'translate' + vars.thumborient + '(' + (-Math.min(vars.startidx, vars.maxpercent) * 100) + '%)');
							} else {
								vars.thumbsFx.start(vars.thumborient, -Math.min(vars.startidx, vars.maxpercent) * 100);
							}
						} else {
							Object.assign(vars, {
								thumbscroll: false,
								jthumbitems: jthumbitems
							});
						}
					};

				window.addEventListener('resize', function(){
					if(vars.thumborient){
						clearTimeout(vars.tsid);
						vars.tsid = setTimeout(thumbready, 500);
					}
				});

				if(jthumbimg){
					this.img(jthumbimg.getAttribute('src'), thumbready);
				} else {
					thumbready.delay(10);
				}
				
				vars.jthumbitems = jthumbitems;
			}
		}
	},

	this.initControlAction = function () {
		var btnarr,
			options = this.options;
			
		if(options.navigation){
			var jslider = this.vars.jslider,
				controls = ['prev', 'play', 'stop', 'playback', 'next'];
				
			for (var j = 0, jl = controls.length; j < jl; j++) {
				if(this[controls[j]]){
					btnarr = jslider.find('.ja-ss-' + controls[j]);
					
					for (var i = 0, il = btnarr.length; i < il; i++) {
						btnarr[i].addEventListener('click', this[controls[j]].bind(this, true));
					}
				}
			}
		}
	},
	
	this.initItemAction = function(){
		var options = this.options;

		if (options.urls) {
			var vars = this.vars,
				anchor = function(from, limit){
					if(!limit){
						limit = vars.jslider;
					}
					while(from && from !== limit){
						if((from.getAttribute('tag') && from.getAttribute('tag').toLowerCase() === 'a')
							|| from.tagName.toLowerCase() === 'a'){
							return from;
						}
						
						from = from.parentElement;
					}
					
					return null;
				},

				handle = function(e){
					var index = vars.jitems.index(this);
						
					if(index == -1){
						index = vars.curIdx;
					}
					
					var url = options.urls[index],
						target = options.targets[index],
						link = anchor(e.target);
					if(link && link.href != '' && link.href != window.location.href){
						return true;
					}

					if (url) {
						e.preventDefault();
						
						if (target == '_blank'){
							window.open(url, 'JAWindow');
						} else {
							window.location.href = url;
						}
					}
					
					return false;
				};
			vars.jmain.on('click', handle);
			vars.jitems.on('click', handle);
		}
	},
	
	this.initTouchDevice = function(){
		var	inst = this,
			vars = this.vars,
			ltouch = function(){
				vars.ltouch = true;
			},
			start = function(e){
				
				clearTimeout(vars.ltid);

				var point = e.touches[0];
				
				vars.moved = false;
				vars.px = point.pageX;
				vars.py = point.pageY;
				vars.tm = e.timeStamp || new Date().getTime();
				vars.ltouch = false;
				vars.ltid = setTimeout(ltouch, 150);
				vars.tcancel = false;

				document.addEventListener('touchmove', move);
				vars.jslider[0].addEventListener('touchend', end);
			},
			move = function(e){
				clearTimeout(vars.ltid);

				var point = e.changedTouches[0];

				if(!vars.tcancel && !vars.ltouch && Math.abs(point.pageX - vars.px) > Math.abs(point.pageY - vars.py)){
					e.stop();
				
					var tm = e.timeStamp || new Date().getTime();
					if(tm - vars.tm > 300){
						vars.tm = tm;
						vars.px = point.pageX;
					}
					
					vars.moved = true;

				} else {
					vars.tcancel = true;
					return;
				}
			},
			end = function(e){
				
				document.removeEventListener('touchmove', move);
				vars.jslider[0].removeEventListener('touchend', end);

				if (e.touches.length != 0 || vars.tcancel){
					return;
				}
				
				var point = e.changedTouches[0];
				
				if(!vars.moved){
					var target = point.target;
					while (target.nodeType != 1){
						target = target.parentNode;
					}

					if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
						var ev = document.createEvent('MouseEvents');
						ev.initMouseEvent('click', true, true, e.view, 1,
							point.screenX, point.screenY, point.clientX, point.clientY,
							e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
							0, null);
						ev._fake = true;
						target.dispatchEvent(ev);
					}

				} else if(((e.timeStamp || new Date().getTime()) - vars.tm) < 300) {
					
					if(point.pageX - vars.px > 30){
						inst.prev(true);
					} else if (point.pageX - vars.px < -30) {
						inst.next(true);
					}
				}
			};
		
		vars.jslider[0].addEventListener('touchstart', start);
	},
	
	this.initKbNav = function(){
		document.addEventListener('keydown', function(e){
			if (e.code == 39 || e.code == 40) {
				this.next();
			} else if (e.code == 37 || e.code == 38) {
				this.prev();
			}
		}.bind(this));
	}
};
