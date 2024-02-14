$(document).ready(function () {
    var speed = 10;
    let movingLeft = false;
    let movingRight = false;
    let movingTop = false;
    let movingBot = false;
    let alien = $('.alien');
    let lastShoot = 0;

    // var to clear interval
    // global vars
    var intervalShootAlien;
    var intervalMoveShip;
    var intervalMoveAlien;
    // var intervalRndom;
    const intervalShoot = 1000;

    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            movingLeft = true;
        }
        else if (e.keyCode == 38) {
            movingTop = true;
        }
        else if (e.keyCode == 39) {
            movingRight = true;
        }
        else if (e.keyCode == 40) {
            movingBot = true;
        }
        else if (e.keyCode == 32) {
            const timestamp = Date.now();
            if (timestamp - lastShoot >= intervalShoot) {
                shoot();
                lastShoot = timestamp;
            }
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 37) {
            movingLeft = false;
        }
        else if (e.keyCode == 38) {
            movingTop = false;
        }
        else if (e.keyCode == 39) {
            movingRight = false;
        }
        else if (e.keyCode == 40) {
            movingBot = false;
        }
    });

    function moveShip() {
        if (movingLeft) {
            let pos = $('.ship').position().left;
            if (pos > 0) {
                $('.ship').css('left', pos - speed);
            }
        }
        if (movingRight) {
            let pos = $('.ship').position().left;
            let containerWidth = $('.game-container').width();
            let shipWidth = $('.ship').width();
            if (pos < (containerWidth - shipWidth)) {
                $('.ship').css('left', pos + speed);
            }
        }
        if (movingTop) {
            let pos = $('.ship').position().top;
            if (pos > 0) { // Verificar si la posición superior no ha alcanzado el límite superior - 50px
                $('.ship').css('top', pos - speed);
            }
        }

        if (movingBot) { // Mover hacia abajo si movingBot es true
            let pos = $('.ship').position().top;
            let containerHeight = $('.game-container').height();
            let shipHeight = $('.ship').height();
            if (pos < (containerHeight - shipHeight)) {
                $('.ship').css('top', pos + speed);
            }
        }
    }

    intervalMoveShip = setInterval(moveShip, 20);

    function moveAlien() {
        let containerWidth = $('.game-container').width();
        let alienWidth = alien.width();
        let alienPos = alien.position().left;

        if (alienPos <= 0) {
            alien.css('left', speed);
        }
        else if (alienPos + alienWidth >= containerWidth) {
            alien.css('left', -speed);
        }
        else {
            alien.css('left', alienPos + speed);
        }
    }
    intervalMoveAlien = setInterval(moveAlien, 20);

    function shoot() {
        let misil = $('<div class="shoot"></div>');
        let shipPosition = $('.ship').position();
        let shootPosition = {
            top: shipPosition.top + misil.height(),
            left: shipPosition.left + ($('.ship').width() / 2.25) - (misil.width() / 2.25)
        };
        misil.css(shootPosition);
        $('.game-container').append(misil);
        misil.animate({ top: 0 }, {
            duration: 1000,
            step: function () {
                $('.shoot').collision('.alien').each(function () {
                    $('.alien').css('background-image', 'url(../img/explosion.png)');
                    // $('.ship').css('display', 'none');
                    // $('.congrats').css('display', 'block');
                    //clearEveryInterval();
                });
            },
            complete: function () {
                $(this).remove();
            }
        });
    }

    function getRndom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // alien shoot
    function alienShoot() {
        let alienMisil = $('<div class="alien-shoot"></div>');
        let alienPosition = $('.alien').position();
        let shootAlienPosition = {
            top: alienPosition.top + $('.alien').height(),
            left: alienPosition.left + ($('.alien').width() / 2.25) - (alienMisil.width() / 2.25)
        };
        alienMisil.css(shootAlienPosition);
        $('.game-container').append(alienMisil);
        alienMisil.animate({ top: $('.game-container').height() }, {
            duration: 1000,
            step: function () {
                $('.alien-shoot').collision('.ship').each(function () {
                    $('.alien').css('display', 'none');
                    $('.ship').css('display', 'none');
                    $('.die').css('display', 'block');
                    clearEveryInterval();
                });
            },
            complete: function () {
                $(this).remove();
            }
        });
    }
    // intervalRndom = setInterval(getRndom(100, 500), 1000);
    // intervalShootAlien = setInterval(alienShoot, getRndom(200, 500));

    function clearEveryInterval() {
        clearInterval(intervalShootAlien);
        clearInterval(intervalMoveShip);
        clearInterval(intervalMoveAlien);
        // clearInterval(intervalRndom);
    }
});
