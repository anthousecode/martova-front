<template>
  <div v-if="news" class="news-wrapper d-flex">
    <img v-if="getWindowWidth<=1281" class="bg" src="/news/1280News.png" alt="big">
    <img v-else-if="getWindowWidth>1280 && getWindowWidth<1681" class="bg"
         id="bg" src="/news/1680News.png" alt="big">
    <img v-else-if="(getWindowWidth>1681 && getWindowWidth<1921)&& getWindowHeight<1090" class="bg"
         src="/news/1920News.jpg" alt="big">
    <img v-else-if="(getWindowWidth>1681 && getWindowWidth<1921) && getWindowHeight>1091" class="bg"
         src="/news/19201News.jpg" alt="big">
    <img v-else-if="getWindowWidth>=1921 && getWindowWidth<2800" class="bg"
         src="/news/2048News.png" alt="big">
    <img v-else class="bg" src="/news/4kNews.png" alt="big">
    <main class="news pb-1">
      <div
        v-for="item of news"
        :key="item.id"
        class="news-item p-3 pb-2 mt-3">
        <div class="news-item__header">
          <h3>{{language==='ru' ? item.ru_name : item.ua_name}}</h3>
          <p class="date mb-2">{{item.updated_at}}</p>
        </div>
        <div class="news-item__body">
          <div class="img-container">
            <img src="/cort.jpg" alt="news">
          </div>
          <div class="likes-container d-flex justify-content-between pt-2 pb-3">
            <div class="likes d-flex align-items-center">
              <img src="/colorLike.svg" alt="">
              <span class="ml-1"> {{item.likes_count}}</span>
            </div>
            <span ref="comments" style="cursor: pointer;" @click="showAllComment(item.id)">
              {{$options.filters.toUSD(language, 'Комментарии')}}: {{item.comments_count}}
            </span>
          </div>
          <template v-if="item.ru_description || item.ua_description">
            <div
              v-if="isMore && showMoreId===item.id"
              @click="getCutNews(item)"
              v-html="fulledText(item)"
              class="more-news text mb-2"
            >
            </div>
            <div
              v-else
              @click="getFullNews(item)"
              v-html="cuttedText(item)"
              class="text mb-2"
            >
            </div>
          </template>
        </div>
        <div class="news-item__footer likes-container d-flex justify-content-between py-2">

          <v-popover v-if="!isShowModal">
            <div @click="addLike(item.id)" tooltip-target
                 class="likes likes__hover likes-white d-flex align-items-center">
              <img class="like" style="font-size: 32px; width: 18px; height: 18px;" src="/like.svg" alt="like">
              <span class="ml-1 caps">{{$options.filters.toUSD(language, 'Нравится')}}</span>
            </div>
            <template v-if="!isCookie" slot="popover" style="background: rgba(0, 0, 0, 0.6)">
              <p class="mt-2 mb-0 sign text-black-50">
                {{ $options.filters.toUSD(language, 'Войти с помощью') }}:
              </p>
              <social @emitOpenFormModal="showModal('like', item.id)"/>
            </template>
          </v-popover>


          <v-popover v-if="!isShowModal">
            <div @click="showCommentField(item.id)"
                 tooltip-target style="width: 200px;"
                 class="likes likes__hover d-flex align-items-center justify-content-end">
              <img style="width: 18px; height: 18px;" src="/comment11.svg" alt="search">
              <span class="ml-2 caps"> {{$options.filters.toUSD(language, 'Комментировать')}}</span>
            </div>
            <template v-if="!isCookie" slot="popover" style="background: rgba(0, 0, 0, 0.6)">
              <p class="mt-2 mb-0 sign text-black-50">
                {{ $options.filters.toUSD(language, 'Войти с помощью') }}:
              </p>
              <social @emitOpenFormModal="showModal('comment', item.id)"/>
            </template>
          </v-popover>

        </div>
        <transition name="fade">
          <comment
            v-if="isShowComment && currentPost==item.id"
            :isShowComment="isShowComment"
            key="container">
          </comment>
        </transition>
        <transition name="fade">
          <addComment
            v-if="showCommentInput && currentPost==item.id"
            @addComment="addComment"
            @emitToImageSave="imageSave"
            :id="item.id"
          >
          </addComment>
        </transition>
      </div>
    </main>
    <div
      v-if="isShowModal"
      class="layer
      d-flex
      justify-content-center
      align-items-center"
    >
      <login
        v-if="isLogin"
        :target="target"
        :id="currentId"
        @addLike="addLike(currentId)"
        @addComment="showCommentField(currentId)"
        @loginFalse="isLogin=false"
        @closeModal="closeModal"
      />
      <registration
        v-else
        :target="target"
        :id="currentId"
        @addLike="addLike(currentId)"
        @addComment="showCommentField(currentId)"
        @showLogin="showLogin"
        @closeModal="closeModal"
      />
    </div>
    <!--    <button @click="AuthProvider('github')">auth Github</button>-->

  </div>
