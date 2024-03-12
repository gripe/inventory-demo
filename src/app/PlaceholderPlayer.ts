import { Inventory, inventoryLimit } from './Inventory';
import InventoryItem from './InventoryItem';

export class PlaceholderPlayer {
    private readonly _username: string;
    private readonly _id: number;
    private _foodInventory: Inventory;

    constructor(username: string, id: number, foodInventory: Inventory = new Inventory()) {
        this._username = username;
        this._id = id;
        this._foodInventory = foodInventory;
    }

    get username(): string {
        return this._username;
    }

    get id(): number {
        return this._id;
    }

    get foodInventory(): Inventory {
        return this._foodInventory;
    }

    public addToFoodInventory(item: InventoryItem): boolean {
        return this._foodInventory.addToInventory(item);
    }

    public getFoodInventoryItemAtIndex(index: number): InventoryItem {
        return this._foodInventory.getItemAtIndex(index);
    }

    public addRandomPizzaToFoodInventory(): void {
        this._foodInventory.addRandomPizza();
    }
}