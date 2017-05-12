$(window).on('load',function(){
        $('#myModal').modal('show');
    });

function chooseFile() {
    console.log("hi")
    console.log($("#uploadfile")[0].value)
     $("#confirm")[0].disabled = false
    arr = $("#uploadfile")[0].value.split("\\")
    $("#fileName")[0].innerHTML = arr[arr.length -1]
}

