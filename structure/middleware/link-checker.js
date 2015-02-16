/*
 * Adapted from link-checker.js
 * github.com/less/less-docs
 * @lukeapage
 *
 */

var options = {
  stage: 'render:post:page'
};

var cheerio = require('cheerio');
var request = require('request');

var linkMap = {};


var que = [];
var activeRequests = 0;

function checkLink(link, callback) {

  if (link.indexOf("//") === 0) {
    link = "http:" + link;
  }

  function doRequest() {
    activeRequests++;
    request.get({
      uri: link,
      strictSSL: false
    }, function (error, res, body) {
      if (error) {
        callback(false, error);
      } else {
        callback(res.statusCode === 200, res.statusCode);
      }
      if (que.length) {
        que.pop()();
      } else {
        activeRequests--;
      }
    });
  }

  if (activeRequests >= 9) {
    que.push(doRequest);
  } else {
    doRequest();
  }
}

function findLink(linkToFind, anchors) {
  for (var i = 0; i < anchors.length; i++) {
    if (anchors[i] === linkToFind) {
      return true;
    }
  }
  return false;
}

module.exports = function (assemble) {

  // Adapted from link-checker.js from less/less-docs
  var middleware = function (params, next) {
    'use strict';

    var page = params.page.dest.replace(params.page.dirname, "").substr(1),
      shortname = page.replace(/\/?index.html$/, "");

    // load current page content
    var $ = cheerio.load(params.content);

    // get all the anchor tags from inside the headers
    var anchors = $('h1[id],h2[id],h3[id],h4[id],h5[id],a[id]'),
      links = $('a[href]'),
      failures = [],
      externalLinks = [],
      externalLinksChecked = 0,
      syncFinished = false;

    function finish() {
      if (syncFinished && externalLinks.length === externalLinksChecked) {
        if (failures.length > 0) {
          console.log("\n");
          failures.forEach(function (error) {
            console.log(error);
          });
          console.warn("failed to find some links");
        }

        next();
      }
    }

    if (!linkMap[shortname]) {
      linkMap[shortname] = {};
    }

    linkMap[shortname].anchors = anchors.map(function (i, e) {
      return $(e).attr("id");
    });

    if (linkMap[shortname].checks) {
      linkMap[shortname].checks.map(function (check) {
        check();
      });
    }

    function isLinkException(href, $e) {
      if (href === "#" && $e.attr("class") === "dropdown-toggle") {
        return true;
      }
      if (href === '#' && $e.attr("class") === "navbar-brand" && shortname === "") {
        //console.log("leaving '" + shortname + "'");
        return true;
      }
      return false;
    }

    links.map(function (i, e) {

      function checkInternalCrossRefLink() {
        if (!findLink(linkid, linkMap[linkpage].anchors)) {
          failures.push("Could not find internal cross link '" + href + "' as part of link '" + $.html(e) + "'");
        }
      }

      var href = $(e).attr("href");
      if (href.match(/^#/)) {
        if (!isLinkException(href, $(e))) {
          if (!findLink(href.substr(1), linkMap[shortname].anchors)) {
            failures.push("Could not find '" + href + "' as part of link '" + $.html(e) + "'");
          }
        }
      } else if (href.match("^(https?:)?//")) {
        if (href.indexOf("http://localhost") !== 0) {
          externalLinks.push(href);
          checkLink(href, function (ok, statusCode) {
            externalLinksChecked++;
            if (!ok) {
              failures.push("Could not find external '" + href + "' as part of link '" + $.html(e) + "'. Got status code " + statusCode);
            }
            finish();
          });
        }
      } else {
        var split = href.split("#"),
          linkpage = split[0],
          linkid = split[1],
          currentDirectory = "";

        if (page.indexOf("/") > 0) {
          currentDirectory = page.substr(0, page.indexOf("/"));
        }

        if (linkpage.indexOf("../") === 0) {
          linkpage = linkpage.substr(3);
        } else {
          linkpage = currentDirectory + "/" + linkpage;
        }

        linkpage = linkpage.replace(/(^\/)|(\/$)/g, "");

        if (linkpage !== "usage" && linkpage !== "features" && linkpage !== "" && linkpage !== "functions" && linkpage !== "about") {
          failures.push("Could not find internal page '" + href + "' as part of link '" + $.html(e));
        }

        if (linkid) {
          if (!linkMap[linkpage]) {
            linkMap[linkpage] = {};
          }
          if (linkMap[linkpage].anchors) {
            checkInternalCrossRefLink();
          } else {
            linkMap[linkpage].checks = linkMap[linkpage].checks || [];
            linkMap[linkpage].checks.push(checkInternalCrossRefLink);
          }
        }
      }
    });

    syncFinished = true;
    finish();
  };



  middleware.event = 'page:after:render';

  return {
    'assemble-middleware-link-checker': middleware
  };
};