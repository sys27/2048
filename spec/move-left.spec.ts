import { GridBuilder } from "../src/GridBuilder";
import { MoveDirection } from "../src/MoveDirection";

describe("Move Left", () => {

    it("should merge 2 - 2 - 0 - 0", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 0 })
            .addCell(2, { row: 0, column: 1 })
            .build();

        grid.move(MoveDirection.Left);

        expect(grid.cells[0][0].value).toEqual(4);
    });

    it("should merge 2 - 0 - 2 - 0", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 0 })
            .addCell(2, { row: 0, column: 2 })
            .build();

        grid.move(MoveDirection.Left);

        expect(grid.cells[0][0].value).toEqual(4);
    });

    it("should merge 2 - 0 - 2 - 2", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 0 })
            .addCell(2, { row: 0, column: 2 })
            .addCell(2, { row: 0, column: 3 })
            .build();

        grid.move(MoveDirection.Left);

        expect(grid.cells[0][0].value).toEqual(4);
        expect(grid.cells[0][1].value).toEqual(2);
    });

    it("should merge 0 - 2 - 2 - 0", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 1 })
            .addCell(2, { row: 0, column: 2 })
            .build();

        grid.move(MoveDirection.Left);

        expect(grid.cells[0][0].value).toEqual(4);
    });

    it("should merge 2 - 2 - 2 - 2", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 0 })
            .addCell(2, { row: 0, column: 1 })
            .addCell(2, { row: 0, column: 2 })
            .addCell(2, { row: 0, column: 3 })
            .build();

        grid.move(MoveDirection.Left);

        expect(grid.cells[0][0].value).toEqual(4);
        expect(grid.cells[0][1].value).toEqual(4);
    });

    it("should merge 0 - 2 - 2 - 4", () => {
        const grid = GridBuilder
            .create()
            .addCell(2, { row: 0, column: 1 })
            .addCell(2, { row: 0, column: 2 })
            .addCell(4, { row: 0, column: 3 })
            .build();

        grid.move(MoveDirection.Left);

        expect(grid.cells[0][0].value).toEqual(4);
        expect(grid.cells[0][1].value).toEqual(4);
    });

    it("should merge 4 - 2 - 0 - 2", () => {
        const grid = GridBuilder
            .create()
            .addCell(4, { row: 0, column: 0 })
            .addCell(2, { row: 0, column: 1 })
            .addCell(2, { row: 0, column: 3 })
            .build();

        grid.move(MoveDirection.Left);

        expect(grid.cells[0][0].value).toEqual(4);
        expect(grid.cells[0][1].value).toEqual(4);
    });

});
