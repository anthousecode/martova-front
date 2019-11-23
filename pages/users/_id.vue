<template>
  <section>
    <h1>{{user.name}}</h1>
    <hr>
    <p>
      <span class="font-weight-bolder">
        company:
      </span>
      {{user.company.name}}</p>
    <p>
      <span class="font-weight-bolder">
        email:
      </span>
      {{user.email}}</p>
  </section>
</template>

<script>
    export default {
        name: "_id",
        validate({params}) {
            return /^\d+$/.test(params.id)
        },
        async asyncData({$axios, params}) {
            const user = await $axios.$get('https://jsonplaceholder.typicode.com/users/' + params.id);
            return {user}
        },
    }
</script>

<style scoped>

</style>
