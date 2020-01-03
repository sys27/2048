import { Cell } from "../Cell";
import { Position } from "../Position";
import { EventArgs } from "./EventArgs";

export class CellCreatedEventArgs extends EventArgs {
    public constructor(
        public newCell: Cell,
        public position: Position,
    ) {
        super();
    }
}
