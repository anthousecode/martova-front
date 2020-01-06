<template>
  <div v-if="news" class="news-wrapper d-flex">
    <img src="/Новости.png" alt="news">
    <main class="news">
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
          <div class="likes likes__hover d-flex align-items-center">
            <img style="width: 18px; height: 18px;" src="/like.svg" alt="like">
            <span class="ml-1 caps"> {{like}}</span>
          </div>
          <div style="width: 200px;" class="likes likes__hover d-flex align-items-center justify-content-end">
            <img style="width: 18px; height: 18px;" src="/search.svg" alt="search">
            <span class="ml-2 caps"> {{toComment}}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
    export default {
        name: "News",
        data: () => ({
            isMore: false,
            comments_count: 7,
            like: 'НРАВИТСЯ',
            toComment: 'КОММЕНТИРОВАТЬ',
            comments: 'Комментарии',
            likes: 185,
            news: null,
        }),
        asyncData({$axios}) {
            return $axios.get(`news`)
                .then((res) => {
                    return {news: res.data.news}
                }).catch(e => {
                    console.log(e)
                })
        },
        methods: {
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
        },
    }
</script>

<style scoped lang="scss">
  .news-wrapper {
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    position: relative;
    overflow: hidden;

    .news {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      top: 116px;
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
      &__hover{
        color:cadetblue;
        transition: 1s ease;
      }
      .caps {
        font-family: Open Sans;
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
    }
  }
</style>

