function playVideo() {
  $('video.main__video')[0].play();
}

function onTypingComplete() {
  $('.cta').fadeOut(1000, function() {
    $('.main').fadeIn().removeClass("hidden");
    playVideo();
  });
}

function startTyping() {
  $(".cta__typing-text").typed({
    strings: ["^1500 Beatles ^1000 let it be ^500",],
    typeSpeed: 50,
    callback: onTypingComplete
  });
}

function onInstallClicked(event) {
  var button = event.target;

  if (chrome.app.isInstalled) {
    $(button).text("Already installed :D");
  }
  
  chrome.webstore.install("https://chrome.google.com/webstore/detail/bhmdfmjoieebpdomkdfopfpcenomaood", function(success) {
    $(button).text("Installed :D");
  }, function(fail) {
    $(button).text("Failed :(");
  });
}

$(function() {
  startTyping();
  $(".main__download-btn").click(onInstallClicked);
});
