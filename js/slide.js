generateSlideStub = function(){
	var slide = document.createElement("DIV");
	slide.className = "slide";

	var p1 = document.createElement("DIV");
	var p2 = document.createElement("DIV");
	var p3 = document.createElement("DIV");

	p1.className = "circleDiv";
	p2.className = "circleDiv";
	p3.className = "circleDiv";

	p1.style.top  = "2vh";
	p1.style.left = "2vh";

	p2.style.top  = "6vh";
	p2.style.left = "8vh";

	p3.style.top  = "12vh";
	p3.style.left = "15vh";

	slide.appendChild(p1);
	slide.appendChild(p2);
	slide.appendChild(p3);

	return slide;
}

generateAddSlide = function(){
	var slide = document.createElement("DIV");
	slide.className = "slide";
	slide.id = "newSlide";

	var cross = document.createElement("DIV");
	cross.id = "cross";
	slide.append(cross);
	return slide;
}