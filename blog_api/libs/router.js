const url = require("url");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const handles = require("../router/router");

var handleRequestMethod = function(req, res) {
  switch (req.method) {
    case "POST":
      create();
      break;
    case "PUT":
      update();
      break;
    case "DELETE":
      remove();
      break;
    case "GET":
    default:
      getComputedStyle(req, res);
  }
};

/**
 * 静态文件服务器: 根据路径进行 业务处理的应用
 * @param {*} req
 * @param {*} res
 */
var parseUrlForStatic = function(req, res) {
  var pathname = url.parse(req.url).pathname;
  fs.readFile(path.join(ROOT, pathname), function(err, file) {
    if (err) {
      res.writeHead(404);
      req.end("找不到相关文件.");
      return;
    }
    res.writeHead(200);
    res.end(file);
  });
};

var parseQueryString = function(req, res) {
  var query = querystring.parse(url.parse(req.url).query);
  handles(req, res);
};

module.exports = {
  /**
   * 根据路径选择控制器
   */
  parseUrlForController: function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var paths = pathname.split("/");
    var controller = paths[1] || "index";
    var action = paths[2] || "index";
    var args = paths[3];
    console.log(handles[controller], 'handles');
    if (handles[controller] && handles[controller][action]) {
      handles[controller][action].apply(null, [req, res].concat(args));
    } else {
      res.writeHead(500);
      res.end("找不到响应控制器");
    }
  }
};
