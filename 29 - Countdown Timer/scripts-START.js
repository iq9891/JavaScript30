// 1h for me
(function() {
  var custom = document.querySelector('#custom');
  var minutes = document.querySelector('[name="minutes"]');
  var left = document.querySelector('.display__time-left');
  var end = document.querySelector('.display__end-time');
  var btns = document.querySelectorAll('.timer__button');

  var newSeconds = 0;
  var timer = null;
  /**
   * 补零
   * @param {Number} time 时间
   * @return {String};
   */
  var zeroFill = function(time) {
    return time < 10 ? '0' + time : time.toString();
  };
  /**
   * 求余数
   * @param {Number} time 时间
   * @param {Boolean} zero 是否补零
   * @return {Number|String};
   */
  var remainder = function(time, zero) {
    var newTime = time % 60;
    return zero ? zeroFill(newTime) : newTime;
  };
  /**
   * 除
   * @param {Number} time 时间
   * @param {Boolean} zero 是否补零
   * @return {Number|String};
   */
  var except = function(time, zero) {
    var newTime = Math.floor(time / 60);
    return zero ? zeroFill(newTime) : newTime;
  };
  /**
   * 设置倒计时时间
   * @param {Number} seconds 时间
   * @return undefined;
   */
  var countDown = function(seconds) {
    var time = except(seconds, true) + ':' + remainder(seconds, true);
    left.innerHTML = time;
    document.title = time;
  };
  /**
   * 倒计时定时器自动函数
   */
  var auto = function(){
    if(newSeconds > 0) {
      countDown(--newSeconds);
      timer = setTimeout(auto, 1000);
    } else {
      newSeconds = 0;
    }
  };
  /**
   * 设置倒计时结束时间
   */
  var setEnd = function() {
    var now = new Date();
    var nowSecond = now.getSeconds() + remainder(newSeconds);
    var nowMinute = now.getMinutes() + except(newSeconds) + except(nowSecond);
    var nowHour = now.getHours() + except(nowMinute);
    nowMinute = remainder(nowMinute);
    nowSecond = remainder(nowSecond);
    end.innerHTML = nowHour + ':' + zeroFill(nowMinute) + ':' + zeroFill(nowSecond);
  };
  /**
   * 启动倒计时
   */
  var gogogo = function() {
    // 运行时间定时器，让时间转起来
    countDown(newSeconds);
    clearTimeout(timer);
    timer = setTimeout(auto, 1000);
    // 设定结束时间
    setEnd();
  };
  /**
   * 提交
   * @param {MouseEvent} e Event 对象
   */
  var sub = function(e) {
    // 阻止默认事件，防止跳转提交
    e.preventDefault();
    var value = minutes.value;
    // 检验数字
    if(/\D/g.test(value)) {
      alert('不是数字');
      return;
    }
    newSeconds = value * 60;
    gogogo();
  };
  /**
   * 按钮点击
   */
  var click = function() {
    newSeconds = this.dataset.time;
    gogogo();
  };

  custom.onsubmit = sub;

  btns.forEach(function(btn) {
    btn.onclick = click;
  });
})();
