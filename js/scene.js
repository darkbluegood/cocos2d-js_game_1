var MyScene1 = cc.Scene.extend({
  	onEnter:function () {
      this._super();
  	}
});
var MyScene2 = cc.Scene.extend({
    onEnter:function () {
      this._super();
    }
});

var MyScene = cc.Scene.extend({
  	onEnter:function () {
      this._super();

	    //var l = new layer2();
      var l = new layer1();
      //var l = new layer6();
	    this.addChild(l);

  	}
});