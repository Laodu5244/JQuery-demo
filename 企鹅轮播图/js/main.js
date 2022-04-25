//# 业务逻辑
// 1.图片不断左移
// 2.对应的小圆点颜色变化

//% jquery代码
let num = 1;
let i = 0;
let timer = null;
swiper();
function swiper() {
  // 计时器函数 一秒执行一次
  timer = setInterval(() => {
    //1.图片功能
    num++;
    //设置条件 当num大于6,num=2,来实现无限轮播.
    if (num > 6) {
      // 通过样式赋值,让num6=num1.
      $("#navs").css("left", -600);
      num = 2;
    }
    $("#navs").animate({ left: -num * 600 }, 500);

    // 2.小圆点功能
    i++;
    if (i > 4) { i = 0 };
    $("#bots li").eq(i).addClass("active");
    $("#bots li").eq(i).siblings().removeClass("active");

  }, 1500)
}


//鼠标移入,清除定时器
$(".wrap").mouseover(() => {
  clearInterval(timer);
})
//鼠标移出,开启定时器
$(".wrap").mouseout(() => {
  swiper();
})
