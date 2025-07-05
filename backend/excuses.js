// excuses.js
const excuses = [
    // 🧠 Classic
    { text: "It works on my machine.", category: "classic" },
    { text: "That's weird... it worked yesterday.", category: "classic" },
    { text: "I can't reproduce it.", category: "classic" },
    { text: "You must have a different version.", category: "classic" },
    { text: "I'm sure I fixed that.", category: "classic" },
    { text: "This is a known issue.", category: "classic" },
    { text: "Try clearing your cache.", category: "classic" },
    { text: "You need to reboot.", category: "classic" },
    { text: "Must be a race condition.", category: "classic" },
    { text: "It's a feature, not a bug.", category: "classic" },

    // 😈 Blame
    { text: "I didn't write that part of the code.", category: "blame" },
    { text: "The intern must have done it.", category: "blame" },
    { text: "That's a third-party issue.", category: "blame" },
    { text: "The specs weren't clear.", category: "blame" },
    { text: "It's the designer's fault.", category: "blame" },
    { text: "QA missed it.", category: "blame" },
    { text: "Management said to ship it.", category: "blame" },
    { text: "I copied it from Stack Overflow.", category: "blame" },
    { text: "The client wanted it this way.", category: "blame" },
    { text: "My cat walked on the keyboard.", category: "blame" },

    // 💻 Hardware
    { text: "Must be a hardware issue.", category: "hardware" },
    { text: "The server ran out of RAM.", category: "hardware" },
    { text: "There was a power surge.", category: "hardware" },
    { text: "The fans were too loud.", category: "hardware" },
    { text: "Maybe it's a bad sector.", category: "hardware" },
    { text: "Thermal throttling kicked in.", category: "hardware" },
    { text: "Hard drive's making weird noises.", category: "hardware" },
    { text: "GPU is overheating.", category: "hardware" },
    { text: "Keyboard must be faulty.", category: "hardware" },
    { text: "Monitor lag made me click wrong.", category: "hardware" },

    // 🌐 Network
    { text: "Must be a DNS issue.", category: "network" },
    { text: "The VPN is acting up.", category: "network" },
    { text: "Packet loss, obviously.", category: "network" },
    { text: "The firewall is blocking it.", category: "network" },
    { text: "Router needs restarting.", category: "network" },
    { text: "ISP is throttling us again.", category: "network" },
    { text: "It works on localhost.", category: "network" },
    { text: "There's a NAT conflict.", category: "network" },
    { text: "We're behind a proxy.", category: "network" },
    { text: "It's not reachable from here.", category: "network" },

    // 🧠 AI/ML
    { text: "The AI hallucinated.", category: "AI" },
    { text: "The model overfit.", category: "AI" },
    { text: "That's just how the weights settled.", category: "AI" },
    { text: "The data was biased.", category: "AI" },
    { text: "Blame the training set.", category: "AI" },
    { text: "The model has its own opinion.", category: "AI" },
    { text: "ML is more art than science.", category: "AI" },
    { text: "It's not deterministic.", category: "AI" },
    { text: "Neural net said 'no'.", category: "AI" },
    { text: "The GPU isn't CUDA-compatible.", category: "AI" },

    // 🎨 Frontend
    { text: "It's a CSS issue.", category: "frontend" },
    { text: "It works in Chrome.", category: "frontend" },
    { text: "Must be a browser quirk.", category: "frontend" },
    { text: "It's responsive… kinda.", category: "frontend" },
    { text: "Pixel-perfect wasn't in scope.", category: "frontend" },
    { text: "JavaScript is being weird.", category: "frontend" },
    { text: "React updated its hooks again.", category: "frontend" },
    { text: "Tailwind broke the layout.", category: "frontend" },
    { text: "State management is hard.", category: "frontend" },
    { text: "Dark mode is glitching.", category: "frontend" },

    // 🔧 Backend
    { text: "It's a caching issue.", category: "backend" },
    { text: "Race condition again.", category: "backend" },
    { text: "Database locked the table.", category: "backend" },
    { text: "It passed in staging.", category: "backend" },
    { text: "JWT expired too soon.", category: "backend" },
    { text: "Timezone madness.", category: "backend" },
    { text: "The API was rate-limited.", category: "backend" },
    { text: "I forgot to await the promise.", category: "backend" },
    { text: "Session token got invalidated.", category: "backend" },
    { text: "The cron job ran twice.", category: "backend" },

    // 🛢️ Database
    { text: "Wrong DB column.", category: "database" },
    { text: "Indexing is broken.", category: "database" },
    { text: "Foreign key constraint failed.", category: "database" },
    { text: "I forgot the WHERE clause.", category: "database" },
    { text: "Transaction didn't commit.", category: "database" },
    { text: "We hit the row limit.", category: "database" },
    { text: "I dropped the table by mistake.", category: "database" },
    { text: "The dump file was corrupted.", category: "database" },
    { text: "Primary key collision.", category: "database" },
    { text: "Stored procedure went rogue.", category: "database" },

    // 🧪 QA & Testing
    { text: "I thought we had tests for that.", category: "testing" },
    { text: "The test suite passed on my branch.", category: "testing" },
    { text: "I disabled that test temporarily.", category: "testing" },
    { text: "That's not in the test plan.", category: "testing" },
    { text: "Mock data wasn't realistic.", category: "testing" },
    { text: "Test coverage isn't everything.", category: "testing" },
    { text: "I tested it manually.", category: "testing" },
    { text: "CI server is down.", category: "testing" },
    { text: "I pushed with --no-verify.", category: "testing" },
    { text: "The test environment is flaky.", category: "testing" },

    // 🧨 Deployment
    { text: "I deployed to the wrong server.", category: "devops" },
    { text: "CI/CD didn't trigger.", category: "devops" },
    { text: "Wrong `.env` file.", category: "devops" },
    { text: "I forgot to `npm install`.", category: "devops" },
    { text: "Docker image was outdated.", category: "devops" },
    { text: "I was on the wrong git branch.", category: "devops" },
    { text: "Rollback failed.", category: "devops" },
    { text: "Kubernetes restarted it.", category: "devops" },
    { text: "Wrong build artifact.", category: "devops" },
    { text: "AWS credentials expired.", category: "devops" },

    // 🤯 Miscellaneous
    { text: "It compiled. That's a win.", category: "misc" },
    { text: "It's probably solar flares.", category: "misc" },
    { text: "Aliens modified the code.", category: "misc" },
    { text: "The code is self-aware.", category: "misc" },
    { text: "I wasn't caffeinated enough.", category: "misc" },
    { text: "I'm debugging in production.", category: "misc" },
    { text: "Too many tabs open.", category: "misc" },
    { text: "I need a rubber duck.", category: "misc" },
    { text: "The code is quantum entangled.", category: "misc" },
    { text: "The keyboard layout changed.", category: "misc" },

    // 👹 Easter Egg
    { text: "I deleted production.", category: "devil" },

    // 👾 New Excuses
    { text: "The WiFi dropped right before I hit save.", category: "network" },
    { text: "The code works, but only on Fridays.", category: "classic" },
    { text: "I was testing in production by accident.", category: "devops" },
    { text: "The requirements changed overnight.", category: "blame" },
    { text: "The debugger skipped that line for some reason.", category: "testing" },
    { text: "The API docs were outdated.", category: "backend" },
    { text: "I thought you were handling that part.", category: "blame" },
    { text: "The linter didn't catch it.", category: "testing" },
    { text: "It's a timezone thing.", category: "backend" },
    { text: "The cloud provider had an outage.", category: "devops" },

    // 🆕 Bulk New Excuses
    { text: "The build server ran out of disk space.", category: "devops" },
    { text: "I forgot to push my latest changes.", category: "classic" },
    { text: "The merge conflict was resolved incorrectly.", category: "classic" },
    { text: "The code review missed it.", category: "blame" },
    { text: "The API key expired.", category: "backend" },
    { text: "The database is in read-only mode.", category: "database" },
    { text: "The test data was too realistic.", category: "testing" },
    { text: "The staging environment is different from production.", category: "devops" },
    { text: "The cache wasn't cleared.", category: "backend" },
    { text: "The feature flag was off.", category: "devops" },
    { text: "The code was working before the update.", category: "classic" },
    { text: "The error logs rotated before I could check them.", category: "devops" },
    { text: "The backup failed last night.", category: "devops" },
    { text: "The endpoint changed without notice.", category: "backend" },
    { text: "The user story was ambiguous.", category: "blame" },
    { text: "The sprint was too short.", category: "blame" },
    { text: "The hardware vendor changed the specs.", category: "hardware" },
    { text: "The network cable was unplugged.", category: "hardware" },
    { text: "The firewall rules changed.", category: "network" },
    { text: "The DNS cache is stale.", category: "network" },
    { text: "The AI model is still training.", category: "AI" },
    { text: "The neural net weights were corrupted.", category: "AI" },
    { text: "The CSS specificity is too high.", category: "frontend" },
    { text: "The browser autofilled the wrong value.", category: "frontend" },
    { text: "The JavaScript minifier broke the code.", category: "frontend" },
    { text: "The backend returned HTML instead of JSON.", category: "backend" },
    { text: "The database migration didn't run.", category: "database" },
    { text: "The stored procedure was deprecated.", category: "database" },
    { text: "The test runner skipped that test.", category: "testing" },
    { text: "The mock server was down.", category: "testing" },
    { text: "The CI pipeline was paused.", category: "devops" },
    { text: "The deployment script had a typo.", category: "devops" },
    { text: "The timezone was set to UTC+13.", category: "backend" },
    { text: "The API rate limit was exceeded.", category: "backend" },
    { text: "The session expired too soon.", category: "backend" },
    { text: "The config file was missing.", category: "devops" },
    { text: "The environment variable wasn't set.", category: "devops" },
    { text: "The code was optimized away.", category: "classic" },
    { text: "The feature was behind a paywall.", category: "misc" },
    { text: "The user clicked too fast.", category: "frontend" },
    { text: "The browser extension interfered.", category: "frontend" },
    { text: "The GPU driver crashed.", category: "hardware" },
    { text: "The RAM was maxed out.", category: "hardware" },
    { text: "The power supply was unstable.", category: "hardware" },
    { text: "The router firmware was outdated.", category: "network" },
    { text: "The proxy server was misconfigured.", category: "network" },
    { text: "The AI model was over-regularized.", category: "AI" },
    { text: "The training data was incomplete.", category: "AI" },
    { text: "The CSS file didn't load.", category: "frontend" },
    { text: "The npm package was unpublished.", category: "devops" },
    { text: "The cron job was disabled.", category: "devops" },
    { text: "The database index was missing.", category: "database" },
    { text: "The test coverage report was ignored.", category: "testing" },
    { text: "The code was written in a hurry.", category: "classic" },
    { text: "The requirements were lost in translation.", category: "blame" },
    { text: "The code was copied from an old project.", category: "classic" },
    { text: "The API version was deprecated.", category: "backend" },
    { text: "The server clock was wrong.", category: "devops" },
    { text: "The user's device was out of storage.", category: "hardware" },
    { text: "The cloud region was unavailable.", category: "devops" },
];

let totalServed = 0;

function getExcuse(category = null) {
    const filtered = category
        ? excuses.filter((e) => e.category === category)
        : excuses;

    const chosen = filtered[Math.floor(Math.random() * filtered.length)];
    if (chosen) totalServed++;
    return chosen || { text: "No excuses found.", category: "none" };
}

function getMultiple(count = 1, category = null) {
    return Array.from({ length: count }, () => getExcuse(category));
}

function getStats() {
    return {
        totalExcuses: excuses.length,
        totalServed,
    };
}

module.exports = { excuses, getExcuse, getMultiple, getStats };
