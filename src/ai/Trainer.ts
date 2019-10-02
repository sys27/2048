import { Game } from "../Game";
import { INeuralNetworkConfiguration } from "./INeuralNetworkConfiguration";
import { NeuralNetwork } from "./NeuralNetwork";
import { TrainingObject } from "./TrainingObject";

export class Trainer {

    private readonly networksCount: number = 50;
    private readonly movesCount: number = 200;

    public train(): void {
        let trainingObjects = this.initializeTrainingObjects(this.networksCount);
        let winner: TrainingObject;

        let count = 0;
        do {
            count++;

            for (const trainingObject of trainingObjects) {
                trainingObject.start();

                for (let i = 0; i < this.movesCount; i++) {
                    trainingObject.move();
                }
            }

            trainingObjects.sort((a, b) => b.score - a.score);

            // TODO:
            const winners = trainingObjects.slice(0, 10);
            winner = winners[0];
            const mutaded = this.mutateWinner(winner, 30);
            const randomNetworks = this.initializeTrainingObjects(10);

            trainingObjects = [...winners, ...mutaded, ...randomNetworks];

            console.log(`#${count} - Score: ${winner.score}}`);
        } while (winner.score < 300);

        console.log(winner);
    }

    private mutateWinner(winner: TrainingObject, times: number): TrainingObject[] {
        const trainingObjects: TrainingObject[] = [];

        for (let index = 0; index < times; index++) {
            const mutaded = winner.mutate();

            trainingObjects.push(mutaded);
        }

        return trainingObjects;
    }

    private initializeTrainingObjects(times: number): TrainingObject[] {
        const networks: TrainingObject[] = [];
        for (let index = 0; index < times; index++) {
            const game = new Game();
            const network = new NeuralNetwork(this.getNetworkConfiguration()).mutate();

            networks.push(new TrainingObject(game, network));
        }

        return networks;
    }

    private getNetworkConfiguration(): INeuralNetworkConfiguration {
        return {
            layers: [
                { neurons: 16, weights: 16 },
                { neurons: 4, weights: 16 },
            ],
        };
    }

}
