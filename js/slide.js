generateSlideStub = function(){
	var slide = document.createElement("DIV");
	slide.className = "slide";
	slide.appendChild(generateX());

	var p1 = document.createElement("DIV");
	var p2 = document.createElement("DIV");
	var p3 = document.createElement("DIV");

	p1.className = "circleDiv";
	p2.className = "circleDiv";
	p3.className = "circleDiv";

	p1.style.top  = "5px";
	p1.style.left = "20px";

	p2.style.top  = "20px";
	p2.style.left = "80px";

	p3.style.top  = "35px";
	p3.style.left = "140px";

	slide.appendChild(p1);
	slide.appendChild(p2);
	slide.appendChild(p3);

	return slide;
}

generateX = function(){
	var redBox = document.createElement("DIV");
	redBox.className = "redBox";
//    redBox.html = "X";
	return redBox;
}

generateAddSlide = function(){
	var slide = document.createElement("DIV");
	slide.className = "slide";
	slide.id = "newSlide";

	var plus = document.createElement("DIV");
//    plus.src = 'images/plus.png';
    plus.id = 'cross';
    
	slide.append(plus);
	return slide;
}