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

	p1.style.top  = "15px";
	p1.style.left = "20px";

	p2.style.top  = "30px";
	p2.style.left = "70px";

	p3.style.top  = "45px";
	p3.style.left = "120px";

	//slide.appendChild(p1);
	//slide.appendChild(p2);
	//slide.appendChild(p3);

	return slide;
}

generateX = function(){
	var redBox = document.createElement("DIV");
	redBox.className = "redBox";

	var span = document.createElement("SPAN");
	span.innerHTML = "X";
	redBox.appendChild(span);
	return redBox;
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