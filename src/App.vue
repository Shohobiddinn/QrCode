<template>
  <div>
    <RouterView />
    <Loading />
  </div>
</template>

<script>
import Loading from "./components/Animation/Loading.vue";
export default {
  components: { Loading },
};
</script>

<style lang="sass" scoped>
</style>