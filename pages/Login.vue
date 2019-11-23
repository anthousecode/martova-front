<template>
  <section>
    <div v-if="$route.query.message" class="alert alert-danger mb-3">
        Need login first
    </div>
    <form @submit.prevent="onSubmit()" class="form-signin  m-auto">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control mt-3" placeholder="Password" required>
      <nuxt-link to="/" class="my-3 pl-2 d-block">go home</nuxt-link>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </section>

</template>

<script>
    export default {
        layout:'empty',
        name: "Login",
        methods:{
            onSubmit(){
                this.$store.dispatch('login');
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>
