export class Cell {

    public constructor(private _value: number) {
        if (!this.isPowerOfTwo(_value))
            throw new Error(`The '${_value}' value is not allowed.`);
    }

    public static empty(): Cell {
        return new Cell(null);
    }

    public canMergeWith(cell: Cell): boolean {
        return !this.isEmpty && this.value === cell.value;
    }

    public mergeWith(cell: Cell): Cell {
        if (!this.canMergeWith(cell))
            throw new Error(`${this._value} and ${cell._value} cannot be merged.`);

        return new Cell(this.value + cell.value);
    }

    private isPowerOfTwo(value: number): boolean {
        return (value !== 0) && ((value & (value - 1)) === 0);
    }

    public get value(): number {
        return this._value;
    }

    public get isEmpty(): boolean {
        return this.value == null;
    }

}
