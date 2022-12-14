import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'

import 'vue-snotify/styles/material.css'

const options = {
  toast: {
    position: SnotifyPosition.rightBottom
  }
}

Vue.use(Snotify, options)
