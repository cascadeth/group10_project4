var gameModel;

$( document ).ready(function() {
  // Handler for .ready() called.
  $.getJSON("model/hard", function( json ) {
  gameModel = json;
    console.log( "JSON Data: " + json );
   });
});

function placeShip() {
   console.log($( "#shipSelec" ).val());
   console.log($( "#rowSelec" ).val());
   console.log($( "#colSelec" ).val());
   console.log($( "#orientationSelec" ).val());

   //var menuId = $( "ul.nav" ).first().attr( "id" );
   var request = $.ajax({
     url: "/placeShip/"+$( "#shipSelec" ).val()+"/"+$( "#rowSelec" ).val()+"/"+$( "#colSelec" ).val()+"/"+$( "#orientationSelec" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });

   request.done(function( currModel ) {
     toastr.success($("#shipSelec").val() + " placed!");
     displayGameState(currModel);
     gameModel = currModel;

   });

   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });
}




function fire(){
 console.log($( "#colFire" ).val());
   console.log($( "#rowFire" ).val());
//var menuId = $( "ul.nav" ).first().attr( "id" );
   var request = $.ajax({
     url: "/fire/"+$( "#rowFire" ).val()+"/"+$( "#colFire" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });

   request.done(function( currModel ) {
     gameModel = currModel;
     displayGameState(currModel);
     console.log(currModel);
   });

   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });

}

function scan(){
 console.log($( "#colScan" ).val());
   console.log($( "#rowScan" ).val());
//var menuId = $( "ul.nav" ).first().attr( "id" );
   var request = $.ajax({
     url: "/scan/"+$( "#rowScan" ).val()+"/"+$( "#colScan" ).val(),
     method: "post",
     data: JSON.stringify(gameModel),
     contentType: "application/json; charset=utf-8",
     dataType: "json"
   });

   request.done(function( currModel ) {
     if(currModel.scanResult) {
        alert("Scan found at least one Ship");
     } else {
        alert("Scan found no ships");
     }

   });

   request.fail(function( jqXHR, textStatus ) {
     alert( "Request failed: " + textStatus );
   });

}


function log(logContents){
    console.log(logContents);
}

function displayGameState(gameModel){
$( '#MyBoard td'  ).css("background-color", "blue");
$( '#TheirBoard td'  ).css("background-color", "blue");

displayShip(gameModel.aircraftCarrier);
displayShip(gameModel.battleship);
displayShip(gameModel.clipper);
displayShip(gameModel.dinghy);
displayShip(gameModel.submarine);

for (var i = 0; i < gameModel.computerMisses.length; i++) {
   $( '#TheirBoard #' + gameModel.computerMisses[i].Across + '_' + gameModel.computerMisses[i].Down ).css("background-color", "green");
}
for (var i = 0; i < gameModel.computerHits.length; i++) {
   $( '#TheirBoard #' + gameModel.computerHits[i].Across + '_' + gameModel.computerHits[i].Down ).css("background-color", "red");
}

for (var i = 0; i < gameModel.playerMisses.length; i++) {
   $( '#MyBoard #' + gameModel.playerMisses[i].Across + '_' + gameModel.playerMisses[i].Down ).css("background-color", "green");
}
for (var i = 0; i < gameModel.playerHits.length; i++) {
   $( '#MyBoard #' + gameModel.playerHits[i].Across + '_' + gameModel.playerHits[i].Down ).css("background-color", "red");
}



}



function displayShip(ship){
 startCoordAcross = ship.start.Across;
 startCoordDown = ship.start.Down;
 endCoordAcross = ship.end.Across;
 endCoordDown = ship.end.Down;
// console.log(startCoordAcross);
 if(startCoordAcross > 0){
    if(startCoordAcross == endCoordAcross){
        for (i = startCoordDown; i <= endCoordDown; i++) {
            $( '#MyBoard #'+startCoordAcross+'_'+i  ).css("background-color", "yellow");
        }
    } else {
        for (i = startCoordAcross; i <= endCoordAcross; i++) {
            $( '#MyBoard #'+i+'_'+startCoordDown  ).css("background-color", "yellow");
        }
    }
 }



}
