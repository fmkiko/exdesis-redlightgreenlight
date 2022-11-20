export default class StorgeData{
    static playerName;
    // Método para grabar datos del player
    static saveData(objetPlayer){
        const player = this.getPlayer(objetPlayer.name);
        if(!player){
            localStorage.setItem(objetPlayer.name, JSON.stringify(objetPlayer));
        }
    }
    // Método para devolver un player
    static getPlayer(playerName){
        const player = localStorage.getItem(playerName);
        return JSON.parse(player);
    }
    // Método para borrar player
    static removeData(namePlayer){
        localStorage.removeItem(namePlayer);
    }
    // Método para actualizar
    static updateData(playerName, newScore){
        const player = this.getPlayer(playerName);
        if(player){
            player.score = newScore;
            let playerUp = player;
            this.removeData(playerName);
            this.saveData(playerUp);
        }
    }
}