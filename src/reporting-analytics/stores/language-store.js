import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguageStore = defineStore('language', () => {
    const currentLanguage = ref('es')

    const languages = [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
    ]

    const setLanguage = (langCode) => {
        currentLanguage.value = langCode
        localStorage.setItem('preferred-language', langCode)
    }

    const toggleLanguage = () => {
        currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es'
        localStorage.setItem('preferred-language', currentLanguage.value)
    }

    const loadSavedLanguage = () => {
        const savedLanguage = localStorage.getItem('preferred-language')
        if (savedLanguage) {
            currentLanguage.value = savedLanguage
        }
    }

    return {
        currentLanguage,
        languages,
        setLanguage,
        toggleLanguage,
        loadSavedLanguage
    }
})