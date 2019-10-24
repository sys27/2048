import { Game } from "./Game";
import { Renderer } from "./Renderer";
import { Storage } from "./Storage";

import "../index.less";

const game = new Game();
const storage = new Storage();
const renderer = new Renderer(game, storage);

if (storage.hasSaves())
    storage.restore(game);
else
    game.newGame();

export function newGameClick() {
    game.newGame();
}
