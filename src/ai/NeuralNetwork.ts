import { ILayerConfiguration } from "./ILayerConfiguration";
import { INeuralNetworkConfiguration } from "./INeuralNetworkConfiguration";
import { Layer } from "./Layer";

export class NeuralNetwork {

    private _layers: Layer[];

    public constructor(configuration: INeuralNetworkConfiguration) {
        if (configuration.layers[0] instanceof Layer) { // TODO:
            this._layers = configuration.layers as Layer[];
        } else {
            this._layers = (configuration.layers as ILayerConfiguration[])
                .map(layerConfiguration => new Layer(layerConfiguration));
        }
    }

    public calculate(inputs: number[]): number[] {
        for (const layer of this._layers) {
            inputs = layer.calculate(inputs);
        }

        return inputs;
    }

    public mutate(): NeuralNetwork {
        const layers = this._layers.map(layer => layer.copy());
        const layerIndex = Math.floor(Math.random() * layers.length);

        layers[layerIndex] = layers[layerIndex].mutate();

        return new NeuralNetwork({ layers });
    }

    public copy(): NeuralNetwork {
        const layers = this._layers.map(layer => layer.copy());

        return new NeuralNetwork({ layers });
    }

}
