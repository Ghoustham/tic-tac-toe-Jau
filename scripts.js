(function(){

    const gameBoard = {
        players: [],
        plays: ['hola','hola'],

            gameInit: function(){
                this.cacheDom();
                this.chooseBox();
            },

            cacheDom: function(){
                this.cardContainer = document.querySelectorAll('.card-container')
            },

            createPlayer: function(name, sign){  
                return this.players.push({name, sign})
            },

            chooseBox: function(){
                let data = {plays:this.plays}
                this.cardContainer.forEach(box => {
                    
                    box.addEventListener('click', (e) =>{
                        this.plays.push('x')
                        box.innerText = data.plays.join(' ');
                    })
                    
                });

            },
            


    };
    
    gameBoard.gameInit();

})();