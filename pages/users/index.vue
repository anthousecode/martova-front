<template>
  <section>
    <h1>{{pageTitle}}</h1>
    <ol class="list-group">
      <li v-for="user of users"
          :key="user.id"
          class="list-group-item list-group-item-action"
          @click.prevent="openUser(user)"
          style="cursor:pointer;"
      >
        <a href="#">
        {{user.id}}.  User {{user.name}}
        </a>
      </li>
    </ol>
  </section>
</template>

<script>
    export default {
       async fetch({store}){
         if(store.getters['users/users'].length === 0) {
             await store.dispatch('users/fetch')
         }
       },
        data:()=>({
          pageTitle:'Users page'
        }),
        computed:{
          users(){
             return this.$store.getters['users/users']
          }
        },
        methods: {
            openUser(user) {
                this.$router.push('/users/' + user.id)
            }
        }
    }
</script>
