$(document).ready(function () {
    var snake = [];
    var currentDirection = null;
    var gameInterval;
    var bombInterval;
    var difficultySelector;
    var score = 0;
    var nombre;

    function initializeRankingForDifficulty(difficulty) {
        var ranking = localStorage.getItem('ranking_' + difficulty);
        if (!ranking) {
            localStorage.setItem('ranking_' + difficulty, JSON.stringify([]));
        }
    }

    function updateLocalStorageRanking(ranking, difficulty) {
        localStorage.setItem('ranking_' + difficulty, JSON.stringify(ranking));
    }

    function startGame() {
        if (!nombre) {
            nombre = prompt('Introduce tu jugador: ');
            if (!nombre) {
                location.reload();
            }
        }
        var difficulty = $('#difficulty option:selected').val();
        switch (difficulty) {
            case "easy":
                startEasyGame();
                break;
            case "hard":
                startHardGame();
                break;
            case "mythic":
                startMythicGame();
                break;
            default:
                alert('Selecciona una dificultad válida');
                break;
        }
        if (difficulty) {
            initializeRankingForDifficulty(difficulty);
            updateRanking(difficulty);
        }
        difficultySelector.prop('disabled', true);
    }

    function startEasyGame() {
        alert('Has seleccionado dificultad normal');
        gameInterval = setInterval(moveSnake, 35);
        $(".game-container").css("border-color", "green");
        $(".game-container").css("background-color", "black");
        $("body").css("background-color", "black");
        $(".container").css("background-color", "black");
        $(".ranking-container").css("border-color", "green");
        $(".ranking-container").css("background-color", "black");
        $(".score").css("color", "green");
        $(".points").css("color", "green");
        $(".text-center").css("color", "green");
        $(".ranking-title").css("color", "green");
    }

    function startHardGame() {
        alert('Has seleccionado dificultad Hardcore: \n- Intervalo mas rapido que en Normal\n- Moriras si chocas contra el borde');
        gameInterval = setInterval(moveSnakeHard, 30);
        $(".game-container").css("border-color", "red");
        $(".ranking-container").css("border-color", "red");
        $("body").css("background-color", "black");
        $(".container").css("background-color", "black");
        $(".ranking-container").css("background-color", "black");
        $(".text-center").css("color", "red");
        $(".game-container").css("background-color", "black");
        $(".score").css("color", "red");
        $(".points").css("color", "red");
        $(".text-center").css("color", "red");
        $(".ranking-title").css("color", "red");
    }

    function startMythicGame() {
        alert('Has seleccionado dificultad Mitica: \n- Intervalo mas rapido que en Hard y Normal\n- Moriras si chocas contra el borde\n- Bombas aleatorias apareceran por la pantalla');
        gameInterval = setInterval(moveSnakeMythic, 19);
        bombInterval = setInterval(generateBombs, 1000);
        $(".game-container").css("border-color", "purple");
        $(".ranking-container").css("border-color", "purple");
        $("body").css("background-color", "black");
        $(".ranking-container").css("background-color", "black");
        $(".container").css("background-color", "black");
        $(".score").css("color", "purple");
        $(".points").css("color", "purple");
        $(".ranking-title").css("color", "purple");
        $(".container").css("background-color", "black");
        $(".text-center").css("color", "purple");
        $(".game-container").css("background-color", "black");
        $(".ranking-data").css("color", "white");
    }

    function moveSnake() {
        for (var i = snake.length - 1; i > 0; i--) {
            snake[i] = { ...snake[i - 1] };
        }

        switch (currentDirection) {
            case "up":
                snake[0].top -= 10;
                if (snake[0].top <= 0) {
                    snake[0].top = $('.game-container').height();
                }
                break;
            case "down":
                snake[0].top += 10;
                if (snake[0].top >= $('.game-container').height()) {
                    snake[0].top = 0;
                }
                break;
            case "left":
                snake[0].left -= 10;
                if (snake[0].left <= 0) {
                    snake[0].left = $('.game-container').width();
                }
                break;
            case "right":
                snake[0].left += 10;
                if (snake[0].left >= $('.game-container').width()) {
                    snake[0].left = 0;
                }
                break;
        }

        if (checkCollision($('.snake').eq(0), $('.apple'))) {
            growSnake();
            generateApple();
            score += 1;
            $('.points').text(score);
        }

        if (checkSnakeCollision()) {
            clearInterval(gameInterval);
            clearInterval(bombInterval);
            finishRanking();
            alert('Has perdido, la serpiente se ha comido a sí misma');
            difficultySelector.prop('disabled', false);
            return false;
        }
        updateSnakeAppearance();
    }

    function moveSnakeHard() {
        moveSnakeWithBorderCheck();
    }

    function moveSnakeMythic() {
        moveSnakeWithBorderCheck();
    }

    function moveSnakeWithBorderCheck() {
        for (var i = snake.length - 1; i > 0; i--) {
            snake[i] = { ...snake[i - 1] };
        }

        switch (currentDirection) {
            case "up":
                snake[0].top -= 10;
                break;
            case "down":
                snake[0].top += 10;
                break;
            case "left":
                snake[0].left -= 10;
                break;
            case "right":
                snake[0].left += 10;
                break;
        }

        var containerWidth = $('.game-container').width();
        var containerHeight = $('.game-container').height();
        var snakeHead = snake[0];
        if (snakeHead.left < 0 || snakeHead.top < 0 || snakeHead.left >= containerWidth || snakeHead.top >= containerHeight) {
            clearInterval(gameInterval);
            clearInterval(bombInterval);
            finishRanking();
            alert('Has perdido, la serpiente ha chocado con el borde del juego');
            difficultySelector.prop('disabled', false);
            return;
        }

        if (checkSnakeCollision() || checkCollision($('.snake').eq(0), $('.bomb'))) {
            clearInterval(gameInterval);
            clearInterval(bombInterval);
            finishRanking();
            alert('Has perdido, la serpiente ha chocado con una bomba o consigo misma');
            difficultySelector.prop('disabled', false);
            return;
        }

        if (checkCollision($('.snake').eq(0), $('.apple'))) {
            growSnake();
            generateApple();
            $('.bomb').remove();
            score += 1;
            $('.points').text(score);
        }

        updateSnakeAppearance();
    }

    function growSnake() {
        var lastSegment = snake[snake.length - 1];
        snake.push({ top: lastSegment.top, left: lastSegment.left });
        $('<div class="snake"></div>').appendTo('.game-container');
        $('.points').text(score);
    }

    function finishRanking() {
        var difficulty = $('#difficulty option:selected').val();
        var playerData = { nombre: nombre, puntaje: score };
        var ranking = JSON.parse(localStorage.getItem('ranking_' + difficulty)) || [];
        ranking.push(playerData);
        updateLocalStorageRanking(ranking, difficulty);
        updateRanking(difficulty);
    }

    function updateSnakeAppearance() {
        for (var i = 0; i < snake.length; i++) {
            var segment = snake[i];
            $('.snake').eq(i).css({
                top: segment.top + 'px',
                left: segment.left + 'px'
            });
        }
    }

    function checkCollision(object1, object2) {
        if (!object1 || !object2) {
            return false;
        }
        var rect1 = object1[0]?.getBoundingClientRect();
        for (var i = 0; i < object2.length; i++) {
            var rect2 = object2.eq(i)[0]?.getBoundingClientRect();
            if (rect1 && rect2 && !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)) {
                return true;
            }
        }
        return false;
    }

    function checkSnakeCollision() {
        if (snake.length == 2) {
            return false;
        }
        var headPos = snake[0];
        for (var i = 1; i < snake.length; i++) {
            if (headPos.top === snake[i].top && headPos.left === snake[i].left) {
                return true;
            }
        }
        return false;
    }

    function generateApple() {
        var containerWidth = $('.game-container').width();
        var containerHeight = $('.game-container').height();

        var randomX = Math.floor(Math.random() * (containerWidth - 40));
        var randomY = Math.floor(Math.random() * (containerHeight - 40));

        $('.apple').css({ "top": randomY + "px", "left": randomX + "px" });
    }

    function generateBombs() {
        var containerWidth = $('.game-container').width();
        var containerHeight = $('.game-container').height();

        var randomX = Math.floor(Math.random() * (containerWidth - 40));
        var randomY = Math.floor(Math.random() * (containerHeight - 40));
        $('<div class="bomb"></div>').css({ "top": randomY + "px", "left": randomX + "px" }).appendTo('.game-container');
    }

    function updateRanking(difficulty) {
        var ranking = JSON.parse(localStorage.getItem('ranking_' + difficulty));
        ranking.sort((a, b) => b.puntaje - a.puntaje);
        var rankingHTML = '';
        ranking.forEach(function (player, index) {
            if (index == 0) {
                rankingHTML += '<div class="ranking-data" style="color:gold">' + (index + 1) + '. ' + player.nombre + ' - ' + player.puntaje + '</div>';
            }
            else if (index == 1) {
                rankingHTML += '<div class="ranking-data" style="color:silver">' + (index + 1) + '. ' + player.nombre + ' - ' + player.puntaje + '</div>';
            }
            else if (index == 2) {
                rankingHTML += '<div class="ranking-data" style="color:brown">' + (index + 1) + '. ' + player.nombre + ' - ' + player.puntaje + '</div>';
            }
            else {
                if (difficulty == 'easy') {
                    rankingHTML += '<div class="ranking-data" style="color:white">' + (index + 3) + '. ' + player.nombre + ' - ' + player.puntaje + '</div>';
                }
                else if (difficulty == 'hard') {
                    rankingHTML += '<div class="ranking-data" style="color:white">' + (index + 3) + '. ' + player.nombre + ' - ' + player.puntaje + '</div>';
                }
                else if (difficulty == 'mythic') {
                    rankingHTML += '<div class="ranking-data" style="color:white">' + (index + 1) + '. ' + player.nombre + ' - ' + player.puntaje + '</div>';
                }
            }
        });
        $('.ranking').html(rankingHTML);
    }

    $(document).keydown(function (event) {
        switch (event.which) {
            case 37: // Flecha izquierda
                if (currentDirection !== "right") {
                    currentDirection = "left";
                }
                break;
            case 38: // Flecha arriba
                if (currentDirection !== "down") {
                    currentDirection = "up";
                }
                break;
            case 39: // Flecha derecha
                if (currentDirection !== "left") {
                    currentDirection = "right";
                }
                break;
            case 40: // Flecha abajo
                if (currentDirection !== "up") {
                    currentDirection = "down";
                }
                break;
        }
    });
    difficultySelector = $('#difficulty');
    snake.push({ top: 0, left: 0 });
    $('<div class="snake"></div>').appendTo('.game-container');
    generateApple();
    difficultySelector.change(startGame);
    updateRanking();
});
