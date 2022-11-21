
export default class LoginComponent extends HTMLElement{
    constructor(){
        super();
        this.playerName = "";
        this.isPlayerNameOK = false;
        this.swObj = this.attachShadow({mode:'open'}); 
        this.render();
    }
   
    connectedCallback() {
        this.init();
        // Event click btn palayer
        this.playerBtn.addEventListener('click',()=>{
            this.playerName = this.inputName.value.trim();
            this.validator(this.playerName);
        });
        // Event focus input
        this.inputName.addEventListener('focus',()=>{
            this.divError.innerText = "";
        })
    }
    init(){
        this.inputName = this.swObj.querySelector('[name=playerName]')//.value.trim();
        this.divError = this.swObj.querySelector('.error');
        this.playerBtn = this.swObj.querySelector('.play-btn')
    }

    fireDatosLogin(){
        this.dispatchEvent(new CustomEvent('status-login', {
            detail: {
                status: this.isPlayerNameOK,
                player : this.playerName,
            }
          }));
    }

    render(){
        this.swObj.innerHTML = this.getTemplate();
    }
    // Método para validar en campo namePlayer
    validator(playerName){
        // check
        if( this.playerName === ""){
            this.divError.innerText = "El campo es obligatorio!!!"
            this.isPlayerNameOK = false;
        }else{
            this.isPlayerNameOK = true;
            this.fireDatosLogin();
        }
    }
    

    getTemplate(){
        return `
            ${this.getStyle()}
                <div>
                    <slot name="icon"></slot>
                </div>
                <h1>${this.getAttribute('title')}</h1>
                <i class="${this.getAttribute('icon')}"></i>
                <input type="text" name="playerName" placeholder="Name"/>
                <div class="error"></div>
                <button type="submit" class="play-btn">${this.getAttribute('btn-name')}</button>  
            
        `
    }
    getStyle(){
        return `
            <style>
            :host {
                display: flex;
                padding: 20px;
                
                flex-direction: column;
                text-align: center;
                margin : 0 auto
               
            }
        
            h1{
                color: white;
            }
            input {
                margin-top: 5px;
                padding: 10px;
                height: 30px;
                font-size: 15px;
                outline: none;
                border: none;
                border-radius: 5px;
            }
            button {
                margin-top: 15px;
                padding: 10px;
                font-size: 15px;
                font-weight: bold;
                background-color: #45f3ff;
                border: none;
                height: 50px;
                border-radius: 5px;
                cursor: pointer;
            }
            .error{
                color:red;
            }
            </style>
        `
    }
}