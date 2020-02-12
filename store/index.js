export const state = () => ({
  language: 'ru',
  postId: null,
  userName: ''
});
export const mutations = {
  SET_RUS_LANGUAGE(state) {
    state.language = 'ru'

  },
  SET_UA_LANGUAGE(state) {
    state.language = 'ua'

  },
  SET_POST_ID(state, id) {
    state.postId = id
  },
  SET_USER_NAME(state, userName) {
    state.userName = userName
  }
};
export const actions = {
  // async fetch({commit}){
  //   const users = await this.$axios.$get('https://jsonplaceholder.typicode.com/users');
  //   commit('setUsers', users)
  // }
};

export const getters = {
  language: s => s.language,
  postId: s => s.postId,
  userName: s => s.userName
};
