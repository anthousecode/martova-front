import Vue from 'vue'

import VueSocialauth from 'vue-social-auth'
import axios from 'axios';
Vue.use(axios);
Vue.use(VueSocialauth, {
  providers: {
    github: {
      clientId: '',
      redirectUri: '/auth/github/callback' // Your client app URL
    }
  }
});
