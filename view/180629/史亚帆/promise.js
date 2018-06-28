
/*
Promise 是什么？
Promise 的优缺点
Promise 的用法

*/















/*
Promise 是一个对象，是一个异步编程的解决方案，比传统的回调函数和事件更合理
其实就是一个容器，里边保存着未来才会结束的事件的结果。

特点：
1、Promise状态的改变不受外界的影响。有三种状态 Pending Resolved Rejected。
2、状态一旦改变，就不会再改变。
缺点：
无法取消Promise 一旦建立就无法取消
*/
var promise = new Promise(function(resolved,rejected){

})
promise.then(function(value){},function(error){});

/*****1*****/
Promise.prototype.then  //为实例添加状态改变时的回调函数，返回的是一个新的Promise实例
//例子
var getJson = function(url){
    return new Promise(function(resolved,rejected){})
}

getJson('a.json').then(function(value){
    return getJson(value.json);
}).then(function(data){

},function(error){

})

/*****2*****/
Promise.prototype.catch //then的别名 用于指定发生错误的回调函数

getJson('a.json').then((data)=>{

}).catch(error=>{
    //promise对象的错误具有冒泡性质，会向后一直传递，直到被捕获
})


/*****3*****/
Promise.all(); //接受一个数组作为参数，数组的元素必须是promise对象

var promises = [2,3,4,5].map(function(id){
    return getJson('/post/'+id+'.json');
})
Promise.all(promises).then(function(datas){
    //只有数组中所有的promise的状态 变为Resolved才会 走此回调函数，所有结果都在datas中
}).catch(function(error){
    //如果数组中有一个状态为rejected 便会走此回调
})

Promise.race();//与all相反 只要有一个变为Resolved的便执行回调

Promise.race(promises).then(data=>{

}).catch(error=>{});

/*****4*****/
Promise.resolve()//将一个不是promise对象 转为Promise对象

Promise.resolve('foo');
//等价于
new Promise(resolve=>resolve('foo'));


Promise.reject();

Promise.reject('处错误了');
//等价于
new Promise((resolve,reject)=>{reject('出错误了')});

/*****5*****/













/*
Generator函数是一个遍历器对象，代表内部指针
*/


function* helloWorld(){
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorld();
hw.next() //{value:'hello',done:false}
hw.next() //{value:'world',done:false}
hw.next() //{value:'ending',done:true}
hw.next() //{value:'undefined',done:true}

/*

(1)遇到 yield 语句，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。
(2)下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 语句。
(3)如果没有再遇到新的 yield 语句，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值， 作为返回的对象的 value 属性值。
(4)如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined 。
*/


var fs = require('fs');

var readFile = function(fileName){
    return new Promise(function(resolve,reject){
        fs.readFileSync(fileName,function(error,data){
            if(error) reject(error);
            resolve(data);
        })
    })
}


var gen = function* (){
    var f1 = yield readFile('/etc/a.json');
    var f2 = yield readFile('/etc/b.json');
}
gen().next();

//async函数 Generator语法糖，内置了执行器 返回值为Promise对象
var asyncReadFile = async function(){
    try {
        var f1 = await readFile('/etc/a.json');
        var f2 = await readFile('/etc/b.json');
        return f1 + f2;
    } catch (error) {     
    }
}
asyncReadFile.then(data=>{

}).catch(error=>{});








