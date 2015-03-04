
var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});
var layer6 = cc.Layer.extend({
	ctor : function(d){
		this._super();
        this.arr = d;
        console.log(d)
		this.init();
		this.addChild(new layer7(d));

        
	},
	init : function(){
        var winSize = cc.director.getWinSize();
		var bg = new cc.LayerColor(cc.color(255,0,0,255));
	    this.addChild(bg);

        var bg1 = new cc.LayerColor(cc.color(183,16,21,255));
        bg1.ignoreAnchorPointForPosition(true);
        bg1.y = winSize.height / 2 - 355;
        bg1.width = winSize.width;
        bg1.height = 570;
        this.addChild(bg1);

	    
        tableView = new cc.TableView(this, cc.size(winSize.width, 550));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.y = winSize.height / 2 - 340;
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(tableView);

        tableView.reloadData();
	},
	scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },
    tableCellTouched:function (table, cell) {
        var arr = this.arr[cell.getIdx()];
        var s1 = new MyScene1();
        var s2 = s1.addChild(new layer8(arr));

        cc.director.runScene(new cc.TransitionJumpZoom(1.3, s1));
    },
    tableCellTouched2:function () {
        cc.log("cell touched at index: ");
    },
    tableCellSizeForIndex:function (table, idx) {
        return cc.size(640, 60);
    },
    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();

            var winSize = cc.director.getWinSize();

            var sprite = new cc.Sprite("res/fo.png");
            sprite.setScale(0.3);
            sprite.anchorX = 0;
            sprite.anchorY = 0;
            sprite.x = winSize.width-50;
            sprite.y = 0;
            cell.addChild(sprite);

            label = new cc.LabelTTF(strValue, "Helvetica", 24.0);
            label.x = 30;
            label.y = 0;
            label.anchorX = 0;
            label.anchorY = 0;
            label.tag = 123;
            cell.addChild(label);

        } else {
            label = cell.getChildByTag(123);
            label.setString(this.arr[idx].phrase);
        }

        return cell;
    },
    numberOfCellsInTableView:function (table) {
       return this.arr.length;
    }
});


var layer7 = cc.Sprite.extend({
	ctor : function(d){
		this._super();
		this.init(d);
	},
	init : function(d){
		var winSize = cc.director.getWinSize();
		var s1 = cc.Sprite.create("res/c.png",cc.rect(0,0,153,170));
		s1.x = winSize.width / 2;
		s1.y = winSize.height * 0.9;
		s1.setScale(0.5);
		this.addChild(s1);
		
		var text = new cc.LabelTTF("恭喜!", 'Microsoft YaHei', 34, cc.size(winSize.width, 50), cc.TEXT_ALIGNMENT_CENTER);
		text.ignoreAnchorPointForPosition(true);
		this.addChild(text);
        text.y = winSize.height*0.80;

		var text1 = new cc.LabelTTF("你获得以下0句祝福", 'Microsoft YaHei', 34, cc.size(winSize.width, 50), cc.TEXT_ALIGNMENT_CENTER);
		text1.ignoreAnchorPointForPosition(true);
		this.addChild(text1);
        text1.y = winSize.height*0.75;
        text1.setString("你获得以下"+d.length+"句祝福");

        var text2 = new cc.LabelTTF("你的最佳成绩:18", 'Microsoft YaHei', 24, cc.size(winSize.width, 50), cc.TEXT_ALIGNMENT_CENTER);
        text2.ignoreAnchorPointForPosition(true);
        this.addChild(text2);
        text2.y = winSize.height*0.13;
        text2.setString("你的最佳成绩:"+d.length);

        var text3 = this.s1 = new cc.LabelTTF("分享快乐", 'Microsoft YaHei', 24, cc.size(110, 50), cc.TEXT_ALIGNMENT_LEFT);
        text3.x = 30;
        text3.y = 10;
        text3.ignoreAnchorPointForPosition(true);
        this.addChild(text3);

        var s2 = this.s2 = cc.Sprite.create("res/back.png",cc.rect(0,0,70,21));
        s2.x = winSize.width-100;
        s2.y = 38;
        s2.ignoreAnchorPointForPosition(true);
        this.addChild(s2);

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
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {         // 点击事件结束处理
                var target = event.getCurrentTarget();
                if (target == target.getParent().s1) {                    // 重新设置 ZOrder，显示的前后顺序将会改变
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


                } else if (target == target.getParent().s2) {
                    cc.director.popScene();
                }
            }
        });
        
        cc.eventManager.addListener(listener1, this.s1);
        cc.eventManager.addListener(listener1.clone(), this.s2);

    }
});

var weixin = cc.Layer.extend({
    ctor : function(){
        this._super();

        cc.log("22")
        var winSize = cc.director.getWinSize();
        var bg = new cc.LayerColor(cc.color(0, 0, 0, 150));
        this.addChild(bg);

        var s = cc.Sprite.create("res/up.png",cc.rect(0,0,108,108));
        s.ignoreAnchorPointForPosition(true);
        this.addChild(s);
        s.y = winSize.height*0.88;
        s.x = winSize.width*0.82;

        var text = new cc.LabelTTF("请在微信右上角选择分享!","Microsoft YaHei", 36 , cc.size(winSize.width - 20, 50), cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(text);
        text.ignoreAnchorPointForPosition(true);
        text.y = winSize.height/2;

        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            target: this,
            swallowTouches: true, 
            onTouchBegan: this.onTouchBegan
        }), this);

        this.tag="weixin"

    },
    onTouchBegan : function(touch, event){
        var target = event.getCurrentTarget();
        target.getParent().removeChildByTag(target.getTag());
        return true;
    }
})