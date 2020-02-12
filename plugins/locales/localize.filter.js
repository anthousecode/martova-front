// import store from '~/store';
// import Vue from 'vue'


//
// export function localizeFilter (value) {
//   console.log('key', value)
//   // const locale = store.getters.language || "ru";
//   return locales[locale][value] || `[localize error]: key ${value} not found`;
//
// }
//
// export default  Vue.filter(localizeFilter)



import ru from './ru.json'
import ua from './ua.json'
import Vue from 'vue'

const locales = {
  'ru': ru,
  'ua': ua
};


export function toUSD(locale, value) {
  return locales[locale][value] || `[localize error]: key ${value} not found`;
}

const filters = { toUSD }

export default Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

