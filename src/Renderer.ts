import { Game } from "./Game";
import { MoveDirection } from "./MoveDirection";
import { Storage } from "./Storage";

export class Renderer {

    private readonly _scoreElement: HTMLElement;

    public constructor(
        private game: Game,
        private storage: Storage) {
        if (!game)
            throw new Error();

        this._scoreElement = document.getElementById("score_value");

        this.game.addSubsriptionToGameUpdated(game => this.renderGame(game));

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
        const container = document.getElementsByClassName("container")[0];
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        game.cells.forEach(row => {
            const divRow = document.createElement("div");
            divRow.className = "row";
            container.appendChild(divRow);

            row.forEach(column => {
                const cell = document.createElement("cell");
                cell.classList.add("cell");
                divRow.appendChild(cell);

                if (!column.isEmpty) {
                    if (column.value > 2048)
                        cell.classList.add(`cell-more`);
                    else
                        cell.classList.add(`cell-${column.value}`);

                    cell.innerText = `${column.value}`;
                }
            });
        });

        this._scoreElement.innerText = game.score.toString();

        this.storage.save(this.game);
    }

}
