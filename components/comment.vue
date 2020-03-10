<template>
  <div class="comment-wrap d-flex flex-column-reverse pl-4 py-2">
    <button @click="toggleIsFull" class="btn btn-custom btn-outline-success" v-if="!isFull && this.comments.length > 4">
      {{this.$options.filters.toUSD(language, 'Показать все')}}
    </button>
    <button @click="toggleIsFull" class="btn btn-custom btn-outline-success" v-if="isFull && this.comments.length > 4">
      {{this.$options.filters.toUSD(language, 'Скрыть')}}
    </button>
    <div class="my-2" v-for="item in arrayToShow" :key="item.id">
      <div class="comment">
        <div class="d-flex">
          <p style="color:#0069d9; white-space: nowrap;" class="mr-2">{{item.author.name}}:</p>
          <p>{{item.text}}</p>
        </div>
        <img
          v-if="item.image && item.image_type==='img'"
          class="img"
          :src="item.image"
          alt="image">
        <video
          v-if="item.image && item.image_type==='video'"
          :src="item.image"
          controls
          class="img"
        ></video>
      </div>
      <div>
        <small class="pl-4">{{transformDate(item.created_at)[0]}}</small>
        <small class="pl-4">{{transformDate(item.created_at)[1].split('.')[0]}}</small>
      </div>
    </div>

  </div>
</template>

<script>
    import localizeFilter from "../plugins/locales/localize.filter";
    import {mapGetters} from 'vuex';

    export default {
        name: "comment",
        props: {
            id: Number,
            isShowComment: Boolean
        },
        data: () => ({
            comments: [],
            cutComment: [],
            isFull: false
        }),
        computed: {
            currentPost() {
                return this.$store.getters.postId
            },
            arrayToShow() {
                return this.isFull ? this.comments : this.cutComment;
            },
            ...mapGetters([
                'language'
            ])
        },
        methods: {
            getComment() {
                this.$axios.get(`news_comments/${this.currentPost}`).then((res) => {
                    this.comments = res.data.data;
                    // Ternarnik
                    this.comments.length < 4
                        ?
                        (this.cutComment = this.comments)
                        :
                        (this.cutComment = this.comments.slice(this.comments.length - 3, this.comments.length));
                    // Ternarnik end
                })
            },
            toggleIsFull() {
                this.isFull = !this.isFull;
            },
            transformDate(someDate) {
                return someDate.split('T')
            }
        },
        mounted() {
            this.$bus.$on('updateChild', this.getComment)
            if(this.isShowComment){
                this.getComment();
            }
        }
    }
</script>

<style scoped lang="scss">
  video{
    outline: none;
    border: none;
    &:hover{
      outline: none;
      border: none;
    }
  }
  .comment-wrap {
    .btn-custom {
      width: auto;
      margin: auto;
      border: none;

    }

    .comment {
      background-color: lightgray;
      padding: 7px 18px;
      border-radius: 30px;
      width: fit-content;
      max-width: 500px;
      min-width: 180px;
      box-sizing: border-box;
      word-break: break-word;

      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      line-height: 20px;
      color: #000000;

      p {
        margin: 0;
      }

      .img {
        width: 100%;
        /*margin: 10px;*/
        margin-bottom: 10px;
        border-radius: 10px;
        max-height: 300px;
        max-width: 400px;
        display: block;
      }
    }

    small {
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 300;
      color: #000000;
    }
  }
</style>
