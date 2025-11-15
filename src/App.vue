<template>
  <div id="app">
    <Sidebar v-if="!isPublicRoute" />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './iot-monitoring/presentation/components/Sidebar.vue'

const route = useRoute()
const isPublicRoute = computed(() => route.meta.public)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  margin-left: 60px;  /* Espacio para el sidebar fijo */
  overflow-y: auto;
  background-color: #f5f5f5;
  width: 100%;
  padding-left: 0;  /* Sin padding adicional */
}
</style>