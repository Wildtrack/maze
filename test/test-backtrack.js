var assert = require('chai').assert;
var backtracker = require('./../backtrack');

TEST_X1 = 1;
TEST_Y1 = 2;
TEST_X2 = 3;
TEST_Y2 = 3;

var x;
var y;
var directionCode =  {north: 0, east: 1, south: 2, west: 3};
var model;

describe('BACKTRACK TESTS', function() {
	describe('Backtrack model constructor', function() {
		before(function() {
			model = new backtracker.model();
		});
		it("Check that on construction the tree is null", function() {
			assert.equal(model.tree, null);
		});
	});
	describe('backtrack.setRoot()', function() {
		describe('Set root to first position', function() {
			before(function() {
				model.setRoot(TEST_X1, TEST_Y1);
			});
			it("Check that on setting x to 1 it is 1", function () {
				assert.equal(model.pointer.pos[0], TEST_X1);
			});
			it("Check that on setting y to 2 it is 2", function () {
				assert.equal(model.pointer.pos[1], TEST_Y1);
			});
		});
		describe('Set root again, should not be possible', function() {
			before(function() {
				model.setRoot(TEST_X2, TEST_Y2);
			});
			it("Check that on setting x to 3 it is 1", function () {
				assert.equal(model.pointer.pos[0], TEST_X1);
			});
			it("Check that on setting y to 3 it is 2", function () {
				assert.equal(model.pointer.pos[1], TEST_Y1);
			});
		});
	});
	describe("backtrack.onTrack()", function() {
		describe("Move cursor to position 5,5", function() {
			before(function(){
				model.onTrack(5,5);
			});
			it("Check that no new node added.", function() {
				assert.equal(model.pointer.pos[0], TEST_X1);
				assert.equal(model.pointer.pos[1], TEST_Y1);
			});
			it("Check that current direction is no value(-1)", function(){
				assert.equal(model.currentDir, -1);
			});
		});
		describe("Move cursor to position 1,2", function() {
			before(function(){
				model.onTrack(1,2);
			});
			it("Check that no new node added.", function() {
				assert.equal(model.pointer.pos[0], TEST_X1);
				assert.equal(model.pointer.pos[1], TEST_Y1);
			});
			it("Check that current direction is no value(-1)", function(){
				assert.equal(model.currentDir, -1);
			});
		});
		describe("Move cursor to 3,2", function() {
			before(function(){
				model.onTrack(3,2);
			});
			it("Check that no new node added.", function() {
				assert.equal(model.pointer.pos[0], TEST_X1);
				assert.equal(model.pointer.pos[1], TEST_Y1);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 3);
			});
			it("Check that lastY has changed", function() {
				assert.equal(model.lastY, 2);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.east);
			});
		});
		describe("Move cursor to 5,2 ", function(){
			it("Check whether this is a new trail, false is new trail", function() {
				assert.isFalse(model.onTrack(5,2));
			});
			it("Check that no new node added.", function() {
				assert.equal(model.pointer.pos[0], TEST_X1);
				assert.equal(model.pointer.pos[1], TEST_Y1);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 5);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 2);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.east);
			});
		});
		describe("Move cursor y++ ", function(){
			before(function() {
				model.onTrack(5,3);
			});
			it("Check that new node added at 5,2.", function() {
				assert.equal(model.pointer.pos[0], 5);
				assert.equal(model.pointer.pos[1], 2);
			});
			it("Check that lastX is the same", function() {
				assert.equal(model.lastX, 5);
			});
			it("Check that lastY has changed", function() {
				assert.equal(model.lastY, 3);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.south);
			});
			it("Check that pointer direction is correct", function(){
				assert.equal(model.pointer.direction, directionCode.west);
			});
		});
		describe("Move cursor x-- ", function() {
			before(function(){
				model.onTrack(4,3);
			});
			it("Check that new node added at 5,3.", function() {
				assert.equal(model.pointer.pos[0], 5);
				assert.equal(model.pointer.pos[1], 3);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 4);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 3);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.west);
			});
			it("Check that backtrack direction is correct", function() {
				assert.equal(model.backtrackDir, directionCode.east);
			});
			it("Check that pointer direction is correct", function(){
				assert.equal(model.pointer.direction, directionCode.north);
			});
		});
		describe("Move cursor x-- again ", function() {
			before(function(){
				model.onTrack(3,3);
			});
			it("Check that last node added at 5,3.", function() {
				assert.equal(model.pointer.pos[0], 5);
				assert.equal(model.pointer.pos[1], 3);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 3);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 3);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.west);
			});
			it("Check that backtrack direction is correct", function() {
				assert.equal(model.backtrackDir, directionCode.east);
			});
		});
		describe("Backtrack on x and move x++", function(){
			it("Check whether this is a new trail, false is new trail", function() {
				assert.isTrue(model.onTrack(4,3));
			});
			it("Check that last node added at 5,3.", function() {
				assert.equal(model.pointer.pos[0], 5);
				assert.equal(model.pointer.pos[1], 3);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 4);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 3);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.east);
			});
			it("Check that backtrack direction is correct", function() {
				assert.equal(model.backtrackDir, directionCode.east);
			});
			it("Check node revisited", function(){
				assert.isFalse(model.nodeRevisited);
			});
		});
		describe("Backtrack on x and move x++ again", function(){
			it("Check whether this is a new trail, false is new trail", function() {
				assert.isTrue(model.onTrack(5,3));
			});
			it("Check that last node added at 5,3.", function() {
				assert.equal(model.pointer.pos[0], 5);
				assert.equal(model.pointer.pos[1], 3);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 5);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 3);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.east);
			});
			it("Check that backtrack direction is correct", function() {
				assert.equal(model.backtrackDir, directionCode.north);
			});
			it("Check node revisited", function(){
				assert.isTrue(model.nodeRevisited);
			});
		});
		describe("Backtrack on x and move y--", function(){
			it("Check whether this is a new trail, false is new trail", function() {
				assert.isTrue(model.onTrack(5,2));
			});
			it("Check that last node added at 5,3.", function() {
				assert.equal(model.pointer.pos[0], 5);
				assert.equal(model.pointer.pos[1], 2);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 5);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 2);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.north);
			});
			it("Check that backtrack direction is correct", function() {
				assert.equal(model.backtrackDir, directionCode.west);
			});
			it("Check node revisited", function(){
				assert.isTrue(model.nodeRevisited);
			});
		});
		describe("Move to 3,2", function(){
			it("Check whether this is a new trail, false is new trail", function() {
				assert.isTrue(model.onTrack(3,2));
			});
			it("Check that last node added at 5,3.", function() {
				assert.equal(model.pointer.pos[0], 1);
				assert.equal(model.pointer.pos[1], 2);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 3);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 2);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.west);
			});
			it("Check that backtrack direction is correct", function() {
				assert.equal(model.backtrackDir, directionCode.west);
			});
			it("Check node revisited", function(){
				assert.isFalse(model.nodeRevisited);
			});
		});
		describe("Move to 3,3", function(){
			it("Check whether this is a new trail, false is new trail", function() {
				assert.isFalse(model.onTrack(3,3));
			});
			it("Check that last node added at 5,3.", function() {
				assert.equal(model.pointer.pos[0], 3);
				assert.equal(model.pointer.pos[1], 2);
			});
			it("Check that lastX has changed", function() {
				assert.equal(model.lastX, 3);
			});
			it("Check that lastY is the same", function() {
				assert.equal(model.lastY, 3);
			});
			it("Check that current direction is correct", function(){
				assert.equal(model.currentDir, directionCode.south);
			});
			it("Check that backtrack direction is correct", function() {
				assert.equal(model.backtrackDir, directionCode.north);
			});
			it("Check node revisited", function(){
				assert.isFalse(model.nodeRevisited);
			});
		});

	});
});
