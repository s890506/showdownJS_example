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
                
    var html = converter.makeHtml(input);
    
    res.render('index',{
        htmlCode : html
    });
})

app.listen(3000, function() {
    console.log("HTTP 伺服器在 http://127.0.0.1:3000/ 上運行");
})