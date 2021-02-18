<template>


  <v-navigation-drawer
      id="layer1"
      style="border-right: 1px solid #9b0101;
 opacity: 0.5"
      v-model="drawer"
      :width="350"
      expand-on-hover
      mini-variant
      absolute
      dark
      permanent
      overlay-color="white"
      class="pt-12"
      color="#444"
  >

    <!--        мое меню-->

    <v-list
        dense
        nav
        class="py-0"
        shaped

    >
      <div class="mt-7">
        <!--            <v-divider class=""></v-divider>-->
        <div v-for="link  in getMenu" :key="link.name"

        >
          <!-- первый уровень-->
          <v-list-item

              v-if="link.url!=''"
              link :to="link.url"
              avatar

          >

            <v-list-item-icon>
              <v-icon>{{ link.img }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!--переходим на второй урвоень-->
          <v-list-group
              v-else
              no-action
              :color="'#b1cd33'"
          >

            <template
                v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ link.img }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title style="font-weight: bold;font-size: 14px">{{ link.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <!--отобразить данные второго уровня-->
            <div v-for="sublink  in link.children" :key="sublink.name">

              <!--отобразить список элементов второго уровня-->
              <v-list-item

                  v-if="sublink.url!=''"
                  link :to="sublink.url"
                  :key="sublink.name"
                  :color="'green'"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ sublink.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>{{ sublink.img }}</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!--                        отобразить список групп третьего уровня-->
              <v-list-group
                  :sub-group="sublink.children"
                  v-else
                  no-action
                  :color="'red'"
              >

                <template
                    v-slot:activator>
                  <v-list-item-icon>
                    <v-icon>{{ sublink.img }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title style="font-weight: bold;font-size: 14px">{{ sublink.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <!--отобразить список элементов 3 уровня-->
                <v-list-item
                    :color="'yellow'"

                    v-for="sub3link in sublink.children"
                    link :to="sub3link.url"
                    :key="sub3link.name"
                >

                  <v-list-item-icon>
                    <v-icon>{{ sub3link.img }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ sub3link.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>


              </v-list-group>
            </div>

          </v-list-group>
        </div>
      </div>
    </v-list>
  </v-navigation-drawer>


</template>
<script>


export default {
  components: {},
  data() {
    return {
      drawer: true,
      items: null,
      reques: {
        header: {
          service: "menu",
          operation: "list",
          sessionid: null,
          hash: null
        },
        request: {}
      },
      menu1: {
        name: "Администрирование",
        img: "account_circle",
        url: "",
        children: [
          {
            name: "Справочник филиалов",
            img: "class",
            url: "/data",
            children: []
          },
          {
            name: "Тест 1",
            img: "build",
            url: "",
            children: [
              {
                name: "Тест 1.1",
                img: "commute",
                url: "/addreport",
                children: []
              },
              {
                name: "Тест 1.2",
                img: "done",
                url: "/about",
                children: []
              }
            ]
          }
        ]
      },
      color: 'gray',
      colors: [
        'primary',
        'blue',
        'success',
        'red',
        'teal',
      ],
      right: false,
      miniVariant: true,
      expandOnHover: true,
      background: false,
    }
  },
  computed: {
    overlay()
    {
      return this.$store.getters.getOverLay
    },
    bg() {
      return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
    }
    ,
    getSessionID() {
      //getters обьявляем ка кпростые переменны
      return this.$store.getters.getSessionId
    },
    getMenu() {
      //getters обьявляем ка кпростые переменны
      return this.$store.getters.getMenu
    }

  },
  created() {

    //тут получение меню
    this.reques.header.sessionid = this.getSessionID
    this.reques.header.hash = this.MD5(JSON.stringify(this.reques.request)).toUpperCase(),
        this.$store.dispatch('GET_MENU', {data: this.reques})

  },
  methods: {

  }

}
</script>
<style scoped>

#layer1 {
  z-index: 80;
}
</style>