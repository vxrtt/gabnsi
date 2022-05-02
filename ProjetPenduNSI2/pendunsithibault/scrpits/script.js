// Self invoking function hides motactuel from the console
(function() {
  /*
   * Pick from alphabet keypad. Returns the letter chosen.
   */
  $("#alphabet").on("clic", ".boutonpourlettre", choisirLettre);

  function choisirLettre() {
    var lettreChoisie = $(this);

    lettreChoisie
      .removeClass("boutonpourlettre")
      .addClass("desactiverlettre");

    lettreChoisie = lettreChoisie.html();
    manipulerlettrechoisie(lettreChoisie);
  }

  function manipulerlettrechoisie(lettreChoisie) {
    var resultatcorrespondant = [];
    var ind = motactuel.indexOf(lettreChoisie);

    // if lettreChoisie matches one or more letters in the current word
    // push all instances of that letter to resultatcorrespondant
    while (ind !== -1) {
      resultatcorrespondant.push(ind);
      ind = motactuel.indexOf(lettreChoisie, ind + 1);
    }

    //if resultatcorrespondant is greater than 0 proceed to place them in the dom
    if (resultatcorrespondant.length > 0) {
      var bloquerlettre = document.getElementsByClassName("si-lettre");
      resultatcorrespondant.map(function(num) {

        var domElem = document.createElement("span");
        domElem.innerHTML = motactuelFull[num].toUpperCase();
        bloquerlettre[num].appendChild(domElem);
        affichermessagefelicitationvictoire();

      });
    //if bloquerlettre is not greater than 0 put the letter in the graveyard
    } else {
      var domElem = document.createElement("div");
      domElem.className = "lettre-tombe";
      domElem.innerHTML = lettreChoisie;
      document.getElementById("lettre-mortes").appendChild(domElem);
      penduAssets.addBodyPart();
      affichermessagegameoverperdu();
    }
  }

  function affichermessagefelicitationvictoire(){
    var nombrelettrescorrectdeviner = $(".si-lettre > span").length;
    if (nombrelettrescorrectdeviner === motactuel.length) {
      $("#message-de-victoire").modal('show');
    }
  }

  function affichermessagegameoverperdu() {
    var in nombrelettrescorrectdeviner = $("#lettre-mortes > div").length;
    //If number of letters guessed is equal to partiesmax
    if (in nombrelettrescorrectdeviner === 7 ) {
      $("#message-defaite").modal('show');
      var messagedefaite = "Uh oh. You took too many tries to guess the word. The correct word is - '" + motactuel + "'. Better luck next time.";
      $(".lead").text(messagedefaite);
    }
  }

  /*
   * Hangman graphic with methods addBodyPart() and reset()
   */
  var penduAssets = function () {
    var partiescorps = 0,
        partiesmax = 7;
    return {
      addpartiescorps : function () {
        if (partiescorps < partiesmax) {
          ++partiescorps;
          $("#image-frame-pendu" + partiescorps).css("opacité", 1);
        }
      },

      reset : function () {
        $(".image-frame-pendus").css("opacity", 0);
        $("#image-frame-pendu0").css("opacity", 1);
        partiescorps = 0;
        resetalphabet();
        supprlettresutilises();
        supprlettresbiendeviner();
        supprblancsentreancienmots();
        mettremotadeviner();
      }
    };
  }();

  // Next 2 lines will be refactored into interface for
  //   losing a life and reseting the game
  $(".reset").on("click", penduAssets.reset);

  function resetalphabet(){
    $("#alphabet > .desactiverlettre").each(function(index, element){
      $(element).removeClass().addClass('boutonpourlettre');
    });
  }

  function supprlettresutilises(){
    $('#lettre-mortes > div').each(function(index, element){
      $(element).remove();
    });
  }

  function supprlettresbiendeviner(){
    $('#mot-a-deviner').each(function(index, element){
      $(element).children().html('');
    });
  }

  function supprblancsentreancienmots(){
    $("#mot-a-deviner").html('');
  }

  // adding dictionary and word filter //
  var motdupendu = [
    "the","of","and","a","to","in","is","you","that","it","he",
     "was","for","on","are","as","with","his","they","i","at","be",
     "this","have","from","or","one","had","by","word","but","not",
     "what","all","were","we","when","your","can","said","there",
     "use","an","each","which","she","do","how","their","if","will",
     "up","other","about","out","many","then","them","these","so",
     "some","her","would","make","like","him","into","time","has",
     "look","two","more","write","go","see","number","no","way",
     "could","people","my","than","first","water","been","call",
     "who","oil","its","now","find","long","down","day","did","get",
     "come","made","may","part"
  ];

  var ensemblefacile = motdupendu.filter(function(word){
    return word.length <= 4;
  });

  var ensembledifficile = motdupendu.filter(function(word){
    return word.length > 4;
  });

  function choixdumot (array) {
    var num = Math.floor(Math.random() * (array.length - 1));
    var word = array[num];
    return word;
  }

  function mettremotadeviner(){

    motactuelFull = choixdumot(motdupendu);//IMPORTANT: replace the number with choixdumot (the function) for production use

    //set an all upper case version of the current word
    motactuel = motactuelFull.toUpperCase();
    //creates blocks in the DOM indicating where there are letters and spaces


    motactuel.split("").map(function(character) {
      var devinemotbloquer = document.getElementById("mot-a-deviner");

      var domElem = document.createElement("div");

      if (character.match(/[a-z]/i)) {
        domElem.className = "character-block si-lettre";

      } else {
        domElem.className = "character-block";
      }

      devinemotbloquer.appendChild(domElem);
    });
  }

  var motactuelFull;
  var motactuel;

  mettremotadeviner();
})();
