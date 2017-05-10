$(window).on('load',function(){
        $('#myModal').modal('show');
    });

function chooseFile() {
    console.log("hi")
    console.log($("#uploadfile")[0].value)
     $("#confirm")[0].disabled = false
    $("#fileName")[0].innerHTML = $("#uploadfile")[0].value
}

