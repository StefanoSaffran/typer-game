let initialTime = $("#totalTime").text();
let content = $(".textArea");
let wordCounter = $(".wordsCounter");
let phrase = $(".phrase");
let phraseLength = $("#phrase-length");

$(() => {         
    startTime();
    getPhraseSize();
    $("#restartButton").click(() => restart());
    $("#users").selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
});

function getPhraseSize() {

    let numberWords = phrase.text().split(" ").length;
    phraseLength.text(numberWords);

}

function setInitialTime(time) {
    initialTime = time;
    $("#totalTime").text(time);
}

(function startCounters() {

    content.on("input", function () {

        wordCounter.text(content.val().split(/\S+/).length - 1);

        let characterCounter = $(".characterCounter");
        characterCounter.text(content.val().replace(/\s+/g, '').length);
    });

})();

function startTime() {

    content.one("focus", function () {
        let remainingTime = initialTime;
        let setIntervalID = setInterval(function () {
            remainingTime--;
            $("#totalTime").text(remainingTime);
            if (remainingTime < 1) {
                endGame();
                clearInterval(setIntervalID);
            }
        }, 1000)
        $("#restartButton").click(() => clearInterval(setIntervalID));   // stop the setIntervar if you click to restart while you still have time.

    });

}

(function setBorderMarkers() {

    content.on("input", function () {
        let typedContent = content.val();

        if (phrase.text().startsWith(typedContent)) {                   
            content.addClass("correctBorder");
            content.removeClass("falseBorder");
        }   else {
            content.addClass("falseBorder");
            content.removeClass("correctBorder");
        }
    });

})();

function restart() {

    content.removeAttr("disabled");
    content.val("");
    $(".characterCounter").text("0");
    $(".wordsCounter").text("0");
    $("#totalTime").text(initialTime);
    startTime();
    content.removeClass("correctBorder");
    content.removeClass("falseBorder");

}

function endGame() {
    content.attr("disabled", true);
    inputScore();
}