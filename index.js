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
    // strings: ["^1500 Beatles ^1000 let it be ^500"],
    strings: ["^1500 Flo Rida ^1000 my house ^500"],
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
    debugger
    $(button).text("Oops! Try again.");
  });
}

$(function() {
  startTyping();
  // $(".main__download-btn").click(onInstallClicked);
});
