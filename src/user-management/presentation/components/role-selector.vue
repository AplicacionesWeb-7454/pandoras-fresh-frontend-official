<template>
  <select class="border p-2 rounded" @change="$emit('change', $event.target.value)">
    <option value="admin">Admin</option>
    <option value="empleado">Empleado</option>
  </select>
</template>

<script setup>
defineProps({ user: { type: Object, default: null } })
</script>
