<template>
    <div class="empty-layout">
      <nuxt/>
    </div>
</template>

<script>
    export default {
        name: "empty"
    }
</script>

<style scoped>
  .empty-layout{
    display: flex;
    justify-content: center;
    padding-top: 5rem;
  }
  form{
    -webkit-box-shadow: 0px 3px 39px -5px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 3px 39px -5px rgba(0,0,0,0.75);
    box-shadow: 0px 3px 39px -5px rgba(0,0,0,0.75);
  }
</style>
