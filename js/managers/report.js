
function initReport(){

    var reportList = document.getElementById("report-list");

    var reports = ["Jack lost health", "Mary died"];

        for (var i = 0; i < reports.length; i++){
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(firstname));
        reportList.appendChild(entry);
    }
}