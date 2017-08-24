/*!
 * Fake News Debunker v0.1
 * Copyright 2017 The Fake News Debunker Authors 
 * Licensed under LGPL-3.0 (https://github.com/selfagency/bs-detector/blob/master/LICENSE)
 */


/*
 * @param url 
 */
function identifySite(url) {
  'use strict';
 
  var domain = url2Domain(url); 

  switch (domain) {
    case "facebook.com":
    case "m.facebook.com":
      debunkOnFacebook();
      break; 

    case "twitter.com":
      debunkOnTwitter();
      break;

    default:
      debunkOnWebsite(domain);
  }
}


var fbUrlRegex = new RegExp(/^https?:\/\/l\.facebook\.com\/l\.php\?u=([^&]+)/);

/*
 *
 */
function debunkOnFacebook() {
  'use strict';

  // detect and extract url from each FB post 
  $('.mtm').each(function(){
    var post   = $(this);
    var url    = $(post).find("._52c6").attr("href"); 
    var url    = decodeURIComponent(fbUrlRegex.exec(url)[1]);
    var domain = url2Domain(url);    

    // check veracity of post url and add warning on the post if veracity is "false" 
    send2Debunker(domain, function(veracity) {
      if (veracity === false) {
        var type = "caution";
        var msg  = debunkMessage();

        if (!$(post).hasClass('bs-flag')) {
          if (type === 'caution') {
            $(post).before($('<div class="bs-alert-inline warning">').text(msg));
          } else {
            post.before($('<div class="bs-alert-inline">').text(msg));
          }

          post.addClass('bs-flag');
        } 
      }
    });
  }); 


  /*
 */  
}


/*
 * 
 */
function debunkOnTwitter() {
  'use strict';
  alert("twitter alert!");
}

/*
 *
 */
function debunkOnWebsite(domain) {
  'use strict';

  // check veracity of site url and add warning on the site if veracity is "false"
  send2Debunker(domain, function(veracity) {

    if (veracity === false) {
      var navs = $('nav, #nav, #navigation, #navmenu');
      var msg  = debunkMessage();
      var type = "alert";

      if ($(navs)) {
        $(navs).first().addClass('bs-alert-shift');
      } else {
        $('body').addClass('bs-alert-shift');
      }

      if (type === 'caution') {
        $('body').prepend($('<div class="bs-alert bs-caution">'));
      } else {
        $('body').prepend($('<div class="bs-alert">'));
      }

      $('.bs-alert').append($('<div class="bs-alert-close">').text('✕'));
      $('.bs-alert').append($('<span class="bs-alert-span">').text(msg));

      $('.bs-alert-close').on('click', function () {
        $(navs).first().removeClass('bs-alert-shift');
       $('body').removeClass('bs-alert-shift');
       $('.bs-alert').remove();
     });
    }

  });
}


function debunkMessage() {
  return "This site contains misinformation!"
}



function send2Debunker(domain, showVeracity) {
  chrome.runtime.sendMessage(null, {'check_url': domain}, null, function (state) {

    veracity = state.veracity;    

    showVeracity(veracity);
  });
}


/*
 * main workflow
 */
var winUrl = window.location.hostname;
identifySite(winUrl);
