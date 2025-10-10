<template>
  <div class="not-found">
    <h1>{{ $t('notFound.title') }}</h1>
    <p>{{ $t('notFound.description') }}</p>
    <pv-button
        :label="$t('notFound.goHome')"
        @click="$router.push('/')" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
}
</style>