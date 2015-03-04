



var layer1 = cc.Layer.extend({
	ctor : function(){
		this._super();
		var winSize = cc.director.getWinSize();
		var bg = new cc.LayerColor(cc.color(255,0,0,255));
	    this.addChild(bg);

		var item1 = cc.Sprite.create(s_img,cc.rect(0,0,140,269));
		item1.x = winSize.width / 2;
        item1.y = winSize.height*0.66;
		this.addChild(item1);

		/*var play = new cc.MenuItemFont("开始玩", this.onMouseDown, this);
		play.fontSize = 24;
		play.fontName = "Microsoft YaHei";
		var menu = new cc.Menu(play);
		menu.alignItemsVertically();
		menu.x = winSize.width / 2;
        menu.y = winSize.height * 2 / 6;
        play.setEnabled(false);
        this.addChild(menu);*/

        var play = this.play = new cc.LabelTTF("开始玩", "Microsoft YaHei",36, cc.size(120, 50), cc.TEXT_ALIGNMENT_CENTER);
		play.x = winSize.width / 2;
        play.y = winSize.height * 2 / 5;
        this.addChild(this.play);

        var howtoplay = this.howtoplay = new cc.LabelTTF("玩法", "Microsoft YaHei",36, cc.size(100, 50), cc.TEXT_ALIGNMENT_CENTER);
		howtoplay.x = winSize.width / 2;
        howtoplay.y = winSize.height * 2 / 7.5;
        this.addChild(this.howtoplay);


		var logo = cc.Sprite.create(logoimg,cc.rect(0,0,149,42));
		logo.x = winSize.width / 2;
        logo.y = winSize.height*0.14;
		this.addChild(logo);
		this.setUserData({sd:333})

		//this.addChild(new HowToPlayLayer());
		this.loadEvent();

	},
	onEnter : function(){
		this._super();
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
                    return true;
                }
                return false;
            },
            onTouchEnded : function(touch, event){
            	var target = event.getCurrentTarget();
            	if (target == target.getParent().play) {                    // 重新设置 ZOrder，显示的前后顺序将会改变
                    if(resultData){
						findIndex = 0;
						resultData = [];
						currentScene = null;
						seconds = 59;
						layer5 = layer4.extend({
							title : "",
							num : 0
						});
					}
					var s1 = new MyScene1();
					s1.addChild(new layer2(),0);
			        cc.director.pushScene(new cc.TransitionJumpZoom(1.3, s1));
                } else if (target == target.getParent().howtoplay) {
                	target.getParent().addChild(new HowToPlayLayer());
                }
            }
        });
        
        cc.eventManager.addListener(listener1, this.play);
        cc.eventManager.addListener(listener1.clone(), this.howtoplay);

    }
});


var HowToPlayLayer = cc.Layer.extend({
	ctor : function(){
		this._super();
		var winSize = cc.director.getWinSize();
		var bg = new cc.LayerColor(cc.color(0, 0, 0, 150));
		this.addChild(bg);

		var layer = new cc.LayerColor(cc.color(231,0,0,255),460,120);
		this.addChild(layer);
		layer.ignoreAnchorPointForPosition(true);
		layer.x = winSize.width-550;
		layer.y = winSize.height/2;

		var text = new cc.LabelTTF("猜图滑动4个组成一成语!","Microsoft YaHei",36, cc.size(460, 50), cc.TEXT_ALIGNMENT_CENTER);
		text.ignoreAnchorPointForPosition(true);
		layer.addChild(text);
		text.y = 30;

		cc.eventManager.addListener(cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			target: this,
			swallowTouches: true, 
			onTouchBegan: this.onTouchBegan
		}), this);

		this.tag="HowToPlayLayer"
	},
	onTouchBegan : function(touch, event){
		var target = event.getCurrentTarget();
		target.getParent().removeChildByTag(target.getTag());
		return true;
	}
});