</template>

<script>
    import {VTooltip, VPopover, VClosePopover} from 'v-tooltip';
    import social from '../components/social';
    import login from '../components/Login';
    import registration from '../components/Registration';
    import addComment from "../components/addComment";
    import {mapGetters} from 'vuex';
    import localizeFilter from "../plugins/locales/localize.filter";
    import comment from "../components/comment";

    // import VueSocialauth from 'vue-social-auth'

    export default {
        name: "News",
        components: {
            VPopover,
            social,
            login,
            registration,
            addComment,
            comment
        },
        data: () => ({
            myHtml: null,
            isShowComment: false,
            isShowModal: false,
            isLogin: false,
            isMore: false,
            showMoreId: null,
            target: '',
            file:null,
            currentId: null,
            comments_count: 7,
            likes: 185,
            news: null,
            showCommentInput: false,
            tok: '',
            isCookie: false
        }),
        asyncData({$axios}) {
            return $axios.get(`news`)
                .then((res) => {
                    return {news: res.data.data}
                }).catch((e) => {
                    console.log(e)
                })
        },
        computed: {
            getWindowWidth() {
                return window.innerWidth;
            },
            getWindowHeight() {
                return window.innerHeight;
            },
            currentPost() {
                return this.$store.getters.postId
            },
            ...mapGetters([
                'language'
            ])
        },
        methods: {
            showAllComment(id) {
                this.$store.commit('SET_POST_ID', id);
                this.isShowComment = !this.isShowComment;
                this.showCommentField(id);
            },
            showAll(id) {
                this.$store.commit('SET_POST_ID', id);
                this.isShowComment = true;
                this.showCommentField(id);
            },
            showCommentField(id) {
                this.$store.commit('SET_POST_ID', id)
                if (this.isCookie) {
                    this.showCommentInput = true;
                }
            },
            closeModal() {
                this.isShowModal = false;
            },
            showModal(target, id) {
                this.target = target;
                this.isShowModal = true;
                this.$store.commit('SET_POST_ID', id);
            },
            showLogin() {
                this.isLogin = true;
            },
            getCutNews(val) {
                this.showMoreId = val.id;
                this.isMore = false;
            },
            getNews() {
                this.$axios.get(`news`)
                    .then((res) => {
                        this.news = res.data.data;
                    }).catch((e) => {
                    this.$notify({
                        group: 'top',
                        type: 'error',
                        title: `Ошибка`,
                        text: e
                    })
                })
            },
            cuttedText(val) {
                this.language === 'ru' ? (val = val.ru_description) : (val = val.ua_description);
                if (val.length > 250) {
                    return val.slice(0, 250) + '...' + `<a class="moreLink">${this.$options.filters.toUSD(this.language, 'ещё')}</a>`;
                } else {
                    return val + '...' + '<a class="moreLink">Еще</a>';
                }
            },
            fulledText(val) {
                this.language === 'ru' ? (val = val.ru_description) : (val = val.ua_description);
                return val + `<a class="moreLink">${this.$options.filters.toUSD(this.language, 'Скрыть')}</a>`;
            },
            getFullNews(val) {
                this.isMore = true;
                this.showMoreId = val.id;
                this.language === 'ru' ? (val = val.ru_description) : (val = val.ua_description);
            },
            addLike(id) {
                this.currentId = id;
                if (this.isCookie) {
                    this.$axios.$put(`news_like/${this.currentId}`, {
                        token: this.tok,
                        withCredentials: true,
                        headers: {
                            Cookie: `token=${this.tok}`
                        }
                    }).then(() => {
                        this.getNews();
                        this.$notify({
                            group: 'top',
                            type: 'success',
                            title: '',
                            text: `+1 лайк`
                        })
                    }).catch((e) => {
                        this.$notify({
                            group: 'top',
                            type: 'error',
                            title: ``,
                            text: 'Лайк уже поставлен.'
                        })
                    })
                }

            },
            imageSave(image){
                this.file = image;
            },
            updateComments(){
                this.$store.commit('SET_POST_ID', this.currentPost);
                this.isShowComment = true;
                this.getNews();
                this.$bus.$emit('updateChild')
                this.showAll(this.currentPost);
            },
            addComment(data) {
                let form_data = new FormData();
                if (this.isCookie) {
                    if(this.file){
                        form_data.append('image', this.file)
                        form_data.append('text', data)
                        form_data.append('token', this.tok)
                        form_data.append('withCredentials', true)
                        this.$axios.$post(`add_comment/${this.currentPost}`, form_data, {
                            crossdomain: true,
                            mode: 'no-cors',
                            dataType: "json",
                            headers: {
                                Cookie: `token=${this.tok}`
                            }
                        }).then(() => {
                            this.updateComments();
                            this.$notify({
                                group: 'top',
                                type: 'success',
                                title: `Успех`,
                                text: `Данные обновлены!`
                            })
                        }).catch(() => {
                            this.$notify({
                                group: 'top',
                                type: 'error',
                                title: `Ошибка`,
                                text: `Необходимо авторизироваться!`
                            })
                        })
                    }
                    else {
                        this.$axios.$post(`add_comment/${this.currentPost}`, {
                            image:null,
                            text: data,
                            token: this.tok,
                            withCredentials: true,
                            headers: {
                                Cookie: `token=${this.tok}`
                            }
                        }).then(() => {
                            this.updateComments();
                            this.$notify({
                                group: 'top',
                                type: 'success',
                                title: `Успех`,
                                text: `Данные обновлены!`
                            })
                        }).catch(() => {
                            this.$notify({
                                group: 'top',
                                type: 'error',
                                title: `Ошибка`,
                                text: `Необходимо авторизироваться!`
                            })
                        })
                    }
                }
            },
            setCookie(cname, cvalue, exdays) {
                document.cookie = cname + "=" + cvalue + ";";
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";";
            },
            // checkCookie() {
            //     let token = this.getCookie('token');
            //
            //     if (token) {
            //         this.isToken = true;
            //     } else {
            //         this.isToken = false;
            //     }
            // },
            getCookie(cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        console.log(c.substring(name.length, c.length))
                        this.isCookie = true;
                        this.tok = c.substring(name.length, c.length);
                    } else {
                        this.isCookie = false;
                    }
                }
                return "";
            }
        },
        mounted() {
            if (process.client) {
              let tok = this.$route.query.key;
              if (tok) {
                  this.setCookie("token", this.$route.query.key, 2)
                  this.$router.push(this.$route.path)
              }
              this.getCookie('token')
          }
        }
    }
