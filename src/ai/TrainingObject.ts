import { Cell } from "../Cell";
import { Game } from "../Game";
import { MoveDirection } from "../MoveDirection";
import { NeuralNetwork } from "./NeuralNetwork";

export class TrainingObject {

    public constructor(
        private game: Game,
        private network: NeuralNetwork) { }

    public start(): void {
        this.game.newGame();
    }

    public move(): void {
        const inputs = this.getInputs();
        const results = this.network.calculate(inputs);
        const moveDirection = this.mapResultsToMove(results);

        this.game.move(moveDirection);
    }

    public mutate(): TrainingObject {
        const game = new Game();
        const network = this.network.mutate();

        return new TrainingObject(game, network);
    }

    private getInputs(): number[] {
        return [].concat
            .apply([], this.game.cells)
            .map((cell: Cell) => cell.value || 0);
    }

    private mapResultsToMove(results: number[]): MoveDirection {
        const indexOfMax = results.indexOf(Math.max(...results));

        return indexOfMax;
    }

    public get score(): number {
        return this.game.score;
    }

}
