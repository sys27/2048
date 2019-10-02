import { Trainer } from "./ai/Trainer";
import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { Storage } from "./Storage";

let game = new Game();
let storage = new Storage();
let renderer = new Renderer(game, storage);
let trainer = new Trainer();

if (storage.hasSaves())
    storage.restore(game);
else
    game.newGame();

export function newGameClick() {
    game.newGame();
}
