<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6 offset-sm2 mb-5 offset-md3 class="text-xs-center">
        <span v-for="(message, index) in messages"
          :key="index"
          :class="{ 'message user-message': isUser(message.sender), 'message received-message': !isUser(message.sender) }">
          <small><b>{{ message.sender }}</b></small><br>
          {{ message.text }} <br>
          <small>{{ ParseDate(message.time) }}</small>
        </span>
      </v-flex>
    </v-layout>
    <v-footer fixed height="4rem">
      <v-layout row align-baseline ma-0 pa-0>
        <v-flex xs10 sm8 md6 offset-xs1 offset-sm2 offset-md3>
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
    </v-footer>
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
      var d = date.toString().slice(0, 21)
      // d = d.replace(/-/g, '/')
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
      this.$nextTick(function () {
        window.scrollTo(0, document.body.scrollHeight)
      })
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

<style scoped>
  /* message styles */
  .message {
    font-size: 1.2em;
    padding: 1rem 1.5rem;
    margin: 5px;
    border: 2px solid #292929; /* may want to remove this, actually */
    border-radius: 5px;
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

  /* scrollbar styles */
  ::-webkit-scrollbar-track {
    background: #303030;
  }
  ::-webkit-scrollbar-thumb {
    background: #505050;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #666;
  }

  /* scrollable item styles */
  @media (min-height: 1000px){
    ::-webkit-scrollbar {
      width: 5px;
    }
  }
  @media (max-height: 999px) {
    ::-webkit-scrollbar {
      width: 3px;
    }
  }
  @media (max-height: 600px) {
    ::-webkit-scrollbar {
      width: 2px;
    }
  }
</style>
