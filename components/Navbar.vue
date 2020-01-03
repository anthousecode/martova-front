<template>
  <nav class="navbar navbar-expand-lg navbar-dark py-2 navbar-custom col">
    <nuxt-link to="/" class="navbar-brand logo pt-4">
      <img src="/logo.svg" alt="logo">
    </nuxt-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse d-flex flex-column align-items-end"
      id="navbarSupportedContent"
    >
      <div class="d-flex justify-content-end pt-3">
        <ul class="d-flex justify-content-end soc-group">
          <li><a href="#" class="soc soc-fb"><i class="fab fa-facebook-f"></i></a></li>
          <li><a href="#" class="soc soc-insta"><i class="fab fa-instagram"></i></a></li>
          <li><a href="#" class="soc soc-youtube"><i class="fab fa-youtube"></i></a></li>
        </ul>

        <div class="px-4" style="height: 31px;">
          <a class="tel" href="tel:+380503640004">
            <i class="fas fa-phone-alt">
              +38 (050) 364-0004
            </i>
          </a>
        </div>

        <div class="lang pt-1  pl-4">
          <a href="#"
             class="mr-2"
             @click.prevent=""
          >рус</a>
          <a href="#"
             @click.prevent=""
          >укр</a>
        </div>
      </div>

      <ul class="navbar-nav ml-auto">
        <li
          v-for="item of menuItems.pages"
          :key="item.id"
          class="nav-item px-3"
        >
          <nuxt-link
            class="nav-link py-2"
            :class="{activeClass : $route.name===item.slug}"
            :to="item.slug"
          >
            {{item.ru_title}}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    name:'Navbar';
    export default {

        data: () => ({
            menuItems: []
            // menuItems: {menu_items: [{ru_name: 'о нас'}, {ru_name: 'продажа участков'}, {ru_name: 'инфраструктура'}, {ru_name: 'галерея'}, {ru_name: 'новости'}, {ru_name: 'контакты'},]}
        }),
        async mounted() {
            this.menuItems = await this.$axios.$get(`pages`)
        }
    }
</script>

<style scoped lang="scss">
  .navbar-custom {
    z-index: 1;
    height: 116px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    position: fixed;
    padding-right: 60px;
    padding-left: 60px;
    top: 0;

    .logo {
      width: 164px;
      height: 164px;
      display: block;
      margin-left: -15px;

      &:hover {
        transform: scale(1.2);
        transition: .4s ease-in-out;
      }
    }

    .tel {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 21px;
      line-height: 29px;
      text-transform: uppercase;
      color: #FFFFFF;

      &:hover {
        color: #226ACE;
        transition: 1s ease-in-out;
      }
    }

    .lang {
      margin-top: 2px;

      a {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 20px;
        text-transform: uppercase;
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
          transition: 1s ease-in-out;
        }
      }
    }

    .soc-group {
      border-right: 1px solid white;

      li {
        height: 31px;
        display: flex;
        align-items: center;

        a {
          &:hover {
            transform: rotateZ(720deg);
            transition: 1s ease-in-out;
          }
        }
      }
    }

    ul {
      list-style: none;

      .nav-item {
        color: rgba(255, 255, 255, 1);
        position: relative;
        display: block;

        &:last-child {
          padding-right: 0 !important;
        }

        &:first-child {
          border-right: 1px solid white;
        }

        .nav-link {
          padding: 0;
          font-size: 21px;
          text-transform: uppercase;
          border-bottom: 2px solid transparent;
          transition: .7s ease-in-out;

          &:hover {
            border-bottom: 2px solid white;
            transition: .7s ease-in-out;
          }
        }
      }

      li {
        text-transform: uppercase;
        line-height: 14px;

        .soc {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          text-decoration: none;
          color: white;
          margin-right: 20px;
        }

        .soc-fb {
          background-color: #226ACE;
        }

        .soc-insta {
          background-color: #26915B;
        }

        .soc-youtube {
          background-color: #E05251;
        }
      }
    }
  }

  .navbar-dark .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 1);
  }

  .activeClass {
    border-bottom: 2px solid white !important;
  }
</style>
