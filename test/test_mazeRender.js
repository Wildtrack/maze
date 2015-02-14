var N_CONST = AMaze.model.N_CONST, E_CONST = AMaze.model.E_CONST,
S_CONST = AMaze.model.S_CONST, W_CONST = AMaze.model.W_CONST,
testsPassing = true, testsFinished = false;

TestRig.verboseMode = true;


//not testing the model here, assume it works
var modelTest = new AMaze.model.Maze();//cells will be approximately size 320/10 = 32 (with some padding changes)
var canvas = CE.defines("canvas_id")
            .extend(Input)
            .ready(function() {
                canvas.Scene.call("MyScene");
            });

canvas.Scene.new({
    name: "MyScene",
    materials: {
        images: {
            smile: "../images/smile.png"
        }
    },
    ready: function(stage) {
        this.player = this.createElement(32,32);
        this.player.drawImage("smile");
        stage.append(this.player);

        this.mazeRenderer = new AMaze.render.MazeRenderer({'canvasEngine':this,'player':this.player,'maze':modelTest});

		canvas.Input.keyUp(Input.Up, function(e) {
			modelTest.movePlayer(AMaze.model.N_CONST);
        });

		canvas.Input.keyUp(Input.Bottom, function(e) {
			modelTest.movePlayer(AMaze.model.S_CONST);
        });

		canvas.Input.keyUp(Input.Left, function(e) {
			modelTest.movePlayer(AMaze.model.W_CONST);
        });

		canvas.Input.keyUp(Input.Right, function(e) {
			modelTest.movePlayer(AMaze.model.E_CONST);
        });
    },
    render: function(stage) {
		this.mazeRenderer.refresh();
        stage.refresh();
    }
});