$(function() {
  game.init($("#container"))
})

let game = {
  gk: [
    // 第一关
    {
      map: [1, 2, 2, 2, 2, 1, 1, 1,
        1, 2, 0, 0, 2, 1, 1, 1,
        1, 2, 0, 0, 2, 2, 2, 2,
        1, 2, 0, 3, 3, 3, 0, 2,
        2, 2, 0, 0, 0, 0, 0, 2,
        2, 0, 0, 0, 2, 2, 2, 2,
        2, 0, 0, 0, 2, 1, 1, 1,
        2, 2, 2, 2, 2, 1, 1, 1
      ],
      box: [
        { x: 5, y: 3 },
        { x: 4, y: 4 },
        { x: 3, y: 4 }
      ],
      person: { x: 6, y: 3 }
    },
    // 第二关
    {
      map: [1, 1, 2, 2, 2, 2, 1, 1,
        1, 1, 2, 3, 3, 2, 1, 1,
        1, 2, 2, 0, 3, 2, 2, 1,
        1, 2, 0, 0, 0, 3, 2, 1,
        2, 2, 0, 0, 0, 0, 2, 2,
        2, 0, 0, 2, 0, 0, 0, 2,
        2, 0, 0, 0, 0, 0, 0, 2,
        2, 2, 2, 2, 2, 2, 2, 2
      ],
      box: [
        { x: 4, y: 3 },
        { x: 3, y: 4 },
        { x: 4, y: 5 },
        { x: 5, y: 5 }
      ],
      person: { x: 3, y: 6 }
    }
  ],
  // 开始执行游戏
  init: function(selector) {
    // 把selector设置成对象的属性
    this.selector = selector;
    // 执行绘制地图
    this.createMap(0);
  },
  // 创建地图
  createMap: function(num) {
    this.selector.empty();
    // document.title = '第' + (num + 1) + '关';
    // 获得地图数据
    this.newMap = this.gk[num];
    // 设置地图宽度
    this.selector.css('width', Math.sqrt(this.newMap.length) * 50);
    // 添加地图元素
    $.each(this.newMap.map, $.proxy(function(index, item) {
      this.selector.append('<div class="pos' + item + '"></div>')
    }, this))
    this.createBox();
    this.createPerson();
  },
  // 创建箱子
  createBox: function() {
    $.each(this.newMap.box, $.proxy(function(index, item) {
      var obox = $('<div class="box"></div>');
      obox.css('left', item.x * 50);
      obox.css('top', item.y * 50);
      this.selector.append(obox);
    }, this));
  },
  // 创建人物
  createPerson: function() {
    let operson = $('<div class="person"></div>');
    operson.css('left', this.newMap.person.x * 50);
    operson.css('top', this.newMap.person.y * 50);
    // 存储当前人物的位置
    operson.data('x', this.newMap.person.x);
    operson.data('y', this.newMap.person.y);

    this.selector.append(operson);
    // 调用人物移动
    this.bindPerson(operson);
  },
  // 人物移动
  bindPerson: function(operson) {
    $(document).keydown($.proxy(function(e) {
      let code = e.keyCode;
      switch (code) {
        case 37:
          operson.css('backgroundPosition', '-150px 0');
          this.moveperson(operson, { x: -1 });
          break;
        case 38:
          operson.css('backgroundPosition', '0 0');
          this.moveperson(operson, { y: -1 });
          break;
        case 39:
          operson.css('backgroundPosition', '-50px 0');
          this.moveperson(operson, { x: 1 });
          break;
        case 40:
          operson.css('backgroundPosition', '-100px 0');
          this.moveperson(operson, { y: 1 });
          break;
      }
    }, this))
  },
  // 移动函数
  moveperson: function(operson, obj) {
    // 移动的方向值
    let xValue = obj.x || 0;
    let yValue = obj.y || 0;

    // 判断走的位置是不是墙
    let wall = this.newMap.map[(operson.data('y') + yValue) * Math.sqrt(this.newMap.map.length) + (operson.data('x') + xValue)];
    if (wall != 2) {
      // 原始位置
      operson.data('x', operson.data('x') + xValue);
      operson.data('y', operson.data('y') + yValue);

      // 位置移动
      operson.css('left', operson.data('x') * 50);
      operson.css('top', operson.data('y') * 50);

      // 箱子移动
      $('.box').each($.proxy(function(index, ele) {
        // 检测箱子和人物碰撞
        let wall = this.newMap.map[(operson.data('y') + yValue) * Math.sqrt(this.newMap.map.length) + (operson.data('x') + xValue)];
        if (this.pz(operson, $(ele)) && wall != 2) {
          $(ele).css('left', (operson.data('x') + xValue) * 50);
          $(ele).css('top', (operson.data('y') + yValue) * 50);

          // 箱子碰到箱子
          $('.box').each($.proxy(function(i, element) {
            if (this.pz($(ele), $(element)) && ele != element) {
              $(ele).css('left', operson.data('x') * 50);
              $(ele).css('top', operson.data('y') * 50);

              operson.data('x', operson.data('x') - xValue);
              operson.data('y', operson.data('y') - yValue);

              operson.css('left', operson.data('x') * 50);
              operson.css('top', operson.data('y') * 50);
            }
          }, this))
        }
        // 让人物回到正确位置
        else if (this.pz(operson, $(ele))) {
          operson.data('x', operson.data('x') - xValue);
          operson.data('y', operson.data('y') - yValue);
          operson.css('left', operson.data('x') * 50);
          operson.css('top', operson.data('y') * 50);
        }
      }, this))
    }
    this.nextshow();
  },
  // 检测碰撞
  pz: function(obj1, obj2) {
    // 人物的位置
    let l1 = obj1.offset().left;
    let r1 = obj1.offset().left + obj1.width();
    let t1 = obj1.offset().top;
    let b1 = obj1.offset().top + obj1.height();

    // 箱子的位置
    let l2 = obj2.offset().left;
    let r2 = obj2.offset().left + obj2.width();
    let t2 = obj2.offset().top;
    let b2 = obj2.offset().top + obj2.height();

    // 判断人物有没有碰到箱子
    if (r1 <= l2 || l1 >= r2 || t1 >= b2 || b1 <= t2) {
      return false;
    } else {
      return true;
    }
  },
  // 进入下一关
  nextshow: function() {
    let isNum = 0;
    $('.box').each($.proxy(function(index, ele) {
      $('.pos3').each($.proxy(function(i, element) {

        if (this.pz($(ele), $(element))) {
          isNum++;
        }
      }, this))
    }, this))
    if (isNum == this.newMap.box.length) {
        this.createMap(1);     
    }
  }
}