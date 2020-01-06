<template>
  <div class="container-fluid gallery-wrapper p-0 d-flex">
    <img class="gallery-bg" src="/galerie_2.png" alt="Галерея">
    <div class="row gallery py-5 px-5">
      <figure class="col-md-3 mt-3">
        <a href="https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(40).jpg"
               class="img-fluid"/>
        </a>
      </figure>
    </div>
    <carousel
      style="position: fixed;max-width: 701px; width: auto; height: auto;overflow: hidden;display: flex;justify-content: center; align-items: center;z-index: 999"
      :nav="true"
      :dots="false"
      :items=1
      :mouseDrag="false"
      :loop="true"
    >
      <template slot="prev"><span class="prev">prev</span></template>
      <img src="https://mdbootstrap.com/img/Photos/Vertical/mountain2.jpg">

      <img src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8.png">

      <img src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8.png">

      <img src="https://pbs.twimg.com/profile_images/473506797462896640/_M0JJ0v8.png">
      <template slot="next"><span class="next">next</span></template>
    </carousel>
  </div>
</template>

<script>
    import carousel from 'vue-owl-carousel';

    export default {
        name: "Gallery",
        components: {carousel},
        data: () => ({
            images: [],
        }),
        asyncData({$axios}) {
            return $axios.get(`/gallery-items`)
                .then((res) => {
                    return {images: res.images}
                }).catch(e => {
                    console.log(e)
                })
        }
    }
</script>

<style scoped lang="scss">

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
      top: 116px;
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
</style>
