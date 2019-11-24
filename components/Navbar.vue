<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-2 navbar-custom col">
    <nuxt-link class="navbar-brand" to="/">efwefw</nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li
          v-for="item of menuItems.slice(5)"
          :key="item.id"
          class="nav-item"
        >
          <nuxt-link
            exact
            no-prefetch
            active-class="active"
            class="nav-link py-0"
            to="/"
          >
            {{item.username}}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default{
    data:()=>({
      menuItems:[]
    }),
    async mounted(){
        this.menuItems = await this.$axios.$get(`https://jsonplaceholder.typicode.com/users`)
      }
  }
</script>

<style scoped lang="scss">
  .navbar-custom {
    z-index: 1;
    opacity: .8;
    background-color: black;
    color: white;
    position: fixed;
    top: 0;
    li{
      text-transform: uppercase;
      line-height: 14px;
      &:first-child{
        border-right:1px solid white;
      }
    }
  }
</style>
