import { IPosition } from "../Position";
import { EventArgs } from "./EventArgs";

export class CellMovedEventArgs extends EventArgs {
    public constructor(
        public from: IPosition,
        public to: IPosition,
    ) {
        super();
    }
}
