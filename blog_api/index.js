const http = require("http");
const url = require('url');
const querystring = require('querystring');
const router = require("./libs/router");
const hostname = "127.0.0.1";
const port = 3000;
var bytes = 1024;

// var handles = {};
// handles.index = {
//   index: function(req, res) {
//     res.writeHead(200);
//     res.end("index/index");
//   }
// };
// handles.user = {
//   login: function(req, res) {
//     res.writeHead(200);
//     res.end("Hello World");
//   }
// };

var user = {
    login: function(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        var data = {
            code: 1,
            msg: 'success',
            data: []
        }
        res.write(JSON.stringify(data))
        res.end();
        return;
    }
}


var get = function(req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/user/login') {
        user.login(req, res);
    }
}
var post = function(req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/user/login') {
        user.login(req,res);
    }
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  console.log(req.method, 'method')
    if (req.method == 'GET') {
        get(req, res);
    } else if (req.method === 'POST') {
        post(req, res);
    }
  // 解析方法
//   parseMethod(req, res);
  // 解析 URL, 获取静态文件
  // 解析 URL, 转发控制器
//   router.parseUrlForController(req, res);
  // 解析 cookie
  // 缓存
  // 解析表单数据
//   handleBody(req, res);
  // 解析 xml,json
  // 附件上传
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




// 路由解析
var routes = {'all': []};
var app = {};
app.use = function (path, action) { 
    routes.all.push([pathRegexp(path), action]); 
};
// restfull
['get', 'put', 'delete', 'post'].forEach(function (method) { 
    routes[method] = []; 
    app[method] = function (path, action) { 
        routes[method].push([pathRegexp(path), action]); 
    }; 
});
// var match = function (pathname, routes) { 
//     for (var i = 0; i < routes.length; i++) { 
//         var route = routes[i]; 
//         // 正则匹配
//         var reg = route[0].regexp; 
//         var keys = route[0].keys; 
//         var matched = reg.exec(pathname); 
//         if (matched) { 
//             // 抽象具体值
//             var params = {}; 
//             for (var i = 0, l = keys.length; i < l; i++) { 
//                 var value = matched[i + 1]; 
//                 if (value) { 
//                     params[keys[i]] = value; 
//                 } 
//             } 
//             req.params = params; 
//             var action = route[1]; 
//             action(req, res); 
//             return true; 
//         } 
//     } 
//     return false; 
// };

var parseMethod = function(req, res) {
    var pathname = url.parse(req.url).pathname;
    var method = req.method.toLowerCase(); 
    if (routes.hasOwnPerperty(method)) { 
        if (match(pathname, routes[method])) { 
            return; 
        } else { 
            if (match(pathname, routes.all)) { 
                return; 
            } 
        } 
    } else { 
        if (match(pathname, routes.all)) { 
            return; 
        }
    } 
    // 处理404请求
    // handle404(req, res);
}

var hasBody = function(req) { 
    return 'transfer-encoding' in req.headers || 'content-length' in req.headers; 
};

var handleBody = function (req, res) { 
    if (hasBody(req)) { 
        var buffers = []; 
        req.on('data', function (chunk) { 
            buffers.push(chunk); 
        }); 
        req.on('end', function () { 
            req.rawBody = Buffer.concat(buffers).toString(); 
            handle(req, res); 
        }); 
        var done = function () { 
            handle(req, res); 
        }; 
        if (mime(req) === 'application/json') { 
            parseJSON(req, done); 
        } else if (mime(req) === 'application/xml') { 
            parseXML(req, done); 
        } else if (mime(req) === 'multipart/form-data') { 
            parseMultipart(req, done); 
        }
    } else { 
        handle(req, res); 
    } 
}

var handle = function (req, res) { 
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') { 
    req.body = querystring.parse(req.rawBody); 
    } 
    // todo(req, res); 
};

var mime = function (req) { 
    var str = req.headers['content-type'] || ''; 
    return str.split(';')[0]; 
};
var parseJSON = function (req, res) { 
    if (mime(req) === 'application/json') { 
        try { 
            req.body = JSON.parse(req.rawBody); 
        } catch (e) { 
            // 异常内容ǈ响应Bad request 
            res.writeHead(400); 
            res.end('Invalid JSON'); 
            return; 
        } 
    } 
    // todo(req, res); 
};
var parseXML = function() {}

var parseMultipart = function(req, res) {
    if (mime(req) === 'multipart/form-data') { 
        var form = new formidable.IncomingForm(); 
        form.parse(req, function(err, fields, files) { 
            req.body = fields; 
            req.files = files; 
            handle(req, res); 
        }); 
    }
}

checkData = function (req, res) { 
    var received = 0, 
        len = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : null; 
    // 如ࡕ内容ג过长܈限制ǈݓ回请求实体过长的状态码
    if (len && len > bytes) { 
        res.writeHead(413); 
        res.end(); 
        return; 
    }
    // limit 
    req.on('data', function (chunk) { 
        received += chunk.length; 
        if (received > bytes) { 
            req.destroy(); 
        } 
    }); 
    handle(req, res);
}

