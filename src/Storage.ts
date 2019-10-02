import { Game } from "./Game";

export interface IStorageData {
    score: number;
    finished: boolean;
    cells: number[][];
}

export class Storage {

    private key: string = "data";

    public save(game: Game): void {
        const values = game.cells
            .map(row => row.map(cell => cell.value));

        const data: IStorageData = {
            cells: values,
            finished: game.finished,
            score: game.score,
        };
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    public restore(game: Game): void {
        const stringData = localStorage.getItem(this.key);
        if (!stringData)
            return;

        const data: IStorageData = JSON.parse(stringData);

        game.loadGame(data);
    }

    public hasSaves(): boolean {
        return !!localStorage.getItem(this.key);
    }

}
