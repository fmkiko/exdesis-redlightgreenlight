import StorgeData from "../services/StorageData";

export default class PlayerComponent extends HTMLElement{
    constructor(){
        super();
        this.score = 0;
        this.statusSf = 'red' ;
        this.lastBtn;
        this.swObj = this.attachShadow({mode: 'open'});
        this.render();
    }
    connectedCallback() {
        this.init();
        this.startSf();
        // Click Right
        this.btnRight.addEventListener('click',()=>{
            this.controlScore( 'right' );
            this.lastBtn = 'right';
            this.showScore.innerHTML = `Score : ${this.score}`;
            // update datos
            StorgeData.updateData(this.playerName, this.score);

            
        });
        // Click Left
        this.btnLeft.addEventListener('click', ()=>{
            console.log(this.statusSf)
            this.controlScore( 'left');
            this.lastBtn = 'left';
            this.showScore.innerHTML = `Score : ${this.score}`;
            // update datos
            StorgeData.updateData(this.playerName, this.score);
        });
    
    }
    init(){
        this.playerName = StorgeData.playerName;
        this.btnRight = this.swObj.querySelector('[mane=right]');
        this.btnLeft = this.swObj.querySelector('[name=left]');
        this.light = this.swObj.querySelector('[name=icon]');
        console.log(this.light);
        this.showScore = this.swObj.querySelector('#score');
        this.getSession(this.playerName);
        
    }
    render(){
        this.swObj.innerHTML = this.getTemplate();
    }
    getSession(playerName){
        const sessionObj = StorgeData.getPlayer(playerName);
        this.score = sessionObj.score;
        this.showScore.innerText = "Score : " + sessionObj.score;
    }
    controlScore( clickBtn, lastBtn, statuSf, score ){
        if( this.statusSf === "red"){
            this.score = 0;
        }else if(clickBtn === this.lastBtn){
            this.score = this.score <= 0 ? 0 : this.score - 1;
        }else{
            this.score += 1;
        }
    };

    startSf(){
        let greenLight = 6000;

        setInterval(()=>{
            this.light.style.color = "red";
            this.statusSf = "red";
            greenLight = Math.max(10000 - this.score * 100, 2000) + Math.random(-1500, 1500);
        
        },3000);
        setInterval(()=>{
            this.light.style.color = "green";
            this.statusSf = "green";
        }, greenLight);
    }

    getTemplate(){
        return `
        ${this.getStyle()}
        <div class="screen">
           
            <div class="controls">

            <i class="fa fa-male" aria-hidden="true"></i>
                <div id="semaforo">
                    <slot name="icon"></slot>
                </div>
                
                <div class="score" id="score">
                    Score : 0
                </div>
                <div class="actions" id="actions">
                    <button class="btn-player" name="left" >LEFT</button>t
                    <button class="btn-player" mane="right" >RIGHT</button>
                </div>
            </div>
    </div>
        `
    }
    getStyle(){
        return `
        <style>
        .screen{
            text-align: center;
        }
        .controls > div{
            margin-top: 10px;
        }
          .score{
            color: white;
            font-size: 20px;
          }
          .btn-player{
            padding: 10px 0px;
            width: 25%;
           
            background-color: rgb(132, 193, 246);
            font-weight: bold;
            border: 0px;
            border-radius: 5px;
            cursor: pointer;
          }
          #logout{
            text-decoration: none;
            color: rgb(132, 193, 246);
            cursor: pointer;
          }
        </style>
        `
    }
}