import Jasmine = require("jasmine");
import JasmineConsoleReporter = require("jasmine-console-reporter");

const j = new Jasmine({});
const reporter = new JasmineConsoleReporter({
    colors: true,
    emoji: true,
    listStyle: "indent",
});

j.loadConfigFile("spec/support/jasmine.json");
j.env.clearReporters();
j.addReporter(reporter);
j.execute();
