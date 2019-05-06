let scoreboard = $(".scoreboard")
let tableBody = scoreboard.find("tbody");

$("#show-score-button").click(showScoreboard);
$("#sync-button").click(syncScoreboard);

function inputScore() {

    let user = $("#users").val();
    let tableNewRow = createRow(user, wordCounter.text());
    tableNewRow.find(".remove-button").click(removeRow);
    tableBody.append(tableNewRow);
    scoreboard.slideDown(500);
    scrollScore();
}

function createRow(user, wordCounter) {

    let row = $("<tr>");
    let columnUser = $("<td>").text(user);
    let columnWords = $("<td>").text(wordCounter);
    let columnDelete = $("<td>");

    let buttonTag = $("<a>").attr("href", "#").addClass("remove-button");;
    var iconTag = $("<i>").addClass("small").addClass("material-icons").text("delete");

    buttonTag.append(iconTag);
    columnDelete.append(buttonTag);

    row.append(columnUser);
    row.append(columnWords);
    row.append(columnDelete);

    return row;

}

function removeRow(event) {

    event.preventDefault();
    let rowToRemove = $(this).parent().parent()

    rowToRemove.fadeOut(1000, () => {
        rowToRemove.remove();
    });

}

function syncScoreboard() {
    let arrayScoreboard = [];
    let tableRow = $("tbody>tr");

    tableRow.each(function () {
        let tableUser = $(this).find("td:nth-child(1)").text();
        let tablePoints = $(this).find("td:nth-child(2)").text();

        let score = {
            usuario: tableUser,
            pontos: tablePoints
        };

        arrayScoreboard.push(score);
    });


    var data = {
        placar: arrayScoreboard
    };

    $.post("http://localhost:3000/placar", data, function() {
        $(".tooltip").tooltipster("open");
    })
    .fail(function() {
        showMessage(errorMessage, 1);
        $(".tooltip").tooltipster("open").tooltipster("content", "Error connecting to server, please try again!"); 
    })
    .always(function() {
        showMessage(successMessage, 2);
        setTimeout(function() {
            $(".tooltip").tooltipster("close"); 
        }, 1200);
    });
}

(function getScoreboard() {

    $.get("http://localhost:3000/placar", function(data) {

        $(data).each(function(){
            let row = createRow(this.usuario, this.pontos);
            row.find(".remove-button").click(removeRow);
            tableBody.append(row);
        });

    })
    .fail(function() {
        showMessage(errorMessage, 1);
    })

})();

function showScoreboard() {

    scoreboard.stop().slideToggle(800);
}

function scrollScore() {
    let scoreboardPosition = scoreboard.offset().top;
    $("html, body").animate(
        {
            scrollTop: `${scoreboardPosition}px`
        }, 1000);
}