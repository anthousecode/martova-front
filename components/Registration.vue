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
            <h4 class="modal-title text-center">{{$options.filters.toUSD(language, 'Регистрация')}}</h4>
            <div class="form-group my-4">
              <input
                v-model.trim="name"
                type="text"
                class="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                :placeholder="this.$options.filters.toUSD(this.language, 'Введите имя')"
              >
              <small
                class="text-danger"
                v-if="($v.email.$dirty && !$v.email.required)"
              >{{$options.filters.toUSD(language, 'notEmptyName')}}
              </small>
            </div>
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
            <div class="form-group my-4">
              <input
                v-model.trim="repeat"
                class="form-control"
                type="password"
                id="exampleInputPassword6"
                :placeholder="this.$options.filters.toUSD(this.language, 'Повторите пароль')"
              >
              <small v-if="$v.password.$dirty && !$v.password.required" class="text-danger">{{$options.filters.toUSD(this.language, 'Повторите пароль')}}</small>
              <small v-else-if="$v.password.$dirty && !$v.password.minLength" class="text-danger">
                {{$options.filters.toUSD(this.language, 'Пароль должен быть не менее')}}
                {{$v.password.$params.minLength.min}} {{$options.filters.toUSD(this.language, 'символов')}} </small>
            </div>
            <a
              href="#"
              class="text-center w-100 d-block"
              style="cursor: pointer; color: dodgerblue"
              @click.prevent="showLogin"
              :title="this.$options.filters.toUSD(this.language, 'Я регистрировался ранее')"
            >
              {{$options.filters.toUSD(this.language, 'Войти')}}
            </a>
          </div>
          <div class="modal-footer moda-footer">
            <button
              type="submit"
              class="btn btn-primary"
            >
              {{$options.filters.toUSD(this.language, 'Зарегистрироваться')}}
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
        name: "Registration",
        props:{
            target: String
        },
        data: () => ({
            name: '',
            email: '',
            password: '',
            repeat: ''
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
            login(){
                this.$axios.post('login', {
                    email: this.email,
                    password: this.password
                }).then((res)=>{
                    this.setCookie('token', res.data.key, 2);
                    if (this.target==='like'){
                        this.itsLike()
                    } else {
                        this.itsComment()
                    }
                    this.closeModal();
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: ``,
                        text: `Вы успешно зарегистрировались!`
                    })
                }).catch(()=>{
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: `Ошибка входа`,
                        text: e.text
                    })
                })
            },
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
                    return
                }
                const formData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    c_password: this.repeat
                };

                this.$axios.post('register', formData, {
                    crossdomain: true,
                    mode: 'no-cors',
                    dataType: "json",
                }).then(()=>{
                   this.login();
                }).catch((e)=>{
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: `Ошибка при регистрации`,
                        text: e.text
                    })
                });
                // try {
                //     debugger
                //
                //     // await this.$store.dispatch('login', formData)
                // } catch (e) {
                //     alert(1)
                // }
            },
            itsLike(){
                this.$emit('addLike')
            },
            itsComment(){
                this.$emit('addComment')
            },
            closeModal() {
                this.$emit('closeModal')
            },
            showLogin() {
                this.$emit('showLogin')
            }
        },
    }
</script>

<style scoped lang="scss">

</style>
