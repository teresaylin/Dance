var slide_id = 0;
var selected_formation = "#formation0";
var selected_slide = "#formation_stub0";

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
            // childClone.className = 'formation-icon';
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
  var frameChildren = frames.childNodes;
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

  var currentTime = document.getElementById('player').currentTime;
  addBubble(currentTime, slide_id)  
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

// Drag and Drop
var dragIcon;
var leftFlag = 0;   // flag for picking up an icon from left menu
var rightFlag = 0;  // flag for picking up an icon from formation pane
var deltaX;
var deltaY;
var elementWidth;
var elementHeight;
var boundingBox;
var offsetX;
var offsetY;
var mouseX;
var mouseY;
var currentX;
var currentY;
var mouseStopX;
var mouseStopY;

// clicking on a dancer icon in the left menu
$(document).on("mousedown", ".draggable-icon", function(evt) {
  evt.preventDefault();
  var originalIcon = this;
  // icon's location (absolute)
  currentX = parseInt($(originalIcon).offset().left, 10);
  currentY = parseInt($(originalIcon).offset().top, 10);

  dragIcon = $(this).clone();
  $(dragIcon).appendTo("#left");
  $(dragIcon).css({'top': currentY+"px", 'left': currentX+"px", 'position': 'absolute'});

  $(dragIcon).css("z-index", 30);
  leftFlag = 1;

  // starting mouse location
  mouseX = parseInt(event.pageX);
  mouseY = parseInt(event.pageY);
  
  // difference between icon and mouse 
  deltaX = mouseX - currentX;
  deltaY = mouseY - currentY;
  // icon's properties
  elementWidth = parseInt($(dragIcon).css('width'), 10);
  elementHeight = parseInt($(dragIcon).css('height'), 10);
});

// clicking on a dancer icon in the formation pane
$(document).on("mousedown", ".formation-icon", function(evt) {
  evt.preventDefault();
  dragIcon = this;
  // icon's location (absolute)
  currentX = parseInt($(dragIcon).offset().left, 10);
  currentY = parseInt($(dragIcon).offset().top, 10);

  $(dragIcon).css("z-index", 30);
  rightFlag = 1;

  // starting mouse location
  mouseX = parseInt(event.pageX);
  mouseY = parseInt(event.pageY);
  
  // difference between icon and mouse 
  deltaX = mouseX - currentX;
  deltaY = mouseY - currentY;
  // icon's properties
  elementWidth = parseInt($(dragIcon).css('width'), 10);
  elementHeight = parseInt($(dragIcon).css('height'), 10);
});

// moving a dancer icon in left menu or formation pane
$(document).on("mousemove", function(event) {
  if (leftFlag == 1) {
    event.preventDefault();

    // displacement
    var moveX = event.pageX - mouseX;
    var moveY = event.pageY - mouseY;

    var newX = currentX + moveX;
    var newY = currentY + moveY;
    $(dragIcon).css({'top': newY+"px", 'left': newX+"px"});
  }

  else if (rightFlag == 1) {
    event.preventDefault();

    // displacement
    var moveX = event.pageX - mouseX;
    var moveY = event.pageY - mouseY;

    var newX = currentX + moveX - offsetX;    // subtract out formation pane 'left'
    var newY = currentY + moveY - offsetY;
    $(dragIcon).css({'top': newY+"px", 'left': newX+"px"});
  }
});

// dropping a dancer icon
$(document).on("mouseup", function(evt) {
  if (leftFlag == 1 || rightFlag == 1) {
    evt.preventDefault();

    // mouse drop position
    mouseStopX = evt.pageX;
    mouseStopY = evt.pageY;

    // displacement
    var moveX = event.pageX - mouseX;
    var moveY = event.pageY - mouseY;

    // drop position of icon (absolute)
    var dropX = currentX + moveX;
    var dropY = currentY + moveY;

    // drop position relative to formation pane
    var finalX = dropX - offsetX;
    var finalY = dropY - offsetY;

    if (dropX >= offsetX && dropX+elementWidth <= offsetX+boundingBox.width && dropY >= offsetY && dropY+elementHeight <= offsetY+boundingBox.height) {
      // dropped inside formation pane
      $(dragIcon).css({'top': finalY+"px", 'left': finalX+"px"});
      if (leftFlag == 1) {
        $(dragIcon).appendTo(selected_formation);
        $(dragIcon).addClass("formation-icon");
        $(dragIcon).removeClass("draggable-icon");
      }
      $("#dragText").empty();
    } else {
      // dropped outside formation pane
      if (leftFlag == 1) {
        $(dragIcon).css({'top': currentY+"px", 'left': currentX+"px"});
      } else if (rightFlag == 1) {
        currentX -= offsetX;
        currentY -= offsetY;
        $(dragIcon).css({'top': currentY+"px", 'left': currentX+"px"});
      }
    }

    leftFlag = 0;
    rightFlag = 0;
    $(dragIcon).css("z-index", 20);
  }
});

// when page loads
$(function() {
    boundingBox = document.getElementById("formation-pane").getBoundingClientRect();
    console.log('start');
    console.log(boundingBox);
    offsetX = parseInt($("#formation-pane").offset().left, 10);
    offsetY = parseInt($("#formation-pane").offset().top, 10);
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
  }
});

$(document).on('mousemove', function(evt){
	updateSlideImg();
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

    var offset_X = Math.round(slideX+document.body.scrollLeft+elemX*conversionFactor);
    var offset_Y = Math.round(slideY+document.body.scrollTop+elemY*conversionFactor);

    element.style.left = ""+offset_X+"px";
    element.style.top  = ""+offset_Y+"px";

    slide.appendChild(element);
  }
}