import { ILayerConfiguration } from "./ILayerConfiguration";
import { Neuron } from "./Neuron";

export class Layer {

    private _neurons: Neuron[] = [];

    public constructor(configuration: ILayerConfiguration) {
        if (typeof configuration.neurons === "number") {
            for (let index = 0; index < configuration.neurons; index++) {
                this._neurons.push(new Neuron(configuration.weights));
            }
        } else {
            this._neurons = configuration.neurons;
        }
    }

    public calculate(inputs: number[]): number[] {
        return this._neurons.map(neuron => neuron.calculate(inputs));
    }

    public mutate(): Layer {
        const neurons = this._neurons.map(neuron => neuron.copy());
        const neuronIndex = Math.floor(Math.random() * neurons.length);

        neurons[neuronIndex] = neurons[neuronIndex].mutate();

        return new Layer({ neurons });
    }

    public copy(): Layer {
        const neurons = this._neurons.map(neuron => neuron.copy());

        return new Layer({ neurons });
    }

}
