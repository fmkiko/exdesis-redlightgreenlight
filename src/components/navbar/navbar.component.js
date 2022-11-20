import StorgeData from "../services/StorageData";

export default class NavbarComponent extends HTMLElement{
    constructor(){
        super();
      
        this.swObj = this.attachShadow({mode: 'open'});
        this.render();
    }
    connectedCallback() {
        this.init();
        // Event click logout
        this.logout.addEventListener('click',()=>{
           this.eventLogout();
        });
      
    }
    eventLogout(){
        this.dispatchEvent(new CustomEvent('status-login', {
            detail: {
                status: this.isPlayerNameOK,
                player : this.playerName,
            }
          }));
    }
    init(){
        
        this.namePalyer = StorgeData.playerName;
      
        this.showName = this.swObj.querySelector('#player');
        this.logout = this.swObj.querySelector('#logout');
        this.getSession(this.namePalyer);
    }

    render(){

        this.swObj.innerHTML = this.getTemplate();
        
    }
    
    getSession(playerName){
        const sessionObj = StorgeData.getPlayer(playerName);
        this.showName.innerText = "Hi " + sessionObj.name;
    }
       
    getTemplate(){
        return `
        ${this.getStyle()}
        <div class="navBar">
            <p id="player">Hi Fran</p>
            <a id="logout" href="/">Logout</a>
        </div>
        `
    }
    getStyle(){
        return `
        <style>
            .navBar{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                background-color: rgba(200,200,200,.3);
            }
            .navBar p, a{
                padding: 0 10px;
                color: white;
                font-size: 20px;
            }
            #logout{
                cursor: pointer;
                text-decoration: none;
            }
        
        </style>
        `
    }

} 