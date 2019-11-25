<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-2 navbar-custom col">
    <nuxt-link class="navbar-brand" to="/">efwefw</nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse d-flex flex-column"
      id="navbarSupportedContent"
    >
      <ul class="d-flex justify-content-end col-md-6 soc-group">
        <li><a href="#" class="soc">f</a></li>
        <li><a href="#" class="soc">i</a></li>
        <li><a href="#" class="soc">y</a></li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li
          v-for="item of menuItems.slice(5)"
          :key="item.id"
          class="nav-item"
        >
          <nuxt-link
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
    .soc-group{
      border-right:1px solid white;
    }
    ul{
      list-style:none;
      .nav-item{
        &:first-child{
          border-right:1px solid white;
        }
      }
      li{
        text-transform: uppercase;
        line-height: 14px;
        .soc{
          display: flex;
          align-items:center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius:50%;
          text-decoration: none;
          background-color: #fff;
          margin-right: 20px;
        }
      }
    }
  }
</style>
