<template>
  <q-page padding>
    <form action="">
      <input v-model="email" type="text">
      <input v-model="password" type="password">
      <button type="submit" @click="login">Login</button>
    </form>
  </q-page>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: '',
      token:''
    }
  },
  methods: {
    login() {
      // uri: 'http://localhost:3999/api/user/login';
      data: axios.post('http://localhost:3999/api/user/login', {
        email: this.email,
        password: this.password,
        getToken: true
      })
      .then((res) => {
        this.token = res.data.token;
        localStorage.setItem('token', this.token);
        console.log(this.token);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
