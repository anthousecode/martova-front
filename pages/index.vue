<template>
  <div class="index-wrapper">
    <div class="position-relative img-container">
      <Pano
        style="
           width: 100vw !important;
    height: 100vh !important;
        "
        :source="urls[index]"
      />
      <div class="controls">
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
        <div v-else class="h2"><img  src="/надпись_укр.svg" alt="h2"></div>
        <div class="h1"><img src="/h1.svg" alt="h1"></div>
      </div>
    </div>
  </div>
</template>


<script>
    import {Pano} from 'vuejs-vr'
    import { mapGetters } from 'vuex';

    export default {
        components: {Pano},
        data: () => ({
            urls: [
                '/bar_360_проба2.jpg',
                '/galerie_2.png',
                '/bar_360_проба2.jpg',
                '/galerie_2.png',
            ],
            index: 0,
        }),
        computed: {
            ...mapGetters([
                'language'
            ]),
            isRus(){
                return this.language ==='ru'
            },
            isUa(){
                return this.language ==='ua'
            }
        },
        methods: {
            setCanvasSize() {
                let canvas = document.getElementsByClassName('panolens-canvas')[0];
                canvas.setAttribute('width', window.innerWidth);
                canvas.setAttribute('height', window.innerHeight);
            },
            getPrevSlide() {
                this.index > 0 ?
                    (this.index += -1) :
                    (this.index += this.urls.length - 1);
            },
            getNextSlide() {
                this.index < this.urls.length - 1 ?
                    (this.index += 1) :
                    (this.index = 0);
            }
        },
        mounted() {
            if (process.browser) {
                this.setCanvasSize();
            }
        }
    }
</script>

<style scoped lang="scss">

  .index-wrapper {
    color: white;
    height: 100vh;
    z-index: 0;
    position: relative;
    overflow: hidden;

    .index-title {
      position: absolute;
      bottom: 51px;
      left: 81px;

      .h1 {
        width: 45.052vw;
        height: 3.646vw;

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .h2 {
        width: 25.302vw;
        height: 4.063vw;

        img {
          width: 100%;
          height: 100%;
          display: block;
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
    transform: translate(-50%, -50%);

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

      .controls-arrow {
        cursor: pointer;

        &:hover {
          color: lightseagreen;
          transition: 1s ease-in-outs;
        }
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

