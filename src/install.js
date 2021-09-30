import MyTable from './components/MyTable.vue'

const MyTableSimple = {
  install(Vue, options) {
    // Let's register our component globally
    // https://vuejs.org/v2/guide/components-registration.html
    Vue.component(MyTable.name, MyTable)
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MyTableSimple)
}

export default MyTableSimple
