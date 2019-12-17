import { Cell } from "./Cell";
import { CellCreatedEventArgs } from "./Events/CellCreatedEventArgs";
import { CellMergedEventArgs } from "./Events/CellMergedEventArgs";
import { CellMovedEventArgs } from "./Events/CellMovedEventArgs";
import { Event, EventHandler } from "./Events/Event";
import { MoveDirection } from "./MoveDirection";
import { IPosition } from "./Position";

export class Grid {

    public static readonly rows: number = 4;
    public static readonly columns: number = 4;

    private _cells: Cell[][];

    private _cellMoved: Event<CellMovedEventArgs>;
    private _cellMerged: Event<CellMergedEventArgs>;
    private _cellCreated: Event<CellCreatedEventArgs>;

    public constructor() {
        this._cellMoved = new Event<CellMovedEventArgs>();
        this._cellMerged = new Event<CellMergedEventArgs>();
        this._cellCreated = new Event<CellCreatedEventArgs>();

        this.initializeEmpty();
    }

    public initializeFrom(cells: Cell[][]): void {
        if (cells.length !== Grid.rows)
            throw new Error(`The row length should be equal to ${Grid.rows}.`);

        for (const row of cells)
            if (row.length !== Grid.columns)
                throw new Error(`The column length should be equal to ${Grid.columns}.`);

        this._cells = cells;
    }

    public initializeEmpty(): void {
        this._cells = this.generateEmptyField();
    }

    public addSubsriptionToCellMoved(cellMoved: EventHandler<CellMovedEventArgs>): void {
        if (!cellMoved)
            throw new Error(`The handler is undefined.`);

        this._cellMoved.on(cellMoved);
    }

    public addSubsriptionToCellMerged(cellMerged: EventHandler<CellMergedEventArgs>): void {
        if (!cellMerged)
            throw new Error(`The handler is undefined.`);

        this._cellMerged.on(cellMerged);
    }

    public addSubscriptionToCellCreated(cellCreated: EventHandler<CellCreatedEventArgs>): void {
        if (!cellCreated)
            throw new Error(`The handler is undefined.`);

        this._cellCreated.on(cellCreated);
    }

    public addNewCell(): void {
        const position = this.generatePosition();
        const cell = this.generateNewCell();

        this._cells[position.row][position.column] = cell;
        this.raiseCellCreated(cell, position);
    }

    public hasMoves(): boolean {
        const hasEmptyCell = this._cells.some(row => row.some(cell => cell.isEmpty));
        if (hasEmptyCell)
            return true;

        for (let row = 0; row < Grid.rows - 1; row++) {
            for (let column = 0; column < Grid.columns - 1; column++) {
                const cell = this.getCell(row, column);
                const rightCell = this.getCell(row, column + 1);
                const bottomCell = this.getCell(row + 1, column);

                if (rightCell && cell.canMergeWith(rightCell))
                    return true;

                if (bottomCell && cell.canMergeWith(bottomCell))
                    return true;
            }
        }

        return false;
    }

    public move(direction: MoveDirection): boolean {
        let updated = false;

        if (direction === MoveDirection.Up)
            updated = this.moveUp();
        else if (direction === MoveDirection.Down)
            updated = this.moveDown();
        else if (direction === MoveDirection.Left)
            updated = this.moveLeft();
        else if (direction === MoveDirection.Right)
            updated = this.moveRight();

        if (updated)
            this.addNewCell();

        return updated;
    }

    private moveUp(): boolean {
        let updated = false;

        // move
        for (let column = 0; column < Grid.columns; column++) {
            for (let row = 0; row < Grid.rows; row++) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = row + 1; k < Grid.rows; k++) {
                    const nextCell = this._cells[k][column];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ row, column }, { row: k, column });
                        this.raiseCellMoved({ row: k, column }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        // merge
        for (let column = 0; column < 4; column++) {
            for (let row = 0; row < 3; row++) {
                const cell = this._cells[row][column];
                if (!cell || cell.isEmpty)
                    continue;

                const nextCell = this._cells[row + 1][column];
                if (nextCell && cell.canMergeWith(nextCell)) {
                    const newCell = cell.mergeWith(nextCell);
                    this._cells[row][column] = newCell;
                    this._cells[row + 1][column] = Cell.empty();

                    updated = true;
                    this.raiseCellMerged(newCell, { row: row + 1, column }, { row, column });
                }
            }
        }

        // move
        for (let column = 0; column < Grid.columns; column++) {
            for (let row = 0; row < Grid.rows; row++) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = row + 1; k < Grid.rows; k++) {
                    const nextCell = this._cells[k][column];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ row, column }, { row: k, column });
                        this.raiseCellMoved({ row: k, column }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        return updated;
    }

    private moveDown(): boolean {
        let updated = false;

        // move
        for (let column = Grid.columns - 1; column >= 0; column--) {
            for (let row = Grid.rows - 1; row >= 0; row--) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = row - 1; k >= 0; k--) {
                    const nextCell = this._cells[k][column];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ row, column }, { row: k, column });
                        this.raiseCellMoved({ row: k, column }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        // merge
        for (let column = 0; column < 4; column++) {
            for (let row = 3; row >= 1; row--) {
                const cell = this._cells[row][column];
                if (!cell || cell.isEmpty)
                    continue;

                const nextCell = this._cells[row - 1][column];
                if (nextCell && cell.canMergeWith(nextCell)) {
                    const newCell = cell.mergeWith(nextCell);
                    this._cells[row][column] = newCell;
                    this._cells[row - 1][column] = Cell.empty();

                    updated = true;
                    this.raiseCellMerged(newCell, { row: row - 1, column }, { row, column });
                }
            }
        }

        // move
        for (let column = Grid.columns - 1; column >= 0; column--) {
            for (let row = Grid.rows - 1; row >= 0; row--) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = row - 1; k >= 0; k--) {
                    const nextCell = this._cells[k][column];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ column, row }, { column, row: k });
                        this.raiseCellMoved({ row: k, column }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        return updated;
    }

