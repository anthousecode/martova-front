<template>
  <form class="p-5" @submit.prevent="submitHandler">
    <div class="moda" tabindex="100" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header moda-header">
            <h3>{{$options.filters.toUSD(language, 'Мартова Риверсайд')}}</h3>
            <button
              @click.prevent="closeModal"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-5 pb-0">
            <h4 class="modal-title text-center">{{$options.filters.toUSD(language, 'Вход')}}</h4>

            <div class="form-group my-4">
              <input
                v-model.trim="email"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                :placeholder="this.$options.filters.toUSD(this.language, 'Введите email')"
              >
              <small
                class="text-danger"
                v-if="($v.email.$dirty && !$v.email.required)"
              >{{$options.filters.toUSD(language, 'notEmpty')}}
              </small>
              <small v-else-if="($v.email.$dirty && !$v.email.email)" class="text-danger">
                {{$options.filters.toUSD(language, 'correctMail')}}
                </small>
            </div>
            <div class="form-group my-4">
              <input
                v-model.trim="password"
                class="form-control"
                type="password"
                id="exampleInputPassword1"
                :placeholder="this.$options.filters.toUSD(this.language, 'Введите пароль')"
              >
              <small v-if="$v.password.$dirty && !$v.password.required" class="text-danger">{{$options.filters.toUSD(this.language, 'Введите пароль')}}</small>
              <small v-else-if="$v.password.$dirty && !$v.password.minLength" class="text-danger">
                {{$options.filters.toUSD(this.language, 'Пароль должен быть не менее')}}
                 {{$v.password.$params.minLength.min}} {{$options.filters.toUSD(this.language, 'символов')}} </small>
            </div>
          </div>
          <div class="modal-footer moda-footer">
            <button
              type="submit"
              class="btn btn-primary"
            >
              {{$options.filters.toUSD(this.language, 'Войти')}}
            </button>
            <button
              @click.prevent="closeModal"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal">
              {{$options.filters.toUSD(this.language, 'Закрыть')}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    import {mapGetters} from 'vuex';
    import localizeFilter from "../plugins/locales/localize.filter";

    export default {
        name: "Login",
        props:{
            target: String,
            id: Number
        },
        data: () => ({
            email: '',
            password: '',
        }),
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)}
        },
        computed:{
            ...mapGetters([
                'language'
            ])
        },
        methods: {
            setCookie(cname, cvalue, exdays) {
                document.cookie = cname + "=" + cvalue + ";";
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires="+ d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";";
            },
            submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch();
                    this.$emit('loginFalse');
                    return
                }

                this.$axios.post('login', {
                    email: this.email,
                    password: this.password
                }).then((res)=>{
                    this.setCookie('token', res.data.key, 2);
                }).then(()=>{
                    if (this.target==='like'){
                        console.log('like', this.id)
                        this.itsLike()
                    } else {
                        this.itsComment()
                    }
                    this.closeModal()
                })

                // try {
                //     debugger
                //
                //     // await this.$store.dispatch('login', formData)
                // } catch (e) {
                //     alert(1)
                // }
            },
            itsLike(){
                this.$bus.$emit('addLike', this.id)
            },
            itsComment(){
                this.$emit('addComment')
            },
            closeModal() {
                this.$emit('closeModal');
                this.$emit('loginFalse');
            }
        },
    }
</script>

<style scoped lang="scss">
</style>
