# 使用 showdown 於 node express 中進行 markdown 轉 HTML

Markdown 是一種輕量級標記式語言。它設計的初衷是使用易讀易寫的純文字格式編寫文件，然後轉換成有效的 XHTML(或者 HTML) 文件，同時這種語言吸收了很多在電子郵件中已有的純文字標記的特性。而以下範例將會使用 Express 做為基礎，並使用 showdown 套件來完成由後端 markdown 轉 HTML 的功能，使用戶端可直接看到轉換完的畫面。

## 安裝

```
$ cd <directory-to-your-showdownJS_example>
$ npm i
$ node app.js
```

## 簡介

* Node 後端程式碼：
```
var express = require('express');
var path = require('path');
var showdown  = require('showdown');
    
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get("/", function(req, res) {   
    
    var converter = new showdown.Converter();    
    converter.setOption('tables', true); // 開啟表格功能
    converter.setOption('tasklists', true); // 開啟 checkbox 功能
    
    // markdown 內容
    var input = '# H1 標題 \n' +
                '## H2 標題 \n' +
                '### H3 標題 \n' + 
                '#### H4 標題 \n' + 
                '##### H5 標題 \n' + 
                '###### H6 標題 \n' + 
                '*斜體* \n\n' +
                '**粗體** \n' +
                '- [ ] checkbox 1 \n' +
                '- [x] checkbox 2 \n\n' +
                '[Makee.io Blog](http://oranwind.org/) \n\n' + 
                '![Makee.io logo] (http://makee.io/manual/img/makee_logo.jpg) \n\n' + 
                '| 表格 1 | 表格 2 |\n' +
                '|======= |=======|\n' +
                '| 表格 3 | 表格 4 |\n' +
                '| 表格 5 | 表格 6 |\n';
                
    // markdown 轉 HTML
    var html = converter.makeHtml(input);
    
    res.render('index',{
        htmlCode : html
    });
})

app.listen(3000, function() {
    console.log("HTTP 伺服器在 http://127.0.0.1:3000/ 上運行");
})
```

* jade 前端程式碼：
```
doctype html
html
  head
    title showdown JS 範例
  body
    .div !{htmlCode}
```


* 結果將會如下圖所示：
![markdown](https://oranwind.s3.amazonaws.com/2016/Feb/0226a-1456480489677.png)

## 版本資訊
* NodeJS：4.3.0
* express：4.13.4
* showdown：1.3.0
* jade：1.11.0

## Reference
* [https://github.com/showdownjs/showdown](https://github.com/showdownjs/showdown)
* [https://zh.wikipedia.org/wiki/Markdown](https://zh.wikipedia.org/wiki/Markdown)
