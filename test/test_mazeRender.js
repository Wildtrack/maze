var N_CONST = AMaze.model.N_CONST, E_CONST = AMaze.model.E_CONST,
S_CONST = AMaze.model.S_CONST, W_CONST = AMaze.model.W_CONST,
testsPassing = true, testsFinished = false;

TestRig.verboseMode = true;


$(function() {
	var canvas = CE.defines("canvas_id")
			.extend(Input);

	//not testing the model here, assume it works
	AMaze.model.load('./mocks/maze2.json', function(loaded) {
		var modelTest = loaded;

		canvas.Scene.new({
			name: "MyScene",
			materials: {
				images: {
					player: "../images/smile.png"
				}
			},
			ready: function(stage) {

				this.mazeRenderer = new AMaze.render.MazeRenderer({'canvasEngine':this,'stage':stage,'maze':modelTest});
				this.mazeRenderer.drawMaze();

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
		canvas.ready().Scene.call("MyScene");
	});
});