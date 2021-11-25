import Vue from 'vue'
import Vuex from 'vuex'

import notify from './notify'
import error from './error'
import loading from './loading'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notify, error, loading
    }
})