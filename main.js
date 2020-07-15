const puppeteer = require('puppeteer');
const parser = require('heapsnapshot-parser');
const {url} = require('yargs')
    .option('url', {
        alias: 'u',
        type: 'string',
        describe: 'url address'
    })
    .demandOption(['url'])
    .help()
    .argv


init(new URL(url));


async function getHeapSnapshot(page, browser) {
    const client = await page.target().createCDPSession();
    const chunks = [];

    client.on('HeapProfiler.addHeapSnapshotChunk', ({chunk}) => {
        chunks.push(chunk);
    });

    await client.send('HeapProfiler.takeHeapSnapshot', {reportProgress: false});
    await browser.close();

    const snapshot = parser.parse(chunks.join(''));

    return snapshot;
}

function parsePathsFromSnapshot(snapshot) {
    const paths = new Set()
    const regex = /[^/]([\/][a-zA-Z0-9_.-]+)+(?!([gimuy]*[,;\s])|\/\2)/g;

    for (let i = 0; i < snapshot.nodes.length; i++) {
        const node = snapshot.nodes[i];
        const search = node.name.match(regex);

        if (search != null) {
            search.forEach((path) => {
                paths.add(path.substr(1))
            })
        }
    }

    return paths;
}

function outputResult(data) {
    const sortedData = Array.from(data).sort();

    sortedData.forEach((path) => {
        console.log(path)
    })
}

async function init(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, {timeout: 12000});

        const snapshot = await getHeapSnapshot(page, browser);
        const paths = parsePathsFromSnapshot(snapshot);

        outputResult(paths);
    } catch (error) {
        console.error('Unable to parse paths on this URL. Error message: ', error);
        process.exit(-1);
    }
}