var http = require('http');

var options = {
  host: 'agenciabrasil.ebc.com.br',
  port: 80,
  path: '/'
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  res.setEncoding('utf8');
  res.license_re = new RegExp("<a[^>]*license[^>]*>[^>]*>", "ig");
  res.matches = [];
  res.body = "";
  res.licenses = [];
  res.on('data', function (chunk) {
    this.body += chunk;
  });
  res.on('end', function (chunk) {
    while (this.matches = this.license_re.exec(this.body)){
      console.log(this.matches.index);
      console.log(this.license_re.lastIndex);
      this.licenses.push({"license":this.matches[0], "context":this.body.substring(this.matches.index-300, this.license_re.lastIndex+100)});
    }
    console.log(this.licenses);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});