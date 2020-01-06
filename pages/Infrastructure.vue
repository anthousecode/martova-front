<template>
  <div class="infra-wrapper d-flex">
    <video ref="myVideo" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4">
    </video>
    <main class="infra d-flex justify-content-center">
      <section>
<!--        <button v-if="!isVideoPlaying" @click="changeVideoPlay" id="play">-->
<!--          <img src="/play.svg" alt="play">-->
<!--        </button>-->
      </section>
      <aside class="d-flex flex-column p-4 pb-5">
          <div class="mt-0">
            <div class="text-wrap d-flex">
              <img src="/security.svg" alt="security">
              <span class="ml-2">Безопасность</span>
            </div>
            <ul>
              <li>1. Полностью закрытая, охраняемая территория поселка.
              </li>
              <li>2. Централизованная пропускная система.
              </li>
              <li>3. Опорный пункт ГСО.
              </li>
              <li>4. Центральная автономная система пожаротушения.</li>
            </ul>
          </div>
          <div class="mt-3">
            <div class="text-wrap d-flex">
              <img src="/services.svg" alt="services">
              <span class="ml-2">Услуги</span>
            </div>
            <ul>
              <li> 1. Ресторанный клуб для приятного времяпровождения.
              </li>
              <li> 2. Пляжный бар c chill-out lounge зоной.
              </li>
              <li>3. Детский сад с игровой комнатой.
              </li>
              <li>4. Клининговая компания по уборке домовладений.</li>
              <li> 5. Строительная компания с квалифицированными строителями.</li>
            </ul>
          </div>
          <div class="mt-3">
            <div class="text-wrap d-flex">
              <img src="/recreation.svg" alt="recreation">
              <span class="ml-2">Рекреация</span>
            </div>
            <ul>
              <li> 1. Общая пляжная береговая линия
                протяженностью 300м.
              </li>
              <li> 2. Центральный парк площадью более 3га.
              </li>
              <li> 3. Спортивная и детская площадки, пляжный волейбол.
              </li>
              <li> 4. Яхт-клуб с пирсами для швартовки водного транспорта.</li>
              <li> 5. Прогулочная набережная со смотровыми площадками.</li>
            </ul>
          </div>
          <div class="mb-5 pb-5 mt-3">
            <div class="text-wrap d-flex">
              <img src="/communications.svg" alt="communications">
              <span class="ml-2">Коммуникации</span>
            </div>
            <ul>
              <li>1. Трехфазный электрический ввод 10кВт.
              </li>
              <li> 2. Оптоволоконный высокоскоростной интернет.
              </li>
              <li> 3. Газ низкого давления (опционально).
              </li>
            </ul>
          </div>
      </aside>
    </main>
  </div>
</template>

<script>
    export default {
    // /infrastructure-items
        name: "Infrastructure",
        data: () => ({
            isVideoPlaying: false,
        }),
        methods: {
            changeVideoPlay() {
                this.isVideoPlaying = !this.isVideoPlaying;
                this.isVideoPlaying ? this.$refs.myVideo.play() : this.$refs.myVideo.pause();
            },
        }
    }
</script>

<style scoped lang="scss">
  .infra-wrapper {
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    position: relative;
    overflow: hidden;
    .text-wrap{
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 28px;
      line-height: 38px;
      color: #000000;
    }
    video {
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      z-index: 0;
      -ms-transform: translateX(-50%) translateY(-50%);
      -moz-transform: translateX(-50%) translateY(-50%);
      -webkit-transform: translateX(-50%) translateY(-50%);
      transform: translateX(-50%) translateY(-50%);
    }

    .infra {
      top: 116px;
      position: relative;
      width: 100%;
      background: transparent;
      section {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        #play {
          width: 45px;
          height: 50px;
          margin-right: 22.5px;
          margin-bottom: 25px;
          background: none;
          border: none;
          outline: none;

          &:hover {
            transform: scale(1.1);
            transition: 1s ease;
          }
        }
      }

      aside {
        position: relative;
        width: 490px;
        background-color: #fff;
        height: 100%;
        opacity: .8;
        overflow: scroll;
        li{
          font-family: 'Roboto', sans-serif;
          font-style: normal;
          font-weight: 300;
          font-size: 18px;
          line-height: 25px;
          color: #000000;
        }
      }
    }
  }
</style>
