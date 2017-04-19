var slide_id = 0;
var selected_formation = "#formation0";
var selected_slide = "#formation_stub0";
var deltaX;
var deltaY;

function generateSlideStub(){
	var slide = document.createElement("DIV");
	slide.className = "slide";
    slide.id = "formation_stub" + slide_id.toString();
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

function generateNewFormation() {
    var newFormation = document.createElement("DIV");
    newFormation.id = "formation" + slide_id.toString();
    newFormation.className = "formation-screen";
    $("#formation-pane").append(newFormation);
    if (slide_id != 0) {
        var children = $(selected_formation).children();
        children.each(function() {
            var childClone = $(this).clone();
            childClone.className = 'draggable-icon';
            $("#formation" + slide_id.toString()).append(childClone);
        });
    }
    return newFormation;
}

function new_slide() {
  generateNewFormation();
  var slide = generateSlideStub();
  var addSlide = generateAddSlide();
    
  var frames = document.getElementById("frames");
  var frameChildren = frames.childNodes;
  var size = frameChildren.length;

  frames.removeChild(frameChildren[size-1]);

  frames.appendChild(slide);
  frames.appendChild(addSlide);
    
  $(selected_slide).css('border', '1px solid #537E8C');
  selected_slide = "#formation_stub" + slide_id.toString();
  $(selected_slide).css('border', '3px solid #537E8C');
    
  (function(slide_id) {
        $("#formation_stub" + slide_id.toString()).click(function() {
            $(selected_slide).css('border', '1px solid #537E8C');
            selected_slide = "#formation_stub" + slide_id.toString();
            $(selected_slide).css('border', '3px solid #537E8C');
            $(selected_formation).hide();
            selected_formation = "#formation" + slide_id.toString();
            $(selected_formation).show();
        });
  })(slide_id);

  slide_id += 1;
}

generateX = function(){
	var redBox = document.createElement("DIV");
	redBox.className = "redBox";
//    redBox.innerHTML = "X";
	return redBox;
}

//Generates the slide that functions as an add button.
generateAddSlide = function(){
	var slide = document.createElement("DIV");
	slide.className = "slide";
	slide.id = "newSlide";

    var newFormation = $(selected_formation).clone();
//    $('#right').append
	var plus = document.createElement("DIV");
//    plus.src = 'images/plus.png';
    plus.id = 'cross';
    
	slide.append(plus);
	return slide;
}

$(function() {
    boundingBox = document.getElementById("formation-pane").getBoundingClientRect();
    
    $(".draggable-icon").draggable({
        revert: "invalid",
        scroll: false,
        stack: ".draggable-icon",
        helper: "clone",
        appendTo: "#main",
        start: function(event, ui) {
            var dropped = this;
            var mouseX = parseInt(event.pageX);
            var mouseY = parseInt(event.pageY);
            var currentX = parseInt($(dropped).offset().left, 10);
            var currentY = parseInt($(dropped).offset().top, 10);
            deltaX = mouseX - currentX;
            deltaY = mouseY - currentY;
            elementWidth = parseInt($(dropped).css('width'), 10);
            elementHeight = parseInt($(dropped).css('height'), 10);
        }
    });
    $("#formation-pane").droppable({
        accept: function(e) {
            if(e.hasClass("draggable-icon") || e.hasClass("formation-icon")) {
                return true;
            }
        },

        drop: function(event, ui) {
            var dropped;
            var positionX = parseInt(event.pageX);
            var positionY = parseInt(event.pageY);
            var offsetX = $("#formation-pane").offset().left;
            var offsetY = $("#formation-pane").offset().top;
            newX = positionX-deltaX;
            newY = positionY-deltaY;
            
            if(ui.draggable.hasClass("draggable-icon")) {
                dropped = ui.draggable.clone();
                $(dropped).appendTo(selected_formation);
                $(dropped).addClass("formation-icon");
                $(dropped).removeClass("draggable-icon");
                $(dropped).css('position', 'absolute');
//                $(dropped).css({'top': positionY-offsetY-deltaY, 'left': positionX-offsetX-deltaX});

                // bound where the icon can be dropped
                if (newX >= boundingBox.left && newY >= boundingBox.top && newX+elementWidth <= boundingBox.right && newY+elementHeight <= boundingBox.bottom) {
                    $(dropped).css({'top': newY-offsetY, 'left': newX-offsetX});
                } else {
                    $(dropped).remove();
                }
            } else if (ui.draggable.hasClass("formation-icon")) {
                dropped = ui.draggable;
                var positionX = parseInt(event.pageX);
                var positionY = parseInt(event.pageY);
                $(dropped).css('position', 'absolute');
                $(dropped).css({'top': positionY-deltaY, 'left': positionX-deltaX});
            }
            $(dropped).draggable({
                revert: function(e) {
                    if (newX >= boundingBox.left && newY >= boundingBox.top && newX+elementWidth <= boundingBox.right && newY+elementHeight <= boundingBox.bottom) {
                        return false;
                    } else {
                        return true;
                    }
                },
                stack: ".formation-icon",
                start: function(event, ui) {
                    // update the deltaX and deltaY
                    var dropped = this;
                    var mouseX = parseInt(event.pageX);
                    var mouseY = parseInt(event.pageY);
                    var offsetX = $("#formation-pane").offset().left;
                    var offsetY = $("#formation-pane").offset().top;
                    var currentX = parseInt($(dropped).offset().left, 10);
                    var currentY = parseInt($(dropped).offset().top, 10);
                    deltaX = mouseX + offsetX - currentX;
                    deltaY = mouseY + offsetY - currentY;
                    elementWidth = parseInt($(dropped).css('width'), 10);
                    elementHeight = parseInt($(dropped).css('height'), 10);
                }
            });
        }
    });
});

$(document).ready(function() {
  var start = generateAddSlide();
  document.getElementById("frames").append(start);
  new_slide();
});

$(document).on('click',"#newSlide", function(evt){
    new_slide();
});

$(document).on('click',".redBox", function(evt){
  var slide = evt.target.parentNode;
  while(slide.className !== "slide"){
    slide = slide.parentNode;
  }
  slide.id = "remove";
  $("#remove").remove();
});
