// 2h no.1 & no.2

/**
 * 构造函数
 */
function VideoScript() {
  this.getNode();
  this.bindEvent();
}
/**
 * 获取所有元素
 */
VideoScript.prototype.getNode = function() {
  this.video = document.querySelector('.player__video');
  this.fill = document.querySelector('.progress__filled');
  this.btns = document.querySelectorAll('.player__button');
  this.sliders = document.querySelectorAll('.player__slider');
};
/**
 * 绑定事件
 */
VideoScript.prototype.bindEvent = function() {

  var self = this;
  // 添加按钮事件
  this.btns.forEach(function(btn) {
    btn.onclick = function(e) {
      self.btnClick(self, e);
    };
  });
  // 添加进度条事件
  this.sliders.forEach(function(slider) {
    slider.oninput = function(e) {
      self.sliderClick(self, e);
    };
  });
  // 播放时间更新
  this.video.ontimeupdate = function() {
    self.updateProgress();
  };

};
/**
 * 按钮点击事件
 * @param {VideoScript} self VideoScript 对象
 * @param {MouseEvent} e Event 对象
 * @return undefined;
 */
VideoScript.prototype.btnClick = function(self, e) {
  var btnElement = e.target;
  var isSkip = btnElement.dataset.hasOwnProperty('skip');

  if(isSkip) {
    self.video.currentTime += btnElement.dataset.skip - 0;
  } else {
    self.videoStatus(btnElement);
  }
};
/**
 * 进度条改变事件事件
 * @param {VideoScript} self VideoScript 对象
 * @param {MouseEvent} e Event 对象
 * @return undefined;
 */
VideoScript.prototype.sliderClick = function(self, e) {
  var slideElement = e.target;
  self.video[slideElement.name] = slideElement.value;
};
/**
 * 视频播放暂停事件
 * @param {DOMElement} btnElement 播放暂停按钮
 * @return undefined;
 */
VideoScript.prototype.videoStatus = function(btnElement) {
  if(this.video.paused) {
    this.video.play();
    btnElement.innerHTML = '⏸';
  } else {
    this.video.pause();
    btnElement.innerHTML = '▶️';
  }
};
/**
 * 改变视频播放进度的事件
 */
VideoScript.prototype.updateProgress = function() {
  this.fill.style.flexBasis = (this.video.currentTime / this.video.duration).toFixed(2) * 100 + '%';
};

new VideoScript();
