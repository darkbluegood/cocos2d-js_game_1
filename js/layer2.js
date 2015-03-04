var findIndex = 0,
	resultData = [],
	currentScene = null,
	seconds = 59,
	isBusy = false;


var layer2 = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.init();
	},
	init: function() {
		var bg = new cc.LayerColor(cc.color(255, 0, 0, 255));
		this.addChild(bg);

		this.addChild(new layer3());

	}
});



var layer3 = cc.Sprite.extend({
	_index: 0,
	ctor: function() {
		this._super();

		this.init();
		this.loadListener();
	},
	init: function() {
		var winSize = cc.director.getWinSize();
		var s, j, i = 0,
			index = 0,
			json = null;

		var length = sort.length;

		var randomSort = sort[this.random(length)];

		var r3 = this.random(data.length);

		for (; i < randomSort.length; i++) {
			for (j = 0; j < randomSort[i].length; j++) {
				var r1 = this.random(data.length),
					r2 = this.random(4);
				if (randomSort[i][j] == 1) {
					json = data[r3];
					s = cc.Sprite.create(json.res[index++].img);
					s.setUserData(json);
					s.setOpacity(100);
				} else {
					s = cc.Sprite.create(data[r1].res[r2].img);
				}

				s.setScale(0.8);
				s.ignoreAnchorPointForPosition(true);
				s.x = 133 * j;
				s.y = (winSize.height - 126) - i * 126;
				this.addChild(s);

			}
		}

		this.addChild(new layer5());

	},
	random: function(n) {
		return Math.floor(Math.random() * n);
	},
	loadListener: function() {
		cc.eventManager.addListener(cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			target: this,
			swallowTouches: false, // TODO 这里采用不吞噬，为的是scrollView能够滑动。
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}), this);
	},
	onTouchBegan: function(touch, event) {
		this.flag = false;
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target
		var locationInNode = this.pointStart = target.convertToNodeSpace(touch.getLocation());

		var children = target.getChildren();
		for (var i in children) {
			var size = children[i].getContentSize();
			var childbox = cc.rect(children[i].x, children[i].y, size.width, size.height);
			if (cc.rectContainsPoint(childbox, locationInNode)) {
				children[i].setOpacity(70);
			}
		}
		return true
	},
	onTouchMoved: function(touch, event) {

		var target = event.getCurrentTarget(); // 获取事件所绑定的 target
		var locationInNode = target.convertToNodeSpace(touch.getLocation());
		var children = target.getChildren();
		for (var i in children) {
			var size = children[i].getContentSize();
			var childbox = cc.rect(children[i].x, children[i].y, size.width, size.height);
			if (cc.rectContainsPoint(childbox, locationInNode)) {
				children[i].setOpacity(70);
			}
		}

	},
	onTouchEnded: function(touch, event) {
		var target = event.getCurrentTarget(); // 获取事件所绑定的 target
		var children = target.getChildren();
		isBusy = true;
		var isOk = 0;
		var tempArr = [];
		var flag = true;
		for (var i in children) {
			if (children[i].getOpacity() == 70) {

				var c = children[i],
					d = c.getUserData();

				if (d && d.hasOwnProperty("phrase")) {
					isOk++;
					tempArr.push(c);
				} else {
					tempArr.push(c);
				}
			}
		}

		for (var i = 0; i < tempArr.length; i++) {

			var c = tempArr[i],
				d = c.getUserData();

			if (tempArr.length == 4 && isOk == 4) {
				var action1 = cc.blink(1.4, 2);
				c.runAction(cc.sequence(action1, cc.callFunc(function(e) {
					if (flag) {
						layer5 = layer4.extend({
							title: d.phrase,
							num: ++findIndex
						});
						flag = false;
						resultData.push(d);
						currentScene = new MyScene1();
						currentScene.addChild(new layer2());
						cc.director.runScene(new cc.TransitionProgressRadialCW(0.6, currentScene));
					}
				}, c)));
				
			} else {

				var actionBy = cc.scaleBy(0.4, 0.7, 0.7);
				c.runAction(cc.sequence(actionBy, cc.delayTime(0.1), actionBy.reverse()));
				var seq = cc.sequence(cc.rotateTo(0.4, -20), cc.rotateTo(0.4, 0), cc.callFunc(function(e) {
					isBusy = false;
					e.setOpacity(255);
				}, c));
				var rep1 = seq.repeat(2, 0.1);
				c.runAction(rep1);
			}
		}


	},
	onEnterTransitionDidFinish: function() {
		isBusy = false;
	}
});

var layer4 = cc.Sprite.extend({
	title: "",
	num: 0,
	ctor: function() {
		this._super();
		var winSize = cc.director.getWinSize();

		this.times = new cc.LabelTTF("0", 'Microsoft YaHei', 24, cc.size(winSize.width - 20, 50), cc.TEXT_ALIGNMENT_LEFT);
		this.times.ignoreAnchorPointForPosition(true);
		this.times.x = 20;
		this.addChild(this.times);
		this.scheduleUpdate();
		this.schedule(this.timer);

		var title = new cc.LabelTTF("", 'Microsoft YaHei', 24, cc.size(winSize.width - 20, 50), cc.TEXT_ALIGNMENT_CENTER);
		title.ignoreAnchorPointForPosition(true);
		this.addChild(title);
		title.setString(this.title);

		var findNum = new cc.LabelTTF("已找到:0", 'Microsoft YaHei', 24, cc.size(winSize.width - 20, 50), cc.TEXT_ALIGNMENT_RIGHT);
		findNum.ignoreAnchorPointForPosition(true);
		this.addChild(findNum);
		findNum.setString("已找到:" + this.num);
	},
	timer: function(dt) {
		seconds += -dt;

		if (seconds.toFixed(0) < 0) {
			this.times.setString("亲,时间结束!");
			console.log("时间到");
			if (!isBusy) {
				cc.director.getScheduler().pauseTarget(this);
				var s1 = new MyScene2();
				var s2 = s1.addChild(new layer6(resultData));
				cc.director.runScene(new cc.TransitionJumpZoom(1.3, s1));
			}
		} else {
			this.times.setString("剩余时间:" + Math.abs(seconds.toFixed(0)) + "s");
		}
	}
});

var layer5 = layer4.extend({
	title: "",
	num: 0,
	ctor: function() {
		this._super();
	}
});