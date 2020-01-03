<template>
  <div class="index-wrapper">
    <div class="position-relative img-container">
      <Pano
        :source="urls[index]"
      />
      <div class="controls">
        <div class="controls-group">
          <div @click="getPrevSlide" class="controls-arrow controls-arrow__left">
            &#10092;
          </div>
          <div class="rounded-circle pl-1">
            360
            <sup>°</sup>
          </div>
          <div @click="getNextSlide" class="controls-arrow controls-arrow__right">
            &#10093;
          </div>
        </div>
        <div class="controls-title pt-2">
          3D ТУР
        </div>
      </div>
      <div class="index-title">
        <div><img src="/h2.svg" alt="h2"></div>
        <div><img src="/h1.svg" alt="h1"></div>
      </div>
    </div>
  </div>
</template>


<script>
    import {Pano} from 'vuejs-vr'

    export default {
        components: {Pano},
        data: () => ({
            urls: [
                '/bar360.png',
                '/galerie_2.png',
                '/bar360.png',
                '/galerie_2.png',
            ],
            index: 0,
        }),
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
            this.setCanvasSize();
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

      h1 {
        text-transform: uppercase;
      }

      h2 {
        font-family: 'VeraCrouz', sans-serif;
        font-style: italic;
        font-weight: 300;
      }
    }
  }

  .controls {
    width: 178px;
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
        border: 3px solid white;
        width: 110px;
        height: 110px;

        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 35px;
        line-height: 61px;
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
      font-size: 22px;
      line-height: 30px;
      text-align: center;
    }
  }


</style>

<style>
  .panolens-canvas {
    width: 100vw !important;
    height: 100vh !important;
  }
</style>

