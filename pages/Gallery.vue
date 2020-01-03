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
      <figure class="col-md-3 mt-3">
        <a href="https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(40).jpg"
               class="img-fluid"/>
        </a>
      </figure>
      <figure class="col-md-3 mt-3">
        <a href="https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(40).jpg"
               class="img-fluid"/>
        </a>
      </figure>
      <figure class="col-md-3 mt-3">
        <a href="https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(40).jpg"
               class="img-fluid"/>
        </a>
      </figure>
      <figure class="col-md-3 mt-3">
        <a href="https://mdbootstrap.com/img/Photos/Lightbox/Original/img%20(40).jpg" data-size="1600x1067">
          <img alt="picture" src="https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(40).jpg"
               class="img-fluid"/>
        </a>
      </figure>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Gallery"
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
