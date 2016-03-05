// var YOUTUBE_API_KEY = "AIzaSyCcNCtcaV7OSajn9PAzXS3Nh9XVNunkDKI";
// var initialSearchURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=relevance&maxResults=1&videoEmbeddable=true";
// var YOUTUBE_SEARCH_URL = initialSearchURL + "&key=" + YOUTUBE_API_KEY;
// var CHART_URL = "http://instantmusic.cloudapp.net/charts/realtime?version=1&page=1&count=25";

// var getVideoId = function(song, callback) {
//   var query = song.songName + " " + song.artists.artist[0].artistName;
//   $.ajax({
//     url: YOUTUBE_SEARCH_URL,
//     type: "GET",
//     data: 'q='+encodeURIComponent(query),
//     success: function(result) {
//       callback(result);
//     }
//   });
// }

// function updateWebviews() {
//   var webview = youtubeWebview;
//   webview.style.height = "400px";
//   webview.style.width = "600px";
// };

// var getVideoIdsFromYoutube = function(songsData, callback) {
//   var videoIds = [];

//   // make 10 promises
//   _.each(songsData, function(song, idx) {
//     getVideoId(song, function(result) {
//       var videoId = result.items[0].id.videoId;
//       videoIds.push(videoId);
//       if (videoIds.length === 25) {
//         callback(videoIds);
//       }
//     });
//   });
// }

// var searchMelon = function(chartUrl, callback) {
//   $.get(chartUrl, function(songsData) {
//     callback(songsData);
//   });
// };

// var registerEvents = function(webview) {
//   webview.addEventListener('loadstart', function() {
//     console.log("load started");
//   });

//   webview.addEventListener('loadstop', function() {
//     console.log("load stopped");
//     injectScript(webview);
//   });

//   webview.addEventListener('contentload', function() {
//     console.log("contentload");
//   });

//   webview.addEventListener('dialog', function() {
//     console.log("dialog");
//   });

//   webview.addEventListener('findupdate', function() {
//     console.log("findupdate");
//   });

//   webview.addEventListener('loadredirect', function() {
//     console.log("loadredirect");
//   });
  
//   webview.addEventListener('newwindow', function() {
//     console.log("newwindow");
//   });

//   webview.addEventListener('permissionrequest', function() {
//     console.log("permissionrequest");
//   });

// // contentload
// // dialog
// // loadstart
// // loadstop

// }

// var playInSeries = function(webview, videoIds) {
//   var currentIdx = 0;
//   var videoUrl = "http://www.youtube.com/embed/" + videoIds[currentIdx] + "?enablejsapi=1&autoplay=1";
//   console.log("START: ", videoUrl);
//   webview.src = videoUrl;
// }

// var injectScript = function(webview) {
//   webview.executeScript({file: 'player.js'}, function(result) {
//     console.log("just injected my darkness")
//   });
// }

// var injectCode = function(code) {
//   window.youtubeWebview.executeScript({code: code})
// }

// var messageHandler = function(msg) {
//   console.log(msg);
// }

// var sendMsg = function(webview, msg) {
//   webview.contentWindow.postMessage(msg, "*");
// };


// $(function() {
//   window.youtubeWebview = $("#youtube-webview")[0];
//   updateWebviews;

//   chrome.runtime.onMessage.addListener(function(msg) {
//     console.log(msg);
//   })

//   searchMelon(CHART_URL, function(songsData) {
//     var songsData = songsData.melon.songs.song;
//     getVideoIdsFromYoutube(songsData, function(videoIds) {
//       _.each(videoIds, function(videoId) {
//         $(".videos").append("<div class='play-video' id='"+videoId+"'>"+videoId+"</div>");
//       });

//       $('.play-video').click(function(event) {
//         sendMsg(youtubeWebview, {videoId: event.target.id});
//       });
//     })
//   });
// });

