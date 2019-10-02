import { Neuron } from "./Neuron";

export interface ILayerConfiguration {
    neurons: number | Neuron[];
    weights?: number | number[];
}
