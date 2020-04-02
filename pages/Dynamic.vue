<template>
  <main style="height: 100vh;">
<!--    <section v-if="isRus" v-html="dynamicPageRu"></section>-->
<!--    <section v-if="isUa" v-html="dynamicPageUa"></section>-->
    <iframe :src="`https://api.martovariverside.com/display-custom-page?slug=${this.slug}&lang=${this.language}`" id="ifr" frameborder="0"></iframe>
  </main>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Dynamic",
        computed: {
            ...mapGetters([
                'dynamicPageRu',
                'dynamicPageUa',
                'language',
                'slug'
            ]),
            isRus() {
                return this.language === 'ru'
            },
            isUa() {
                return this.language === 'ua'
            }
        },
    }
</script>

<style scoped lang="scss">
#ifr{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
