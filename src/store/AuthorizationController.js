export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null,
            login: null,
            sessionId: null
        },
        authUser:null,
        unsubscribeAuth: null
    },
    mutations: {
        SET_AUTH_USER(state,payload)
        {
            state.authUser=payload
        },
        SET_SESSIONID(state, payload) {
            state.user.sessionId = payload
        },
        SET_USER(state, payload) {
            console.log(payload)
            state.user.isAuthenticated = true
            state.user.uid = payload
            // localStorage.setItem("uid",JSON.stringify(state.user.uid))
            // localStorage.setItem("isAuthenticated",JSON.stringify(state.user.isAuthenticated))
        },
        UNSET_USER(state) {
            state.user = {
                isAuthenticated: false,
                uid: null,
                login: null,
                sessionId: null
            }
            // localStorage.setItem("uid",JSON.stringify(state.user.uid))
            // localStorage.setItem("isAuthenticated",JSON.stringify(state.user.isAuthenticated))
        },
        SET_UNSCRIBEAUTH(state, payload) {
            state.unsubscribeAuth = payload
        }
    }
    , actions: {
        //воспользуйся тут axios
        INIT_AUTH({dispatch, commit, state}) {
            return new Promise((resolve) => {
                dispatch('STATE_CHANGED', state.user.isAuthenticated)
                let unsubscribe = state.user.isAuthenticated
                resolve(state.user.isAuthenticated)
                commit('SET_UNSCRIBEAUTH', unsubscribe)
                // console.log(isUserAuthenticated)
            });


        },
        CHECK_AUTH({ getters}) {
           return getters.isUserAuthenticated


        },
        SIGN_IN({commit, dispatch}, payload) {
            commit('SET_PROCESSING', true)
            commit('CLEAN_ERROR')
            dispatch('SEND_REQUEST', payload.data)
                .then(resolve => {
                        console.log('answwer ', resolve)
                        if (resolve.header.status == 'OK') {
                            if (resolve.response!=null)
                            {

                                commit('SET_USER', payload.data.request.username)
                                commit('SET_SESSIONID', resolve.response.sessionid)
                                commit('SET_AUTH_USER',resolve.response)
                                commit('SET_PROCESSING', true)
                                commit('CLEAN_ERROR')
                                console.log(localStorage.getItem('isAuthenticated'))
                            }
                        } else {
                            commit('SET_ERROR', resolve.header.message)
                            commit('SET_PROCESSING', false)
                        }
                    }
                )


            // console.log(this.$store.getters.getData()),


            // if (payload.login == 'test' && payload.password == '123') {
            //     commit('SET_USER', payload.login)
            //     commit('SET_PROCESSING', true)
            //     commit('CLEAN_ERROR')
            //     console.log(localStorage.getItem('isAuthenticated'))
            // } else {

            //     commit('SET_ERROR', 'Неверный Логин или пароль')
            //
            // }

        },
        STATE_CHANGED({commit}, payload) {

            if (payload) {
                commit('SET_USER', payload)
            } else
                commit('UNSET_USER')
        },
        SIGN_OUT({commit}) {
            //выход\
            commit('UNSET_USER')
            commit('SET_PROCESSING', false)

        }
    },
    getters: {
        //первый способ
        // isAuthenticated(state) {
        //     return state.isAuthenticated
        // }
        // Второй способ
        getAuthUser:(state)=>state.authUser,
        getSessionId:(state) => state.user.sessionId,
        isUserAuthenticated: (state) => state.user.isAuthenticated
    }

}