<template>
  <div>
    <div :class="{visible: isReady}"
         class="about-wrapper d-flex">
      <!--    <img class="about-bg" src="/О_нас.png" alt="">-->
      <img v-if="getWindowWidth<=1281" class="bg" src="/about/1280About.jpg" alt="big">
      <img v-else-if="getWindowWidth>1280 && getWindowWidth<1681" class="bg"
           id="bg" src="/about/1680About.jpg" alt="big">
      <img v-else-if="(getWindowWidth>1681 && getWindowWidth<1921)&& getWindowHeight<1090" class="bg"
           src="about/1920About.jpg" alt="big">
      <!--    <img v-else-if="(getWindowWidth>1681 && getWindowWidth<1921) && getWindowHeight>1091" class="bg"-->
      <!--         src="/about/19201About.jpg" alt="big">-->
      <img v-else-if="getWindowWidth>=1921 && getWindowWidth<2800" class="bg"
           src="/about/2048About.jpg" alt="big">
      <!--    <img v-else-if="getWindowWidth===2880" class="bg" src="/news/pro.png" alt="big">-->
      <!--    <img v-else-if="getWindowWidth===3200" class="bg" src="/news/3600.png" alt="big">-->
      <div class="about d-flex justify-content-center">
        <div class="about-modal d-flex p-4 pb-3">
          <h3>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне</h3>
          <div class="text">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem beatae blanditiis, delectus dicta
              distinctio dolorem, doloribus eius error inventore iusto neque nesciunt nulla quaerat recusandae rerum
              soluta temporibus totam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem beatae blanditiis, delectus dicta
              distinctio dolorem, doloribus eius error inventore iusto neque nesciunt nulla quaerat recusandae rerum
              soluta temporibus totam.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem beatae blanditiis, delectus dicta
              distinctio .</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem beatae blanditiis, delectus .</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias autem beatae blanditiis, delectus dicta
              distinctio dolorem, doloribus eius error inventore iusto neque nesciunt nulla quaerat recusandae rerum
              soluta temporibus totam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda commodi
              dignissimos est facere illum tempore. Dolore fuga numquam qui repudiandae? Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Enim iusto officiis quidem? Ab, accusamus amet at aut consectetur debitis
              delectus dolorum esse est laboriosam necessitatibus nemo nobis, officiis perferendis porro quidem. </p>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="!isReady" :isReady="!isReady"/>
  </div>

</template>

<script>
    import Loading from "../components/loading";
    export default {
        name: "About",
        components: {Loading},
        data:()=>({
           isReady:false
        }),
        computed:{
            getWindowWidth() {
                return window.innerWidth;
            },
            getWindowHeight() {
                return window.innerHeight;
            },
        },
        mounted() {
            this.isReady = true;
        }
    }
</script>

<style scoped lang="scss">
  .visible{
    visibility: visible;
  }
  .about-wrapper {
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    position: relative;
    overflow: hidden;
    img{
      position: absolute;
      display: block;
      object-fit: none;
    }

    .about {
      position: relative;
      width: 100%;
      @media screen and (max-width: 1281px){
        margin-top: 77.3px;
      }
      @media screen and (min-width: 1281px) and (max-width: 1899px){
        margin-top: 96.7px;
      }
      @media screen and (min-width: 1899px) and (max-width: 2047px){
        margin-top: 116px;
      }
      @media screen and (min-width: 2047px){
        margin-top: 122px;
      }
      @media screen and (min-width: 2200px){
        margin-top: 214px;
      }
      @media screen and (width: 2560px) {
        margin-top: 138px;
      }

      .about-modal {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        flex-direction: column;
        background: #ffffff;
        color: black;
        display: block;
        width: 47.865vw;
        height: 78.6vh;
        min-height: 848px;
        position: relative;
        z-index: 100;

        .text {
          overflow: auto;
          margin-top: 19px;
          padding: 0;

          p {
            text-align: justify;
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: 300;
            font-size: 18px;
            line-height: 25px;
          }
        }
      }

      @media screen and (max-width: 1900px) {
        .about-modal {
          min-width: 600px;
          min-height: 500px;
        }
      }
      @media screen and (min-width: 1920px) {
        .about-modal {
          h3 {
            font-size: 3rem;
          }

          .text p {
            font-size: 24px;
            line-height: 30px;
          }
        }
      }
    }
  }
</style>




