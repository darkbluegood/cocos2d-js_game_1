var layer8 = cc.Layer.extend({
	ctor : function(d){
		this._super();
		this.init(d);
	},
	init : function(d){
		var winSize = cc.director.getWinSize();
		var bg = new cc.LayerColor(cc.color(255,0,0,255));
	    this.addChild(bg);

	    var text1 = this.text1 = new cc.LabelTTF("返回", 'Microsoft YaHei', 34, cc.size(90, 50), cc.TEXT_ALIGNMENT_LEFT);
		text1.ignoreAnchorPointForPosition(true);
		this.addChild(this.text1);
		text1.x = 20;
		text1.y = winSize.height-80;

		var text2 = this.text2 = new cc.LabelTTF("分享快乐", 'Microsoft YaHei', 34, cc.size(150, 50), cc.TEXT_ALIGNMENT_LEFT);
		text2.ignoreAnchorPointForPosition(true);
		this.addChild(this.text2);
		text2.x = 20;
		text2.y = winSize.height*0.02;

		/*var text3 = this.text3 = new cc.LabelTTF("领取奖品", 'Microsoft YaHei', 34, cc.size(150, 50), cc.TEXT_ALIGNMENT_RIGHT);
		text3.ignoreAnchorPointForPosition(true);
		this.addChild(this.text3);
		text3.x = winSize.width-180;
		text3.y = winSize.height*0.02;*/


		var text4,sprite;
		cc.log(d.res.length,d)
		for(var i=0; i<d.res.length; i++){
			text4 = new cc.LabelTTF(d.res[i].text, 'Microsoft YaHei', 34, cc.size(80, 50), cc.TEXT_ALIGNMENT_RIGHT);
			text4.ignoreAnchorPointForPosition(true);
			this.addChild(text4);
			text4.x = winSize.width/2 + 30;
			text4.y = (winSize.height-208)-i*170;

			sprite = cc.Sprite.create(d.res[i].img,cc.rect(0,0,100,100));
			sprite.ignoreAnchorPointForPosition(true);
			this.addChild(sprite);
			sprite.x = winSize.width/2 - 50;
			sprite.y = (winSize.height-230)-i*170;
		}

		this.loadEvent();

	},
    loadEvent : function(){
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
            onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
                var target = event.getCurrentTarget();  // 获取事件所绑定的 target
                // 获取当前点击点所在相对按钮的位置坐标
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {         // 点击事件结束处理
                var target = event.getCurrentTarget();
                if (target == target.getParent().text1) {                    // 重新设置 ZOrder，显示的前后顺序将会改变
                    var s1 = new MyScene2();
		        	var s2 = s1.addChild(new layer6(resultData));
		        	cc.director.runScene(new cc.TransitionJumpZoom(1.3, s1));
                }
                if (target == target.getParent().text2) {                    // 重新设置 ZOrder，显示的前后顺序将会改变
                		target.getParent().addChild(new weixin());
                    	var dataForWeixin={
                           title:"成语连连看，欢喜迎接羊年-富春山居",
                           link:"http://www.jydgad.com/project/cny/index.html",
                           imgUrl:"http://www.jydgad.com/project/cny/res/logo.png",
                           desc:"成语连连看，欢喜迎接羊年-富春山居"
                        };

                        wx.ready(function () {
                            wx.onMenuShareTimeline({
                                title: dataForWeixin.title, 
                                desc: dataForWeixin.desc, 
                                link: dataForWeixin.link, 
                                imgUrl: dataForWeixin.imgUrl, 
                                success: function () {
                                    
                                },
                                cancel: function () {
                                    
                                }
                            });

                            wx.onMenuShareAppMessage({
                                title: dataForWeixin.title, 
                                desc: dataForWeixin.desc, 
                                link: dataForWeixin.link, 
                                imgUrl: dataForWeixin.imgUrl, 
                                type: '', 
                                dataUrl: '', 
                                success: function () {
                                    
                                },
                                cancel: function () {
                                    
                                }
                            });

                            wx.onMenuShareQQ({
                                title: dataForWeixin.title,
                                desc: dataForWeixin.desc, 
                                link: dataForWeixin.link, 
                                imgUrl: dataForWeixin.imgUrl,
                                success: function () {
                                    
                                },
                                cancel: function () {
                                    
                                }
                            });

                            wx.onMenuShareWeibo({
                                title: dataForWeixin.title, 
                                desc: dataForWeixin.desc, 
                                link: dataForWeixin.link, 
                                imgUrl: dataForWeixin.imgUrl, 
                                success: function () {
                                    
                                },
                                cancel: function () {
                                    
                                }
                            });
                        });
                }
                /*if (target == target.getParent().text3) {                    // 重新设置 ZOrder，显示的前后顺序将会改变
                    cc.log("3")
                }*/
            }
        });
        
        cc.eventManager.addListener(listener1, this.text1);
        cc.eventManager.addListener(listener1.clone(), this.text2);
        //cc.eventManager.addListener(listener1.clone(), this.text3);
    }
});

