class Background3{
	
	constructor() {
		frameRate(30);
		this.line1;
		this.line2;
		this.line3;
		this.line4;
		this.circ1 = this.squareImage(width, height, 80, width, width, [111, 111, 255, 100], [255, 111, 111, 100]);
		this.circ2;
	}
	
	update() {
		// background(50);
		image(this.circ1, 0, 0, width, height);
		let res = floor((width + height) / 40);
		if (pmouseX != mouseX || pmouseY != mouseY || frameCount == 1) {  // If the mouse moves
		  this.line1 = this.lineImage(width/3, height/8, mouseX, mouseY, res, 40, width, [111, 111, 255, 255]);
		  this.line2 = this.lineImage(width/8, height/2, mouseX, mouseY, res, 60, width, [111, 111, 255, 255]);
		  this.line3 = this.lineImage(width/1.5, height/1.5, mouseX, mouseY, res, 80, width, [111, 111, 255, 255]);
		  this.line4 = this.lineImage(width/1.5, height/4, mouseX, mouseY, res, 100, width, [111, 111, 255, 255]);
		  this.circ2 = this.circleImage(mouseX, mouseY, res, res * 3, width, [255, 111, 111, 255], [111, 111, 255, 255]);
		  this.line1.copy(this.line2, 0, 0, width, height, 0, 0, width, height);
		  this.line1.copy(this.line3, 0, 0, width, height, 0, 0, width, height);
		  this.line1.copy(this.line4, 0, 0, width, height, 0, 0, width, height);
		  this.line1.copy(this.circ2, 0, 0, width, height, 0, 0, width, height);
		  this.line1 = this.outline(this.line1, [111, 255, 255, 255]);
		}
		image(this.line1, 0, 0, width, height)
	}
	
