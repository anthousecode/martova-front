<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-dark navbar-custom col">
    <nuxt-link to="/" class="navbar-brand logo">
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
      <div class="d-flex justify-content-end soc-wrapper">
        <ul class="d-flex justify-content-end soc-group">
          <li>
            <a
              href="https://www.facebook.com/%D0%9C%D0%B0%D1%80%D1%82%D0%BE%D0%B2%D0%B0-%D0%A0%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B0%D0%B9%D0%B4-115996473285370/?modal=admin_todo_tour"
              target="_blank" class="soc soc-fb">
              <i class="fab fa-facebook-f">
              </i>
            </a>
          </li>
          <li>
            <a href="https://instagram.com/martova_riverside?igshid=ryb4azq1zx9" target="_blank" class="soc soc-insta">
              <i class="fab fa-instagram">
              </i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/" target="_blank" class="soc soc-youtube">
              <i class="fab fa-youtube">
              </i>
            </a>
          </li>
        </ul>

        <div style="height: 1.615vw; padding:0 1.094vw; padding-top: 0.05vw">
          <a class="tel" href="tel:+380663628129">
            <i class="fas fa-phone-alt">
            </i>
            +38 (050) 364-0004
          </a>
        </div>
        <div class="lang">
          <a href="#"
             :class="{underlined: isRus}"
             style="
               margin-right: 0.365vw;
            "
             @click.prevent="setRuLanguage"
          >рус</a>
          <a href="#"
             :class="{underlined: isUa}"
             @click.prevent="setUaLanguage"
          >укр</a>
        </div>
      </div>
      <ul class="navbar-nav ml-auto">
        <li
          v-for="item of menuItems.pages"
          :key="item.id"
          class="nav-item"
        >
          <nuxt-link
            v-if="isRus"
            class="nav-link"
            :class="{activeClass : $route.name===item.slug}"
            :to="'/'+item.slug"
          >
            {{item.ru_title}}
          </nuxt-link>
          <nuxt-link
            v-else
            class="nav-link"
            :class="{activeClass : $route.name===item.slug}"
            :to="'/'+item.slug"
          >
            {{item.ua_title}}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        data: () => ({
            menuItems: [],
            // menuItems: {menu_items: [{ru_name: 'о нас'}, {ru_name: 'продажа участков'}, {ru_name: 'инфраструктура'}, {ru_name: 'галерея'}, {ru_name: 'новости'}, {ru_name: 'контакты'},]},
            activeLang: false,
        }),
        computed: {
            ...mapGetters([
                'language',
                'basePath'
            ]),
            isRus() {
                return this.language === 'ru'
            },
            isUa() {
                return this.language === 'ua'
            }
        },
        methods: {
            setRuLanguage() {
                this.$store.commit('SET_RUS_LANGUAGE')
            },
            setUaLanguage() {
                this.$store.commit('SET_UA_LANGUAGE')
            }
        },
        async beforeCreate() {
            this.menuItems = await this.$axios.$get(`pages`);
        }
    }
</script>

<style scoped lang="scss">
  .underlined {
    text-decoration: underline;
  }

  .navbar-custom {
    z-index: 1000;
    /*height: 6.04vw;*/
    box-sizing: border-box;
    background: rgba(30, 30, 30, 0.6);
    color: white;
    position: fixed;
    padding: 0.625vw 3.125vw;
    top: 0;
    @media screen and (max-width: 1281px) {
      height: 77.3px;
    }
    @media screen and (min-width: 1281px) and (max-width: 1700px) {
      height: 96.7px;
    }
    @media screen and (min-width: 1700px) and (max-width: 2047px) {
      height: 116px;
    }
    @media screen and (min-width: 2047px) {
      height: 122px;
    }
    @media screen and (min-width: 2200px) {
      height: 214px;
    }
    @media screen and (width: 2560px) {
      height: 138px;
    }

    .logo {
      width: 8.54vw;
      height: 8.54vw;
      display: block;
      padding-top: 0.981vw;
      margin-left: -0.781vw;

      &:hover {
        transform: scale(1.07);
        transition: .4s ease-in-out;
      }
    }

    .tel {
      font-family: 'Open Sans', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 1.094vw;
      line-height: 1.51vw;
      text-transform: uppercase;
      color: #FFFFFF;

      i {
        font-size: 0.94vw;
      }

      &:hover {
        color: #226ACE;
        transition: 1s ease-in-out;
      }
    }

    .lang {
      padding-left: 1.615vw;
      padding-top: 0.2vw;

      a {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 0.781vw;
        line-height: 1.042vw;
        text-transform: uppercase;
        color: white;

        &:hover {
          text-decoration: underline;
          transition: 1s ease-in-out;
        }
      }
    }

    .soc-wrapper {
      margin-top: 0.781vw;

      .soc-group {
        border-right: 1px solid white;

        li {
          height: 1.615vw;
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
    }


    ul {
      list-style: none;

      .nav-item {
        color: rgba(255, 255, 255, 1);
        position: relative;
        display: block;
        padding: 0 1.693vw;

        &:last-child {
          padding-right: 0 !important;
        }

        &:first-child {
          border-right: 0.052vw solid white;
        }

        .nav-link {
          padding: 0.260vw 0;
          font-size: 1.094vw;
          text-transform: uppercase;
          border-bottom: 0.104vw solid transparent;
          transition: .7s ease-in-out;

          &:hover {
            border-bottom: 0.104vw solid white;
            transition: .7s ease-in-out;
          }
        }
      }

      li {
        text-transform: uppercase;
        line-height: 0.729vw;

        .soc {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.938vw;
          width: 1.667vw;
          height: 1.667vw;
          border-radius: 50%;
          text-decoration: none;
          color: white;
          margin-right: 1.042vw;
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
    border-bottom: 0.104vw solid white !important;
  }

  .active-lang {
    text-decoration: underline;
    transition: 1s ease-in-out;
  }
</style>
