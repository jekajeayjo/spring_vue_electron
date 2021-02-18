import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate';
import AuthorizationController from './AuthorizationController'
import GeneralController from './GeneralController'


//KeyStore
import KeyStoreListController from "../views/keystore/KeyStoreListController";




Vue.use(Vuex)


export default new Vuex.Store({

    modules: {
        authorizeController: AuthorizationController,
        generalController: GeneralController,
        keyStoreListController:KeyStoreListController
    },
    plugins: [createPersistedState()]
})
