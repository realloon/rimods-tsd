<script setup lang="ts">
import Array from './components/Array.vue'
import AddItem from './components/AddItem.vue'
</script>

<template>
  <header>
    <h1>RIMDOS_TSD</h1>
  </header>

  <main>
    <Array />
  </main>

  <AddItem />
</template>

<style scoped>
header,
main {
  max-width: 40em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
