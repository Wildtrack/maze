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
            trail: "images/trail_dot1.png"
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

        //trail dot
        trailDot = function (x, y) {
            trail = thisThing.createElement(16,16);
            trail.drawImage("trail");
            trail.x = x;
            trail.y = y;
            return trail;
        }

        var trailModel = {
        	width: 20, height: 20, theDots: [],
        	map: function() {

        		//this.theDots = [];
				for( var x = trailModel.width; x--; )
				{
					trailModel.theDots.push([]);
					for( var y = trailModel.height; y--; )
					{
						trailModel.theDots[trailModel.width-x-1].push();
					}
				}
        	}
        };

        trailModel.map.prototype.exists = function(x, y) 
        {
        		var data = trailModel.theDots[x][y];
        		if (typeof data == "object")
        		{
        			//data.remove();
        			//trailModel.theDots[x][y] = null;
        			return 1;
        		}
        		return 0;
        };

        trailModel.map.prototype.makeTrail = function(x, y) 
        {
        		var x1 = x/32;
        		var y1 = y/32;
        		if (!this.exists(x1, y1)) {
        			var newDot = new trailDot(x, y);
        			trailModel.theDots[x1][y1] = newDot;
        			stage.append(newDot);
        		}
        };

        var theTrail = new trailModel.map();

		//console.log("width: " + _canvas.width + ", height: " + _canvas.height);
		canvas.Input.keyUp(Input.Up, function(e) {
			if(thisThing.el.y > 0)
			{
                theTrail.makeTrail(thisThing.el.x, thisThing.el.y);
				thisThing.el.y = Math.max(0,thisThing.el.y-32);
			}
        });

		canvas.Input.keyUp(Input.Bottom, function(e) {
			if(thisThing.el.y < _canvas.height)
			{
                theTrail.makeTrail(thisThing.el.x, thisThing.el.y);
				thisThing.el.y = Math.min(_canvas.height-32,thisThing.el.y+32);
			}
        });

		canvas.Input.keyUp(Input.Left, function(e) {
			if(thisThing.el.x > 0)
			{
                theTrail.makeTrail(thisThing.el.x, thisThing.el.y);
				thisThing.el.x = Math.max(0,thisThing.el.x-32);
			}
        });

		canvas.Input.keyUp(Input.Right, function(e) {
			if(thisThing.el.x < _canvas.width)
			{
                theTrail.makeTrail(thisThing.el.x, thisThing.el.y);
				thisThing.el.x = Math.min(_canvas.width-32,thisThing.el.x+32);
			}
        });
    },
    render: function(stage) {

        stage.refresh();
    }
});