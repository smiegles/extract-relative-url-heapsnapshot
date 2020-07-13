# HeapProfiler Snapshot relative URL extractor.

A simple Node.js script that takes a snapshot of a memory heap from a webpage and then extracts the relative urls. This is inspired by [@filedescriptor's](https://twitter.com/filedescriptor) "[Improve Your Hacking Skills Using Devtools](https://www.youtube.com/watch?v=Y1S5s3FmFsI&feature=youtu.be&t=204)" video.

# How to use

```
npm install
node main.js https://tweetdeck.twitter.com/
```

# Contribution

Open for contribution, right now the script is lacking:
1. Url validation
2. A decent Regex to find relative and absolute paths.
3. The heapdump now gets dumped in a random file, it would be better to remove the file after it's eveluated. 