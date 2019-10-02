import { ILayerConfiguration } from "./ILayerConfiguration";
import { Layer } from "./Layer";

export interface INeuralNetworkConfiguration {
    layers: ILayerConfiguration[] | Layer[];
}
