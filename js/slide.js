var slide_id = 0;
var selected_formation = "#formation0";
var selected_slide = "#formation_stub0";
var deltaX;
var deltaY;
var elementWidth;
var elementHeight;
var newX;
var newY;
var boundingBox;

function generateSlideStub(){
	var slide = document.createElement("DIV");
	slide.className = "slide";
    slide.id = "formation_stub" + slide_id.toString();
	slide.appendChild(generateX());
	return slide;
}

// generates a new div for a new formation, adds to #formation-pane div
function generateNewFormation() {
    var newFormation = document.createElement("DIV");
    newFormation.id = "formation" + slide_id.toString();
    newFormation.className = "formation-screen";
    $("#formation-pane").append(newFormation);
    if (slide_id != 0) {
        var children = $(selected_formation).children();
        children.each(function() {
            var childClone = $(this).clone();
            childClone.addClass("formation-icon");
            $("#formation" + slide_id.toString()).append(childClone);
        });
    }
    return newFormation;
}

function select_slide(slide_id) {
    $(selected_slide).css('border', '1px solid #537E8C');
    selected_slide = "#formation_stub" + slide_id.toString();
    $(selected_slide).css('border', '3px solid #537E8C');
    $(selected_formation).hide();
    selected_formation = "#formation" + slide_id.toString();
    $(selected_formation).show();
    console.log(slide_id.toString())
    $('#bubble' + slide_id.toString()).css({'background-color':'white'});
    $('#bubble' + previous.toString()).css({'background-color':'black'});
    previous = slide_id
    var time = $('#bubble' + slide_id.toString())[0].getAttribute("time");
    console.log(time);
    console.log(document.getElementById('player').currentTime);
    document.getElementById('player').currentTime = time;
    
}

// clones previous formation into new formation
function new_slide() {
  generateNewFormation();
  var slide = generateSlideStub();

  if($(selected_slide).length){// This is not the ready call
  	slide = $(selected_slide)[0].cloneNode(true);
  	slide.id = "formation_stub" + slide_id.toString();
  }

  var addSlide = generateAddSlide();
    
  var frames = document.getElementById("frames");
  var frameChildren = frames.childNodes;https://www.messenger.com/t/1341535865921009
  var size = frameChildren.length;

  frames.removeChild(frameChildren[size-1]);

  frames.appendChild(slide);
  frames.appendChild(addSlide);
    
  $(selected_slide).css('border', '1px solid #537E8C');
  selected_slide = "#formation_stub" + slide_id.toString();
  $(selected_slide).css('border', '3px solid #537E8C');
  selected_formation = "#formation" + slide_id.toString();
    
  (function(slide_id) {
        $("#formation_stub" + slide_id.toString()).click(function() {
            select_slide(slide_id);
        });
  })(slide_id);

  slide_id += 1;
}

// creates an X for mini formation slides for deletion
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

// when page loads
$(function() {
    boundingBox = document.getElementById("formation-pane").getBoundingClientRect();
    // console.log('start');
    // console.log(boundingBox);
    var offsetX = parseInt($("#formation-pane").offset().left, 10);
    var offsetY = parseInt($("#formation-pane").offset().top, 10);

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

    // drop back in menu to delete icons
    $("#left").droppable({
        accept: function(e) {
            if(e.hasClass("formation-icon")) {
                return true;
            }
            return false;
        },
        drop: function(event, ui) {
            dropped = ui.draggable;
            $(dropped).fadeOut(200);
        }
    });

    $("#formation-pane").droppable({
        accept: function(e) {
            if(e.hasClass("draggable-icon") || e.hasClass("formation-icon")) {
                return true;
            }
            return false;
        },

        drop: function(event, ui) {
            // console.log('dropped');
            // console.log(boundingBox);
            var dropped;
            var positionX = parseInt(event.pageX);
            var positionY = parseInt(event.pageY);
            newX = positionX-deltaX;
            newY = positionY-deltaY;
            
            if(ui.draggable.hasClass("draggable-icon")) {
                dropped = ui.draggable.clone();
                $(dropped).appendTo(selected_formation);
                $(dropped).addClass("formation-icon");
                $(dropped).removeClass("draggable-icon");
                $(dropped).css('position', 'absolute');

                // bound where the icon can be dropped
                if (newX >= boundingBox.left && newY >= boundingBox.top && newX+elementWidth <= boundingBox.right && newY+elementHeight <= boundingBox.bottom) {
                    $(dropped).css({'top': newY-offsetY, 'left': newX-offsetX});
                } else {
                    $(dropped).remove();
                }
            } else if (ui.draggable.hasClass("formation-icon")) {
                dropped = ui.draggable;
                $(dropped).css('position', 'absolute');
            }
            $(dropped).draggable({
                revert: function(e) {
                    if (newX >= boundingBox.left && newY >= boundingBox.top && newX+elementWidth <= boundingBox.right && newY+elementHeight <= boundingBox.bottom) {
                        console.log('inside bounding box');
                        return false;
                    } else {
                        console.log('not inside bounding box');
                        return true;
                    }
                },
                stack: ".formation-icon",
                scroll: false,
                start: function(event, ui) {
                    // update the deltaX, deltaY, elementWidth, elementHeight
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
        }
    });
});

$(document).ready(function() {
    // adds a + slide in the bottom #frames div
    var start = generateAddSlide();
    document.getElementById("frames").append(start);
    new_slide();
});

$(document).on('click',"#newSlide", function(evt){
    new_slide();
});

$(document).on('click',".redBox", function(evt){
  var slide = evt.target.parentNode;
  if($("#frames")[0].getElementsByClassName("slide").length == 2)return;
  while(slide.className !== "slide"){
    slide = slide.parentNode;
  }

  var old_slide = slide.id;

  slide.id = "remove";
  $("#remove").remove();

  if(('#'+old_slide).valueOf() === selected_slide.valueOf()){
    selected_slide = $("#frames")[0].getElementsByClassName("slide")[0].id;
    $('#'+selected_slide).css('border', '3px solid #537E8C');

    $(selected_formation).hide();
    selected_formation = "#formation" + parseInt(selected_slide.substring(14)); //Jenky as shit but works, needs to be cleaned up. Spoooky magic number
    $(selected_formation).show();
  }
});

updateSlideImg = function(){
  var slide = $(selected_slide);
  var formation_pane = $(selected_formation)[0];

  slide.empty();
  slide = slide[0];
  slide.appendChild(generateX());

  var pane_rect = formation_pane.getBoundingClientRect();

  var base_height = pane_rect.height;
  var base_width = pane_rect.width;

  var slide_rect = slide.getBoundingClientRect();

  var slideX = slide_rect.left;
  var slideY = slide_rect.top;

  var minimize_height = slide_rect.height;
  var minimize_width = slide_rect.width;

  var conversionFactor = minimize_height*1.0/base_height;

  var elementsToCopy = formation_pane.childNodes;

  for(var i = 0; i < elementsToCopy.length; i++){
    var element = elementsToCopy[i].cloneNode(true);
    element.classList.remove("formation-icon");
    element.classList.add("mini-icon");

    var elemX = parseInt(element.style.left);
    var elemY = parseInt(element.style.top);

    var offsetX = Math.round(slideX+document.body.scrollLeft+elemX*conversionFactor);
    var offsetY = Math.round(slideY+document.body.scrollTop+elemY*conversionFactor);


    element.style.left = ""+offsetX+"px";
    element.style.top  = ""+offsetY+"px";


    slide.appendChild(element);
  }
}