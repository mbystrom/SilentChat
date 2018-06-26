<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home Page for the Chat App</h1>
      </v-flex>
      <v-flex xs4>
        <ul>
          <li v-for="message in messages" :key="message.message">
            <small><b>{{ message.sender }}</b></small><br>
            {{ message.text }} <br>
            <small>{{ ParseDate(message.time) }}</small>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    var date = new Date()
    return {
      messages: [
        { text: 'this is a message', sender: 'penelope', time: date }
      ]
    }
  },
  methods: {
    ParseDate (date) {
      var d = date.toISOString().slice(0, 16).replace('T', ' ')
      d = d.replace(/-/g, '/')
      return d
    }
  }
}
</script>

<style>
  ul {
    list-style-type: none;
    font-size: 1.25em;
  }
  li {
    background: white;
    padding: 1rem 1.5rem;
    display: inline-block;
  }
</style>
