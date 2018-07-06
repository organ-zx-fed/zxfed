/*
 @快速克隆数组几种方式
*/

var arr = [1,2,3]
var arr2 = [];

// 第一种复制数组 循环
for(var i =0; i<arr.length; i++){
    arr2[i] = arr[i]
}
arr.push(4)

arr2.pop()
console.log(arr, arr2)

// 第二种复制数组  Array.from()
var arr = [4,5,6];
var arr2 = Array.from(arr);  

arr2.pop()
console.log(arr, arr2) //[4,5,6], [4,5]

// 第三种复制数据 [...arr]
var arr = [5,6,7];
var arr2 = [...arr];

arr.push(8)
console.log(arr,arr2)

// 三个点还有一个用处
function show(){
    //使用arguments 时候 并不是一个数组
    arguments.push(6)  //error: arguments.push is not a function
    console.log(arguments)
}
show(1,2,3)

function show(...args){
    args.push(10) //能够正常的push数据,但arguments 不可以
    console.log(args) //[4,5,6,10]
}
show(4,5,6)