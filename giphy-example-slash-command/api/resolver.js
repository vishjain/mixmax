var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var unirest = require('unirest');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  console.log(term);
  handleSearchString(term, req, res);

};

function handleSearchString(term, req, res) {

  var response;
  try {
    //console.log(term);
    unirest.post('https://andruxnet-random-famous-quotes.p.mashape.com/?cat=' + term)
    .header("X-Mashape-Key", "AaaeP7Pr3TmshxOTxoqEEm0hEDdDp1wyDWTjsnl52RKVyDuUri")
    .header("Content-Type", "application/x-www-form-urlencoded")
    .header("Accept", "application/json")
    .end(function (result) {
        //console.log(typeof(result.body));
        //parsedbody = JSON.stringify(request.body);

        //var stuff = JSON.parse(request.body);
        //console.log(stuff.quote);

        //var data = {"name": "test", "skills": "", "jobtitel": "Entwickler", "res_linkedin": "GwebSearch"};
        //var data = result.body[name];
        var data = result.body;
        var obj = JSON.parse(data);
        console.log(obj.quote);
        console.log(obj.author);

        //var width = data.image_width > 600 ? 600 : data.image_width;
        var html = '<p style="border:3px; border-style:solid; border-color:#FF0000; padding: 1em;">' + '"'+ obj.quote + '"'+ " - " + obj.author + '</p>';
        res.json({
          body: html
        });


    });
    }
    catch (e) {
    res.status(500).send('Error');
    return;
  }



}
