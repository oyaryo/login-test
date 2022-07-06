<template>
  <div>
    <v-container class="text-center">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
      </v-card>
      <h3 class="py-4">ログイン</h3>
      <label for="name">メールアドレス：</label>
      <input
        id="email"
        v-model="email"
        type="email"
        style="border: 1px solid lightgreen; color: white"
      />
      <br /><br />
      <label for="password">パスワード：</label>
      <input
        id="password"
        v-model="password"
        type="password"
        style="border: 1px solid lightgreen; color: white"
      />
      <br /><br />
      <v-btn color="primary" @click="login">送信</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
      this.email = ''
      this.password = ''
    },
  },
}
</script>
