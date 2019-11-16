import { Cell } from "./Cell";
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
            throw new Error();

        this._scoreElement = document.getElementById("score_value");
        this._container = document.getElementsByClassName("container")[0];

        this.game.addSubsriptionToGameUpdated(game => this.renderGame(game));
        this.game.grid.addSubsriptionToCellMoved((from, to) => this.renderMove(from, to));
        this.game.grid.addSubscriptionToCellCreated((cell, position) => this.renderCellCreated(cell, position));
        this.game.grid.addSubsriptionToCellMerged((cell, from, to) => this.renderCellMerged(cell, from, to));

        document.addEventListener("keyup", event => {
            if (event.key === "ArrowUp")
                game.move(MoveDirection.Up);
            else if (event.key === "ArrowDown")
                game.move(MoveDirection.Down);
            else if (event.key === "ArrowLeft")
                game.move(MoveDirection.Left);
            else if (event.key === "ArrowRight")
                game.move(MoveDirection.Right);
        }, false);
    }

    private renderGame(game: Game): void {
        this.removeElementsByClass("cell-floating");

        for (let row = 0; row < Grid.rows; row++) {
            for (let column = 0; column < Grid.columns; column++) {
                const cell = game.cells[row][column];

                if (cell.isEmpty)
                    continue;

                this.createDivCell(this._container, cell, { row, column });
            }
        }

        this._scoreElement.innerText = game.score.toString();

        this.storage.save(this.game);
    }

    private renderCellCreated(cell: Cell, position: IPosition): void {
        if (cell.isEmpty)
            return;

        this.createDivCell(this._container, cell, position);
        this.storage.save(this.game);
    }

    private renderMove(from: IPosition, to: IPosition): void {
        const divCell = this.getDivCell(from);
        if (!divCell)
            return;

        divCell.setAttribute("data-row", to.row.toString());
        divCell.setAttribute("data-column", to.column.toString());
        divCell.style.top = `${to.row * 116}px`;
        divCell.style.left = `${to.column * 116}px`;

        this.storage.save(this.game);
    }

    private renderCellMerged(cell: Cell, from: IPosition, to: IPosition): void {
        if (cell.isEmpty)
            return;

        const fromCell = this.getDivCell(from);
        fromCell.parentNode.removeChild(fromCell);

        const toCell = this.getDivCell(to);
        toCell.parentNode.removeChild(toCell);

        this.createDivCell(this._container, cell, to);

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
