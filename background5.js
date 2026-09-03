class Background5 {
	constructor() {
		this.pX, this.py;  // The coordinates of the Player
		this.gX, this.gY;  // The coordinates of the Goal
		this.pD;  // The diameter pf the player Circle
		this.gD = 5;  // The diameter pf the goal Circle
		this.randomNum = [[], [], []];
		this.swotch = true;
		this.score = 0;
		this.drank = 0;
		
		this.pD = random(15, 45);
		this.pX = width/2;
		this.pY = height/2;
		this.resetGoal();
		this.randomNum[0].push(random(0, 10000));
		this.randomNum[0].push(random(0, 10000));
		this.randomNum[1].push(random(0, 10000));
		this.randomNum[1].push(random(0, 10000));
		this.randomNum[2].push(random(0, 10000));
		this.randomNum[2].push(random(0, 10000));
	}
	
	update() {
		// Move the player
		this.movePlayer(10);
		this.randomNum[0][0] += 0.01;
		this.randomNum[1][0] += 0.01;
		this.pX += (noise(this.randomNum[1][0], this.randomNum[0][0]) - 0.5) * this.drank;
		this.pY += (noise(this.randomNum[0][0], this.randomNum[1][0]) - 0.5) * this.drank;
		// Drawing the Player
		fill(255, 0, 0);
		circle(this.pX, this.pY, this.pD);

		this.pD += (noise(this.randomNum[2][0], this.randomNum[2][1]) - 0.5) / 2;
		if (this.pD >= 45) {
		  this.pD = 45;
		}
		if (this.pD <= 15) {
		  this.pD = 15;
		}
		this.randomNum[2][0] += 0.01;
		this.randomNum[2][1] += 0.01;

		this.getBackHere(this.pD);
		// Drawing the Goal
		stroke(255, 255, 0);
		strokeWeight(0);
		fill("gold");
		this.randomNum[0][1] += 0.01;
		this.randomNum[1][1] += 0.01;
		this.gX += (noise(this.randomNum[1][1], this.randomNum[0][1]) - 0.5) * this.drank;
		this.gY += (noise(this.randomNum[0][1], this.randomNum[1][1]) - 0.5) * this.drank;
		circle(this.gX, this.gY, this.gD);
		this.getBackHere2(this.gD);
		// Draw the score and timer on the canvas
		stroke(0, 0, 0);
		strokeWeight(0);
		fill("black");
		textSize(28);
		// text("Score:  " + score + "    Time:  " + ((floor(millis() / 86400000))) + "." + ((floor(millis() / 3600000)) % 24) + "." + ((floor(millis() / 60000)) % 60) + "." + ((floor(millis() / 1000)) % 60) + "." + ((floor(millis() / 100)) % 10) + ((floor(millis() / 10)) % 10) + "    Size:  " + round(pD, 1), 0, 20);
		// Draw the fps on the canvas
		// text("Fps:  " + floor(frameRate()), width - 120, 20);
		// Check to see if the player has reached the Goal
		if(this.checkOnGoal()) {
		  this.resetGoal();
		  this.score++;
		  this.drank += 2.5;
		}
	}
	
	/*
	The resetGoal function resets the x and
	y coordinate of the goal.
	*/

	resetGoal() {
	  this.gX = random(this.gD, width - this.gD);
	  this.gY = random(this.gD, height - this.gD);
	}


	/*
	The movePlayer function moves the player
	*/

	movePlayer(speed) {
	  // If the player is holding down the "a" key
	  if(keyIsDown(65)) {
	    this.pX -= speed;
	  }
	  // If the player is holding down the "w" key
	  if(keyIsDown(87)) {
	    this.pY -= speed;
	  }
	  // If the player is holding down the "s" key
	  if(keyIsDown(83)) {
	    this.pY += speed;
	  }
	  // If the player is holding down the "d" key
	  if(keyIsDown(68)) {
	    this.pX += speed;
	  }
	  // If the player is holding down the "left arrow" key
	  if(keyIsDown(LEFT_ARROW)) {
	    this.pX -= speed;
	  }
	  // If the player is holding down the "right arrow" key
	  if(keyIsDown(RIGHT_ARROW)) {
	    this.pX += speed;
	  }
	  // If the player is holding down the "up arrow" key
	  if(keyIsDown(UP_ARROW)) {
	    this.pY -= speed;
	  }
	  // If the player is holding down the "down arrow" key
	  if(keyIsDown(DOWN_ARROW)) {
	    this.pY += speed;
	  }
	}

	/*
	Checks to see if the Player is on the Goal. If so, 
	returns true and otherwise returns false.
	*/

	checkOnGoal() {
	  // Get the distance from the centers of each circle
	  let d = dist(this.pX, this.pY, this.gX, this.gY);
	  // Test to see if the distance is less than the sum
	  // of the radii of the circles
	  if(d <= this.gD/2 + this.pD/2) {
	    return true;
	  }
	  else {
	    return false;
	  }
	}

	/*
	The getBackHere function moves the player back 
	into bounds if they are out of bounds.
	*/

	getBackHere(d) {
	    if (this.pX >= width + d) {
	      this.pX = (d * -1);
	    }
	    else if (this.pX <= d * -1) {
	      this.pX = (d + width);
	    }
	    if (this.pY >= height + d) {
	      this.pY = (d * -1);
	    }
	    else if (this.pY <=  d * -1) {
	      this.pY = (d + height);
	    }
	}

	getBackHere2(d) {
	    if (this.gX >= width + d) {
	      this.gX = (d * -1);
	    }
	    else if (this.gX <= d * -1) {
	      this.gX = (d + width);
	    }
	    if (this.gY >= height + d) {
	      this.gY = (d * -1);
	    }
	    else if (this.gY <=  d * -1) {
	      this.gY = (d + height);
	    }
	}
}
