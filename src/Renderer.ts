import { Cell } from "./Cell";
import { CellCreatedEventArgs } from "./Events/CellCreatedEventArgs";
import { CellMergedEventArgs } from "./Events/CellMergedEventArgs";
import { CellMovedEventArgs } from "./Events/CellMovedEventArgs";
import { EventArgs } from "./Events/EventArgs";
import { Game } from "./Game";
import { Grid } from "./Grid";
import { MoveDirection } from "./MoveDirection";
import { IPosition } from "./Position";
import { Storage } from "./Storage";

export class Renderer {

    private readonly _scoreElement: HTMLElement;

    private readonly _container: Element;

    public constructor(
        private game: Game,
        private storage: Storage,
    ) {
        if (!game)
            throw new Error(`The game is undefined.`);

        this._scoreElement = document.getElementById("score_value");
        this._container = document.getElementsByClassName("container")[0];

        this.game.addSubsriptionToGameUpdated(args => this.renderGame(args));
        this.game.grid.addSubsriptionToCellMoved(args => this.renderMove(args));
        this.game.grid.addSubscriptionToCellCreated(args => this.renderCellCreated(args));
        this.game.grid.addSubsriptionToCellMerged(args => this.renderCellMerged(args));

        document.addEventListener("keyup", event => {
            if (event.key === "ArrowUp")
                game.move(MoveDirection.Up);
            else if (event.key === "ArrowDown")
                game.move(MoveDirection.Down);
            else if (event.key === "ArrowLeft")
                game.move(MoveDirection.Left);
            else if (event.key === "ArrowRight")
                game.move(MoveDirection.Right);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "ArrowUp" ||
                event.key === "ArrowDown" ||
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight")
                event.preventDefault();
        });
    }

    private renderGame(args: EventArgs): void {
        this.removeElementsByClass("cell-floating");

        for (let row = 0; row < Grid.rows; row++) {
            for (let column = 0; column < Grid.columns; column++) {
                const cell = this.game.cells[row][column];

                if (cell.isEmpty)
                    continue;

                this.createDivCell(this._container, cell, { row, column });
            }
        }

        this._scoreElement.innerText = this.game.score.toString();

        this.storage.save(this.game);
    }

    private renderCellCreated(args: CellCreatedEventArgs): void {
        const { newCell, position } = args;
        if (newCell.isEmpty)
            return;

        this.createDivCell(this._container, newCell, position);
        this.storage.save(this.game);
    }

    private renderMove(args: CellMovedEventArgs): void {
        const { from, to } = args;
        const divCell = this.getDivCell(from);
        if (!divCell)
            return;

        divCell.setAttribute("data-row", to.row.toString());
        divCell.setAttribute("data-column", to.column.toString());
        divCell.style.top = `${to.row * 116}px`;
        divCell.style.left = `${to.column * 116}px`;

        this.storage.save(this.game);
    }

    private renderCellMerged(args: CellMergedEventArgs): void {
        const { newCell, from, to } = args;
        if (newCell.isEmpty)
            return;

        const fromCell = this.getDivCell(from);
        fromCell.parentNode.removeChild(fromCell);

        const toCell = this.getDivCell(to);
        toCell.parentNode.removeChild(toCell);

        this.createDivCell(this._container, newCell, to);

        this._scoreElement.innerText = this.game.score.toString();

        this.storage.save(this.game);
    }

    private createDivCell(container: Element, cell: Cell, position: IPosition): void {
        const divCell = document.createElement("div");
        divCell.classList.add("cell", "cell-floating");

        if (cell.value > 2048)
            divCell.classList.add(`cell-more`);
        else
            divCell.classList.add(`cell-${cell.value}`);

        divCell.setAttribute("data-row", position.row.toString());
        divCell.setAttribute("data-column", position.column.toString());
        divCell.style.top = `${position.row * 116}px`;
        divCell.style.left = `${position.column * 116}px`;

        const cellContent = document.createElement("div");
        cellContent.classList.add("cell-content");
        cellContent.innerText = `${cell.value}`;

        divCell.appendChild(cellContent);
        container.appendChild(divCell);
    }

    private removeElementsByClass(className: string): void {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    private getDivCell(position: IPosition): HTMLElement {
        return document.querySelector<HTMLElement>(`[data-row='${position.row}'][data-column='${position.column}']`);
    }

}
