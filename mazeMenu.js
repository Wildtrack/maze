//
// Amazing mazes menu 
//

function setGameCanvas(loaded) {
		var modelTest = loaded;

		canvas.Scene.new({
			name: "MyScene",
			materials: {
				images: {
					player: "images/knight.png",
					tileset: "images/dungeon_tiles_compact_and_varied.png",

					trail1: "images/trail_dot1.png",
            		trail2: "images/trail_dot2.png",
            		trail3: "images/trail_dot3.png",
            		trail4: "images/trail_dot4.png"
				}
			},
			ready: function(stage) {

				//making the huge spritemap object for the renderer (it's ridiculous)
				//{
				//	image:(materials string),
				//	size:[(number of gridbox lines), (number of gridbox columns)],
				//	tile:[(width of each gridbox),(height of each gridbox)],
				//	reg:[(x origin), (y origin)],
				//	set:[(1st identifier starting from top left), (2nd identifier), ...],
				//	cells:[
				//		[{x:0,y:0,width:0,height:0, tiles:["gridtile1","gridtile2",...]},... ],
				//		[{x:0,y:0,width:0,height:0, tiles:["gridtile1","gridtile2",...]},... ],...}
				//	],
				//	entrances: [
				//		...
				//	],
				//	exits: [
				//		...
				//	]
				//}

				var spritemap = {
					image: "tileset",
					size:[21,5],
					tile:[16,16],
					reg:[0,0],
					set:["g_flat_corner_nw","g_flat_n_1","g_flat_n_2","g_flat_n_3","g_flat_corner_ne","g_isth_corner_nw","g_isth_flat_ew","g_isth_corner_ne","g_flat_shd_ne", "g_stair1_shd",     "g_stair1",         "g_stair2",       "w_flat_corner_nw","w_flat_n",       "w_flat_corner_ne","w_flat_icorner_nw","w_flat_icorner_ne", "w_isth_jut_n", "w_isth_corner_nw", "w_isth_flat_ew","w_isth_corner_ne",
						 "g_flat_w_1",		"g_flat_1",	 "g_flat_2",  "g_flat_3",  "g_flat_e_1",      "g_isth_flat_ns",  "blank",         "g_isth_flat_ns",  "g_flat_shd_e",  "g_flat_icorner_nw","g_flat_icorner_ne","g_stair2_shd",   "w_flat_w",        "w_flat",         "w_flat_e",        "w_flat_icorner_sw","w_flat_icorner_se", "w_isth_jut_s", "w_isth_flat_ns",   "w_isth_island", "w_isth_flat_ns",
						 "g_flat_w_2",		"g_flat_4",	 "g_flat_5",  "g_flat_6",  "g_flat_e_2",	  "g_isth_corner_sw","g_isth_flat_ew","g_isth_corner_ne","g_flat_shd_se", "g_flat_icorner_sw","g_flat_icorner_se","shd",            "w_flat_corner_sw","w_flat_s",       "w_flat_corner_se","w_riv_waterfall_s","w_riv_waterfall_ew","w_riv_flat_ns","w_isth_corner_sw", "w_isth_flat_ew","w_isth_corner_se",
						 "g_flat_w_3",		"g_flat_7",	 "g_flat_8",  "g_flat_9",  "g_flat_e_3",	  "g_isth_jut_n",    "g_isth_jut_w",  "g_isth_jut_e",    "g_door_open",   "g_door_wood",      "g_door_gate",      "w_riv_corner_nw","w_riv_flat_ew",   "w_riv_corner_ne","w_riv_corner_sw", "w_riv_flat_ew",    "w_riv_corner_se",   "g_wall_base",  "g_wall_continuing","blank",         "blank",
						 "g_flat_corner_sw","g_flat_s_1","g_flat_s_2","g_flat_s_3","g_flat_corner_se","g_isth_jut_s",    "g_fall_lg",     "g_isth_island",   "w_riv_open_1",  "w_riv_open_2",     "w_riv_open_gate",  "w_riv_end_n",    "w_riv_end_s",     "w_riv_end_w",    "w_riv_end_e",     "w_isth_jut_w",     "w_isth_jut_e",      "blank",        "g_fall_sm",        "blank",         "blank"],
					cells:[
						//0: none
						[	{x:16,y:16, tiles:["g_flat_corner_nw"]},{x:32,y:16, tiles:["g_flat_corner_ne"]},
							{x:16,y:32, tiles:["g_flat_corner_sw"]},{x:32,y:32, tiles:["g_flat_corner_se"]},
							{x:16,y:48, tiles:["g_fall_lg"]},       {x:32,y:48, tiles:["g_fall_lg"]}
						],
						//1: n
						[	{x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:16, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:16, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:32, tiles:["g_flat_corner_sw"]},                    {x:32,y:32, tiles:["g_flat_corner_se"]},
							{x:16,y:48, tiles:["g_fall_lg"]},                           {x:32,y:48, tiles:["g_fall_lg"]}
						],
						//2: e
						[	{x:16,y:16, tiles:["g_flat_corner_nw"]},{x:32,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x:16,y:32, tiles:["g_flat_corner_sw"]},{x:32,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x:16,y:48, tiles:["g_fall_lg"]},       {x:32,y:48, tiles:["g_fall_lg"]},                           {x:48,y:48, tiles:["g_fall_lg"]}
						],
						//3: n | e
						[	{x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:16, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:16, tiles:["g_flat_icorner_sw"]},                   {x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x:16,y:32, tiles:["g_flat_corner_sw"]},                    {x:32,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x:16,y:48, tiles:["g_fall_lg"]},                           {x:32,y:48, tiles:["g_fall_lg"]},                           {x:48,y:48, tiles:["g_fall_lg"]}
						],
						//4: s
						[	{x:16,y:16, tiles:["g_flat_corner_nw"]},                    {x:32,y:16, tiles:["g_flat_corner_ne"]},
							{x:16,y:32, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:32, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]}
						],
						//5: n | s
						[	{x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:16, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:16, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:32, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:32, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]}
						],
						//6: e | s
						[	{x:16,y:16, tiles:["g_flat_corner_nw"]},                    {x:32,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x:16,y:32, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:32, tiles:["g_flat_icorner_nw"]},                   {x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},{x:48,y:48, tiles:["g_fall_lg"]}
						],
						//7: n | e | s
						[	{x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x:16,y:16, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:16, tiles:["g_flat_icorner_sw"]},                   {x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x:16,y:32, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:32, tiles:["g_flat_icorner_nw"]},                   {x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},{x:48,y:48, tiles:["g_fall_lg"]}
						],
						//8: w
						[	{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:32,y:16, tiles:["g_flat_corner_ne"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:32,y:32, tiles:["g_flat_corner_se"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},                           {x:16,y:48, tiles:["g_fall_lg"]},                           {x:32,y:48, tiles:["g_fall_lg"]}
						],
						//9: n | w
						[	                                                            {x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_icorner_se"]},                   {x:32,y:16, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:32,y:32, tiles:["g_flat_corner_se"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},                           {x:16,y:48, tiles:["g_fall_lg"]},                           {x:32,y:48, tiles:["g_fall_lg"]}
						],
						//10: e | w
						[	{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:32,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:32,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},                           {x:16,y:48, tiles:["g_fall_lg"]},                           {x:32,y:48, tiles:["g_fall_lg"]},                           {x:48,y:48, tiles:["g_fall_lg"]}
						],
						//11: n | e | w
						[																{x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_icorner_se"]},                   {x:32,y:16, tiles:["g_flat_icorner_sw"]},                   {x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:32,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},                           {x:16,y:48, tiles:["g_fall_lg"]},                           {x:32,y:48, tiles:["g_fall_lg"]},                           {x:48,y:48, tiles:["g_fall_lg"]}
						],
						//12: s | w
						[	{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:32,y:16, tiles:["g_flat_corner_ne"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_icorner_ne"]},                   {x:32,y:32, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},                           {x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]}
						],
						//13: n | s | w
						[																{x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_icorner_se"]},					{x:32,y:16, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_icorner_ne"]},					{x:32,y:32, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},							{x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]}
						],
						//14: e | s | w
						[	{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:32,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_icorner_ne"]},                   {x:32,y:32, tiles:["g_flat_icorner_nw"]},                   {x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},                           {x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},{x:48,y:48, tiles:["g_fall_lg"]}
						],
						//15: n | e | s | w
						[																{x:16,y: 0, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y: 0, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},
							{x: 0,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},{x:16,y:16, tiles:["g_flat_icorner_se"]},                   {x:32,y:16, tiles:["g_flat_icorner_sw"]},                   {x:48,y:16, tiles:["g_flat_n_1","g_flat_n_2","g_flat_n_3"]},
							{x: 0,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},{x:16,y:32, tiles:["g_flat_icorner_ne"]},                   {x:32,y:32, tiles:["g_flat_icorner_nw"]},                   {x:48,y:32, tiles:["g_flat_s_1","g_flat_s_2","g_flat_s_3"]},
							{x: 0,y:48, tiles:["g_fall_lg"]},                           {x:16,y:48, tiles:["g_flat_w_1","g_flat_w_2","g_flat_w_3"]},{x:32,y:48, tiles:["g_flat_e_1","g_flat_e_2","g_flat_e_3"]},{x:48,y:48, tiles:["g_fall_lg"]}
						]
					],
					entrances:this.cells,
					exits:this.cells
				},
				styleObj = {
					'bg':'#15111b',
					'spritemap':spritemap
				};

				this.mazeRenderer = new AMaze.render.MazeRenderer({
					'bgcanvas':$('#bgcanvas')[0],
					'canvasEngine':canvas,
					'scene':this,
					'stage':stage,
					'maze':modelTest,
					'style':styleObj
				});

				this.mazeRenderer.createTrailModel();

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

$(function() {
	var canvas = CE.defines("canvas_id")
			.extend(Input);

	//not testing the model here, assume it works
	AMaze.model.load('./levels/small (5-10)/maze3_10x10.json', setGameCanvas);

	$(window).on('keydown', function(e) {
		if([32,37,38,39,40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	}).scrollTop(0).scrollLeft(0);

	//restart level
	$("#menu_new").click(function() {
		console.log("new button is pressed.");
	});

	$("#menu_goto").click(function() {
		console.log("goto button is pressed.");
	});

	$("#menu_level").click(function() {
		console.log("level button is pressed.");
	});

	$("#menu_save").click(function() {
		console.log("save button is pressed.");
	});

	$("#menu_load").click(function() {
		console.log("load button is pressed.");
	});


});
