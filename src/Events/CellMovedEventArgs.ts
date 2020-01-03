import { Position } from "../Position";
import { EventArgs } from "./EventArgs";

export class CellMovedEventArgs extends EventArgs {
    public constructor(
        public from: Position,
        public to: Position,
    ) {
        super();
    }
}
