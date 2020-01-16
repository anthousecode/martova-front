<template>
  <section id="sales-wrapper">
    <!--search-->
    <div class="search-bar d-flex justify-content-around align-items-center">
      <button class="">Продан</button>
      <button class="">Зарезервирован</button>
      <button class="">Свободен</button>
      <div>
        <button></button>
        <input type="number" placeholder="№ участка">
      </div>
    </div>
    <!--search-->
    <div class="layout hide" id="layout">
      <div id="modal" class="hide px-4 pt-4 pb-1">
        <div class="d-flex justify-content-between header">
          <div class="header-part header-part__left">
            <p>Паспорт участка № 5304</p>
          </div>
          <div>
            <a href="#" id="closer"><img src="../static/closerModal.svg" alt="close"></a>
          </div>
        </div>
        <hr class="p-0 mt-1">
        <div class="base pt-2 d-flex flex-column">
          <h5>Общая информация</h5>
          <div class="d-flex flex-grow-1">
            <div class="left w-60">
              <div class="d-flex">
                <div>
                  <div class="d-flex"><p class="p-title">Кадастровый номер: </p>
                    <p class="p-description">632446566656:01:009:0329 </p></div>
                  <div class="d-flex"><p class="p-title">Тип собственности: </p>
                    <p class="p-description">Частная собственность</p></div>
                  <div class="d-flex"><p class="p-title">Целевое назначение: </p>
                    <p class="p-description">07.03 - для инд. дачного строительства</p></div>
                  <div class="d-flex"><p class="p-title"> Площадь: </p>
                    <p class="p-description">0,1077 га</p></div>
                  <div class="d-flex"><p class="p-title"> Статус: </p>
                    <p class="p-description">Зарезервирован</p></div>
                  <div class="d-flex"><p class="p-title"> Цена: </p>
                    <p class="p-description">$145 900</p></div>
                </div>
              </div>
              <div class="d-flex mt-3">
                <div class="w-50">
                  <p class="mb-2">Кадастровый план </p>
                  <a href="#" class="plan-img">
                    <img src="../static/bar360.png" alt="plan">
                  </a>
                  <a href="#" class="save-link text-right" style="cursor: pointer">Распечатать</a>
                </div>
                <div class="w-50 pl-4">
                  <p class="mb-2">Геодезическая съемка</p>
                  <div>
                    <a href="#" class="save-link d-flex align-items-center">
                      <img src="../static/dwg.svg" alt="doc">
                      <span>Скачать</span>
                    </a>
                    <a href="#" class="save-link d-flex align-items-center mt-3">
                      <img src="../static/pdf.svg" alt="doc">
                      <span>Скачать</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-40 position-relative">
              <turntable/>
              <div class="model-controls d-flex justify-content-between">
                <div>
                  <img src="/prev.svg" alt="prev">
                </div>
                <div>
                  <img src="/next.svg" alt="next">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  </section>
</template>

<script>
    import turntable from "../components/turntable";
    import $ from 'jquery';

    export default {
        name: "Sales",
        components: {
            turntable
        },
        head: {
            script: [
                {src: 'js/app.js'}
            ]
        },
        mounted() {
            window.onload = () => {
                setTimeout(() => {
                    window.rendererD3.init()
                }, 1000);
            }
        }

    }
</script>

<style scoped lang="scss">
  .search-bar {
    position: fixed;
    bottom: 42px;
    right: 60px;
    background: #000;
    width: 551px;
    height: 42px;
    z-index: 20;
  }

  hr {
    background: #282828;
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
    width: 17px;
    height: 17px;

    &:hover {
      transform: rotate(360deg);
      transition: 1s ease;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
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
    min-height: 444px;
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
    top: 63px;
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
    height: auto;
    z-index: 999;
  }

  polygon {
    opacity: .6;
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
    z-index: 999;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    max-width: 1050px;
    overflow: hidden;
    font-size: 14px;
    -webkit-box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 0px 17px 0px rgba(0, 0, 0, 0.75);
    background: rgba(255, 255, 255, 0.8);
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
    min-height: 353px;
    height: auto;

    h5 {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 27px;
      color: #000000;
    }
  }

  .sec {
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

    p {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 25px;
      line-height: 34px;
      color: #282828;
    }
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

  @media screen and (min-width: 1600px) {
    .zoom {
      -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
      transform: scale(1.2);
      overflow: auto;
    }
  }

  @media screen and (min-width: 1800px) {
    .zoom {
      -webkit-transform: scale(1.3);
      -ms-transform: scale(1.3);
      transform: scale(1.3);
      overflow: auto;
    }
  }

  .plan-img {
    width: 325px;
    height: 233px;
    cursor: default;
    background: grey;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .save-link {
    display: block;
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    text-decoration-line: underline;
    color: #676767;

    img {
      width: 45px;
      height: 45px;
      display: block;
    }
  }

  .p-title {
    width: 184px;
  }

  .model-controls {
    width: 50px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: -4px;

    div {
      width: 15px;
      height: 15px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
</style>
