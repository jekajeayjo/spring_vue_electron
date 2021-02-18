<template>

    <v-app-bar
            app
            light
            color="white"
    >

        <template v-slot:img="{ props }">
            <v-img
                    v-bind="props"

            ></v-img>
        </template>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>


        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
            <v-tabs align-with-title>
                <v-tab @click="changePage('keysStore')">Хранилище</v-tab>
                <v-tab @click="changePage('main')">Главная</v-tab>
                <v-tab>Tab 3</v-tab>
            </v-tabs>
        </template>
    </v-app-bar>


</template>

<script>
    export default {
        name: "HeaderMenu",
        data() {
            return {
                ss: ''
            }
        },
        methods: {
            changePage(setPage) {
                console.log('cangepage')

                    switch (setPage) {
                        case 'keysStore':
                            this.$router.push('/key_store_list')
                            break
                        case 'main':
                            this.$router.push('/')
                            break
                    }

            }
        }
    }
</script>

<style scoped>

</style>