<template>
  <div id="myTurntableWrap" style=" display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 382px;">
    <div
      id="myTurntable"
      class="turntable position-relative"
    >
      <ul>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0001.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0002.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0003.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0004.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0005.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0006.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0007.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0008.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0009.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0010.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0011.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0012.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0013.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0014.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0012.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0016.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0017.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0018.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0019.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0020.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0021.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0022.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0023.png"></li>
        <li class="turntable-item" data-img-src="/Turntable/turnImages/70_CShading_LightMix0001.png"></li>
      </ul>
    </div>
    <script defer>
        setTimeout(() => {
            $('#myTurntable').turntable();
        }, 1000)
    </script>
  </div>
</template>

<script>
    export default {
        name: "turn2",
        props: {
            rotateCounter: Number
        },
        data: () => ({}),
        computed: {
            listItems() {
                return Array.from(document.getElementsByClassName('turntable-item'))
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
        }
    }
</script>
<style scoped lang="scss">
  img{
    margin-top: 0;
  }
</style>

