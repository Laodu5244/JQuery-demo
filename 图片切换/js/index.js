// 声明五张图片的数组
let imgSrc=[
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg"
]
// button点击事件
 $("button").click(function(){
    //  获取点击第几个按钮的变量
     let index= $(this).index();
    //  绑定按钮和图片,指定图片路径
     $("img").attr("src",imgSrc[index])
     // 给指定元素添加一个类名:active
     $(this).addClass("active");

    //  用siblings()获取同级其他元素
    // 用removeClass("active")清除其他元素的类名达到切换的效果
     $(this).siblings().removeClass("active")
 })