
$(() => {   
    $("#change-phrase-button").click(debounce(getRandomPhrase, 1500));
    $("#change-phraseId-button").click(debounce(getPhrase, 1500));
});

function getRandomPhrase() {

    $.get("http://localhost:3000/frases", changeRandomPhrase)
    .fail(function() {
        showMessage(errorMessage, 1);
    })
    .always(showPhrase);

}

function getPhrase() {
    
    let phraseID = $("#phrase-id").val();
    let data = {id: phraseID};

    $.get("http://localhost:3000/frases", data, changePhrase)
    .fail(function() {
        showMessage(errorMessage, 1);
    })
    .always(showPhrase);
}

function changeRandomPhrase(data) {
    let randomNumber = Math.floor(Math.random(9)* data.length);
    phrase.text(data[randomNumber].texto);
    getPhraseSize();
    setInitialTime(data[randomNumber].tempo);
}

function changePhrase(data) {
    phrase.text(data.texto);
    getPhraseSize();
    setInitialTime(data.tempo);
}

function showPhrase() {
    phrase.fadeIn(1000);
}

function debounce(fn, milissegundos) {
    
    let timer = 0;
    return () => {
        phrase.fadeOut(1000);
        clearTimeout(timer);
        setTimeout(fn, milissegundos);
    }

  }

