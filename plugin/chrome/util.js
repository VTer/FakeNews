/**
 * @description Cleanup a url to get the domain out of it.
 * @method url2Domain
 * @param {string} url The URL to cleanup.
 */
function url2Domain(url) {
  'use strict';

  if (url) {
    url = url.toString().replace(/^(?:https?|ftp)\:\/\//i, '');
    url = url.toString().replace(/^www\./i, '');
    url = url.toString().replace(/\/.*/, '');
    return url;
  }
}


function xhReq(url, success, failure) {

    'use strict';

    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        // Once done loading.
        if (xhr.readyState === 4) {
            // Call the right feedback based on response.
            if (xhr.status === 200 && success) {
                success(xhr.responseText);
            } else if (failure) {
                failure(xhr.responseText);
            }
        }
    };
    xhr.send(null);
}
