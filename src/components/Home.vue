<template>
  <v-container fluid>
    <v-layout row wrap ma-0 pa-0>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3 class="text-xs-center scrollable">
        <span v-for="(message, index) in messages"
          :key="index"
          :class="{ 'message user-message': isUser(message.sender), 'message received-message': !isUser(message.sender) }">
          <small><b>{{ message.sender }}</b></small><br>
          {{ message.message }} <br>
          <small>{{ ParseDate(message.time) }}</small>
        </span>
      </v-flex>
    </v-layout>
    <v-layout row align-baseline ma-0 pa-0>
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
import axios from 'axios'

export default {
  data () {
    var date = new Date()
    return {
      messages: [
        { message: 'this is a message', sender: 'penelope', time: date },
        { message: 'another message', sender: 'naiomi', time: date },
        { message: 'a rather much longer message', sender: 'penelope', time: date }
      ],
      text: ''
    }
  },
  methods: {
    ParseDate (date) {
      var d = date.toString().slice(0, 16).replace('T', ' ')
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
    LoggedIn () {
      if (this.user != null && this.user !== '') {
        if (!this.user.includes('invalidcharacter')) {
          return true
        }
      }
      return false
    },

    // FUNCTIONS FOR DATABASE MANIPULATION
    GetMessages () {
      this.messages = []
      axios({
        method: 'get',
        url: 'http://dataservicedev/noah_Test/test.cfc?method=getMessages'
      }).then(response => {
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
          var dataToPush = response.data[i]
          this.messages.push(dataToPush)
        }
        console.log(this.messages)
      })
    },
    SendMessage () {
      if (this.LoggedIn()) {
        var date = new Date()
        var data = { message: this.text, sender: this.user, time: date }
        let formdata = new FormData()
        formdata.append('json', JSON.stringify(data))
        axios({
          method: 'post',
          url: 'http://dataservicedev/noah_Test/test.cfc?method=sendMessage',
          data: formdata
        }).then(response => {
          this.GetMessages()
        })
        // this.messages.push(data)
        console.log('pushing data: ' + data)
      }
      this.text = ''
    }
  },
  created: function () {
    this.GetMessages()
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
    background: slategray;
    text-align: right;
    float: right;
  }
  .send-active {
    cursor: pointer;
  }
  @media (min-height: 1000px){
    .scrollable {
      height: 84vh;
      overflow-y: auto;
    }
  }
  @media (max-height: 999px) {
    .scrollable {
      height: 74vh;
      overflow-y: auto;
    }
  }
  @media (max-height: 600px) {
    .scrollable {
      height: 70vh;
      overflow-y: auto;
    }
  }
</style>
