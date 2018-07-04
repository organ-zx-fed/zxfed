
/*
HTML5 引入工作线程（webworker）
简单说，就是允许JavaScript创建多个线程，但是子线程
完全受主线程控制，且不得操作DOM，从而可以使用webWorker来处理一些比较耗时的操作

*/


//index.js 中启用worker

let worker = new Worker('js/worker.js');

worker.onmessage = function(event){
    console.log(event.data);
}

worker.onerror = function(e){
    console.log(e.message);
}

//worker.js 中请求图片
let array = [];//图片路径
for(let i = 0; i < array.length; i++){
    let req = new XMLHttpRequest();
    req.open('GET',array[i],true);
    req.responseType = 'blob';
    req.onreadystatechange = ()=>{
        if(req.readyState == 4){
            postMessage(req.response);
        }
    }
    req.send(null);
}




//函数节流
var canRun = true;
document.getElementById('content').onscroll = function(){
    if(!canRun){
        return;
    }

    canRun = false;
    setTimeout(() => {
        console.log('函数节流');
        canRun = true;
    }, 300);
}

//函数防抖

var timer = false;
document.getElementById('content').onscroll = function(){
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log('函数防抖')
    }, 300);
}









