// Import the self API
var self = require("self");
var { MatchPattern } = require("match-pattern");

var workers = [];

function detachWorker(worker, workerArray) {
  var index = workerArray.indexOf(worker);
  if(index != -1) {
    workerArray.splice(index, 1);
  }
}

var urljson = null;

var Request = require("request").Request;
var jsonRequest = Request({
    url: self.data.url("url.json"),
    onComplete: function (response) {
        console.log(response.statusText);
        console.log(response.json);
        urljson = response.json;
        if (urljson != null)
            main(urljson);
        else
            console.log("error");
    }
}).get();

// TODO: prévoir un json en local si on n'arrive pas à le charger à distance
/*
var urljson = {
    ".*google\.fr.*": ["google"],
    ".*localhost.*": ["localhost"],
};
*/

function get_js_url(js)
{
        return self.data.url('js/'+js+'.js');
}

function scriptfiles(urlscript)
{
    for(var i = 0; i < urlscript.length; i++)
    {
        urlscript[i] = get_js_url(urlscript[i]);
    }
    var output = [get_js_url('lib/jquery-1.8.2.min')].concat(urlscript);
    console.log(output);
    return output;
}

function main(urljson)
{
    for(var site in urljson) {
        console.log(site);
        site = urljson[site];
        var regex = new RegExp(site.url);
        console.log(regex);

        // TODO : permettre de charger du CSS perso
        var pageMod = require("page-mod").PageMod({
            include: regex,
            contentScriptFile: scriptfiles(site.js),
            onAttach: function(worker) {
                workers.push(worker);
                worker.on('detach', function () {
                    detachWorker(this, workers);
                });
            },
        });
    }
}
