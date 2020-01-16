<template>
  <div id="myTurntableWrap" style=" display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 330px;">
    <div
      id="myTurntable"
      class="turntable position-relative"
    >
      <ul>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0001.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0002.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0003.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0004.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0005.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0006.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0007.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0008.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0009.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0010.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0011.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0012.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0013.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0014.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0012.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0016.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0017.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0018.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0019.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0020.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0021.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0022.png"></li>
        <li data-img-src="/Turntable/turnImages/1_CShading_LightMix0001.png"></li>
      </ul>
    </div>
    <script defer>
        setTimeout(() => {
            $('#myTurntable').turntable();
        }, 3000)
    </script>
  </div>
</template>

<script>
    export default {
        name: "turntable"
    }
</script>
