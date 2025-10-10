<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>

<template>
  <div id="app">
    <nav class="p-menubar p-component">
      <div class="p-menubar-start">
        <h2 style="margin: 0; color: #2196F3">{{ $t('app.title') }}</h2>
      </div>
      <div class="p-menubar-center">
        <router-link to="/inventory/dashboard" class="p-menuitem-link">{{ $t('app.dashboard') }}</router-link>
        <router-link to="/inventory/products" class="p-menuitem-link">{{ $t('app.products') }}</router-link>
        <router-link to="/about" class="p-menuitem-link">{{ $t('app.about') }}</router-link>
      </div>
      <div class="p-menubar-end">
        <div class="language-switcher">
          <pv-button
              @click="switchLanguage('en')"
              :text="locale !== 'en'"
              :severity="locale === 'en' ? 'primary' : 'secondary'"
              size="small"
          >
            EN
          </pv-button>
          <pv-button
              @click="switchLanguage('es')"
              :text="locale !== 'es'"
              :severity="locale === 'es' ? 'primary' : 'secondary'"
              size="small"
          >
            ES
          </pv-button>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
}

.p-menubar {
  background: #ffffff;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.p-menubar-start h2 {
  padding: 1rem 0;
  color: #2196F3;
}

.p-menubar-center {
  display: flex;
  gap: 1rem;
  flex: 1;
  justify-content: center;
}

.p-menubar-end {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.p-menuitem-link {
  padding: 1rem;
  text-decoration: none;
  color: #333333;
  transition: color 0.2s;
  font-weight: 500;
}

.p-menuitem-link:hover {
  color: #2196F3;
}

.p-menuitem-link.router-link-active {
  color: #2196F3;
  font-weight: 600;
  border-bottom: 2px solid #2196F3;
}

.language-switcher {
  display: flex;
  gap: 0.25rem;
}

.main-content {
  padding: 0;
  background-color: #f8f9fa;
  min-height: calc(100vh - 60px);
}
</style>