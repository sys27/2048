import { Cell } from "../Cell";
import { IPosition } from "../Position";
import { EventArgs } from "./EventArgs";

export class CellCreatedEventArgs extends EventArgs {
    public constructor(
        public newCell: Cell,
        public position: IPosition,
    ) {
        super();
    }
}
