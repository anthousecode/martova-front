<template>
  <div class="ifr">
    <video  ref="myVideo" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="/contact.mp4" type="video/mp4">
    </video>
<!--    <h1>-->
<!--      Contacts-->
<!--    </h1>-->
<!--    <a href="https://www.swarmapp.com" target="_blank">CheckIn</a>-->

<!--  <div style="width: 532px; height: 430px;">-->
<!--    <script defer data-attribute="api-key" id='NJnBDcue59bvoY84AcOMKT5M6djl3nLU7yWs5hn4MyM5puVVoh2EMvm5RBP9gc6bCl9T5L1ohZLvsn5CitZSd5J7FoKZeH3l9uJrH9OplxA9yvWy4MSLS3jUK5Fr3R9weSHXczpor8V9tstoNAWQSzXF8nH9tEge0YOu3xa06i8kOn5oUAdM5vwJDHzTWw8EV3WfShvw' src='https://api2.lid-zayavka.ru/js/pre-widget.js?widget_id=100'></script>-->
<!--  </div>-->

<!--    <div style="width: 532px; height: 430px;">-->
<!--    <script defer data-attribute="api-key" id='NJnBDcue59bvoY84AcOMKT5M6djl3nLU7yWs5hn4MyM5puVVoh2EMvm5RBP9gc6bCl9T5L1ohZLvsn5CitZSd5J7FoKZeH3l9uJrH9OplxA9yvWy4MSLS3jUK5Fr3R9weSHXczpor8V9tstoNAWQSzXF8nH9tEge0YOu3xa06i8kOn5oUAdM5vwJDHzTWw8EV3WfShvw' src='https://api2.lid-zayavka.ru/js/pre-widget.js?widget_id=100'></script>-->
<!--  </div>-->

<!--    <script defer  data-attribute="api-key" data-chat="chat" id='NJnBDcue59bvoY84AcOMKT5M6djl3nLU7yWs5hn4MyM5puVVoh2EMvm5RBP9gc6bCl9T5L1ohZLvsn5CitZSd5J7FoKZeH3l9uJrH9OplxA9yvWy4MSLS3jUK5Fr3R9weSHXczpor8V9tstoNAWQSzXF8nH9tEge0YOu3xa06i8kOn5oUAdM5vwJDHzTWw8EV3WfShvw' src='https://api2.lid-zayavka.ru/js/pre-widget.js?widget_id=99'></script>-->






  </div>
</template>
<script>
    export default {
        name: "Contacts",
        methods: {
            checkIn(){
                window.location = 'swarm://app.com/';
            }
        },
    }
</script>

<style scoped lang="scss">
  .ifr{
    position:relative;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    video{
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
  }
</style>
