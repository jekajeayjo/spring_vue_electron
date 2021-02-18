export default
{
    state:{

    },
    mutations:{

    },
    actions:{
        GET_KEY_STORE_LIST({dispatch},payload)
        {
            dispatch('SEND_REQUEST_GET', payload)
                .then(resolve => {
                       console.log(resolve)

                    }
                )
        },
        SAVE_MODERATOR_NEWS({dispatch}, payload) {
            dispatch('SEND_REQUEST_POST', {
                url: payload.url,
                data: payload.data
            })
                .then(resolve => {

                        payload.status_save(resolve.theme)

                    }
                )
        },
    },
    getters:{

    }
}