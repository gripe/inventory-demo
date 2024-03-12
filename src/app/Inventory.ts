export const inventoryLimit = 10;
import InventoryItem from './InventoryItem';

export class Inventory {
  private _inventory: InventoryItem[] = [];

  constructor(inventory: InventoryItem[] = []) {
    this._inventory = inventory;
  }

  get inventory(): InventoryItem[] {
    return this._inventory;
  }

  get inventoryLimit(): number {
    return inventoryLimit;
  }

  get inventoryCount(): number {
    return this._inventory.length;
  }

  public addToInventory(item: InventoryItem): boolean {
    if (this._inventory.length < inventoryLimit) {
      this._inventory.push(item);
      return true;
    }
    return false;
  }

  public removeFromInventory(item: InventoryItem): boolean {
    const index = this._inventory.indexOf(item);
    if (index > -1) {
      this._inventory.splice(index, 1);
      return true;
    }
    return false;
  }

  public updateInventoryItem(oldItem: InventoryItem, newItem: InventoryItem): boolean {
    const index = this._inventory.indexOf(oldItem);
    if (index >= 0 && index < this._inventory.length) {
      this._inventory[index] = newItem;
      return true;
    }
    return false;
  }

  public updateInventoryIndex(index: number, newItem: InventoryItem): boolean {
    if (index >= 0 && index < this._inventory.length) {
      this._inventory[index] = newItem;
      return true;
    }
    return false;
  }

  public removeAtIndex(index: number): boolean {
    if (index >= 0 && index < this._inventory.length) {
      this._inventory.splice(index, 1);
      return true;
    }
    return false;
  }

  public getIndexOfItem(item: InventoryItem): number {
    return this._inventory.indexOf(item);
  }

  public getItemAtIndex(index: number): InventoryItem | null {
    if (index >= 0 && index < this._inventory.length) {
      return this._inventory[index];
    }
    return null;
  }

  public addRandomPizza(): void {
    if (this._inventory.length < inventoryLimit) {
      this.addToInventory(InventoryItem.randomPizza());
    }
  }

  public inventoryFull(): boolean {
    return this._inventory.length >= inventoryLimit;
  }

  public inventoryEmpty(): boolean {
    return this._inventory.length === 0;
  }

}