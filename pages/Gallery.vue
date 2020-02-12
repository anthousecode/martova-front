<template>
  <div class="container-fluid gallery-wrapper p-0 d-flex">
    <div
      v-if="isCarouselVisible"
      class="modal fade show d-block"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="z-index: 9999;" role="document">
        <div
          class="modal-content position-relative"
        >
          <div
            class="modal-body d-flex justify-content-center align-items-center"
          >
            <carousel
              v-click-outside="hideCarousel"
              :nav="true"
              :dots="false"
              :items=1
              :startPosition="currentSlideIndex"
              :mouseDrag="false"
              :loop="true"
              class="pt-5 mt-2 carousel_unique"
            >
              <template
                style="position: relative">
                <template slot="prev"><span class="prev"></span></template>
                <div
                  v-for="image of images"
                  class="position-relative"
                  :key="image.id"
                >
                  <img :src="image.image" alt="img">
                  <div @click="hideCarousel" class="closer"></div>
                </div>
                <template slot="next"><span class="next"></span></template>
              </template>
            </carousel>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    <img class="gallery-bg" src="/galerie_2.jpg" alt="Галерея">
    <div class="row gallery py-5 px-5">
      <figure
        v-for="(image, i) of images"
        :key="image.id"
        class="col-md-3 mt-3">
        <a
          @click.prevent="showCarousel(i)"
          href="#"
        >
          <img alt="picture" :src="image.image"
               class="img-fluid picture"/>
        </a>
      </figure>
    </div>


  </div>
</template>

<script>
    import vClickOutside from 'v-click-outside';
    import carousel from 'vue-owl-carousel';

    export default {
        name: "Gallery",
        directives: {
            clickOutside: vClickOutside.directive
        },
        components: {carousel},
        data: () => ({
            currentSlideIndex: 0,
            images: [],
            isCarouselVisible: false,
        }),
        asyncData({$axios}) {
            return $axios.get(`/gallery-items`)
                .then((res) => {
                    return {images: res.data.gallery_items}
                }).catch(e => {
                    console.log(e)
                })
        },
        methods: {
            showCarousel(index) {
                this.currentSlideIndex = index;
                this.isCarouselVisible = true;
            },
            hideCarousel() {
                this.isCarouselVisible = false;
            }
        }
    }
</script>

<style scoped lang="scss">
  #exampleModal {
    top: 6.04vw;

    .modal-dialog {
      z-index: 2000;
      height: 100%;
      display: flex;
      width: 100%;
      /*max-width: 800px;*/
      flex-direction: column;
      align-items: flex-start;

      .modal-content {
        height: 80%;
        background: transparent !important;
        border: none;

        .modal-footer {
          border: none;
        }
      }

    }

    &:after {
      content: '';
      display: block;
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 8000;
    }
  }

  .gallery-wrapper {
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    position: relative;
    overflow: hidden;

    .gallery-bg {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }

    .gallery {
      top: 6.04vw;
      padding-bottom: 140px !important;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: auto;

      figure {
        margin-top: 30px;
      }
    }
  }

  .next {
    display: none;
  }

  .picture {
    max-width: 100%;
    height: 260px;
    width: 100%;
  }

</style>
