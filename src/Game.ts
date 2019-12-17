import { Cell } from "./Cell";
import { Event, EventHandler } from "./Events/Event";
import { EventArgs } from "./Events/EventArgs";
import { Grid } from "./Grid";
import { MoveDirection } from "./MoveDirection";
import { IStorageData } from "./Storage";

export class Game {

    private _grid: Grid;

    private _score: number;

    private _finished: boolean;

    private _gameUpdated: Event<EventArgs>;

    public constructor() {
        this._gameUpdated = new Event<EventArgs>();

        this._score = 0;
        this._finished = false;
        this._grid = new Grid();
        this._grid.addSubsriptionToCellMerged(args => {
            this._score += args.newCell.value;
        });
    }

    public addSubsriptionToGameUpdated(gameUpdated: EventHandler<EventArgs>): void {
        if (!gameUpdated)
            throw new Error();

        this._gameUpdated.on(gameUpdated);
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
        }
    }

    private raiseGameUpdated(): void {
        if (this._gameUpdated)
            this._gameUpdated.raise(new EventArgs());
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
