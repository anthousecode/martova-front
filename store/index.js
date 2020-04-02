export const state = () => ({
  language: 'ru',
  postId: null,
  basePath: 'https://api.martovariverside.com',
  dynamicPageRu: '',
  dynamicPageUa: '',
  slug: ''
});
export const mutations = {
  SET_RUS_LANGUAGE(state) {
    state.language = 'ru'
  },
  SET_SLUG(state, slug){
    state.slug = slug
  },
  SET_UA_LANGUAGE(state) {
    state.language = 'ua'
  },
  SET_POST_ID(state, id) {
    state.postId = id
  },
  SET_DYNAMIC_PAGE_RU(state, page) {
    state.dynamicPageRu = page
  },
  SET_DYNAMIC_PAGE_UA(state, page) {
    state.dynamicPageUa = page
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
  basePath: s => s.basePath,
  dynamicPageRu: s => s.dynamicPageRu,
  dynamicPageUa: s => s.dynamicPageUa,
  slug: s => s.slug,
};
