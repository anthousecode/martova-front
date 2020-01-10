<template>
  <div>
    <div class="layout hide" id="layout">
      <div id="modal" class="hide">
        <div class="d-flex header">
          <div class="header-part header-part__left pl-2">
            <p class="mb-0 pt-2 pb-1" style="color: red">№160</p>
            <hr class="p-0 m-0">
          </div>
          <div class="header-part header-part__right pt-2 pr-3 pb-1 d-flex">
            <a href="#" id="closer"><span style="font-size: 18px">×</span></a>
          </div>
        </div>
        <div class="base">
          <div class="left">
            <div class="text-container">
              <p>Кадастровый номер:</p>
              <p><b>2342342425453464634634</b></p>
            </div>
            <div class="text-container">
              <p> Площадь: 0,555га</p>
            </div>
            <div class="text-container">
              <p> Статус: <b>Продан</b></p>
            </div>

            <div class="img-container">
              <img src="https://kbkgeo.ru/files/plan-uchastka-dlya-obrashcheniya-v-sud.jpg"
                   style="width: 100%;height: 100%;"
                   alt="участок">
            </div>
          </div>
          <div class="right">
            3D план
            <div class="img-container">
              <a class="linkD" id="linkD" href="#">
                <img
                  src="https://www.gwd.ru/upload/resize_cache/iblock/d79/300_200_1/d798f3a72cca1a5dbcb48a8462203422.png"
                  style="width: 100%;height: 100%;"
                  alt="участок">
              </a>

            </div>
          </div>
        </div>
        <div class="sec" id="sec">
          <a href="#">кадастровый план (обменный файл xml )</a>
          <a href="#">геодезическая съемка участка (pdf/ dwg)</a>
        </div>
      </div>
      <a href="#" class="hide" id="closer1"><span style="font-size: 18px">×</span></a>
    </div>


    <!--New  -->

    <div class="wrapper min-container">
      <img class="big-img min-container" id="bigImg" src="/images/big_new_2.jpg" alt="big">
      <div class="item">
        <div class="wrapper-content-svg">
          <img src="/images/small_new_2.jpg" id="mapImg" alt="current">
          <div id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Sales"
    }
</script>

<style scoped>
  body {
    overflow: auto;
  }

  .wrapper {
    display: -ms-grid;
    display: grid;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .min-container {
    min-width: 1277px;
    min-height: 660px;
  }

  @media screen and (max-width: 1320px) {
    .wrapper {
      min-width: 1277px;
      min-height: 660px;
    }

    .big-img {
      min-width: 1277px;
      min-height: 660px;
    }
  }

  .big-img {
    -o-object-fit: none;
    object-fit: none;
    display: block;
    position: relative;
    z-index: 1;
  }

  .item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: -ms-grid;
    display: grid;
  }

  .wrapper-content-svg {
    display: -ms-grid;
    display: grid;
    height: 100vh;
  }

  .item img {
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
    -ms-grid-column-align: center;
    justify-self: center;
    display: block;
    width: 1277px;
    height: 660px;
    position: relative;
    z-index: 10;
    opacity: 0;
  }


  /* new */


  body, html, * {
    padding: 0;
    margin: 0;
    /*width: 100%;*/
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .btn-group {
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }

  iframe {
    width: 100%;
    height: 100vh;
    padding: 50px;
  }

  .linkD {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .linkD:after {
    content: '';
    display: none;
    background-color: yellow;
    opacity: .6;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .linkD:hover:after {
    display: block;
    -webkit-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
    color: darkred;
    -webkit-transition: 1s ease;
    -o-transition: 1s ease;
    transition: 1s ease;
  }

  #closer {
    display: block;
    width: 30px;
    height: 30px;
  }

  .layout {
    position: fixed;
    top: 0;
    left: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 900;
  }

  #modal {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    width: 300px;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f1e767', endColorstr='#feb645', GradientType=1);
  }

  .viewport-wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 100vh;

  }

  #container {
    position: relative;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  #map {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-size: cover !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .viewport-map {
    padding-top: 56%;
    height: 0;
  }

  #map svg {
    -o-object-fit: contain;
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    /*width: auto;*/
    height: auto;
    z-index: 999;
  }

  polygon {
    opacity: .6;
    /*fill:black;*/
    /*stroke:blue;*/
    stroke-width: 2;
    cursor: pointer;
    position: relative;
  }

  polygon:hover {
    opacity: .4;
    fill: yellow;
    stroke: blue;
    -webkit-transition: .7s ease-in;
    -o-transition: .7s ease-in;
    transition: .7s ease-in;
  }


  .hide {
    display: none !important;
  }

  /*modal*/
  #modal {
    margin-top: -100px;
    margin-right: -100px;
    z-index: 999;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    overflow: hidden;
    border-radius: 10px;
    font-size: 14px;
    -webkit-box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    background: rgba(241, 231, 103, 1);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(241, 231, 103, 1)), color-stop(100%, rgba(254, 182, 69, 1)));
    background: -o-linear-gradient(left, rgba(241, 231, 103, 1) 0%, rgba(254, 182, 69, 1) 100%);
    background: -webkit-gradient(linear, left top, right top, from(rgba(241, 231, 103, 1)), to(rgba(254, 182, 69, 1)));
    background: linear-gradient(to right, rgba(241, 231, 103, 1) 0%, rgba(254, 182, 69, 1) 100%);
  }

  @media screen and (max-width: 768px) {
    #modal {
      left: 0 !important;
    }
  }

  .base {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: auto;
  }

  .sec {
    padding: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

  }

  .sec a {
    padding: 10px;
    text-decoration: none;
  }

  .sec a:hover {
    color: darkred;
  }

  .text-container {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .left, .right {
    width: 50%;
    padding: 10px;
  }

  .right {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }

  .img-container {
    height: 100px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .header-part {
    width: 50%;
  }

  .header-part__right {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    text-align: right;
    font-size: 18px;
  }

  .addBlur {
    -webkit-filter: blur(4px);
    filter: blur(4px);
  }

  .removeBlur {
    -webkit-filter: none;
    filter: none;
  }

  #closer1 {
    position: fixed;
    top: 50px;
    right: 60px;
    z-index: 1600;
    color: black;
    cursor: pointer;
    width: 50px;
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  #closer1:hover {
    color: red;
    -webkit-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;
  }

  .zoom {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    overflow: auto;
  }

  @media screen and (min-width: 1600px ) {
    .zoom {
      -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
      transform: scale(1.2);
      overflow: auto;
    }
  }

  @media screen and (min-width: 1800px ) {
    .zoom {
      -webkit-transform: scale(1.3);
      -ms-transform: scale(1.3);
      transform: scale(1.3);
      overflow: auto;
    }
  }
</style>
