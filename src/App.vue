<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>
        <!-- <router-link to="/" tag="span" style="cursor:pointer"> -->
        {{ appName }}
        <!-- </router-link> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {}
  },
  computed: mapState([
    'appName'
  ])
}
</script>