</script>

<style scoped lang="scss">
  .layer {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1500;
  }

  .sign {
    color: black;
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: normal;
  }

  .news-wrapper {
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    position: relative;
    overflow: hidden;

    .bg {
      /*width: 100vw;*/
      /*height: 100vh;*/
    }

    /*background: url("/Новости.png") no-repeat;*/
    /*background-size: cover;*/
    #bg {
      display: block;
      /*width: 100vw;*/
      /*height: 100vh;*/
      object-fit: none;
    }

    .news {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      top: 6.04vw;
      position: absolute;
      width: 919px;
      overflow-y: auto;
      @media screen and (max-width: 1281px) {
        top: 77.3px;
      }
      @media screen and (min-width: 1281px) and (max-width: 1899px) {
        top: 96.7px;
      }
      @media screen and (min-width: 1899px) and (max-width: 2047px) {
        top: 116px;
      }
      @media screen and (min-width: 2047px) {
        top: 122px;
      }
      @media screen and (min-width: 2200px) {
        top: 214px;
      }
      @media screen and (width: 2560px) {
        top: 138px;
      }

      .news-item {
        width: 100%;
        background-color: #fff;

        &:first-child {
          margin-top: 0 !important;
        }

        &:last-child {
          margin-bottom: 100px !important;
        }

        .soc-group {
          display: block;
          width: 200px;
          background: red;

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

        &__header {
          h3 {
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 28px;
            line-height: 38px;
            color: #000000;
          }

          .date {
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 25px;
            color: #787878;
          }
        }

        &__body {
          img {
            width: 100%;
          }

          .text {
            text-align: justify;
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: 300;
            font-size: 18px;
            line-height: 30px;
            color: #000000;
            height: auto;
            text-overflow: ellipsis;

            p {
              margin-bottom: 0 !important;
            }
          }
        }

        &__footer {
          border-bottom: 1px solid #C5C5C5;
          border-top: 1px solid #C5C5C5;
        }
      }
    }
  }


  .likes-container {
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    display: flex;
    justify-content: space-between;
    font-weight: normal;
    font-size: 17px;
    line-height: 23px;
    color: #808080;

    .likes {
      width: 25px;
      height: 25px;

      &__hover {
        color: cadetblue;
        cursor: pointer;
        transition: 1s ease;
      }

      .caps {
        font-family: 'Open Sans', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 17px;
        line-height: 23px;
        text-transform: uppercase;
        color: #000000;
      }

      img {
        width: 100%;
        display: block;
        height: 100%;
      }

      .like {
        width: 18px;
        height: 18px;
        display: block;
      }
    }

    .likes-white {
      width: 145px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .iframe {
    width: 400px;
    height: 400px;
    position: fixed;
    top: 0;
    right: 300px;
    background: white;
    z-index: 99999;
    right: 50%;
    left: 50%;
    top: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
  }
</style>

