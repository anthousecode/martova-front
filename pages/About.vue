<template>
  <div class="about-wrapper d-flex">
    <img class="about-bg" src="/О_нас.png" alt="">
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
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style scoped lang="scss">
  .about-wrapper {
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    position: relative;
    overflow: hidden;

    .about-bg {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }

    .about {
      margin-top: 116px;
      position: relative;
      width: 100%;

      .about-modal {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 1.5px;
        line-height: 38px;
        flex-direction: column;
        background: #ffffff;
        color: black;
        display: block;
        width: 47.87vw;
        height: 44.17vw;
        min-width: 919px;
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




