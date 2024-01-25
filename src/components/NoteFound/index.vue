<template>
  <div>
    <div
      class="flex flex-col justify-center items-center h-[100vh] bg-gradient-to-r from-cyan-500 to-blue-500"
    >
      <h1 class="text-[40px] font-bold text-pWhite mb-[20px]">Not Found 404</h1>
      <router-link to="/">
        <button
          class="py-[5px] px-[20px] border-[2px] border-pWhite rounded-[10px] text-pWhite font-bold active:-translate-y-[10px] duration-[0.3s] select-none "
        >
          <i class="fa-solid fa-circle-left"></i> Go Home
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Not Found",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>