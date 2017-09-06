console.log('hello');

//konstruktor Furry
var Furry = function() {
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}
//konstruktor monety
var Coin = function() {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}
//konstruktor gry
var Game = function() {
    this.board = document.querySelectorAll("#board div");
    this.section = document.querySelector("#board");
    this.over = document.querySelector("#over");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;

    this.index = function(x, y) {
        return x + (y * 10);
    }

    this.showFurry = function() {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');

    }

    this.hideVisibleFurry = function() {
        var hideDiv = document.querySelector(".furry");
        if (hideDiv != null) {
            hideDiv.classList.remove("furry");
        }

    }

    this.showCoin = function() {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }

    this.moveFurry = function() {

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "top") {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === "bottom") {
            this.furry.y = this.furry.y - 1;
        }
        this.gameOver();
        this.showFurry();

        this.checkCoinCollision();
    }

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'bottom';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'top';
        }
    }

    this.checkCoinCollision = function() {
        if ((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) {
            console.log('zderzyly sie');
            var hideCoin = document.querySelector(".coin");
            hideCoin.classList.remove("coin");
            self.coin = new Coin();
            self.showCoin();
            this.score++;
            var point = document.getElementById('scored');
            point.innerText = this.score;
        }
    }

    this.gameOver = function() {
        if ((this.furry.x < 0) || (this.furry.x > 9) || (this.furry.y < 0) || (this.furry.y > 9)) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            self.section.classList.add("invisible");
            self.over.classList.remove("invisible");
        }
    }

    this.startGame = function() {
        this.idSetInterval = setInterval(function() {
            self.moveFurry();
        }, 250);
    }

}

//Uruchomienie
var game = new Game();


game.showFurry();
game.showCoin();
game.startGame();

document.addEventListener('keydown', function(event) {
    game.turnFurry(event);
});


