import { Cell } from "./Cell";
import { Grid } from "./Grid";
import { MoveDirection } from "./MoveDirection";
import { IStorageData } from "./Storage";

export type GameUpdated = (game: Game) => void;

export class Game {

    private _grid: Grid;

    private _score: number;

    private _finished: boolean;

    private _gameUpdated?: GameUpdated;

    public constructor() {
        this._score = 0;
        this._finished = false;
        this._grid = new Grid();
        this._grid.addSubsriptionToCellMerged(newCell => this._score += newCell.value);
    }

    public addSubsriptionToGameUpdated(gameUpdated: GameUpdated): void {
        if (!gameUpdated)
            throw new Error();

        this._gameUpdated = gameUpdated;
    }

    public newGame(): void {
        this._score = 0;
        this._finished = false;

        this._grid.initializeEmpty();
        this._grid.addNewCell();
        this._grid.addNewCell();

        this.raiseGameUpdated();
    }

    public loadGame(data: IStorageData): void {
        this._score = data && data.score || 0;
        this._finished = data && data.finished || false;

        const cells = data.cells.map(row => row.map(column => new Cell(column)));
        this._grid.initializeFrom(cells);

        this.raiseGameUpdated();
    }

    public move(direction: MoveDirection): void {
        if (this._finished)
            return;

        const updated = this._grid.move(direction);
        if (updated) {
            if (!this._grid.hasMoves()) {
                this._finished = true;
            }

            // TODO: remove!
            this.raiseGameUpdated();
        }
    }

    private raiseGameUpdated(): void {
        if (this._gameUpdated)
            this._gameUpdated(this);
    }

    public get cells(): Cell[][] {
        return this._grid.cells;
    }

    public get grid(): Grid {
        return this._grid;
    }

    public get score(): number {
        return this._score;
    }

    public get finished(): boolean {
        return this._finished;
    }

}
