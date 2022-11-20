import LoginComponent from '../login/login.component.js';
import PlayerComponent from '../pages/player-screen/player.component.js';

export default class AppComponent extends HTMLElement{
    constructor(){
        super();
        this.indexComponent = 1;
      
        this.swObj = this.attachShadow({mode : 'open'});
        this.setChildComponent();
        this.render();
    }
   
    setChildComponent(){

        if ( typeof customElements.get('login-component') === 'undefined'){
            customElements.define('login-component', LoginComponent);
        }
      
        if ( typeof customElements.get('player-component') === 'undefined'){
            customElements.define('player-component', PlayerComponent);
        }
    
    }

    getChildComponent(indexComponent){
        console.log("El cmponete a render : ", indexComponent)
        switch(indexComponent){
            case 1:
                return `<login-component></login-component>`;
            case 2:
                return `<player-component></player-component>`;
            default:
                return `<login-component></login-component>`;
        }
    }

    render(){
        this.swObj.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
        <div class="container">
            ${this.getChildComponent(this.indexComponent)}
        </div>
        `
    }
}