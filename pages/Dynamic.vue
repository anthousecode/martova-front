<template>
  <main>
    <section v-if="isRus" v-html="dynamicPageRu"></section>
    <section v-if="isUa" v-html="dynamicPageUa"></section>
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
                'language'
            ]),
            isRus() {
                return this.language === 'ru'
            },
            isUa() {
                return this.language === 'ua'
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
