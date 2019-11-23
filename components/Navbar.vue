<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-2 navbar-custom col">
    <nuxt-link class="navbar-brand" to="/">Nuxt SSR</nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <nuxt-link
            exact
            no-prefetch
            active-class="active"
            class="nav-link"
            to="/"
          >
            Продажа участков
            <span
              class="sr-only">(current)
            </span>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            active-class="active"
            class="nav-link"
            to="/infrastructure">
            Инфраструктура
          </nuxt-link>

        </li> <li class="nav-item">
          <nuxt-link
            active-class="active"
            class="nav-link"
            to="/location">
            Расположение
          </nuxt-link>

        </li>
        <li class="nav-item">
          <nuxt-link
            active-class="active"
            class="nav-link"
            to="/gallery">
            Галерея
          </nuxt-link>

        </li>
        <li class="nav-item">
          <nuxt-link
            active-class="active"
            class="nav-link"
            to="/contacts">
            Контакты
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link
            active-class="active"
            class="nav-link"
            to="/news">
            Новости
          </nuxt-link>
        </li>
        <li
          v-if="!hasToken"
          class="nav-item">
          <nuxt-link
            active-class="active"
            class="nav-link"
            to="/login">
            login
          </nuxt-link>
        </li>
        <li class="nav-item" v-else>
          <a
            @click.prevent="logout"
            active-class="active"
            class="nav-link"
            href="#"
           >
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    export default {
        name: "Navbar",
        computed:{
          hasToken(){
              return this.$store.getters.hasToken
          }
        },
        methods:{
            logout(){
                this.$store.dispatch('logout');
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped lang="scss">
 .navbar-custom{
   z-index: 1;
   opacity: .8;
   background-color: black;
   color:white;
   position: fixed;
   top: 0;
 }
</style>
