<template>
  <main class="p-0 m-0">
    <notifications group="top" position="top"/>
    <Navbar/>
    <div style="width: 100vw;" class="container-fluid">
      <div class="row justify-content-center align-items-center">
        <nuxt/>
      </div>
    </div>
  </main>
</template>
<script>
    import Navbar from '@/components/Navbar'

    export default {
        components: {
            Navbar
        }
    }
</script>
<style scoped lang="scss">
  main {
    font-family: 'Open Sans', sans-serif;
  }
</style>

