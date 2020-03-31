<template>
  <section>
    <div :class="{visible: isReady}" class="index-wrapper">
      <div class="position-relative img-container">
        <iframe
          id="frame_id"
          style="width: 100vw !important; height: 100vh !important; z-index: 1; position: relative;"
          src="https://api.martovariverside.com/3d/index.htm"
          frameborder="0"
        >
        </iframe>
        <!--you can add playClick() to img if you need-->
        <img
          v-if="isShowControls"
          src="../static/preload.jpg"
          alt="loading"
          class="preloadImage">
        <template v-if="isShowControls">
        <div  @click="playClick()" class="controls">
          <div class="controls-group">
            <div @click="getPrevSlide" class="controls-arrow controls-arrow__left">
              &#10092;
            </div>
            <div class="rounded-circle" style="padding-left: 0.182vw;">
              360
              <sup>°</sup>
            </div>
            <div @click="getNextSlide" class="controls-arrow controls-arrow__right">
              &#10093;
            </div>
          </div>
          <div class="controls-title">
            3D ТУР
          </div>
        </div>
        <div class="index-title">
          <div v-if="isRus" class="h2"><img src="/h2.svg" alt="h2"></div>
          <div v-else class="h2"><img src="/надпись_укр.svg" alt="h2"></div>
          <div class="h1"><img src="/h1.svg" alt="h1"></div>
        </div>
        </template>
      </div>
    </div>
    <loading :isReady="!isReady" v-if="!isReady"/>
<!--    music-->
    <button v-if="isPlay" class="stopButton" @click="stopClick()">
      <img src="../static/speaker.jpg" alt="vol">
    </button>
    <button v-else class="stopButton mute" @click="playClick()">
      <img src="../static/mute.png" alt="mute">
    </button>
    <audio v-show="false" muted ref="ID" loop>
      <source src="planet.mp3">
      <p>Ваш браузер не поддерживает аудио</p>
    </audio>
    <!--    music end-->
  </section>
</template>
      <!--https://www.youtube.com/watch?v=TZmdPZGAbdU-->
<script>
    import {Pano} from 'vuejs-vr';
    import {mapGetters} from 'vuex';
    import Loading from "../components/loading";

    export default {
        components: {Loading},
        data: () => ({
            urls: [
            //     '/shortMainPhotos/bar_360_проба2-min.jpg',
            //     '/shortMainPhotos/beregovaya_liniya-min.jpg',
            //     '/shortMainPhotos/blokpost_360-min.jpg',
            //     '/shortMainPhotos/detskaya_ploshadka-min.jpg',
            //     '/shortMainPhotos/gidrant_360-min.jpg',
            //     '/shortMainPhotos/ohranyaemaya_teritoria_360-min.jpg',
                '/about/1280About.jpg',
                '/about/1680About.jpg',
                '/about/1920About.jpg',
                '/about/2048About.jpg',
                '/gallery/1280Gallery.jpg',
                '/gallery/1680Gallery.jpg',
                '/gallery/1920Gallery.jpg',
                '/gallery/2048Gallery.jpg',
                '/gallery/4kGallery.jpg',
                '/12801.jpg',
                '/1680.jpg',
                '/16801.jpg',
                '/19201.jpg',
                '/2048.jpg',
                '/pro.jpg',
                '/3600.jpg',
                '/4k.jpg',
                '/news/1280News.png',
                '/news/1680News.png',
                '/news/1920News.jpg',
                '/news/19201News.jpg',
                '/news/2048News.png',
                '/news/4kNews.png'
            //     '/shortMainPhotos/yachtclub_360-min.jpg'
            ],
            img: '/shortMainPhotos/bar_360_проба2-min.jpg',
            index: 0,
            isReady: true,
            isPlay:false,
            isShowControls:true
        }),
        computed: {
            ...mapGetters([
                'language'
            ]),
            isRus() {
                return this.language === 'ru'
            },
            isUa() {
                return this.language === 'ua'
            }
        },
        methods: {
            playClick() {
                this.$refs.ID.play();
                this.$refs.ID.muted=false;
                this.isPlay = true;
                this.isShowControls = false;
            },
            stopClick() {
                setTimeout(()=>{
                    this.isPlay = false;
                    this.$refs.ID.muted=true;
                }, 0)
            },
            readyChange() {
                requestAnimationFrame(() => this.isReady = true)
            },
            setCanvasSize() {
                let canvas = document.getElementsByClassName('panolens-canvas')[0];
                if (canvas) {
                    canvas.setAttribute('width', window.innerWidth);
                    canvas.setAttribute('height', window.innerHeight);
                }
            },
            startPositionSet(){
                this.isShowControls = true;
                this.stopClick();
            },
            getPrevSlide() {
                // this.index > 0 ?
                //     (this.index += -1) :
                //     (this.index += this.urls.length - 1);
                // this.img = this.urls[this.index]
            },
            getNextSlide() {
                // this.index < this.urls.length - 1 ?
                //     (this.index += 1) :
                //     (this.index = 0);
                // this.img = this.urls[this.index]
            },
           async getOne() {
               await this.urls.forEach(a => {
                    try {
                        var imageObject = new Image();
                        imageObject.src = `http://martovariverside.com${a}`;
                    } catch (e) {
                        this.$notify({
                            group: 'top',
                            type: 'error',
                            title: `Ошибка`,
                            text: e
                        })
                    }
                })
               await window.localStorage.setItem('loaded', 'loaded')
            }
        },
        mounted() {
            if (process.client) {
                // this.$axios.get('https://api.martovariverside.com/3d/index.htm')
                // await  this.getOne()
                // await  this.setCanvasSize()
               let loaded = window.localStorage.getItem('loaded');
               if (!loaded){
                   setTimeout(()=> this.getOne(), 4000);
               }
                this.$bus.$on('start', this.startPositionSet);
            }
        },
    }
</script>

<style scoped lang="scss">
  .preloadImage{
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: fixed;
    top: 0; left: 0;
    right: 0; bottom: 0;
    z-index: 2;
  }
  .visible {
    visibility: visible;
  }
  .stopButton{
    display: block;
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: white;
    border-radius: 50%;
    z-index: 2000;
    cursor: pointer;
    padding: 5px;
    border: none;
    outline: none;
    @media screen and (min-width: 2049px){
      width: 80px;
      height: 80px;
      padding: 10px;
    }
    img{
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
    }
  }
  .mute{
    padding: 11px 9px;
    padding-top: 10px;
    @media screen and (min-width: 2049px){
      padding: 22px 18px;
      padding-top: 20px;
    }
  }

  .index-wrapper {
    color: white;
    height: 100vh;
    z-index: 0;
    visibility: hidden;
    position: relative;
    overflow: hidden;

    .index-title {
      position: absolute;
      bottom: 51px;
      left: 81px;
      z-index: 10;
      .h1 {
        width: 45.052vw;
        height: 3.646vw;

        img {
          width: 100%;
          height: 100%;
          display: block;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      }

      .h2 {
        width: 25.302vw;
        height: 4.063vw;
        img {
          width: 100%;
          height: 100%;
          display: block;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      }
    }
  }

  .controls {
    width: 9.271vw;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    .controls-group {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .rounded-circle {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.156vw solid white;
        width: 5.729vw;
        height: 5.729vw;

        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 1.823vw;
        line-height: 3.177vw;
      }
    }

    .controls-title {
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 1.146vw;
      line-height: 1.563vw;
      text-align: center;
      padding-top: 0.365vw;
    }
  }
</style>

