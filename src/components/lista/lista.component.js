import StorgeData from "../services/StorageData";

export default class PlayersList extends HTMLElement{
    constructor(){
        super();
      
        this._list = [];
        this.swObj = this.attachShadow({mode: 'open'});
       
    }

    render(){
        this.swObj.innerHTML = this.getTemplate();
    }

    connectedCallback() {
    
        this._list = StorgeData.listPlayer;

        StorgeData.playerSubject$.subscribe( datos =>{
          this._list = datos;
          this.render();
        })

        this.render();
      }
   
   
    // Iteramos la lista
    getPlayers() {
        this._list.sort((a,b) => b.score - a.score);
        return this._list.map((item, num) => {
          return `<div class="student-list__student">${num + 1}. ${item.name} : ${item.score}</div>`;
        }).join('');
      }

    set students(value){
        this._list = value;
        this.renderList();
    }
    getTemplate() {
        return `
            <div class="player-list-item">
              ${this.getPlayers()}
            </div>
          ${this.getStyle()}
        `;
      }
    getStyle() {
        return `
          <style>
            :host {
              display: block;
            }
            .player-list-item{
                color: white;
            }
          </style>
        `;
      }
} 