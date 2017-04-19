//Generates a slide image for the frames bar.
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

	slide.appendChild(p1);
	slide.appendChild(p2);
	slide.appendChild(p3);

	return slide;
}

//Generates a close icon for the Slides (can probably be repurposed for draggable elements)
generateX = function(){
	var redBox = document.createElement("DIV");
	redBox.className = "redBox";

	return redBox;
}

//Generates the slide that functions as an add button.
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