<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Log in to {{ _app }}</h1>
        <span v-if="currentUser != null">Already Logged In as {{ currentUser }}</span>
        <span v-else>You are not Logged In</span>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-layout column>
          <v-flex>
            <v-text-field
              name="Name"
              label="Your Name"
              id="name"
              type="name"
              v-model="name"
              v-bind:disabled="currentUser != null"
              required></v-text-field>
          </v-flex>
          <v-flex class="text-xs-center">
            <v-btn color="primary"
              type="submit"
              v-on:click="SignIn"
              v-bind:disabled="currentUser != null"
              >Log In</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState({
      _app: 'appName',
      currentUser: 'user'
    })
  },
  methods: {
    ...mapMutations([
      'SetUser'
    ]),
    SignIn () {
      this.SetUser(this.name)
      this.name = ''
    }
  }
}
</script>
