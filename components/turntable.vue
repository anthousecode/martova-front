<template>

    <div  v-if="flag" id="myTurntableWrap" style=" display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 382px;">
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

      <script defer>
          setTimeout(() => {
              $('#myTurntable').turntable();
          }, 2000)
      </script>
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
            flag: false
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
            this.$bus.$on('close', this.changeFlag)
        },
    }
</script>
<style scoped lang="scss">
</style>
