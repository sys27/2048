declare module "jasmine-console-reporter" {
    class JasmineConsoleReporter implements jasmine.Reporter {
        constructor(options: {
            colors?: number | boolean,
            cleanStack?: number | boolean,
            verbosity?: number | boolean | { pending: boolean, disabled: boolean, specs: boolean, summary: boolean },
            listStyle?: "flat" | "indent",
            timeUnit?: "ms" | "ns" | "s",
            timeThreshold?: { ok: number, warn: number, ouch: number } | number,
            activity?: boolean | string,
            emoji?: boolean,
            beep?: boolean
        });

        reportRunnerStarting(runner: jasmine.Runner): void;
        reportRunnerResults(runner: jasmine.Runner): void;
        reportSuiteResults(suite: jasmine.Suite): void;
        reportSpecStarting(spec: jasmine.Spec): void;
        reportSpecResults(spec: jasmine.Spec): void;
        log(str: string): void;
    }

    export = JasmineConsoleReporter;
}