	outline(img, clr2=[255, 255, 255, 255], clr1=[0, 0, 0, 0]) {
	  img.loadPixels();  // Load pixels
	  let len = img.pixels.length, imgWid4 = img.width*4;
	  for (let i = 4; i < len; i += 4) {
	    if (img.pixels[i+3] != 0 && !this.compareColorList(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3], clr2)) {  // Check if transparent pixel
	      // Check if there is a blank pixel to the left, right, above or below the normal pixel
	      if ((this.compareColorList(img.pixels[i-4], img.pixels[i-3], img.pixels[i-2], img.pixels[i-1], clr1) && i/4%img.width!=0)) {
	        img.pixels[i-4] = clr2[0];
	        img.pixels[i-3] = clr2[1];
	        img.pixels[i-2] = clr2[2];
	        img.pixels[i-1] = clr2[3];
	      }
	      else if ((this.compareColorList(img.pixels[i+4], img.pixels[i+5], img.pixels[i+6], img.pixels[i+7], clr1) && (i+4)/4%img.width!=0)) {
	        img.pixels[i+4] = clr2[0];
	        img.pixels[i+5] = clr2[1];
	        img.pixels[i+6] = clr2[2];
	        img.pixels[i+7] = clr2[3];
	      }
	      if (this.compareColorList(img.pixels[i-imgWid4], img.pixels[i-imgWid4+1], img.pixels[i-imgWid4+2], img.pixels[i-imgWid4+3], clr1)) {
	        img.pixels[i-imgWid4] = clr2[0];
	        img.pixels[i-imgWid4+1] = clr2[1];
	        img.pixels[i-imgWid4+2] = clr2[2];
	        img.pixels[i-imgWid4+3] = clr2[3];
	      }
	      else if (this.compareColorList(img.pixels[i+imgWid4], img.pixels[i+imgWid4+1], img.pixels[i+imgWid4+2], img.pixels[i+imgWid4+3], clr1)) {
	        img.pixels[i+imgWid4] = clr2[0];
	        img.pixels[i+imgWid4+1] = clr2[1];
	        img.pixels[i+imgWid4+2] = clr2[2];
	        img.pixels[i+imgWid4+3] = clr2[3]; 
	      }
	    }
	  }
	  img.updatePixels();  // Update image
	  return img;  // Return new image
	}

	compareColorList(r, g, b, a, col) {
	  // Checks if two colors are not different
	  return r == col[0] && g == col[1] && b == col[2] && a == col[3];
	}

	lineImage(x1, y1, x2, y2, res, thicc, sizeDisplay, clr=[0, 0, 0, 255]) {
	  let img = createImage(res, res), row = 0, sclW = width/res, sclH = height/res, thicWid = thicc+max(sclW, sclH)/2, c1, c2, minX, minY, cline;
	  img.loadPixels();  // Load pixels
	  let len = img.pixels.length;
	  for (let i = 0; i < len; i += 4) {  // Iterate through pixel list
	    if (i / 4 % res == 0 && i != 0) row += 1;  // If we reach the next row of pixels, add to the Y
	    // calculate center X and Y coordinate of each Pixel
	    c1 = i / 4 % res * sclW + sclW/2;
	    c2 = row * sclH + sclH/2;
	    // Check if within bounding box
	    minX = min(x1, x2)-thicWid; minY = min(y1, y2)-thicWid;
	    if (this.pointRectCollide(c1, c2, minX, minY, max(x1, x2)+thicWid-minX, max(y1, y2)+thicWid-minY)) {
	      // Check for closest point on line
	      cline = this.closestPointLine(c1, c2, x1, y1, x2, y2);
	      // Check if pixel is within the thickness of the line
	      if (dist(cline[0], cline[1], c1, c2) <= thicc) {
	        // Change colors
	        img.pixels[i] = clr[0];
	        img.pixels[i+1] = clr[1];
	        img.pixels[i+2] = clr[2];
	        img.pixels[i+3] = clr[3];
	      }
	    }
	  }
	  img.updatePixels();  // Update image
	  return img;
	}

	circleImage(x, y, res, thicc, sizeDisplay, clr1=[111, 111, 255, 255], clr2=[111, 111, 255, 255]) {
	  let img = createImage(res, res), row = 0, sclW = width/res, sclH = height/res, c1, c2, ratio;
	  img.loadPixels();  // Load pixels
	  let len = img.pixels.length;
	  for (let i = 0; i < len; i += 4) {  // Iterate through pixel list
	    if (i / 4 % res == 0 && i != 0) row += 1;  // If we reach the next row of pixels, add to the Y
	    // calculate center X and Y coordinate of each Pixel
	    c1 = i / 4 % res * sclW + sclW/2;
	    c2 = row * sclH + sclH/2;
	    // Check if pixel is within the thickness of the line
	    let dis = dist(x, y, c1, c2);
	    if (dis <= thicc) {
	      ratio = dis/thicc;
	      // Change colors
	      img.pixels[i] = lerp(clr1[0], clr2[0], ratio);
	      img.pixels[i+1] = lerp(clr1[1], clr2[1], ratio);
	      img.pixels[i+2] = lerp(clr1[2], clr2[2], ratio);
	      img.pixels[i+3] = lerp(clr1[3], clr2[3], ratio);
	    }
	  }
	  img.updatePixels();  // Update image
	  return img;
	}

	squareImage(x, y, res, thicc, sizeDisplay, clr1=[111, 111, 255, 255], clr2=[111, 111, 255, 255]) {
	  let img = createImage(res, res), row = 0, sclW = sizeDisplay/res, c1, c2, ratio;
	  img.loadPixels();  // Load pixels
	  let len = img.pixels.length;
	  for (let i = 0; i < len; i += 4) {  // Iterate through pixel list
	    if (i / 4 % res == 0 && i != 0) row += 1;  // If we reach the next row of pixels, add to the Y
	    // calculate center X and Y coordinate of each Pixel
	    c1 = i / 4 % res * sclW + sclW/2;
	    c2 = row * sclW + sclW/2;
	    // Check if pixel is within the thickness of the line
	    let dis = dist(x, y, c1, c2);
	    ratio = dis/thicc;
	    // Change colors
	    img.pixels[i] = lerp(clr1[0], clr2[0], ratio);
	    img.pixels[i+1] = lerp(clr1[1], clr2[1], ratio);
	    img.pixels[i+2] = lerp(clr1[2], clr2[2], ratio);
	    img.pixels[i+3] = lerp(clr1[3], clr2[3], ratio);
	  }
	  img.updatePixels();  // Update image
	  return img;
	}

	closestPointLine(px, py, x1, y1, x2, y2) {
	  let m1, m2, b1, b2, iX, iY;
	  // Find slopes
	  m1 = (y2 - y1) / (x2 - x1);
	  m2 = -1/m1;
	  // Find y intercepts
	  b1 = y1 - m1 * x1;
	  b2 = py - m2 * px;
	  // Find X and Y coords while also dealing with evil slopes
	  if (y2 - y1 == 0) iX = px;
	  else iX = x1 - x2 == 0? x1 : (b1 - b2) / (m2 - m1);
	  iY = x2 - x1 == 0? py : m1 * iX + b1;
	  // Check if point is within line
	  if (iX > max(x1, x2)) iX = max(x1,x2);
	  else if (iX < min(x1, x2)) iX = min(x1,x2);
	  if (iY > max(y1, y2)) iY = max(y1,y2);
	  else if (iY < min(y1, y2)) iY = min(y1,y2);
	  return [iX,iY];
	}

	pointRectCollide(px, py, rx, ry, rw, rh) {
	    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
	}

	pointCircCollide(px, py, cx, cy, cr) {
	    return (dist(px, py, cx, cy) <= cr);
	  }
	
}