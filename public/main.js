getCSS.onclick = () => { // 相当于模拟:添加一个link标签请求css?
    const request = new XMLHttpRequest()
    request.open('GET', '/style')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            const cssText = request.response // 为 string类型
            const style = document.createElement('style')
            style.textContent = cssText
            document.head.appendChild(style)
        }
    }
    request.send()
}

getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/2.js') // 不在服务器建立路由，在客户端直接通过（服务器端的路径）路径也是访问不到 返回404 Not Found
    request.onreadystatechange = () => {
        console.log(request.readyState);

        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            const jsText = request.response // 为 string类型
            const js = document.createElement('script')
            js.textContent = jsText
            document.body.appendChild(js)
        }
    }
    request.send()
}

getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/3.html') // 不在服务器建立路由，在客户端直接通过（服务器端的路径）路径也是访问不到 返回404 Not Found
    request.onreadystatechange = () => {
        console.log(request.readyState);

        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            const html = request.response // 为 string类型
            const div = document.createElement('div')
            div.innerHTML = html
            document.body.appendChild(div)
        }
    }
    request.send()
}

getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/4.xml') // 不在服务器建立路由，在客户端直接通过（服务器端的路径）路径也是访问不到 返回404 Not Found
    request.onreadystatechange = () => {
        console.log(request.readyState);

        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            const xmlObj = request.responseXML // 显示出AJAX最初的用途，客户端和服务端使用XML交换数据
            const message = xmlObj.getElementsByTagName('warning')[0].textContent
            alert(message)
        }
    }
    request.send()
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/5.json') // 不在服务器建立路由，在客户端直接通过（服务器端的路径）路径也是访问不到 返回404 Not Found
    request.onreadystatechange = () => {
        console.log(request.readyState);

        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            let x
            try {
                x = JSON.parse(request.response) // 不能保证每次都能转换成功，所以需要捕获错误
            } catch (error) {
                console.log('错误详情：')
                console.log(error)
                x = null
            }
            console.log('request.response:'+ typeof request.response)
            console.log('x:'+typeof x) 
        }
    }
    request.send()
}

let n=1
nextPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${n}`) // 不在服务器建立路由，在客户端直接通过（服务器端的路径）路径也是访问不到 返回404 Not Found
    request.onreadystatechange = () => {
        console.log(request.readyState);

        if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
            let items
            try {
                items = JSON.parse(request.response) // 不能保证每次都能转换成功，所以需要捕获错误
            } catch (error) {
                console.log('错误详情：');
                console.log(error);
                items = []
            }
            pages.innerHTML = items.map(item=>`<li>${item.id}</li>`).join('')
            n++
        }
    }
    request.send()
}