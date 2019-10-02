export class Neuron {

    private _weights: number[] = [];

    public constructor(weights: number | number[]) {
        if (typeof weights === "number") {
            for (let index = 0; index < weights; index++) {
                this._weights.push(Math.random());
            }
        } else {
            this._weights = weights;
        }
    }

    public calculate(inputs: number[]): number {
        if (this._weights.length !== inputs.length)
            throw new Error();

        let result = 0;
        for (let i = 0; i < inputs.length; i++)
            result += inputs[i] * this._weights[i];

        return Math.tanh(result);
    }

    public mutate(): Neuron {
        const weights = this._weights.slice();
        const weightIndex = Math.floor(Math.random() * weights.length);
        const signArray = [-1, 1];
        const signIndex = Math.floor(Math.random() * signArray.length);

        weights[weightIndex] += signArray[signIndex] * 0.1; // TODO:

        return new Neuron(weights);
    }

    public copy(): Neuron {
        return new Neuron(this._weights.slice());
    }

}
