var tecla,
    keyBump,
    dalekMovement,
    posDalek = 0,
    shotVis = false,
    tardisVis = true,
    dalekSpeed = 10,
    tiroWidth = 15,
    MAPHORSIZE = 900,
    MAPVERSIZE = 400,
    dalekHeight = 130,
    CROSSBORDERTOLERANCE = 15,
    TARDISHEIGHT = 130,
    TARDISWIDTH = 80,
    tardisSpeed = 5,
    posTardis,
    score = 0;

var posShot = new Array(0 ,0);

$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    tecla = e.which;
    //if (tecla != 123) return false;
});

$(document).on("keyup", function(e) {
    tecla = false;
    //if (tecla != 123) return false;
});

$(document).on("ready", function() {

    $.setupGame = function() {
        MAPHORSIZE = $("#fundo").css("width").replace(new RegExp("px", 'g'), "");
        MAPVERSIZE = $("#fundo").css("height").replace(new RegExp("px", 'g'), "");
        posTardis = new Array(
                (MAPHORSIZE - TARDISWIDTH),
                Math.floor(Math.random() * (MAPVERSIZE - TARDISHEIGHT))
            );
    }

    $.resetGame = function() {
        setTimeout(function() {
                $.setupGame();
                $("#dalek").css("top", 0);
                $("#dalek").css("left", 10);
                $("#tardis").css("top", posTardis[1]);
                $("#tardis").css("left", posTardis[0]);
                $.moveTardis();
            },
            300
        );
    }

    $.moveTardis = function() {
        if (tardisVis === true) {

            var tardisInterval = setInterval(function() {
                $("#tardis").css("left", posTardis[0]);
                $("#tardis").css("top", posTardis[1]);

                if (posTardis[0] > 0) {
                    posTardis[0] = posTardis[0] - tardisSpeed;
                    $("#tardis").animate(
                        {left: posTardis[0]},
                        30
                    );

                    //$("#tardis").css("left", posTardis[0]);
                } else {
                    $("#tiro").hide();
                    tardisVis = false;
                    clearInterval(tardisInterval);
                }
            }, 50);
        }
    }

    $.shoot = function() {
        if (shotVis === false) {
            shotVis = true;
            tiro = $("#tiro");
            posShot[0] = 150;
            posShot[1] = posDalek + tiroWidth + 12;
            tiro.css("top", posShot[1]);
            tiro.css("left", posShot[0]);
            tiro.show();
            var shotInterval = setInterval(function() {
                if ($.hit()) {
                    tardisVis = false;
                    $("#tardis").hide();
                    score = score + 1;
                    $("#score").html(score);
                    tiro.hide();
                    shotVis = false;
                    $.resetTardis();
                    clearInterval(shotInterval);
                } else if (posShot[0] <= (MAPHORSIZE - tiroWidth - 5)) {
                    posShot[0] = posShot[0] + 10;
                    tiro.css("left", posShot[0]);
                } else {
                    tiro.hide();
                    shotVis = false;
                    clearInterval(shotInterval);
                }
            }, 5);
        }
    }

    $.resetTardis = function() {
        tardisVis = false;
        $("#tardis").hide();
        tardisSpeed = tardisSpeed + 1
        posTardis[0] = MAPHORSIZE - TARDISWIDTH;
        posTardis[1] = Math.floor(Math.random() * (MAPVERSIZE - TARDISHEIGHT));
        $("#tardis").css("left", posTardis[0]);
        $("#tardis").css("top", posTardis[1]);
        setTimeout(function() {
            $("#tardis").show();
            tardisVis = true;
        }, 50);

    }

    $.hit = function() {
        if (
            (
                (posShot[0] >= (posTardis[0] - 20)) &&
                (posShot[0] < (posTardis[0] + 35))
            ) && (
                (posShot[1] >= posTardis[1]) &&
                (posShot[1] < (posTardis[1] + TARDISHEIGHT))
            )
        ){
            return true;
        }
        return false;
    };

    $(".tapMove").on("touchstart", function() {
        posY = event.touches[0].pageY;
        posDalek = posY - 28;
        console.log(posDalek);
        $("#dalek").animate(
            {top: posDalek},
            100
        );
        //$("#dalek").css("top", posDalek);
    });
    
    $(".tapShoot").on("touchstart", function() {
        $.shoot();
    });


    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
    $.resetGame()

});