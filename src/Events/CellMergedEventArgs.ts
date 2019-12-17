import { Cell } from "../Cell";
import { IPosition } from "../Position";
import { EventArgs } from "./EventArgs";

export class CellMergedEventArgs extends EventArgs {
    public constructor(
        public newCell: Cell,
        public from: IPosition,
        public to: IPosition,
    ) {
        super();
    }
}
