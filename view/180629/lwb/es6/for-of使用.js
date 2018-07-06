/* 
* @for-of 使用
*/
var arr = ['apple', 'banana', 'orange', 'pear']

//for in 数组，json 都可以遍历
for(var i in arr){
    console.log(i)  //i  代表的是数组的索引值
    console.log(arr[i])
}

//在Es6中 for of  只能遍历数组，但不能遍历json , 主要是配合 new Map() 使用
for(var j of arr){
    console.log(j)  //j apple, banana, orange, pear  直接输出值
}

var oMap = new Map()
//oMap.set(name, value);  // 设置map 属性 和 value

oMap.set('a', 'apple')
oMap.set('b', 'banana')

console.log(oMap)

// 删除 delete
// 过去json 删除方式  delete map.a   但在map 不行
// map 删除方式
oMap.delete('a')  // 就可以删除了

//如果获取某个属性 用 get
alert( oMap.get('a'))  //apple
console.log(oMap)

var oMap = new Map();
oMap.set('a','apple');
oMap.set('b','banana');

for(var name of oMap){
    console.log(name)  //a,apple;   b,banana;  并不是单独的值，而是包含属性
}

//应该这样定义
for(var [key,value] of oMap){
    console.log(key, value) // key => [a,b],  value => [apple, banana]
}

// entries() 返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。Map 结构的 Iterator 接口，默认就是调用entries方法。
// keys() 返回一个遍历器对象，用来遍历所有的键名。
// values() 返回一个遍历器对象，用来遍历所有的键值。

for(let name of oMap.entries()){  //oMap.entries() 相当于  oMap
    console.log(name)  //a,apple;   b,banana
}

for(let key of oMap.keys()){
    console.log(key)  //a, b
}

for(let value of oMap.values()){
    console.log(value)  //apple, banana
}


