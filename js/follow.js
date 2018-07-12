//20121204 适应性调整 
(function($) {
    $.fn.followBar = function(options) {
        var defaults = {}
        var options = $.extend(defaults, options);
        this.each(function() {
			//初始化响应滚动区及滚动容器样式
			$(this).height($(this).prev().height()).css({"position":"relative","overflow":"hidden"}).wrapInner("<div id='follow'></div>");
		    $("#follow").width($("#follow").parent().width());
			//开始
            var obj = $(this).find("#follow"),
            t = obj.offset().top;
            window.onscroll = function() {
                f(obj, t)
            };
            window.onresize = function() {
                f(obj, t)
            };
            function f(obj, t) {
                var dst = $(document).scrollTop(),
			    sh = obj.parent().prev().height() - obj.height() + $(".header").height();//适应区域等于主侧栏初始高度差加头部高
                if (($.browser.msie == true) && ($.browser.version == 6.0)) {
                    if (dst > t) obj.css({
                        position: "absolute",
                        top: dst - t,
						marginTop: 10
                    })
                } else {
                    if (dst > t && dst < sh) obj.css({
                        position: "fixed",
                        top: "-" & dst + "px",
						marginTop: 10
                    })
                }
                if (dst >= sh) obj.css({                     //超出适应区
                    position: "absolute",
					//top: sh - $(".header").height() + "px",//20121130 滑动偏移量等于主侧栏高度差
					top: "auto",                             //20121204 修改为自适应底部
					bottom: 0                               //20121204 修改为自适应底部
                })
				if (dst <= t) obj.css({
                    position: "absolute",
                    top: 0,
					marginTop: 0
                })
            }
        })
    }
})(jQuery);