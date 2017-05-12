var slide_id = 0;
var selected_formation = "#formation0";
var selected_slide = "#formation_stub0";

var formationMapping = {};    // maps time to formation id
var previous_formation = "formation0";

// $(document).on('click', '#audioplayerbar', function(evt) {
//   var currentTime = $("#player")[0].currentTime;
//   // find previous formation
//   var prevTime = findPreviousTime(currentTime);
//   previous_formation = formationMapping[prevTime];
//   var prev_slide_id = parseInt(previous_formation.substring(9), 10);

//   // show previous formation and change activated bubble
//   formation_highlight(prev_slide_id);
//   changeBubbleColor(prev_slide_id);
// });

// // var prevTime = 0;
// function findPreviousTime(currentTime) {
//   var prevTime = 0;
//   // prevTime = 0;
//   console.log('currentTime: ' + currentTime);
//   for(var time in formationMapping) {
//     console.log(time);
//     if(time > prevTime && time <= currentTime) {
//       console.log('valid');
//       prevTime = time;
//     }
//   }
//   return prevTime;
// }

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

    // store in mapping
    var currentTime = $("#player")[0].currentTime;
    formationMapping[currentTime] = "formation" + slide_id.toString();
    // update previous_formation
    previous_formation = "formation" + slide_id.toString();

    if (slide_id != 0) {
        var children = $(selected_formation).children();
        console.log('CHILDREN of selected formation to be cloned');
        console.log(children);
        children.each(function() {
            var childClone = $(this).clone();
            childClone.addClass("formation-icon");
            childClone.addClass(slide_id.toString());
            childClone.removeClass((slide_id-1).toString());
            $("#formation" + slide_id.toString()).append(childClone);
        });
    }
    return newFormation;
}

// select a slide, highlight selected slide, hide previous formation, change bubble color, 
// update position of playbar marker
function select_slide(slide_id) {
    formation_highlight(slide_id);
    console.log(slide_id.toString());
    changeBubbleColor(slide_id);
    var time = $('#bubble' + slide_id.toString())[0].getAttribute("time");
    console.log(time);
    console.log(document.getElementById('player').currentTime);
    document.getElementById('player').currentTime = time;
}

function changeBubbleColor(slide_id) {
    $('.bubble').css({'background-color':'black'});
    $('#bubble' + slide_id.toString()).css({'background-color':'white'});
}

function autosave_new_slide(){
  var current_time = document.getElementById('player').currentTime; 
  var checkpoint_time = $('#bubble' + previous_formation.substring(9))[0].getAttribute("time");
  if(current_time-checkpoint_time > 1){
    new_slide();
  }
}

// clones previous formation stub into new formation stub
function new_slide() {
  generateNewFormation();
  var slide = generateSlideStub();

  // clone slide stub
  if($(selected_slide).length){// This is not the ready call
  	slide = $(selected_slide)[0].cloneNode(true);
  	slide.id = "formation_stub" + slide_id.toString();
  }

  var frames = document.getElementById("frames"); // formation stub window
  var frameChildren = frames.childNodes;          // get formation stubs
  var size = frameChildren.length;

  if($(selected_slide).length){ //This is not the ready call.
    for(var i = 0;i<size;i++){
      if("#"+frameChildren[i].id === selected_slide){
        frames.insertBefore(slide, frameChildren[i].nextSibling);
      }
    }
  }
  else{//ready call
    frames.insertBefore(slide, frameChildren[0]);
  }
  
    
  (function(slide_id) {
        $("#formation_stub" + slide_id.toString()).click(function() {
            select_slide(slide_id);
        });
  })(slide_id);

  var currentTime = document.getElementById('player').currentTime;
  addBubble(currentTime, slide_id)
  formation_highlight(slide_id);
  changeBubbleColor(slide_id);

  slide_id += 1;
}

