var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname //path 里没有查询参数
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    //一个路径返回html内容，一个路径返回css字符串
    //模仿请求网页的过程

    // 路由可以处理浏览器的HTTP请求（请求不到执行最后的else），也可处理AJAX请求（请求不到log 404）
    if (path === '/') { // 路由，浏览器构建的HTTP请求，请求的路径（内容）
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8') // 响应的描述信息
        response.write(fs.readFileSync('public/index.html')) // script标签和link标签，没有刷新页面就构建了请求，可以认为他们构建的请求也是AJAX请求？
        response.end() 
    } else if (path === '/main.js') { // 不建路由，也不能根据文件的路径请求？
        response.statusCode = 200
        response.setHeader('Content-Type','text/javascript;chartset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if (path === '/style') { //在 sources/page中由x这个资源，浏览器是把响应的内容创建文件，然后写入进去的吗？ //这里的x（其实是个文件）没有写后缀，文件的类型就是contenttype决定的
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if(path === '/2.js'){
        response.statusCode = 200
        response.setHeader('Content-Tyoe','text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/2.js'))
        response.end()
    }else if(path === '/3.html'){
        response.statusCode = 200
        response.setHeader('Content-Tyoe','text/html;charset=utf-8')
        response.write(fs.readFileSync('public/3.html'))
        response.end()
    }else if(path === '/4.xml'){
        response.statusCode = 200
        response.setHeader('Content-Tyoe','text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/4.xml'))
        response.end()
    }else if(path === '/5.json'){
        response.statusCode = 200
        response.setHeader('Content-Tyoe','text/json;charset=utf-8')
        response.write(fs.readFileSync('public/5.json'))
        response.end()
    }
    else if(path === '/page1'){
        response.statusCode = 200
        response.setHeader('Content-Tyoe','text/json;charset=utf-8')
        response.write(fs.readFileSync('db/page1.json'))
        response.end()
    }
    else if(path === '/page2'){
        response.statusCode = 200
        response.setHeader('Content-Tyoe','text/json;charset=utf-8')
        response.write(fs.readFileSync('db/page2.json'))
        response.end()
    }
    else if(path === '/page3'){
        response.statusCode = 200
        response.setHeader('Content-Tyoe','text/json;charset=utf-8')
        response.write(fs.readFileSync('db/page3.json'))
        response.end()
    }else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)