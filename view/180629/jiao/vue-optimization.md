###目前咱们vue项目优化方法总结

**图片优化**

-	1、根据需要把图片放在咱们的oss上，后台那边尽量让他们把需要的资源图片也上传到oss上。
-	2、本地的小图片可以放在项目里,webpack会在项目打包时做压缩处理（注：需要先把图片压缩后再放在项目的images目录里）
-	3、后期需要注意的是，项目里没有用到的图片尽量不要在项目里放着，记得做优化清理下。
-	4、关于小图标可以用字体，尽量不要用图片资源。
-	5、可以通用的图片就尽量不要再重复上传，先沟通再干活。
-	6、减少图片请求，使用雪碧图。

**页面性能优化**

-	图片或组件懒加载

使用vue-lazyload组件或其他一些组件

vue-lazyload地址： https://www.npmjs.com/package/vue-lazyload

图片懒加载：v-lazy或使用v-lazy-container包含一个图片组

```
// 引入一张图片
<img v-lazy="//domain.com/img1.jpg">
// 引入一组图片
<p v-lazy-container="{ selector: 'img', error: 'xxx.jpg', loading: 'xxx.jpg' }">
 <img src="//domain.com/img1.jpg">
 <img src="//domain.com/img2.jpg">
 <img src="//domain.com/img3.jpg">
</p>
```

组件懒加载

```
Vue.use(VueLazyload, {
 lazyComponent: true
});
<lazy-component>
 <img class="mini-cover" :src="img.src" width="100%" height="400">
</lazy-component>
```

-	减少不必要的依赖包

性能优化是很重要的，特别是对于vue这种首屏加载时间长的。

例如有些项目用到了图表（echarts）,可以选择加载依赖包，不用加载整个echarts库。

-	不发送多个相同的请求

不发送多个相同的请求，在点击触发请求的同时锁定请求，直至给出响应/错误解锁。

-	页面错误处理（404）

1.nginx未匹配到路由走404路由

2.router.beforeEach是否匹配到响应的路由，否则走错误路由。

-	请求接口错误

由于我们的请求是使用axios插件单独写在了一个main.js，可以对其进行响应拦截。一旦失败，或者后台报错，就进行响应的错误处理以及友好提示，也避免了重复的代码，提高可维护性,后期记得把需要单独处理的错误code，也加在main.js里。

**打包优化**

打包 vender 时不打包 vue、vuex、vue-router、axios 等，换用国内的 bootcdn 直接引入到根目录的 index.html 中。

例如：

```
<script src="//cdn.bootcss.com/vue/2.2.5/vue.min.js"></script>
<script src="//cdn.bootcss.com/vue-router/2.3.0/vue-router.min.js"></script>
<script src="//cdn.bootcss.com/vuex/2.2.1/vuex.min.js"></script>
<script src="//cdn.bootcss.com/axios/0.15.3/axios.min.js"></script>
```

在 webpack 里有个 externals，可以忽略不需要打包的库

```
externals: {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios'
}
```

此时的 vender 包会非常小，如果不够小还可以拆分其他的库，此时增加了请求的数量，但是远比加载一个 1.4M 的 bundle 快的多。

**组件优化**

-	组件有明确含义，只处理类似的业务。复用性越高越好，配置性越强越好。

-	自己封装组件还是遵循配置 props 细化的规则。

-	组件分类

---

**分享两本书，百度网盘pdf格式资源**

-	《高性能网站建设指南》

链接: https://pan.baidu.com/s/1lAvfYoiDvFNBG3yN4m4Aew 密码: u488

```
第1章规则1——减少HTTP请求
第2章规则2——实用内容发布网络
第3章规则3——添加Expires头
第4章规则4——压缩组件
第5章规则5——将样式表放在顶部
第6章规则6——将脚本放在底部
第7章规则7——避免CSS表达式
第8章规则8——使用外部和CSS
第9章规则9——减少DNS查找
第10章规则10——精简JavaScript
第11章规则11——避免重定向
第12章规则12——移出重复脚本
第13章规则13——配置ETag
第14章规则14——使AJAX可缓存
```

-	《高性能网站建设进阶指南：WEB开发者性能优化最佳实践》

链接: https://pan.baidu.com/s/1B29JxEw6piItPCKp67Zg-Q 密码: es97
