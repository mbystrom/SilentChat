<template>
  <v-app dark>
    <v-navigation-drawer class="hidden-sm-and-up" v-model="sidenav" absolute="true">
      <v-list>
        <v-list-tile v-for="item in menu" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidenav = !sidenav"></v-toolbar-side-icon>
      </span>
      <v-toolbar-title justify-center>
        <!-- <router-link to="/" tag="span" style="cursor:pointer"> -->
        {{ appName }} &nbsp;
        <i v-if="user != null" class="small"><v-icon>person</v-icon> {{ user }} - <u style="cursor:pointer" @click="Logoff">Log Out</u></i>
        <i v-else class="small">Not logged in</i>
        <!-- </router-link> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
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
// import Axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      menu: [
        { title: 'Home', path: '/', icon: 'home' },
        { title: 'Log In', path: '/login', icon: 'lock_open' }
      ],
      sidenav: false
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
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  a, a:link, a:visited {
    text-decoration: none;
    color: white;
  }
  a:hover {
    text-decoration: underline;
  }
  a:active {
    text-decoration: underline;
    color: darkgray;
  }
</style>
