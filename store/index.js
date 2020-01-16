export const state = () => ({
  language: 'ru'
});
export const mutations = {
  setRusLanguage(state) {
    state.language = 'ru'
  },
  setUaLanguage(state) {
    state.language = 'ua'
  }
};
export const actions = {
  // async fetch({commit}){
  //   const users = await this.$axios.$get('https://jsonplaceholder.typicode.com/users');
  //   commit('setUsers', users)
  // }
};

export const getters = {
  language: s => s.language
};
