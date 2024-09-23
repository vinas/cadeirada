var tecla,
    keyBump,
    datenaMovement,
    datenaPos = 0,
    datenaSpeed = 10,
    datenaHeight = 130,
    datenawidth = 80,
    chairWidth = 100,
    chairHeight = 100,
    shotVis = false,
    marcalVis = true,
    MAPHORSIZE = 900,
    MAPVERSIZE = 400,
    CROSSBORDERTOLERANCE = 15,
    MARCALHEIGHT = 130,
    MARCALWIDTH = 80,
    marcalSpeed = 5,
    posMarcal,
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
        posMarcal = new Array(
                (MAPHORSIZE - MARCALWIDTH),
                Math.floor(Math.random() * (MAPVERSIZE - MARCALHEIGHT))
            );
    }

    $.resetGame = function() {
        setTimeout(function() {
                $.setupGame();
                $("#datena").css("top", 0);
                $("#datena").css("left", 10);
                $("#marcal").css("top", posMarcal[1]);
                $("#marcal").css("left", posMarcal[0]);
                $.moveMarcal();
            },
            300
        );
    }

    $.moveMarcal = function() {
        if (marcalVis === true) {

            var marcalInterval = setInterval(function() {
                $("#marcal").css("left", posMarcal[0]);
                $("#marcal").css("top", posMarcal[1]);

                if (posMarcal[0] > 0) {
                    posMarcal[0] = posMarcal[0] - marcalSpeed;
                    $("#marcal").animate(
                        {left: posMarcal[0]},
                        30
                    );

                    //$("#marcal").css("left", posMarcal[0]);
                } else {
                    $("#tiro").hide();
                    marcalVis = false;
                    clearInterval(marcalInterval);
                }
            }, 50);
        }
    }

    $.shoot = function() {
        if (shotVis === false) {
            document.getElementById("datena").src="img/datena-chair.gif";
            setTimeout(() => {
                document.getElementById("datena").src="img/datena-run.gif";
                shotVis = true;
                tiro = $("#tiro");
                posShot[0] = datenawidth;
                posShot[1] = datenaPos + 12;
                tiro.css("top", posShot[1]);
                tiro.css("left", posShot[0]);
                tiro.show();
                var shotInterval = setInterval(function() {
                    if ($.hit()) {
                        marcalVis = false;
                        $("#marcal").hide();
                        score = score + 1;
                        $("#score").html(score);
                        tiro.hide();
                        shotVis = false;
                        $.resetMarcal();
                        clearInterval(shotInterval);
                    } else if (posShot[0] <= (MAPHORSIZE - chairWidth - 5)) {
                        posShot[0] = posShot[0] + 10;
                        tiro.css("left", posShot[0]);
                    } else {
                        tiro.hide();
                        shotVis = false;
                        clearInterval(shotInterval);
                    }
                }, 5);
            }, 200);
        }
    }

    $.resetMarcal = function() {
        marcalVis = false;
        $("#marcal").hide();
        marcalSpeed = marcalSpeed + 1
        posMarcal[0] = MAPHORSIZE - MARCALWIDTH;
        posMarcal[1] = Math.floor(Math.random() * (MAPVERSIZE - MARCALHEIGHT));
        $("#marcal").css("left", posMarcal[0]);
        $("#marcal").css("top", posMarcal[1]);
        setTimeout(function() {
            $("#marcal").show();
            marcalVis = true;
        }, 50);

    }

    $.hit = function() {
        if (
            (
                (posShot[0] >= (posMarcal[0] - chairWidth)) &&
                (posShot[0] < (posMarcal[0] + chairWidth))
            ) && (
                (posShot[1] + chairHeight >= posMarcal[1]) &&
                (posShot[1] < (posMarcal[1] + MARCALHEIGHT))
            )
        ){
            return true;
        }
        return false;
    };

    $(".tapMove").on("touchstart", function() {
        posY = event.touches[0].pageY;
        datenaPos = posY - 28;
        $("#datena").animate(
            {top: datenaPos},
            100
        );
    });
    
    $(".tapShoot").on("touchstart", function() {
        $.shoot();
    });


    /*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*/
    $.resetGame()

});