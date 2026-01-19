import { Cell } from "../src/Cell";

describe("Cell", () => {

    it("Allowed value", () => {
        expect(() => new Cell(1024)).not.toThrow();
    });

    it("Is not power of two", () => {
        expect(() => new Cell(1023)).toThrow();
    });

    it("Can merge cell with same values", () => {
        const cell1 = new Cell(2);
        const cell2 = new Cell(2);

        const canMerge = cell1.canMergeWith(cell2);

        expect(canMerge).toBeTruthy();
    });

    it("Can merge cell with first cell is empty", () => {
        const cell1 = Cell.empty();
        const cell2 = new Cell(2);

        const canMerge = cell1.canMergeWith(cell2);

        expect(canMerge).toBeFalsy();
    });

    it("Can merge cell with second cell is empty", () => {
        const cell1 = new Cell(2);
        const cell2 = Cell.empty();

        const canMerge = cell1.canMergeWith(cell2);

        expect(canMerge).toBeFalsy();
    });

    it("Can merge cell with different values", () => {
        const cell1 = new Cell(2);
        const cell2 = new Cell(4);

        const canMerge = cell1.canMergeWith(cell2);

        expect(canMerge).toBeFalsy();
    });

    it("Merge cell with same values", () => {
        const cell1 = new Cell(2);
        const cell2 = new Cell(2);

        const canMerge = cell1.mergeWith(cell2);
        const expected = new Cell(4);

        expect(canMerge).toEqual(expected);
    });

    it("Merge cell with first cell is empty", () => {
        const cell1 = Cell.empty();
        const cell2 = new Cell(2);

        expect(() => cell1.mergeWith(cell2)).toThrowError();
    });

    it("Merge cell with second cell is empty", () => {
        const cell1 = new Cell(2);
        const cell2 = Cell.empty();

        expect(() => cell1.mergeWith(cell2)).toThrowError();
    });

    it("Merge cell with different values", () => {
        const cell1 = new Cell(2);
        const cell2 = new Cell(4);

        expect(() => cell1.mergeWith(cell2)).toThrowError();
    });

});
