chrome.app.runtime.onLaunched.addListener(function() {
  var appWidth = window.screen.width;
  var appHeight = window.screen.height-100;

  chrome.app.window.create('../foreground/main.html', {
    id: 'instant-music',
    bounds: {
      width: appWidth,
      height: appHeight,
      left: 0,
      top: 0
    },
    minWidth: appWidth,
    minHeight: appHeight
  });
});
