<template>
    <div   id="myTurntableWrap" style=" display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 382px;">

      <template v-if="isImagesLoad&&flag">
      <div
        id="myTurntable"
        class="turntable position-relative"
      >
        <ul>
          <li
            v-for="(img, index) in images"
            :key="index"
            :data-img-src="img"
            class="turntable-item"
          >
          </li>
        </ul>
      </div>

      <script async>
          setTimeout(() => {
              $('#myTurntable').turntable();
          }, 1000)

      </script>
      </template>
      <transition name="fade">
      <div v-if="!isImagesLoad" class="turntable position-absolute d-flex justify-content-center align-items-center">
        <img style="display:block; width: 100px; height: 100px;" src="../static/preloaderPassport.gif" alt="Загрузка...">
      </div>
      </transition>
    </div>
</template>

<script>
    import {eventBus} from '../plugins/eventBus'
    import $ from 'jquery';

    export default {
        name: "turntable",
        props: {
            rotateCounter: Number,
        },
        data: () => ({
            images: [],
            flag: true,
            isImagesLoad: false
        }),
        computed: {
            listItems() {
                return Array.from(document.getElementsByClassName('turntable-item'))
            },
        },
        methods: {
            reload(val) {
                this.images = val;
                this.flag = true;
            },
            changeFlag() {
                this.flag = false;
            }
        },
        watch: {
            rotateCounter: function (val) {
                if (val < 0) {
                    this.$emit('setLastIndexToCounter', this.listItems.length)
                }
                if (val >= (this.listItems.length)) {
                    this.$emit('setZeroIndexToCounter')
                }
                this.listItems.forEach((item, i) => {
                    if (val === i) {
                        item.classList.add('active')
                    } else {
                        item.classList.remove('active');
                    }
                })
            },
        },
        mounted() {
            this.$bus.$on('reload', this.reload)
            setTimeout(()=>{
                this.isImagesLoad = true;
            }, 2000)
            // this.$bus.$on('close', this.changeFlag)
        },
    }
</script>
<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
