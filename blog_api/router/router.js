var handles = {};
handles.index = {
  index: function(req, res) {
    res.writeHead(200);
    res.end("index/index");
  }
};
handles.user = {
  login: function(req, res) {
    res.end("Hello World");
  }
};
module.exports = handles;
