let bg, isMobile, canvas, draggingWindow, offsetX, offsetY, spawnX = 0, spawnY = 0;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
  	canvas.parent("p5js");
  	noSmooth(); noStroke();
  	// isMobile = /android|iphone|/i.test(navigator.userAgent);
	if (getBackground() == null) {setBackground("Random");}
	if (getBkgColor() == null) {setBkgColor("60, 60, 60");}
	if (getOpacity() == null) {setOpacity(30);}
	if (getOpaColor() == null) {setOpaColor("255, 255, 255");}
	if (getPixelation() == null) {setPixelation(10);}
	if (getTextSize() == null) {setTextSize(40);}
	if (getTextColor() == null) {setTextColor("0, 0, 0");}
	if (getStrokeSize() == null) {setStrokeSize(1);}
	if (getStrokeColor() == null) {setStrokeColor("255, 255, 255");}
	// Draw background
	changeSaved();
	// Opacity value
	document.documentElement.style.setProperty("--bg-opacity", getOpacity() / 100);
	// Opacity color
	colorSaved = getOpaColor().split(",");
	document.documentElement.style.setProperty("--bg-rval", Number(colorSaved[0]));
	document.documentElement.style.setProperty("--bg-gval", Number(colorSaved[1]));
	document.documentElement.style.setProperty("--bg-bval", Number(colorSaved[2]));
	// Text size
	document.documentElement.style.setProperty("--tx-fval", getTextSize()+"px");
	// Text color
	colorSaved = getTextColor().split(",");
	document.documentElement.style.setProperty("--tx-trval", Number(colorSaved[0]));
	document.documentElement.style.setProperty("--tx-tgval", Number(colorSaved[1]));
	document.documentElement.style.setProperty("--tx-tbval", Number(colorSaved[2]));
	// Stroke size
	document.documentElement.style.setProperty("--tx-sval", getStrokeSize()+"px");
	// Stroke color
	colorSaved = getStrokeColor().split(",");
	document.documentElement.style.setProperty("--tx-srval", Number(colorSaved[0]));
	document.documentElement.style.setProperty("--tx-sgval", Number(colorSaved[1]));
	document.documentElement.style.setProperty("--tx-sbval", Number(colorSaved[2]));
	// const x = document.getElementById("p5js");
	window.colorBkgChanged = true;
	
	addWindow('windows/main/websiteinfo/index.html', 200, 200, 'website_info.txt', 800, 600);
	
	document.addEventListener("pointerdown", (e) => {
		const titleBar = e.target.closest(".title-bar");
		if (titleBar != null) {
			draggingWindow = titleBar.parentElement;
			offsetX = e.clientX - draggingWindow.offsetLeft;
			offsetY = e.clientY - draggingWindow.offsetTop;
			draggingWindow.querySelector("iframe").style.pointerEvents = "none";
			document.body.style.userSelect = "none";
		}
	})
	
	document.addEventListener("pointermove", (e) => {
	    if (draggingWindow != null) {
			draggingWindow.style.left = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - draggingWindow.offsetWidth)) + "px";
			draggingWindow.style.top = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - draggingWindow.offsetHeight)) + "px";
		}
	});

	window.addEventListener("pointerup", () => {
		if (draggingWindow != null){
			draggingWindow.querySelector("iframe").style.pointerEvents = "auto";	
	    	draggingWindow = null;
			document.body.style.userSelect = "auto";
		}
	});
	

}

let t = new ToolKit();


function draw() {
  	bg.update();
	if (getPixelation() != 1) {t.pixelate(getPixelation());}
	document.documentElement.style.setProperty("--tx-wid", windowWidth/2+"px");
}

function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}

function changeSnow() {bg = new SnowFall();}
function changeBounce() {bg = new BallBounce(canvas);}
function changeSnake() {bg = new SnakeMove();}
function changeRadial() {bg = new ParticalRadial();}
function changeRandom() {
	num = random();
	if (num > 0.75) {bg = new SnowFall();}
	else if (num > 0.5) {bg = new BallBounce(canvas);}
	else if (num > 0.25) {bg = new SnakeMove();}
	else if (num > 0) {bg = new ParticalRadial();}
} function changeSaved() {
	switch (getBackground()) {
		case "Off": bg = new Off(); break;
		case "Bouncy": changeBounce(); break;
		case "Repel": changeSnow(); break;
		case "Radial": changeRadial(); break;
		case "Follow": changeSnake(); break;
		case "Random": changeRandom(); break;
		default: changeRandom(); break;
	}
}

function addWindow(url, x, y, text, w=800, h=800) {
	const windowElement = document.createElement("div");
	const titleBar = document.createElement("div");
	const iframe = document.createElement("iframe");
	const closeButton = document.createElement("button");
	
	windowElement.style.position = "absolute";
	windowElement.style.left = x + "px";
	windowElement.style.top = y + "px";
	windowElement.style.width = w + "px";
	windowElement.style.height = h + "px";
	windowElement.style.border = "1px solid #ccc";
	windowElement.style.borderRadius = "10px";
	windowElement.style.overflow = "hidden";
	windowElement.style.zIndex = "2";
	windowElement.style.boxSizing = "border-box";
	windowElement.style.resize = "both";
	
	titleBar.style.height = "30px";
	titleBar.style.background = "#222";
	titleBar.style.cursor = "move";
	titleBar.style.touchAction = "none";
	titleBar.classList.add("title-bar");
	titleBar.textContent = text;
	titleBar.style.lineHeight = "30px";
	titleBar.style.textIndent = "10px";
	titleBar.style.fontSize = "revert";
	
	iframe.src = url; 
	iframe.style.position = "absolute";
	iframe.style.left = "0";
	iframe.style.top = "30px";
	iframe.style.width = "100%";
	iframe.style.height = "calc(100% - 30px)";
	iframe.style.border = "none";
	
	closeButton.textContent = "×";
	closeButton.style.position = "absolute";
	closeButton.style.right = "0";
	closeButton.style.top = "0";
	closeButton.style.height = "30px";
	closeButton.style.width = "30px";
	closeButton.style.border = "none";
	closeButton.style.background = "transparent";
	closeButton.style.color = "white";
	closeButton.style.fontSize = "20px";
	closeButton.style.cursor = "pointer";
	
	titleBar.appendChild(closeButton);
	windowElement.appendChild(titleBar);
	windowElement.appendChild(iframe);
	
	document.getElementById("iframes").appendChild(windowElement);
	
	closeButton.addEventListener("click", () => {
	    windowElement.remove();
	});
	
	return windowElement;
}
