class ExpPanel {
  constructor() {
    this.domNode = document.querySelector('.expansion-panel__content');
    this.btn = document.querySelector('.expansion-panel__btn');
    this.state = 'none';
  }
  controlExpPanel = () => {
    if (this.state === 'none') {
      this.domNode.style.display = 'block';
      this.state = 'block';
      this.btn.style.transform = 'rotate(270deg)';
    } else {
      this.domNode.style.display = 'none';
      this.state = 'none';
      this.btn.style.transform = 'none';
    }
  }
  initListener = () => {
    this.btn.addEventListener('click', this.controlExpPanel);
  }
}

class Slider {
  constructor() {
    this.slides = document.getElementById('slides');
    this.sliderBtnPrev = document.querySelector('.slider__btn_prev');
    this.sliderBtnNext = document.querySelector('.slider__btn_next');
    this.position = 0;
  }
  prevSlide = () => {
    if (this.position < 0) {
      this.position += 50;
      this.slides.style.transform = `translate3d(${this.position}%, 0, 0)`;
    } else {
      this.position = -50;
      this.slides.style.transform = `translate3d(${this.position}%, 0, 0)`;
    }
  }
  nextSlide = () => {
    if (this.position > -50) {
      this.position += -50;
      this.slides.style.transform = `translate3d(${this.position}%, 0, 0)`;
    } else {
      this.position = 0;
      this.slides.style.transform = `translate3d(${this.position}%, 0, 0)`;
    }
  }
  initListeners = () => {
    this.sliderBtnPrev.addEventListener('click', this.prevSlide);
    this.sliderBtnNext.addEventListener('click', this.nextSlide);
  }
}

class Swiper {
  constructor () {
    this.btn = document.getElementById('swiperBtn');
    this.slides = document.getElementById('swiperSlides');
    this.slidesLength = this.slides.children.length;
    this.counter = 0;
    this.currentSlide = this.slides.children[this.counter];
    this.startPoint = 0;
  }
  checkOpacity = (element) => +getComputedStyle(element).opacity;
  showDescription = () => {
    const currentDesc = this.currentSlide.children[0];
    const currentImg = this.currentSlide.children[1];
    currentImg.style.opacity = this.checkOpacity(currentImg) ? 0 : 1;
    currentDesc.style.opacity = this.checkOpacity(currentDesc) ? 0 : 1;
  }
  changeSlide = () => {
    this.counter += 1
    if(this.counter < this.slidesLength) {
      this.currentSlide.style.display = 'none';
      const nextSlide = this.slides.children[this.counter];
      this.currentSlide = nextSlide;
      this.currentSlide.style.display = 'flex';
    } else {
      this.currentSlide.style.display = 'none';
      this.currentSlide = this.slides.children[0];
      this.currentSlide.style.display = 'flex';
      this.counter = 0;
    }
  }
  swipeStart = (e) => this.startPoint = parseInt(e.changedTouches[0].clientX);
  swipeEnd = (e) => {
    let dist = parseInt(e.changedTouches[0].clientX) - this.startPoint;
    if(dist !== 0) this.changeSlide();
  }
  initListeners = () => {
    this.btn.addEventListener('click', this.showDescription);
    this.slides.addEventListener('touchstart', this.swipeStart);
    this.slides.addEventListener('touchend', this.swipeEnd);
    this.slides.addEventListener('click', (e) => console.log(e.target));
  }
}