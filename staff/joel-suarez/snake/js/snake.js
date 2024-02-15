$(document).ready(function () {
    var snake = [];
    var currentDirection = null;
    var snakeLengthMax = 4;
    var gameInterval;
    var bombInterval;
    var difficultySelector;

    function startGame() {
        var difficulty = $('#difficulty option:selected').val();
        if (difficulty === "easy") {
            alert('Has seleccionado dificultad normal');
            gameInterval = setInterval(moveSnake, 60);
            $(".game-container").css("border-color", "green");
        }
        else if (difficulty === "hard") {
            alert('Has seleccionado dificultad Hardcore: \n- Intervalo mas rapido que en Normal\n- Moriras si chocas contra el borde');
            gameInterval = setInterval(moveSnakeHard, 30);
            $(".game-container").css("border-color", "red");
            $("body").css("background-color", "#bebebe");
            $(".container").css("background-color", "#bebebe");
            $(".text-center").css("color", "red");
            $(".game-container").css("background-color", "#bebebe");
        }
        else if (difficulty === "mythic") {
            alert('Has seleccionado dificultad Mitica: \n- Intervalo mas rapido que en Hard y Normal\n- Moriras si chocas contra el borde\n- Bombas aleatorias apareceran por la pantalla');
            gameInterval = setInterval(moveSnakeMythic, 19);
            bombInterval = setInterval(generateBombs, 1000);
            $(".game-container").css("border-color", "purple");
            $("body").css("background-color", "black");
            $(".container").css("background-color", "black");
            $(".text-center").css("color", "purple");
            $(".game-container").css("background-color", "black");
        }
        else {
            alert('Selecciona una dificultad válida');
        }
        difficultySelector.prop('disabled', true);
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

        updateSnakeAppearance();
        if (checkCollision($('.snake').eq(0), $('.apple'))) {
            growSnake();
            generateApple();
        }
        if (checkSnakeCollision()) {
            alert('Has perdido, la serpiente se ha comido a sí misma');
            difficultySelector.prop('disabled', false);
            clearInterval(gameInterval);
            clearInterval(bombInterval);
            return false;
        }
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
            alert('Has perdido, la serpiente ha chocado con el borde del juego');
            difficultySelector.prop('disabled', false);
            return;
        }

        if (checkCollision($('.snake').eq(0), $('.bomb'))) {
            clearInterval(gameInterval);
            clearInterval(bombInterval);
            alert('Has perdido, la serpiente ha chocado con una bomba');
            difficultySelector.prop('disabled', false);
            return;
        }

        updateSnakeAppearance();
        if (checkCollision($('.snake').eq(0), $('.apple'))) {
            growSnake();
            generateApple();
            $('.bomb').remove();
        }

        if (checkSnakeCollision()) {
            clearInterval(gameInterval);
            clearInterval(bombInterval);
            alert('Has perdido, la serpiente se ha comido a sí misma');
            difficultySelector.prop('disabled', false);
            return;
        }
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

    function growSnake() {
        var lastSegment = snake[snake.length - 1];
        snake.push({ top: lastSegment.top, left: lastSegment.left });
        $('<div class="snake"></div>').appendTo('.game-container');
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
        // Generar bombas aleatorias
        var containerWidth = $('.game-container').width();
        var containerHeight = $('.game-container').height();

        var randomX = Math.floor(Math.random() * (containerWidth - 40));
        var randomY = Math.floor(Math.random() * (containerHeight - 40));

        // Añadir bombas a la pantalla
        $('<div class="bomb"></div>').css({
            "top": randomY + "px",
            "left": randomX + "px"
        }).appendTo('.game-container');
    }

    $(document).keydown(function (event) {
        switch (event.which) {
            case 37:
                currentDirection = "left";
                break;
            case 38:
                currentDirection = "up";
                break;
            case 39:
                currentDirection = "right";
                break;
            case 40:
                currentDirection = "down";
                break;
        }
    });
    difficultySelector = $('#difficulty');
    snake.push({ top: 0, left: 0 });
    $('<div class="snake"></div>').appendTo('.game-container');
    generateApple();
    difficultySelector.change(startGame);
});