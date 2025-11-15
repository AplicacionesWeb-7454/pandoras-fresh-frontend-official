<template>



      <router-view />




</template>

<script setup>
import { useUserStore } from './user-management/application/store/user-management.store'
import { logoutUseCase } from './user-management/application/use-cases/logout.usecase'

const store = useUserStore()

function logout() {
  logoutUseCase()
}
</script>
