<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-2>
        <h1>Welcome to {{ appName }}</h1>
      </v-flex>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3 class="text-xs-center">
        <div class="row">
          <span :class="{ 'message user-message': isUser(message.sender), 'message received-message': !isUser(message.Sender) }" v-for="message in messages" :key="message.message">
            <small><b>{{ message.sender }}</b></small><br>
            {{ message.text }} <br>
            <small>{{ ParseDate(message.time) }}</small>
          </span>
        </div>
        <br>
      </v-flex>
    </v-layout>
    <v-layout row align-baseline>
      <v-flex xs11 sm8 md6 offset-sm2 offset-md3>
        <form v-on:submit.prevent="SendMessage()">
          <v-text-field v-model="text" :disabled="!LoggedIn()"></v-text-field>
        </form>
      </v-flex>
      <v-flex xs2 ml-1>
        <span v-if="text != '' && text != ' '">
          <v-icon color="blue darken -5" class="send-active" @click="SendMessage()">send</v-icon>
        </span>
        <span v-else>
          <v-icon>send</v-icon>
        </span>
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
        { text: 'another message', sender: 'naiomi', time: date },
        { text: 'a rather much longer message', sender: 'penelope', time: date }
      ],
      text: ''
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
    },
    // this needs to be modified to push to a database and pull back from it
    SendMessage () {
      if (this.LoggedIn()) {
        var date = new Date()
        var data = { text: this.text, sender: this.user, time: date }
        this.messages.push(data)
        console.log('pushing data: ' + data)
      }
      this.text = ''
    },
    LoggedIn () {
      if (this.user != null && this.user !== '') {
        if (!this.user.includes('invalidcharacter')) {
          return true
        }
      }
      return false
    }
  },
  computed: {
    ...mapState([
      'user',
      'appName'
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
    background: #505050;
    text-align: left;
    float: left;
  }
  .user-message {
    background: #666;
    text-align: right;
    float: right;
  }
  .send-active {
    cursor: pointer;
  }
</style>
