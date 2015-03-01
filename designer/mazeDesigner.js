var canvas = CE.defines("canvas_id")
            .extend(Input)
            .ready(function() {
                canvas.Scene.call("MyScene");
            });

canvas.Scene.new({
	name: "MyScene",
	materials: {
		images: {
		
		}
	},
	ready: function(stage) {
		
	},
	render: function(stage) {
		stage.refresh();
	}
}