// creates an X for mini formation slides for deletion
generateX = function(){
	var redBox = document.createElement("img");
  redBox.src = "images/close_red.png";
	redBox.className = "redBox";
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
var menuX;
var menuY;
var dragging = false;
var animating = false;

// clicking on a dancer icon in the left menu
$(document).on("mousedown", ".draggable-icon", function(evt) {
  evt.preventDefault();
  var originalIcon = this;
    
  // icon's location (absolute)
  currentX = parseInt($(originalIcon).offset().left, 10);
  currentY = parseInt($(originalIcon).offset().top, 10);

  // clone location
  menuX = parseInt($("#left").offset().left, 10);
  menuY = parseInt($("#left").offset().top, 10);
  currentX -= menuX;
  currentY -= menuY;

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
  dragging = true;
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
  if (leftFlag == 1 || rightFlag == 1) {
    event.preventDefault();

    // displacement
    var moveX = event.pageX - mouseX;
    var moveY = event.pageY - mouseY;

    var newX = currentX + moveX;
    var newY = currentY + moveY;

    if (rightFlag == 1) {
      newX -= offsetX;
      newY -= offsetY;
      // activate trash region
      $("#trash").css('background-color', 'rgba(193, 46, 46, 1)');
      $("#trash-icon").css('opacity', 1);
    }

    $(dragIcon).css({'top': newY+"px", 'left': newX+"px"});
  }

    var deleteBox = $("#trash").offset();
    var leftBox = $("#left").offset();
    var mainBox = $("#main").offset();
    var deleteLeft = deleteBox.left;
    var deleteRight = deleteLeft + $("#trash").width();
    var deleteTop = deleteBox.top;
    var deleteBot = deleteTop + $("#trash").height();

    if (dragging && event.pageX >= deleteLeft && event.pageX <= deleteRight && event.pageY <= deleteBot && event.pageY >= deleteTop) {
      $("#trash-icon").height(115);
    }
});

function unselectTrash() {
    if (animating) {
      setTimeout(50);
      unselectTrash();
    } else {
      $("#trash-icon").animate({
          height: 100,
          opacity: 0.6
      }, 300);
    }
}

// dropping a dancer icon
$(document).on("mouseup", function(evt) {
  if (leftFlag == 1 || rightFlag == 1) {
    evt.preventDefault();
    $("#trash").css('background-color', 'gainsboro');
    $("#trash-icon").css('opacity', 0.6);
    unselectTrash();
      
    // mouse drop position
    mouseStopX = evt.pageX;
    mouseStopY = evt.pageY;

    // displacement
    var moveX = mouseStopX - mouseX;
    var moveY = mouseStopY - mouseY;

    // drop position of icon (absolute)
    var dropX = currentX + moveX;
    var dropY = currentY + moveY;
    if (leftFlag == 1) {
      dropX += menuX;
      dropY += menuY;
    }

    // drop position relative to formation pane
    var finalX = dropX - offsetX;
    var finalY = dropY - offsetY;

    var deleteBox = $("#trash").offset();
    var leftBox = $("#left").offset();
    var mainBox = $("#main").offset();
    var deleteLeft = deleteBox.left;
    var deleteRight = deleteLeft + $("#trash").width();
    var deleteTop = deleteBox.top;
    var deleteBot = deleteTop + $("#trash").height();
    
    // dropping inside trash region
    if (dragging && mouseStopX >= deleteLeft && mouseStopX <= deleteRight && mouseStopY <= deleteBot && mouseStopY >= deleteTop) {
      $(dragIcon).fadeOut(150);
      dragging = false;
    } else if (dropX >= offsetX && dropX+elementWidth <= offsetX+boundingBox.width && dropY >= offsetY && dropY+elementHeight <= offsetY+boundingBox.height) {
      // dropped inside formation pane
      if (leftFlag == 1) {
        $(dragIcon).css({'top': finalY+"px", 'left': finalX+"px"});

        autosave_new_slide();

        $(dragIcon).appendTo(selected_formation);
        $(dragIcon).addClass("formation-icon");
        $(dragIcon).addClass((slide_id-1).toString());
        $(dragIcon).removeClass("draggable-icon");
      }
      else if (rightFlag == 1) {
        $(dragIcon).css({'top': finalY+"px", 'left': finalX+"px"});
      }
      // clear guiding text
      $("#dragText").empty();
    } else {
      // dropped outside formation pane
      if (leftFlag == 1) {
        $(dragIcon).css({'top': currentY+"px", 'left': currentX+"px"});
        $(dragIcon).remove();
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


    document.getElementById('playmarker').addEventListener('mousedown', mouseDown, false);

    // adds a + slide in the bottom #frames div
    //var start = generateAddSlide();
    //document.getElementById("frames").append(start);
    new_slide();

    var first_slide = document.getElementById("frames").childNodes[0];
    var x = first_slide.getElementsByClassName("redBox")[0];
    if(x){//Keep first slide undeletable.
      first_slide.removeChild(x);
    }

    tooltipDiv = document.createElement("div");
    tooltipDiv.className = "tooltip";

    tooltip = document.createElement("img");
    tooltip.style.width = "40px";
    tooltip.style.height = "40px";
    tooltip.src = "images/tooltip.png";
    tooltip.style.position = "absolute";
    tooltip.style.left = "540px";
    
    tooltiptext = document.createElement("span");
    tooltiptext.className = "tooltiptext"
    tooltiptext.innerHTML = "To create a new frame, move the indicator in the audio track and add a dancer."

    tooltipDiv.appendChild(tooltip);
    tooltipDiv.appendChild(tooltiptext);

    document.getElementsByTagName("body")[0].appendChild(tooltipDiv);
});

$(document).on('click',"#newSlide", function(evt){
    new_slide();
});

$(document).on('click',".redBox", function(evt){
  var slide = evt.target.parentNode;
  //if($("#frames")[0].getElementsByClassName("slide").length == 2)return;
  while(slide.className !== "slide"){
    slide = slide.parentNode;
  }

  var old_slide = slide.id;
  var stripped_id = parseInt(old_slide.substring(14)); //remove "formation_stub";
  removeBubble(stripped_id);

  slide.id = "remove";
  $("#remove").remove();


  if(('#'+old_slide).valueOf() === selected_slide.valueOf()){
    selected_slide = "#"+$("#frames")[0].getElementsByClassName("slide")[0].id;
    $(selected_slide).css('border', '3px solid #537E8C');
  }
});

$(document).on('mousemove', function(evt){
	updateSlideImg();
});

formation_highlight = function(slide_id){
  $(selected_slide).css('border', '1px solid #537E8C');
  selected_slide = "#formation_stub" + slide_id.toString();
  $(selected_slide).css('border', '3px solid #537E8C');
  $(selected_formation).hide();
  selected_formation = "#formation" + slide_id.toString();
  $(selected_formation).show();

  // update previous_formation
  previous_formation = "formation" + slide_id.toString();
}

// update formation stubs
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
  // absolute position of slide
  var slideAbsX = parseInt($(slide).offset().left, 10);
  var slideAbsY = parseInt($(slide).offset().top, 10);

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

    var offset_X = Math.round(slideX+document.body.scrollLeft+elemX*conversionFactor - slideAbsX);
    var offset_Y = Math.round(slideY+document.body.scrollTop+elemY*conversionFactor - slideAbsY);

    element.style.left = ""+offset_X+"px";
    element.style.top  = ""+offset_Y+"px";

    slide.appendChild(element);
  }

  var first_slide = document.getElementById("frames").childNodes[0];
  var x = first_slide.getElementsByClassName("redBox")[0];
  if(x){//Keep first slide undeletable.
    first_slide.removeChild(x);
  }
}