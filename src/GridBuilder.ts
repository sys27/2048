import { Cell } from "./Cell";
import { Grid } from "./Grid";
import { IPosition } from "./Position";

export class GridBuilder {

    private _cells: Cell[][];

    private constructor() {
        this._cells = [];

        for (let i = 0; i < Grid.rows; i++) {
            this._cells[i] = [];
            for (let j = 0; j < Grid.columns; j++) {
                this._cells[i][j] = Cell.empty();
            }
        }
    }

    public static create(): GridBuilder {
        return new GridBuilder();
    }

    private setCell(cell: Cell, position: IPosition): GridBuilder {
        if (!cell)
            throw new Error(`The cell is undefined.`);

        if (position.row < 0 || position.row >= Grid.rows)
            throw new Error(`The row index is invalid.`);

        if (position.column < 0 || position.column >= Grid.columns)
            throw new Error(`The column index is invalid.`);

        this._cells[position.row][position.column] = cell;

        return this;
    }

    public addCell(value: number, position: IPosition): GridBuilder {
        this.setCell(new Cell(value), position);

        return this;
    }

    public addEmpty(position: IPosition): GridBuilder {
        this.setCell(Cell.empty(), position);

        return this;
    }

    public build(): Grid {
        const grid = new Grid();
        grid.initializeFrom(this._cells);

        return grid;
    }

}
