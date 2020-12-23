<template>
  <div>
    <nav-menu />
    <router-view />
  </div>
</template>

<script>
import NavMenu from '@/views/library/NavMenu'
export default {
  name: 'Home',
  components: { NavMenu }
}
</script>

<style scoped>

</style>

