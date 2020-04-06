<template>
  <main class="p-0 m-0">
    <notifications group="top" position="top"/>
    <Navbar key="navbar"/>
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
        },
        data:()=>({
            startPosition: false
        }),
        methods:{
            setStart(){
                this.startPosition = true;
            }
        }
    }
</script>
<style scoped lang="scss">
  main {
    font-family: 'Open Sans', sans-serif;
    @media screen and (width: 375px){
      transform: scale(0.56) rotate(90deg);
    }
  }
</style>

