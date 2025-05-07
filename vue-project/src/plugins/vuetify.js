// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const customTheme = {
  dark: false,
  colors: {
    'cream-lightest': '#FDFAF6',
    'cream-light': '#FFF2E1',
    'cream': '#EAD8C0',
    'beige-light': '#F5EEDC',
    'beige': '#EADBC8',
    'sand': '#C9B194',
    'sand-dark': '#A79277',
    'sand-light': '#D1BB9E',
    'brown': '#603F26',
    'brown-darker': '#503C3C',
    'brown-darkest': '#3B3030',
    primary: '#EAD8C0',
    secondary: '#3B3030',
    'primary-text': '#FFFFFF',
  },
}

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#1e1e1e',
    surface: '#121212',
    primary: '#3B3030',
    secondary: '#EAD8C0',
    'primary-text': '#FFFFFF',
  },
}

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
      customDarkTheme,
    },
  },
})

export default vuetify
