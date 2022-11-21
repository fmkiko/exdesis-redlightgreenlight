
import LoginComponent from '../components/login/login.component.js';
import PlayerComponent from '../components/player-screen/player.component.js';
import NavbarComponent from '../components/navbar/navbar.component.js';
import PlayersList from '../components/lista/lista.component.js';
import loginPage from '../pages/login.html';
import playerPage from '../pages/player.html';
import StorgeData from '../components/services/StorageData.js';


export default class RouterComponent extends HTMLElement{
    constructor(){
        super();
        this.pagesIndex = 1;
        
       // this.swObj = this.attachShadow({mode: 'open'});
        this.setChildComponent();
        this.render();
    }
    connectedCallback() {
        // Oyente del login resultado.
        this.listenerLogin();
        
     
    }
    setChildComponent(){
        if (typeof customElements.get('login-component') === 'undefined') {
            customElements.define('login-component', LoginComponent);
          }
        if (typeof customElements.get('player-component') === 'undefined') {
            customElements.define('player-component', PlayerComponent);
          }
        if (typeof customElements.get('navbar-component') === 'undefined') {
            customElements.define('navbar-component', NavbarComponent);
          }
        if (typeof customElements.get('list-component') === 'undefined') {
            customElements.define('list-component', PlayersList);
          }
    }

    getComponentToRender(pagesIndex){
        switch(pagesIndex) {
            case 1:
              return loginPage;
            case 2:
              return playerPage;
            default:
                return loginPage;
          }
    }
    handleURL() {
        switch(window.location.hash) {
          case '#login':
            this.pagesIndex = 1;
            break;
          case '#player':
            this.pagesIndex = 2;
            break;
          default:
            this.pagesIndex = 1;
            break;
        }
        this.render()
    }
    render(){
        this.innerHTML = this.getTamplate();
    }
    // Oyente del login
    listenerLogin(){
        if( this.querySelector('login-component')){
            this.querySelector('login-component').addEventListener('status-login', (e)=>{
                console.log(e.detail);
                if(e.detail){
                    this.pagesIndex = 2;
                    this.session(e.detail);
                    this.render();
                }
            })
        }
    }
    session(data){
        StorgeData.playerName = data.player;
        if(!StorgeData.getPlayer( data.player )){
            StorgeData.saveData({ name : data.player, score: 0})
        }
    }
    getTamplate(){
        return `
            <div>
                ${this.getComponentToRender(this.pagesIndex)}
            </div>
        `;
    }
}