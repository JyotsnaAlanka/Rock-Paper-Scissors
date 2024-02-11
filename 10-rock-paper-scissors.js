// converting JSON object to Javascript object.
        // using default operator (it lefts ide is truthy then it will works or if left side is falsy then roight side values will work.)
        let scores = JSON.parse(localStorage.getItem('score')) ||{
            wins:0,
            losses:0,
            tie:0
        };
        

        UpdateScoreElement();
        // checking if the scores(object) is null or not.
        /* (above code is also written in this way.)
        if(!scores){
            
            scores={
            wins:0,
            losses:0,
            tie:0
        };
    }*/
       let isAutoPlaying = false;
       let intervalId;

       function autoPlay() {
        
        if(!isAutoPlaying){
            intervalId=setInterval(function() {
                const playerMove=pickComputerMove();
                playGame(playerMove);
            }, 1000);
            isAutoPlaying = true; 

        }else{
            clearInterval(intervalId);
            isAutoPlaying=false;

        }
        
       }



        function playGame(playerMove){
            const ComputerMove= pickComputerMove();

        
            let result='';
              
            // comparing your move with computer move.
            if (playerMove==='scissors'){
                if (ComputerMove === 'rock'){
                    result='You Lose';
                }else if(ComputerMove === 'paper'){
                    result ='You Win';
                }else if (ComputerMove ==='scissors'){
                    result='Tie';
                }

            }else if(playerMove==='paper'){
                if (ComputerMove === 'paper'){
                    result='Tie';
                }else if(ComputerMove === 'scissors'){
                    result ='You Lose';
                }else if (ComputerMove === 'rock'){
                    result='You Win';
                }
                
            }else if (playerMove==='rock'){
                if (ComputerMove === 'rock'){
                    result='Tie';
                }else if(ComputerMove === 'paper'){
                    result ='You Lose';
                }else if (ComputerMove === 'scissors'){
                    result='You Win';
                }
            }
            
            // increasing the score values.
            if(result==='You Win'){
                scores.wins+=1;
            }else if(result==='You Lose'){
                scores.losses=scores.losses+1;
            }else if(result==='Tie'){
                scores.tie+=1;
            }
            // to store the score in local storage.(score remain same even after we refresh the page.)
            // converting javascript object to JSON object by using stringify method.
            localStorage.setItem('score',JSON.stringify(scores));
            
            // updates the score
            UpdateScoreElement();

            document.querySelector('.js-result')
             .innerHTML=result;
            
            document.querySelector('.js-moves')
             .innerHTML=`You
                <img src="images/${playerMove}-emoji.png" class="move-icon">
                <img src="images/${ComputerMove}-emoji.png" class="move-icon">
                Computer`;
            
               
        }

        function UpdateScoreElement(){
            document.querySelector('.js-score')
             .innerHTML= `Wins:${scores.wins},Losses:${scores.losses},Ties:${scores.tie}`;
        }
        // To get computer move
        function pickComputerMove(){
            const randomNumber =Math.random();

            let ComputerMove='';

            if (randomNumber >=0 && randomNumber < 1/3){
                ComputerMove='rock';
            }else if (randomNumber>=1/3 && randomNumber<2/3){
                ComputerMove='paper';
            }else if(randomNumber >=2/3 && randomNumber<1){
                ComputerMove='scissors';
            }
        
        return ComputerMove;
        }