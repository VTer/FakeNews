/*!
 * Fake News Debunker v0.1
 * Copyright 2017 The Fake News Debunker Authors 
 * Licensed under LGPL-3.0 (https://github.com/selfagency/bs-detector/blob/master/LICENSE)
 */
function Debunker() {
  'use strict';

  this.fakeSites = {};
}

Debunker.prototype = {
  constructor: Debunker,

  checkVeracity : function (url, sendResponse) {

  
    xhReq(chrome.extension.getURL('site.json'), function (file) {
      'use strict';
     
      var siteList  = JSON.parse(file);
      var site, fakeSites = {};
      for (site in siteList) {
        fakeSites[site] = true;
      }
      
      var result   = fakeSites[url];
      var veracity = false; 
      if (result === true) 
        veracity = false;
      else
        veracity = true;

      sendResponse({"veracity" : veracity});
    });
 },

  /*
  exec : function() {
    xhReq(chrome.extension.getURL('site.json'), function (file) {
      'use strict';
      
      var siteList = JSON.parse(file);
    });

    this.fakeSites["100percentfedup.com"] = true; 
  }
  */
}

var debunker = new Debunker();

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    url = request.check_url
    console.log(url)

    debunker.checkVeracity(url, sendResponse);
    return true;
  }
);