    private moveLeft(): boolean {
        let updated = false;

        // move
        for (let row = 0; row < Grid.rows; row++) {
            for (let column = 0; column < Grid.columns; column++) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = column + 1; k < 4; k++) {
                    const nextCell = this._cells[row][k];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ row, column }, { row, column: k });
                        this.raiseCellMoved({ row, column: k }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        // merge
        for (let row = 0; row < Grid.rows; row++) {
            for (let column = 0; column < Grid.columns - 1; column++) {
                const cell = this._cells[row][column];
                if (!cell || cell.isEmpty)
                    continue;

                const nextCell = this._cells[row][column + 1];
                if (nextCell && cell.canMergeWith(nextCell)) {
                    const newCell = cell.mergeWith(nextCell);
                    this._cells[row][column] = newCell;
                    this._cells[row][column + 1] = Cell.empty();

                    updated = true;
                    this.raiseCellMerged(newCell, { row, column: column + 1 }, { row, column });
                }
            }
        }

        // move
        for (let row = 0; row < Grid.rows; row++) {
            for (let column = 0; column < Grid.columns; column++) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = column + 1; k < 4; k++) {
                    const nextCell = this._cells[row][k];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ row, column }, { row, column: k });
                        this.raiseCellMoved({ row, column: k }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        return updated;
    }

    private moveRight(): boolean {
        let updated = false;

        // move
        for (let row = Grid.rows - 1; row >= 0; row--) {
            for (let column = Grid.columns - 1; column >= 0; column--) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = column - 1; k >= 0; k--) {
                    const nextCell = this._cells[row][k];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ row, column }, { row, column: k });
                        this.raiseCellMoved({ row, column: k }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        // merge
        for (let row = 0; row < Grid.rows; row++) {
            for (let column = Grid.columns - 1; column >= 1; column--) {
                const cell = this._cells[row][column];
                if (!cell || cell.isEmpty)
                    continue;

                const nextCell = this._cells[row][column - 1];
                if (nextCell && cell.canMergeWith(nextCell)) {
                    const newCell = cell.mergeWith(nextCell);
                    this._cells[row][column] = newCell;
                    this._cells[row][column - 1] = Cell.empty();

                    updated = true;
                    this.raiseCellMerged(newCell, { row, column: column - 1 }, { row, column });
                }
            }
        }

        // move
        for (let row = Grid.rows - 1; row >= 0; row--) {
            for (let column = Grid.columns - 1; column >= 0; column--) {
                const currentCell = this._cells[row][column];
                if (!currentCell.isEmpty)
                    continue;

                for (let k = column - 1; k >= 0; k--) {
                    const nextCell = this._cells[row][k];
                    if (nextCell && !nextCell.isEmpty) {
                        this.swapCells({ row, column }, { row, column: k });
                        this.raiseCellMoved({ row, column: k }, { row, column });
                        updated = true;
                        break;
                    }
                }
            }
        }

        return updated;
    }

    private swapCells(from: IPosition, to: IPosition): void {
        const temp = this._cells[from.row][from.column];
        this._cells[from.row][from.column] = this._cells[to.row][to.column];
        this._cells[to.row][to.column] = temp;
    }

    private generateEmptyField(): Cell[][] {
        const cells: Cell[][] = [];

        for (let row = 0; row < Grid.rows; row++) {
            cells[row] = [];
            for (let column = 0; column < Grid.columns; column++) {
                cells[row][column] = Cell.empty();
            }
        }

        return cells;
    }

    private generateNewCell(): Cell {
        const allowedValues = [2, 2, 2, 2, 4]; // 2 ~ 80%, 4 ~ 20%
        const value = allowedValues[Math.floor(Math.random() * allowedValues.length)];

        return new Cell(value);
    }

    private generatePosition(): IPosition {
        const positions = this.getEmptyCellPositions();
        const position = positions[Math.floor(Math.random() * positions.length)];

        return position;
    }

    private getEmptyCellPositions(): IPosition[] {
        const positions: IPosition[] = [];

        for (let row = 0; row < Grid.rows; row++) {
            for (let column = 0; column < Grid.columns; column++) {
                const cell = this.getCell(row, column);
                if (cell.isEmpty)
                    positions.push({ column, row });
            }
        }

        return positions;
    }

    private getCell(row: number, column: number): Cell {
        if (row < 0 || row >= Grid.rows)
            throw new Error(`The row index is invalid.`);

        if (column < 0 || column >= Grid.columns)
            throw new Error(`The column index is invalid.`);

        return this._cells[row][column];
    }

    private raiseCellMoved(from: IPosition, to: IPosition): void {
        if (this._cellMoved)
            this._cellMoved.raise(new CellMovedEventArgs(from, to));
    }

    private raiseCellMerged(newCell: Cell, from: IPosition, to: IPosition): void {
        if (this._cellMerged)
            this._cellMerged.raise(new CellMergedEventArgs(newCell, from, to));
    }

    private raiseCellCreated(newCell: Cell, position: IPosition): void {
        if (this._cellCreated)
            this._cellCreated.raise(new CellCreatedEventArgs(newCell, position));
    }

    public get cells(): Cell[][] {
        return this._cells;
    }

}
