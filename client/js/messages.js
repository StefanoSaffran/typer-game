
const errorMessage = "Error connecting to server, please try again!";
const successMessage = "Score successfully synchronized";

function showMessage(message, type) {

    if (type == 1) {
        $("#message").addClass("errorColor");
        $("#message").removeClass("successColor");
    } else {
        $("#message").addClass("successColor");
        $("#message").removeClass("errorColor");
    }
    
    $("#message").text(message);
    $("#message").stop().show();
        setTimeout(function(){
            $("#message").stop().hide();
        },1500);
}