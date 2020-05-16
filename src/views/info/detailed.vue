<template>
  <div>{{id}}</div>
</template>
<script>
export default {
  setup(props,{ root }) {
    let id = root.$route.query.id

    return {
      id
    }
  }
}
</script>
<style lang="scss" scoped>
</style>