interface ItemAttributes {
    type: string;
    name: string;
    description: string;
    value: number;
    icon: string;
}

export default class InventoryItem {
    private readonly _type: string;
    private readonly _name: string;
    private readonly _description: string;
    private readonly _value: number;
    private readonly _icon: string;

    constructor(type: string, name: string, description: string, value: number, icon: string) {
        this._type = type;
        this._name = name;
        this._description = description;
        this._value = value;
        this._icon = icon;
    }

    get type(): string {
        return this._type;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get value(): number {
        return this._value;
    }

    get icon(): string {
        return this._icon;
    }

    static createFromObject(obj: any): InventoryItem {
        const { type, name, description, value, icon } = obj;
        return new InventoryItem(type, name, description, value, icon);
    }

    static createFromArray(arr: any[]): InventoryItem[] {
        return arr.map((obj) => InventoryItem.createFromObject(obj));
    }

    public static defaultPizza(): InventoryItem {
        return new InventoryItem("Pizza", "Cheese Pizza", "A classic cheese pizza", 10, "pizza.png");
    }

    public static randomPizza(): InventoryItem {
        const name = Math.random().toString(36).substring(2, 8);
        const description = "Random pizza description.";
        const value = Math.floor(Math.random() * 101);
        const icon = "pizza.png";
        return new InventoryItem("Pizza", name, description, value, icon);
    }
}
