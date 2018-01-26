		/*
		 	*作者：牛奇
			*时间：2017-12
			*描述：拖拽排序列表
		*/
		function dragList(opt){
				this.wrapperElement=null;
				this.dragElement=null;
				this.bgElement=null;
				this.isDrag=false;
				this.errorTop=0;
				this.errorLeft=0;
				this.init(opt); 
			};
			dragList.prototype={ 
				init:function(opt){
					var _thisObj=this;
					_thisObj.wrapperElement=$("#"+opt.id);
					_thisObj.wrapperElement.on("mousedown touchstart","li",{_thisObj:_thisObj},_thisObj.mousedown);
					$(document).on("mousemove touchmove",{_thisObj:_thisObj},_thisObj.mousemove);
					$(document).on("mouseup touchend",{_thisObj:_thisObj},_thisObj.mouseup);
				},
				/*Pc端鼠标按下事件及移动端手指按下事件*/
				mousedown:function(data){
					var _thisObj=data.data._thisObj,
						timemark=new Date(),
						timemark=timemark.getTime(),
						_thisElement = $(this),
						_document = $(document),
						width = _thisElement.outerWidth(),
						height = _thisElement.outerHeight(),
						bgElement = $('<li id="'+timemark+'bgElement" class="list-group-item bgElement" style="width:'+width+'px;height:'+height+'px;"></li>'),
						oTop = _thisElement.offset().top - _document.scrollTop(),
						oLeft = _thisElement.offset( ).left - _document.scrollLeft(),
						cTop = data.type == "mousedown" ? data.clientY : data.originalEvent.targetTouches[0].clientY,
						cLeft = data.type == "mousedown" ? data.clientX : data.originalEvent.targetTouches[0].clientX;
					_thisObj.errorTop = cTop - oTop;
					_thisObj.errorLeft = cLeft - oLeft;
					_thisObj.dragElement = _thisElement;
					_thisObj.bgElement = bgElement;
					_thisObj.dragElement.css({"position":"fixed","top":oTop+"px","left":oLeft+"px","z-index":1,"width":width+"px","height":height+"px"});
					_thisObj.bgElement.insertBefore(_thisObj.dragElement);
					_thisObj.isDrag = true;
				},
				/*鼠标移动事件及移动端手指移动事件*/
				mousemove:function(data){
					if(data.type == "mousemove"){
						data.preventDefault();
					};
					var _thisObj=data.data._thisObj;
					if(!_thisObj.isDrag) return;
					var _document = $(document),
						minYPos = _thisObj.bgElement.offset().top - _document.scrollTop() - _thisObj.bgElement.outerHeight(),
						maxYPos = _thisObj.bgElement.offset().top - _document.scrollTop() + _thisObj.bgElement.outerHeight(),
						newcTop = data.type == "mousemove" ? data.clientY : data.originalEvent.targetTouches[0].clientY,
						newcLeft = data.type == "mousemove" ? data.clientX : data.originalEvent.targetTouches[0].clientX;
						newoTop = newcTop - _thisObj.errorTop,
						newoLeft = newcLeft - _thisObj.errorLeft;
					_thisObj.dragElement.css({"top":newoTop+"px","left":newoLeft+"px"});
					if(newoTop >= maxYPos){
						_thisObj.bgElement.insertAfter(_thisObj.bgElement.next());
					}else if(newoTop <= minYPos){
						_thisObj.bgElement.insertBefore(_thisObj.bgElement.prev());	
					}
				},
				/*鼠标松开事件及移动端手指松开事件*/
				mouseup:function(data){
					var _thisObj=data.data._thisObj;
					if(!_thisObj.isDrag) return;
					_thisObj.dragElement.css({"position":"static","top":0,"left":0,});
					_thisObj.bgElement.replaceWith(_thisObj.dragElement);
					_thisObj.bgElement = null;
					_thisObj.dragElement=null;
					_thisObj.isDrag = false;
				}
			};
