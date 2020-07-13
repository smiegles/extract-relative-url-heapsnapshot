const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const parser = require('heapsnapshot-parser');
const url = process.argv[2];

if (url != undefined) {
  init(url);
}

async function init(url) {
  const filename = '/tmp/heap.heapsnapshot';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const client = await page.target().createCDPSession();
  const chunks = [];

  client.on('HeapProfiler.addHeapSnapshotChunk', ({ chunk }) => {
    chunks.push(chunk);
  });

  await client.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false });
  await fs.writeFile(filename, chunks.join(''));
  await browser.close();

  const snapshotFile = await fs.readFile(filename, {encoding: "utf-8"});
  const snapshot = parser.parse(snapshotFile);

  var paths = new Set()
  var regex = /[^/]([\/][a-zA-Z0-9_.-]+)+(?!([gimuy]*[,;\s])|\/\2)/g;

  for (let i = 0; i < snapshot.nodes.length; i++) {
    var node = snapshot.nodes[i];
    var search = node.name.match(regex);


    if (search != null) {
      search.forEach((path) => {
        paths.add(path.substr(1))
      })
    }
  }

  [...paths].forEach((path) => {
    console.log(path)
  })
}
