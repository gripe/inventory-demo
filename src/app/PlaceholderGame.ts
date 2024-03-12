import { PlaceholderPlayer } from "./PlaceholderPlayer";
import { Inventory, inventoryLimit } from "./Inventory";
import InventoryItem from "./InventoryItem";

export class PlaceholderGame {
    private _players: PlaceholderPlayer[] = [];
    private _lastID: number = 0;

    constructor(players: PlaceholderPlayer[] = [], lastID: number = 0) {
        this._players = players;
        this._lastID = lastID;
    }

    get players(): PlaceholderPlayer[] {
        return this._players;
    }

    get lastID(): number {
        return this._lastID;
    }

    public addPlayerByUsername(username: string): number {
        const id = this._lastID++;
        const newPlayer = new PlaceholderPlayer(username, id);
        this._players.push(newPlayer);
        return id;
    }

    public removePlayer(player: PlaceholderPlayer): boolean {
        const index = this._players.indexOf(player);
        if (index > -1) {
            this._players.splice(index, 1);
            return true;
        }
        return false;
    }

    public removePlayerById(id: number): void {
        const index = this._players.findIndex(player => player.id === id);
        if (index !== -1) {
            this._players.splice(index, 1);
        }
    }

    public removePlayerByUsername(username: string): void {
        const index = this._players.findIndex(player => player.username === username);
        if (index !== -1) {
            this._players.splice(index, 1);
        }
    }

    public getPlayerById(id: number): PlaceholderPlayer | null {
        return this._players.find(player => player.id === id) || null;
    }

    private _isPlayerIDValid(id: number): boolean {
        return this._players.some(player => player.id === id);
    }

    public canPlayerGiveItemToPlayerID(playerGiveID: number, playerReceiveID: number, itemIndex: number): boolean {
        if (!this._isPlayerIDValid(playerGiveID) || !this._isPlayerIDValid(playerReceiveID)) {
            return false;
        }
        const giver = this.getPlayerById(playerGiveID);
        const receiver = this.getPlayerById(playerReceiveID);
        return giver && receiver && !giver.foodInventory.inventoryEmpty() && !receiver.foodInventory.inventoryFull() && giver.foodInventory.getItemAtIndex(itemIndex) !== null;
    }

    public giveItemToPlayerID(playerGiveID: number, playerReceiveID: number, itemIndex: number): void {
        if (this.canPlayerGiveItemToPlayerID(playerGiveID, playerReceiveID, itemIndex)) {
            const item = this.getPlayerById(playerGiveID)!.foodInventory.getItemAtIndex(itemIndex);
            if (item) {
                this.getPlayerById(playerGiveID)!.foodInventory.removeAtIndex(itemIndex);
                this.getPlayerById(playerReceiveID)!.foodInventory.addToInventory(item);
            }
        }
    }

    public addRandomPizzaToPlayerIDInventory(id: number): void {
        const player = this.getPlayerById(id);
        if (player) {
            player.addRandomPizzaToFoodInventory();
        }
    }
}