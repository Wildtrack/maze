if (typeof window === "undefined")
    var CE = require('canvasengine');

var canvas = CE.defines("canvas_id")
            .extend(Input)
            .ready(function() {
                canvas.Scene.call("MyScene");
            });

canvas.Scene.new({
    name: "MyScene",
    materials: {
        images: {
            smile: "images/smile.png",
            trail1: "images/trail_dot1.png",
            trail2: "images/trail_dot2.png",
            trail3: "images/trail_dot3.png",
            trail4: "images/trail_dot4.png"
        }
    },
    ready: function(stage) {
		thisThing = this;
        this.el = this.createElement(32,32);
        this.el.drawImage("smile");
        this.el.x = 32;
        this.el.y = 32;
        _canvas = this.getCanvas();

        stage.append(this.el);

        //Invoke trailModel and pass trail dot object
        var theTrail = new trailModel.create(function (x, y) {
            trail = thisThing.createElement(16,16);
            trail.drawImage("trail2");
            trail.x = x;
            trail.y = y;
            return trail;
        });

        //Very first trail
        theTrail.makeTrail(stage, thisThing.el);

		//console.log("width: " + _canvas.width + ", height: " + _canvas.height);
		canvas.Input.keyUp(Input.Up, function(e) {
			if(thisThing.el.y > 0)
			{
				thisThing.el.y = Math.max(0,thisThing.el.y-32);
                theTrail.makeTrail(stage, thisThing.el);
			}
        });

		canvas.Input.keyUp(Input.Bottom, function(e) {
			if(thisThing.el.y < _canvas.height)
			{
				thisThing.el.y = Math.min(_canvas.height-32,thisThing.el.y+32);
                theTrail.makeTrail(stage, thisThing.el);
			}
        });

		canvas.Input.keyUp(Input.Left, function(e) {
			if(thisThing.el.x > 0)
			{
				thisThing.el.x = Math.max(0,thisThing.el.x-32);
                theTrail.makeTrail(stage, thisThing.el);
			}
        });

		canvas.Input.keyUp(Input.Right, function(e) {
			if(thisThing.el.x < _canvas.width)
			{
				thisThing.el.x = Math.min(_canvas.width-32,thisThing.el.x+32);
                theTrail.makeTrail(stage, thisThing.el);
			}
        });
    },
    render: function(stage) {

        stage.refresh();
    }
});