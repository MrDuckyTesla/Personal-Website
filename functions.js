
    	function setBackground(background) {localStorage.setItem("background", background);}
    	function getBackground() {return localStorage.getItem("background");}
    	function resetBackground() {
    		setBackground("Random");
    		sliderBkg.value = 5;
    		outputBkg.textContent = "Random";
    		parent.changeSaved();
    	}

    	function setBkgColor(color) {localStorage.setItem("bkgcolor", color); parent.colorBkgChanged = true;}
    	function getBkgColor() {return localStorage.getItem("bkgcolor");}
    	function resetBkgColor() {
    		parent.setBkgColor("60, 60, 60"); 
    		sliderBkgClrR.value = 60;
    		sliderBkgClrG.value = 60;
    		sliderBkgClrB.value = 60;
    		outputBkgClr.textContent = "Color: "+getNewBkgColorStr();
    	}

    	function setPixelation(pixelation) {localStorage.setItem("pixel", pixelation)}
    	function getPixelation() {return localStorage.getItem("pixel");}
    	function resetPixelation() {
    		setPixelation(10);
    		sliderPix.value = 10;
    		outputPix.textContent = "Pixelation: "+getPixelation()+"x";
    	}

    	function setOpacity(opacity) {localStorage.setItem("opacity", opacity);}
    	function getOpacity() {return localStorage.getItem("opacity");}
    	function resetOpacity() {
    		setOpacity(30);
    		sliderOpa.value = 30;
    		outputOpa.textContent = getOpacityVal(sliderOpa.value);
    		document.documentElement.style.setProperty("--bg-opacity", sliderOpa.value / 100);
			parent.document.documentElement.style.setProperty("--bg-opacity", sliderOpa.value / 100);
    	}

    	function setOpaColor(color) {localStorage.setItem("opacolor", color);}
    	function getOpaColor() {return localStorage.getItem("opacolor");}
    	function resetOpaColor() {
    		setOpaColor("255, 255, 255"); 
    		sliderOpaClrR.value = 255;
    		sliderOpaClrG.value = 255;
    		sliderOpaClrB.value = 255;
    		document.documentElement.style.setProperty("--bg-rval", sliderOpaClrR.value);
    		document.documentElement.style.setProperty("--bg-gval", sliderOpaClrG.value);
    		document.documentElement.style.setProperty("--bg-bval", sliderOpaClrB.value);
			parent.document.documentElement.style.setProperty("--bg-rval", sliderOpaClrR.value);
			parent.document.documentElement.style.setProperty("--bg-gval", sliderOpaClrG.value);
			parent.document.documentElement.style.setProperty("--bg-bval", sliderOpaClrB.value);
    		outputOpaClr.textContent = "Color: "+getNewOpaColorStr();
    	}

    	function setTextSize(size) {localStorage.setItem("textsize", size);}
    	function getTextSize() {return localStorage.getItem("textsize");}
    	function resetTextSize() {
    		setTextSize(40);
    		sliderTxtP.value = 40;
    		document.documentElement.style.setProperty("--tx-fval", getTextSize()+"px");
			parent.document.documentElement.style.setProperty("--tx-fval", getTextSize()+"px");
    		outputTxtP.textContent = sliderPix.value+"px";
    	}

    	function setTextColor(color) {localStorage.setItem("txtcolor", color);}
    	function getTextColor() {return localStorage.getItem("txtcolor");}
    	function resetTextColor() {
    		setTextColor("0, 0, 0"); 
    		sliderTxtClrR.value = 0;
    		sliderTxtClrG.value = 0;
    		sliderTxtClrB.value = 0
    		document.documentElement.style.setProperty("--tx-trval", sliderTxtClrR.value);
    		document.documentElement.style.setProperty("--tx-tgval", sliderTxtClrG.value);
    		document.documentElement.style.setProperty("--tx-tbval", sliderTxtClrB.value);
			parent.document.documentElement.style.setProperty("--tx-trval", sliderTxtClrR.value);
			parent.document.documentElement.style.setProperty("--tx-tgval", sliderTxtClrG.value);
			parent.document.documentElement.style.setProperty("--tx-tbval", sliderTxtClrB.value);
    		outputTxtClr.textContent = "Color: "+getNewTxtColorStr();
    	}

    	function setStrokeSize(size) {localStorage.setItem("strokesize", size)}
    	function getStrokeSize() {return localStorage.getItem("strokesize");}
    	function resetStrokeSize() {
    		setStrokeSize(1);
    		sliderStrP.value = 1;
    		document.documentElement.style.setProperty("--tx-sval", getStrokeSize()+"px");
			parent.document.documentElement.style.setProperty("--tx-sval", getStrokeSize()+"px");
    		outputStrP.textContent = "Stroke: "+sliderStrP.value+"px";
    	}

    	function setStrokeColor(color) {localStorage.setItem("strcolor", color);;}
    	function getStrokeColor() {return localStorage.getItem("strcolor");}
    	function resetStrokeColor() {
    		setStrokeColor("255, 255, 255"); 
    		sliderStrClrR.value = 255;
    		sliderStrClrG.value = 255;
    		sliderStrClrB.value = 255
    		document.documentElement.style.setProperty("--tx-srval", sliderStrClrR.value);
    		document.documentElement.style.setProperty("--tx-sgval", sliderStrClrG.value);
    		document.documentElement.style.setProperty("--tx-sbval", sliderStrClrB.value);
			parent.document.documentElement.style.setProperty("--tx-srval", sliderStrClrR.value);
			parent.document.documentElement.style.setProperty("--tx-sgval", sliderStrClrG.value);
			parent.document.documentElement.style.setProperty("--tx-sbval", sliderStrClrB.value);
    		outputClrStr.textContent = "Stroke Color: "+getNewStrColorStr();
    	}