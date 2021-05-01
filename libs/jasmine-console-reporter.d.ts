declare module "jasmine-console-reporter" {
    class JasmineConsoleReporter implements jasmine.CustomReporter {
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

        jasmineStarted?(suiteInfo: jasmine.SuiteInfo): void;
        suiteStarted?(result: jasmine.CustomReporterResult): void;
        specStarted?(result: jasmine.CustomReporterResult): void;
        specDone?(result: jasmine.CustomReporterResult): void;
        suiteDone?(result: jasmine.CustomReporterResult): void;
        jasmineDone?(runDetails: jasmine.RunDetails): void;
    }

    export = JasmineConsoleReporter;
}