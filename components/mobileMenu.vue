<template>
  <div
    :class="{'index-z' : showMenu, 'left-menu-hide':  !showMenu, 'left-menu-show' : showMenu}"
    class="layer shows container-fluid position-fixed"
  >
    <div class="row">
      <div class="material-menu">
        <div
          v-click-outside="hideLeftMenu"
          class="left-menu shows col-md-6 col-sm-7 col-12 d-flex flex-column justify-content-between position-fixed"
        >
          <div class="row align-items-start">
            <img
              @click="hideLeftMenu"
              src="/mobile-closer.svg"
              alt="close"
              class="mob-closer col-2 align-self-start text-center order-2"
            >
            <div class="col-10 order-1">
              <nuxt-link to="/" class="nav-brand">
                <img @click="startPosition" src="/mobile-logo.svg" alt="logo">
              </nuxt-link>
              <ul class="navbar-nav links">
                <li
                  v-for="item of menuItems.pages"
                  :key="item.id"
                  @click="hideLeftMenu"
                  class="nav-item"
                >
                  <nuxt-link
                    v-if="isRus"
                    class="nav-link"
                    :class="{activeClass : $route.name===item.slug}"
                    :to="'/'+item.slug"
                    prefetch
                  >
                    {{item.ru_title}}
                  </nuxt-link>
                  <nuxt-link
                    v-else
                    class="nav-link"
                    :class="{activeClass : $route.name===item.slug}"
                    :to="'/'+item.slug"
                    prefetch
                  >
                    {{item.ua_title}}
                  </nuxt-link>
                </li>
              </ul>
            </div>

          </div>

          <div class="d-flex justify-content-start soc-wrapper">
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
                <a href="https://instagram.com/martova_riverside?igshid=ryb4azq1zx9" target="_blank"
                   class="soc soc-insta">
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

            <div class="tel-wrap">
              <a class="tel" href="tel:+380663628129">
                <i class="fas fa-phone-alt">
                </i>
                +38 (050) 364-0004
              </a>
            </div>
            <div class="lang">
              <a href="#"
                 :class="{underlined: isRus}"
                 @click.prevent="setRuLanguage"
              >рус</a>
              <a href="#"
                 :class="{underlined: isUa}"
                 @click.prevent="setUaLanguage"
              >укр</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import vClickOutside from 'v-click-outside';

    export default {
        components: {
            vClickOutside,
        },
        directives: {
            clickOutside: vClickOutside.directive
        },
        props: {
            showMenu: false
        },
        data: () => ({
            menuItems: [],
            // menuItems: {menu_items: [{ru_name: 'о нас'}, {ru_name: 'продажа участков'}, {ru_name: 'инфраструктура'}, {ru_name: 'галерея'}, {ru_name: 'новости'}, {ru_name: 'контакты'},]},
            activeLang: false
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
            },
            currentSlug() {
                return this.$route
            }
        },
        methods: {
            startPosition() {
                this.$bus.$emit('start');
                this.hideLeftMenu();
            },
            setRuLanguage() {
                this.$store.commit('SET_RUS_LANGUAGE')
            },
            setUaLanguage() {
                this.$store.commit('SET_UA_LANGUAGE')
            },
            hideLeftMenu() {
                this.$emit('hideLeftMenu');
            }
        },
        async beforeCreate() {
            this.menuItems = await this.$axios.$get(`pages`);
        },
        watch: {
            currentSlug: function (val) {
                if (val.path === '/' || val.path === '/About' || val.path === '/Contacts' || val.path === '/Gallery' || val.path === '/Infrastructure' || val.path === '/News' || val.path === '/Sales') {
                    this.$router.push(val.path)
                } else {
                    let c = this.menuItems.pages.find(a => a.slug.toLowerCase() === val.path.toLowerCase().slice(1));
                    setTimeout(() => {
                        this.$store.commit('SET_DYNAMIC_PAGE_RU', c.ru_content);
                        this.$store.commit('SET_DYNAMIC_PAGE_UA', c.ua_content);
                        this.$store.commit('SET_SLUG', c.slug);
                        this.$router.push('/Dynamic')
                    }, 100)

                }
            }
        },
    }
