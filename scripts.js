(function(){
    let game= {
        init:function(){
            this.gameBoard.print();
            this.selector();
            this.listener();       
        
        },
        gameBoard:{
            board:[[' ',' ',' '],
                   [' ',' ',' '],
                   [' ',' ',' ']],
            round:1,

            print:function(){
                for(let i = 0; i<this.board.length; i++){
                    console.log(this.board[i].join('|'))
                    if(i< this.board.length - 1){
                        console.log('-----')
                    }
                
                }
            }, 

        },

        players: [{name:'Player 1', token:'X', score:0},{name:'Player 2', token:'O', score:0}],


        activePlayerIndex:0,

        switchTurnPlayer:function(){
            this.activePlayerIndex = (this.activePlayerIndex + 1)% this.players.length;
        },

        getToken:function(){
            return this.players[this.activePlayerIndex].token;
            
        },
        
        selector:function(){
            this.cells = document.querySelectorAll('.cell');
            this.playButton = document.querySelector('.play-button');
            this.scorePlayer1 = document.querySelector('.player1-score');
            this.scorePlayer2 = document.querySelector('.player2-score');
            this.round = document.querySelector('.round-number');
            this.messageContainer=document.querySelector('.message')
            this.messageWinner = document.querySelector('.winner-message')

            this.round.innerText = this.gameBoard.round;



            

        
        },

        makeMove:function(row, column){
            if(this.gameBoard.board[row][column]=== ' '){
                this.gameBoard.board[row][column]= this.getToken();

                
                this.switchTurnPlayer();
                this.checkWinner();

            }
            
        
        },
        boardDisable:function(){
            this.cells.forEach(cell => {
                
                cell.removeEventListener('click', this.cellClickHandler);
            })
        
        },

        listener:function(){
            this.cellClickHandler = (e)=>{
                const cell = e.target;
                const x = parseInt(cell.getAttribute('data-x'));
                const y = parseInt(cell.getAttribute('data-y'));
                cell.innerText = this.getToken();
                this.makeMove(x, y);
            };

            this.cells.forEach(cell => {
                cell.addEventListener('click', this.cellClickHandler);
            });

        
            document.querySelector('.run-button').
                     addEventListener('click', ()=>{
                        this.restart();
                        
                  
                    })
            this.playButton.addEventListener('click', this.playNext.bind(this))
            
          
        },

        winnerFound:{

            winner: false
            
        },        
        checkWinner:function(){
            if(this.winnerFound.winner) return;
            let winner = null;
        
            for(let i= 0; i< 3; i++){
            
                if(this.gameBoard.board[i][0] !== ' ' && 
                    this.gameBoard.board[i][0] === this.gameBoard.board[i][1] &&
                    this.gameBoard.board[i][0] === this.gameBoard.board[i][2]) {

                    winner = this.gameBoard.board[i][0];
                    break;
                }

            }
            for (let i= 0; i< 3; i++){
                    if(this.gameBoard.board[0][i] !== ' ' && 
                        this.gameBoard.board[0][i] === this.gameBoard.board[1][i] &&
                        this.gameBoard.board[0][i] === this.gameBoard.board[2][i]) {
                        
                        winner = this.gameBoard.board[0][i];
                        break;
                    }
                }


            if(this.gameBoard.board[0][0] !== ' ' &&
               this.gameBoard.board[0][0] === this.gameBoard.board[1][1] &&
               this.gameBoard.board[0][0] === this.gameBoard.board[2][2]){
                
            
                winner = this.gameBoard.board[0][0]
            }
             
            if(this.gameBoard.board[0][2] !== ' ' &&
               this.gameBoard.board[0][2] === this.gameBoard.board[1][1] &&
               this.gameBoard.board[0][2] === this.gameBoard.board[2][0]){
             
         
             winner = this.gameBoard.board[0][2]
            }

            if(winner !==null){
                this.winnerFound.winner = true;
                this.addScore(winner)
                this.addWinnerMessage(winner)
                this.boardDisable();
                
            
            }else{ this.checkTie()}
        
        },

        checkTie:function(){
        let emptyCells = 0;

            for(let i= 0;i < this.gameBoard.board.length; i++){
                for(let j = 0; j< this.gameBoard.board.length; j++){
                    if(this.gameBoard.board[i][j]=== ' '){
                        emptyCells++
                    
                    }
                
                }
            
            
            }

            if (emptyCells === 0){
                this.boardDisable();
                this.messageWinner.innerText= `TIE!`
                this.messageContainer.classList.add('container-message');
            
            }
        
        },

        addWinnerMessage:function(winner){

            this.messageWinner.innerText= `${winner} Winner!`
            this.messageContainer.classList.add('container-message');
        
        },

        deleteWinnerMessage:function(){
            
            this.messageWinner.innerText = ' ';
            this.messageContainer.classList.remove('container-message');
        },


        addScore: function(winner){
            if (winner === 'X'){

                this.players[0].score++;
                this.scorePlayer1.innerText = this.players[0].score;
            
            }else if(winner === 'O'){
                this.players[1].score++;
                this.scorePlayer2.innerText = this.players[1].score;
            
            }
        
        }, 

        deleteScore:function(){
            
            this.players[0].score=0;
            this.players[1].score=0;

            this.scorePlayer1.innerText=' ';
            this.scorePlayer2.innerText=' ';


            this.gameBoard.round = 0;

        
        },

        playNext:function(){

            this.cleanBoard();
            this.gameBoard.round++;
            this.round.innerText = this.gameBoard.round;
            this.deleteWinnerMessage()



        },

        cleanBoard:function(){
            for(let i= 0;i < this.gameBoard.board.length; i++){
                for(let j = 0; j< this.gameBoard.board.length; j++){
                    this.gameBoard.board[i][j]=' ';
                
                } 
            }
            this.winnerFound.winner = false;

            this.cells.forEach(cell =>{
                cell.innerText = ' ';
                cell.addEventListener('click', this.cellClickHandler)
            
            });

            

        },





        restart:function(){
            
            this.cleanBoard();
            this.gameBoard.round=0;
            this.round.innerText= 0;
            this.deleteScore();


        }





        
    
    }




    game.init();





})();