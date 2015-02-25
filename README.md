# Maze [![Build Status](https://travis-ci.org/CSC510-2015-Axitron/maze.svg?branch=master)](https://travis-ci.org/CSC510-2015-Axitron/maze)
Repo for Maze game

##Prerequisites
Due to a limitation in Chrome's origin policy handling of files, the project is most easily viewed in Firefox or Internet Explorer 11.

##Usage
To run the current iteration of the game (in IE11 or Firefox) do the following:

- Clone the repo:
	
    `git clone https://github.com/CSC510-2015-Axitron/maze.git`

- Open index.html in the main directory

- Alternatively open index.html from the test directory to run current test framework.

- Use the arrow keys to move around the board.

To run under Chrome:

- Perform the same cloning step into a web host directory (such as NCSU's www4 public html space)

- It will not run locally unless you completely disable same-origin-policy restrictions in Chrome, which applies to the entire browser, not per tab

#Testing Locally
So you may say, I'd like to test this on my machine instead of sending it to Travis CI to fail.  Please do that!


##Prerequisites

- Nodejs and npm:  If you don't have them you can get them [here](http://nodejs.org/download/).

- g++: One of the build tools requires g++ so you'll need to get that too:  
	
	
	
    - In OSX: If you have the command line   developer tools you'll meet this requirement without anything further.  If you don't have the command line developer tools you'll be prompted to install and download when you try to run npm install anyway.
	
    - Windows: Do whatever you crazy windows people do for stuff like this.

    - If you're in ubuntu you'll run:
	
   `sudo apt-get update`
	
  `sudo apt-get install g++`

##Usage
Run two simple commands:

`npm install`

`npm test`

Should npm install fail you may need to run it with the sudo command.  Also npm has some bizarre behavior from time to time so if it hangs just rerun it.