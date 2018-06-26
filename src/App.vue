<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>
        <!-- <router-link to="/" tag="span" style="cursor:pointer"> -->
        {{ appName }} &nbsp;&nbsp;
        <i v-if="user != null" class="small">Logged in as {{ user }} - <u style="cursor:pointer" @click="Logoff">Log Out</u></i>
        <i v-else class="small">You are not logged in</i>
        <!-- </router-link> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="item in menu" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      menu: [
        { title: 'Home', path: '/', icon: 'home' },
        { title: 'Log In', path: '/login', icon: 'lock_open' }
      ]
    }
  },
  computed: {
    ...mapState([
      'appName',
      'user'
    ])
  },
  methods: {
    ...mapMutations([
      'SetUser'
    ]),
    Logoff () {
      this.SetUser(null)
    }
  }
}
</script>

<style>
  .small {
    font-size: 0.6em;
  }
</style>
