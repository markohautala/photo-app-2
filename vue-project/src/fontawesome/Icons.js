// src/fontawesome/icons.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Välj specifika ikoner
import { faUser, faHome, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

// Lägg till i biblioteket lokalt
library.add(faUser, faHome, faTrash, faEdit, faGithub)

export { FontAwesomeIcon }