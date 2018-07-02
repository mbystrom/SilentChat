<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class='text-xs-center'>
        <h1>Data Privacy</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center">
        <p>
          We collect only the data that is absolutely neccessary to the function of this website. <br>
          We collect the messages you send, and the username you provide. <br>
          Your username is collected so that others can associate a name with the messages sent, <br>
          and so that messages are distinguishable from one another, and conversation can be adequately held. <br><br>
          By using this website, you are giving explicit permission for us to collect your username and messages. <br>
          We will not collect any other information.
        </p>
        <p>
          <router-link to="/login">Back to Login</router-link>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
