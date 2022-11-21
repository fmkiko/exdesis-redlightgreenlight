import { Subject } from 'rxjs';

export default class StorgeData{

    static playerSubject = new Subject();
    static playerSubject$ =this.playerSubject.asObservable();

    static playerName;
    static listPlayer = []; // {name,score}
    static collection = "dataPlayers"

    // Método para grabar datos del player
    static saveData(objetPlayer){
        this.updataListPlayer();
        const objResult = this.searchPlayer(objetPlayer);
        // Si no esta los ponemos
        console.log(this.searchPlayer(objetPlayer))
        if( objResult.isPlayer === false ){ 
            this.listPlayer.push(objetPlayer); 
            localStorage.setItem( this.collection, JSON.stringify(this.listPlayer) );
        };

       
    }
    // Método para devolver un player
    static getPlayer(playerName){
        this.updataListPlayer();
        const objPlayer = this.searchPlayer(playerName);

        if(!objPlayer.isPlayer){
            return
        }
        const player = this.listPlayer[objPlayer.index];
        return player;
     
       
    }
    // Método para borrar player
    static removeData(namePlayer){
        //localStorage.removeItem(namePlayer);
    }
    // Método para actualizar
    static updateData(playerName, newScore){
        const resultSearch = this.searchPlayer(playerName);
        if(resultSearch){
           
            console.log("list ", this.listPlayer[resultSearch.index]);
            this.listPlayer[resultSearch.index].score = newScore; 
            console.log(this.listPlayer[resultSearch.index].score);
            localStorage.setItem( this.collection, JSON.stringify(this.listPlayer) );
            // Notifica cambios
            this.playerSubject.next(this.listPlayer);
        }
     
    }

    // Actualia array
    static updataListPlayer(){
        const dataStorage = JSON.parse(localStorage.getItem(this.collection));
        if(dataStorage){
            this.listPlayer = dataStorage ;
        }

        
       
    }

    // Método para buscar player
    static searchPlayer(playerName){
        let encontrado = false;
        let index = 0;
        // Buscar en la array antes de agregar.
       
        this.listPlayer.forEach( ( e, i ) => {
            if( e.name === playerName ){
                encontrado = true;
                index = i;
                return;
            };
        });
        console.log("Encontrado ",encontrado)
        return { isPlayer: encontrado, index }
    }
}