<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home Page for the Chat App</h1>
      </v-flex>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3 class="text-xs-center">
        <div class="row">
          <span :class="{ 'message user-message': isUser(message.sender), 'message received-message': !isUser(message.Sender) }" v-for="message in messages" :key="message.message">
            <small><b>{{ message.sender }}</b></small><br>
            {{ message.text }} <br>
            <small>{{ ParseDate(message.time) }}</small>
          </span>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    var date = new Date()
    return {
      messages: [
        { text: 'this is a message', sender: 'penelope', time: date },
        { text: 'a message', sender: 'naiomi', time: date },
        { text: 'a rather much longer one', sender: 'penelope', time: date }
      ]
    }
  },
  methods: {
    ParseDate (date) {
      var d = date.toISOString().slice(0, 16).replace('T', ' ')
      d = d.replace(/-/g, '/')
      return d
    },
    isUser (sender) {
      if (sender === this.user) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style>
  .message {
    font-size: 1.2em;
    padding: 1rem 1.5rem;
    margin: 5px;
    display: table;
    position: relative;
    clear: both;
  }
  .received-message {
    background: white;
    text-align: left;
    float: left;
  }
  .user-message {
    background: lightgrey;
    text-align: right;
    float: right;
  }
</style>
