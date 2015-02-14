var AMaze = AMaze || {};
AMaze.render = {
	style:{wall:'#000', entrance:'#0f0', exit:'#f00', player:null,width:null,height:null,padding:5},
	canvas:null,canvasEngine:null,actualWidth:null,actualHeight:null,
	MazeRenderer: function(opts) {
		//opts should have a canvasengine object in it and a string for player, the rest is optional (maybe make player optional too?)
		this.style.player = opts.hasOwnProperty('player')? opts.player : null;//string for materials object
		this.canvasEngine = opts.hasOwnProperty('canvasEngine')? opts.canvasEngine : null;

		//style options
		var tempStyleObj = opts.hasOwnProperty('style')? opts.style : null;
		if(tempStyleObj != null) {
			for(var key in tempStyleObj) {
				if(this.style.hasOwnProperty(key)) {
					this.style.key = tempStyleObj.key;
				}
			}
		}

		//derived values
		this.canvas = this.canvasEngine != null? this.canvasEngine.getCanvas() : null;
		this.actualWidth = this.canvas != null? this.canvas.width : null;
		this.actualHeight = this.canvas != null? this.canvas.height : null;
		this.style.width = this.actualWidth != null? this.actualWidth-this.style.padding : null;
		this.style.height = this.actualHeight != null? this.actualHeight-this.style.padding : null;
	}
};

AMaze.render.MazeRenderer.prototype.refresh = function() {
	//no need to do anything if canvas == null
	if(this.canvas != null) {

	}
};