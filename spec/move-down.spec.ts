import { GridBuilder } from "../src/GridBuilder";
import { MoveDirection } from "../src/MoveDirection";

describe("Move Right", () => {

    it("should merge 0 - 0 - 2 - 2", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 2, column: 0 })
            .addCell(2, { row: 3, column: 0 })
            .build();

        grid.move(MoveDirection.Down);

        expect(grid.cells[3][0].value).toEqual(4);
    });

    it("should merge 0 - 2 - 0 - 2", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 1, column: 0 })
            .addCell(2, { row: 3, column: 0 })
            .build();

        grid.move(MoveDirection.Down);

        expect(grid.cells[3][0].value).toEqual(4);
    });

    it("should merge 2 - 2 - 0 - 2", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 0 })
            .addCell(2, { row: 1, column: 0 })
            .addCell(2, { row: 3, column: 0 })
            .build();

        grid.move(MoveDirection.Down);

        expect(grid.cells[2][0].value).toEqual(2);
        expect(grid.cells[3][0].value).toEqual(4);
    });

    it("should merge 0 - 2 - 2 - 0", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 1, column: 0 })
            .addCell(2, { row: 2, column: 0 })
            .build();

        grid.move(MoveDirection.Down);

        expect(grid.cells[3][0].value).toEqual(4);
    });

    it("should merge 2 - 2 - 2 - 2", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 0 })
            .addCell(2, { row: 1, column: 0 })
            .addCell(2, { row: 2, column: 0 })
            .addCell(2, { row: 3, column: 0 })
            .build();

        grid.move(MoveDirection.Down);

        expect(grid.cells[2][0].value).toEqual(4);
        expect(grid.cells[3][0].value).toEqual(4);
    });

    it("should merge 4 - 2 - 2 - 0", () => {
        const grid = GridBuilder
            .create()
            .addCell(4, { row: 0, column: 0 })
            .addCell(2, { row: 1, column: 0 })
            .addCell(2, { row: 2, column: 0 })
            .build();

        grid.move(MoveDirection.Down);

        expect(grid.cells[2][0].value).toEqual(4);
        expect(grid.cells[3][0].value).toEqual(4);
    });

    it("should merge 2 - 0 - 2 - 4", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 0 })
            .addCell(2, { row: 2, column: 0 })
            .addCell(4, { row: 3, column: 0 })
            .build();

        grid.move(MoveDirection.Down);

        expect(grid.cells[2][0].value).toEqual(4);
        expect(grid.cells[3][0].value).toEqual(4);
    });

});
