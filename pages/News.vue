<template>
  <div v-if="news" class="news-wrapper d-flex">
    <img id="bg" src="/Новости.png" alt="news">
    <main class="news pb-1">
      <div
        v-for="item of news"
        :key="item.id"
        class="news-item p-3 pb-2 mt-3">
        <div class="news-item__header">
          <h3>{{item.ru_name}}</h3>
          <p class="date mb-2">{{item.updated_at}}</p>
        </div>
        <div class="news-item__body">
          <div class="img-container">
            <img src="/cort.jpg" alt="news">
          </div>
          <div class="likes-container d-flex justify-content-between pt-2 pb-3">
            <div class="likes d-flex align-items-center">
              <img src="/colorLike.svg" alt="">
              <span class="ml-1"> {{likes}}</span>
            </div>
            <span>
              {{comments}}: {{comments_count}}
            </span>
          </div>
          <div
            v-if="isMore"
            @click="cuttedText(item.ru_description)"
            v-html="fulledText(item.ru_description)"
            class="text mb-2"
          >
          </div>
          <div
            v-else
            @click="getFullNews(item.ru_description)"
            v-html="cuttedText(item.ru_description)"
            class="text mb-2"
          >
          </div>
        </div>
        <div class="news-item__footer likes-container d-flex justify-content-between py-2">

          <v-popover  v-if="!isShowModal">
            <div tooltip-target class="likes likes__hover likes-white d-flex align-items-center">
              <img class="like" style="font-size: 32px; width: 18px; height: 18px;" src="/like.svg" alt="like">
              <span class="ml-1 caps"> {{like}}</span>
            </div>
            <template  slot="popover" style="background: rgba(0, 0, 0, 0.6)">
              <p class="mt-2 mb-0 sign text-black-50">
                {{ msg }}
              </p>
              <social @emitOpenFormModal="showModal('like', item.id)"/>
              <!-- You can put other components too -->
              <!--              <ExampleComponent char="=" />-->
            </template>
          </v-popover>


          <v-popover  v-if="!isShowModal">
            <div tooltip-target style="width: 200px;" class="likes likes__hover d-flex align-items-center justify-content-end">
              <img style="width: 18px; height: 18px;" src="/comment11.svg" alt="search">
              <span class="ml-2 caps"> {{toComment}}</span>
            </div>
            <template  slot="popover" style="background: rgba(0, 0, 0, 0.6)">
              <p class="mt-2 mb-0 sign text-black-50">
                {{ msg }}
              </p>
              <social @emitOpenFormModal="showModal('comment', item.id)"/>
              <!-- You can put other components too -->
              <!--              <ExampleComponent char="=" />-->
            </template>
          </v-popover>

        </div>
        <addComment v-if="showCommentInput && (currentPost==item.id)"></addComment>
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
        @addLike="addLike"
        @addComment="addComment"
        @loginFalse="isLogin=false"
        @closeModal="closeModal"
      />
      <registration
        v-else
        :target="target"
        @addLike="addLike"
        @addComment="addComment"
        @showLogin="showLogin"
        @closeModal="closeModal"
      />
    </div>
  </div>
</template>

<script>
    import {VTooltip, VPopover, VClosePopover} from 'v-tooltip'
    import social from '../components/social'
    import login from '../components/Login'
    import registration from '../components/Registration'
    import addComment from "../components/addComment";

    export default {
        name: "News",
        components: {
            VPopover,
            social,
            login,
            registration,
            addComment
        },
        data: () => ({
            isShowModal: false,
            isLogin:false,
            isMore: false,
            target:'',
            comments_count: 7,
            like: 'НРАВИТСЯ',
            toComment: 'КОММЕНТИРОВАТЬ',
            comments: 'Комментарии',
            likes: 185,
            news: null,
            msg: 'Войти с помощью :',
            showCommentInput:true
        }),
        asyncData({$axios}) {
            return $axios.get(`news`)
                .then((res) => {
                    return {news: res.data.news}
                }).catch((e) => {
                    console.log(e)
                })
        },
        computed: {
            lang() {
                return this.$store.getters.language;
            },
            currentPost(){
               return this.$store.getters.postId
            }
        },
        methods: {
            closeModal() {
                this.isShowModal = false;
            },
            showModal(target, id) {
                this.target = target;
                this.isShowModal = true;
                this.$store.commit('SET_POST_ID', id);
            },
            showLogin(){
              this.isLogin = true;
            },
            cuttedText(val) {
                this.isMore = false;
                if (val.length > 250) {
                    return val.slice(0, 250) + '...' + '<a class="moreLink">Еще</a>';
                } else {
                    return val + '...' + '<a class="moreLink">Еще</a>';
                }
            },
            fulledText(val) {
                return val + '<a class="moreLink">Скрыть</a>';
            },
            getFullNews(val) {
                this.isMore = true;
            },
            addLike(){
                console.log('+1 like')
            },
            addComment(){
                this.showCommentInput = true;
            }
        },
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
      #bg{
        display: block;
        width: 100vw;
        height: 100vh;
      }
    .news {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      top: 6.04vw;
      position: absolute;
      width: 919px;
      overflow-y: auto;

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
      .like{
        width: 18px;
        height: 18px;
        display: block;
      }
    }
    .likes-white{
      width: 145px;
    }
  }
</style>

