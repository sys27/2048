import { EventArgs } from "./EventArgs";

export type EventHandler<TEventArgs extends EventArgs> = (args: TEventArgs) => void;

export class Event<TEventArgs extends EventArgs> {

    private _handlers: Array<EventHandler<TEventArgs>> = [];

    public on(handler: EventHandler<TEventArgs>): void {
        this._handlers.push(handler);
    }

    public raise(args: TEventArgs): void {
        this._handlers.forEach(listener => listener(args));
    }

}
