[参考文档](http://leafletjs.com/reference-1.2.0.html#icon)
### 1 首先，我们要先自定义一个icon对象

``` js
var CustomerIcon = L.Icon.extend({
    options: {
        iconUrl: CustomerImg
        shadowUrl: CustomerShadowImg,
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
    }
});

```

> CustomerImg 和 CustomerShadowImg 都是  import进来的图片，如果不是使用  es6模块导入的话，也可以是相对路径；

> - Icon 的配置参数

> - iconUrl 自定义图片

> - shadowUrl   自定义阴影图片

> - ** iconAnchor **  主要是这个参数，它表示  图片的那个位置 对着 经纬度点，如果没有这个的话，你会发现 当你点击地图 添加一个marker的时候 ，图片的左上角是点击地图的位置。设置这个属性之后marker的  尖会对着 你点的位置。

> - ** shadowAnchor ** 这个是阴影图片的偏移量，不设置会跟iconAnchor 一致
