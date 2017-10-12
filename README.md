## Instant Music (Chrome App)

### Overview

Instant Music is a music player as a chrome app. It fetches popular music charts (e.g. iTunes, BillBoard, and Melon) and streams music videos from YouTube.

### Demo

- Demo1: http://woniesong92.github.io/instant-music-chrome/
- Demo2: http://woniesong92.github.io/instant-music-chrome/kr/
- Demo3: https://howonsong.com/work/instantmusic

<img src="https://media.giphy.com/media/l378bnkmNvUWEiVNe/giphy.gif" width="640px">

### Technology used

- React/Redux
- Rails
- Nginx (reverse proxy)
- YouTube Data API
- iTunes/BillBoard/Melon charts API
- Chrome Extension/App API

### Challenges

- YouTube didn't allow chrome extensions/apps to stream most of the videos. The solution was faking user-agent, so that the requests seemed like they were coming from a mobile device instead of a Chrome extension.
- The API limit for Melon chart was 30,000/day. To avoid reaching the limit, I built a simple reverse proxy with cache that stood between the client and the Melon API service. I never had issues with the API limit since then.
- Users weren't satisfied enough with just creating the playlists -- they wanted to load (i.e. sync) the playlists in multiple browsers. I first tried using Chrome's native `storage.sync` to support persistence. However, it failed when the playlists became very long because of the capacity limit. I ended up introducing a simple backend in Rails to provide the ability to sync playlists.

### Motivation

I built Instant Music as a Chrome extension in 2014 in Backbone.js and rebuilt it as a Chrome app in 2016 in React/Redux. When I was in the army, I had limited access to internet and wanted to listen to music as effortlessly as possible. Streaming services like Pandora or Spotify weren't available in Korea, so Instant Music was my only option.