</script>

<style scoped lang="scss">
  .underlined {
    text-decoration: underline !important;
  }

  .layer {
    background-color: rgba(0, 0, 0, 0);
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -2;
    display: block;
    opacity: 1;
    height: 100vh;

    .left-menu {
      height: 100vh;
      color: white;
      text-decoration: none;
      font-size: 32px;
      position: fixed;
      z-index: 200;
      padding: 20px;
      padding-bottom: 120px;
      background-color: rgba(30, 30, 30, 0.6);
    }
  }

  .row.soc > .col-3 > a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .soc-title {
    font-size: 18px;
  }

  .left-menu .soc a {
    display: block;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #fff;
    font-weight: 400;
  }

  .left-menu .soc a:first-child {
    margin-left: 0;
    text-align: center;
  }

  .left-menu .soc a i {
    color: #483e72;
    font-size: 18px;
  }

  .left-menu .soc a:hover {
    text-decoration: none;
  }

  .left-menu ul li a {
    color: white;
  }

  .left-menu .mob-closer {
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
  }

  .material-menu {
    background-color: rgba(30, 30, 30, 0.6);
  }

  .nav-link {
    font-family: "Open Sans", sans-serif;
    text-transform: uppercase;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 23px;
    color: #FFFFFF;
    padding: 0;
    transition: 1.5s ease-in-out;
  }

  .nav-brand {
    display: flex;
  }

  .links {
    margin-top: 40px;

    li {
      display: block;
      height: 43px;
    }
  }

  @media screen and (max-height: 591px) {
    .left-menu {
      overflow-y: scroll;
    }
  }

  /*navbar-styles*/
  .soc-wrapper {
    ul {
      list-style: none;
      margin-bottom: 0;
      height: 31px;

      .nav-item {
        color: rgba(255, 255, 255, 1);
        position: relative;
        display: block;
        padding: 10px;

        &:last-child {
          padding-right: 0 !important;
        }

        &:first-child {
          border-right: 1px solid white;
        }

        .nav-link {
          padding: 10px;
          font-size: 14px;
          text-transform: uppercase;
          border-bottom: 0.104vw solid transparent;
          transition: .7s ease-in-out;

          &:hover {
            border-bottom: 1px solid white;
            transition: .7s ease-in-out;
          }
        }
      }

      li {
        text-transform: uppercase;
        line-height: 10px;

        .soc {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          width: 21px;
          height: 21px;
          border-radius: 50%;
          text-decoration: none;
          color: white;
          margin-right: 15px;
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

    .soc-group {
      border-right: 1px solid white;

      li {
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

    .tel-wrap {
      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      text-transform: uppercase;
      color: #FFFFFF;
      display: flex;
      height: 31px;
      align-items: center;
      padding-left: 15px;

      .tel {
        color: #FFFFFF;

        i {
          font-size: 15px;
          margin-right: 9px;
        }

        &:hover {
          color: #226ACE;
          transition: 1s ease-in-out;
        }
      }

    }

    .lang {
      margin-left: 25px;
      height: 31px;
      display: flex;
      align-items: center;

      a {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        text-decoration: none;
        text-transform: uppercase;
        color: white;

        &:first-child {
          margin-right: 8px;
        }

        &:hover {
          text-decoration: underline;
          transition: 1s ease-in-out;
        }
      }
    }
  }

  .activeClass {
    color: red !important;
    transition: 1s ease-in-out;
  }

  .index-z {
    z-index: 9002;
  }

  .active-lang {
    text-decoration: underline;
    transition: 1s ease-in-out;
  }

  .left-menu-show {
    display: block;
    left: 0;
    transition: .5s ease-in-out;
  }

  .left-menu-hide {
    left: -1000px;
    transition: .5s ease-in-out;
  }
</style>
