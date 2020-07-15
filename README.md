# HeapProfiler Snapshot relative URL extractor.

A simple Node.js script that takes a snapshot of a memory heap from a webpage and then extracts the relative urls. This is inspired by [@filedescriptor's](https://twitter.com/filedescriptor) "[Improve Your Hacking Skills Using Devtools](https://www.youtube.com/watch?v=Y1S5s3FmFsI&feature=youtu.be&t=204)" video.

# How to use

```
npm install
node main.js https://tweetdeck.twitter.com/
```

__Response snippet__

_Note that not all returned paths will be "correct" and there will be bogus results between it_

```
/media/upload.json
/mutes/conversations/create.json
/mutes/conversations/destroy.json
/mutes/users/create.json
/mutes/users/destroy.json
/mutes/users/ids.json
/saved_searches/list.json
/schedule/status/list.json
/schedule/status/lookup.json
/schedule/status/tweet.json
/search/tweets.json
/search/typeahead.json
/search/universal.json
/statuses/flag_possibly_sensitive.json
/statuses/following_timeline.json
/statuses/home_timeline.json
/statuses/lookup.json
/statuses/mentions_timeline.json
/statuses/oembed.json
/statuses/show.json
/statuses/update.json
/statuses/user_timeline.json
/strato/column/None/tweetdeck/sendFeedback
/strato/column/Non
/schedule/list
/translations/show.json
/trends/available.json
```

# Contribution

Open for contribution, right now the script is lacking:
1. A decent Regex to find relative and absolute paths.
