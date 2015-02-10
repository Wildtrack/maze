var canvas = CE.defines("canvas_id").
            extend(Input).
            ready(function() {
                canvas.Scene.call("MyScene");
            }),
    thisThing;

canvas.Scene.new({
    name: "MyScene",
    materials: {
        images: {
            smile: "images/smile.png"
        }
    },
    ready: function(stage) {
		thisThing = this;
        this.el = this.createElement(32,32);
        this.el.drawImage("smile");

        stage.append(this.el);
		//don't know why this doesn't work
		canvas.Input.keyUp(Input.Up, function(e) {
			if(thisThing.el.y > 0)
				thisThing.el.y = Math.max(0,thisThing.el.y-32);
        });

		canvas.Input.keyUp(Input.Bottom, function(e) {
			if(thisThing.el.y < canvas.height)
				thisThing.el.y = Math.min(canvas.height-32,thisThing.el.y+32);
        });

		canvas.Input.keyUp(Input.Left, function(e) {
			if(thisThing.el.x > 0)
				thisThing.el.x = Math.max(0,thisThing.el.x-32);
        });

		canvas.Input.keyUp(Input.Right, function(e) {
			if(thisThing.el.x > canvas.width)
				thisThing.el.x = Math.max(canvas.width-32,thisThing.el.x+32);
        });
    },
    render: function(stage) {

        stage.refresh();
    }
});