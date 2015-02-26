
var canvas = CE.defines("canvas_id")
            .extend(Input)
            .ready(function() {
                canvas.Scene.call("MyScene");
            });