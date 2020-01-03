import { Cell } from "../Cell";
import { Position } from "../Position";
import { EventArgs } from "./EventArgs";

export class CellMergedEventArgs extends EventArgs {
    public constructor(
        public newCell: Cell,
        public from: Position,
        public to: Position,
    ) {
        super();
    }
}
