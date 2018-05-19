
function initWalking(){

    var walkingMessageFound = document.getElementById("walking-message-found");
    walkingMessageFound.style.display = "none";

    setTimeout(function(){ checkEvent(); }, 2000);
}