export default function (Vue) {
  Vue.mixin({
    beforeCreate() {
      this.$styletron = this.$options.styletron || (this.$parent && this.$parent.$options.styletron)
    }
  })
}
