<script setup lang="ts">
import ModuleGrid from './components/ModuleGrid/ModuleGrid.vue';
import { fromTextToModuleGrid } from './utils/gridShapeConverter';
const gridShape = `
  100000
  111110
  111111
  110011
  000011`;
</script>

<template>
  <div class="centered">
    <ModuleGrid :moduleGridProp="fromTextToModuleGrid(gridShape)" />
  </div>
</template>

<style lang="scss" scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
