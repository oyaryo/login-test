<template>
  <div>
    <v-container class="text-center">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
      </v-card>
      <h3 class="py-4">掲示板に投稿する</h3>
      <label for="name">ニックネーム：</label>
      <input
        id="name"
        v-model="name"
        type="text"
        style="border: 1px solid lightgreen; color: white"
      />
      <br /><br />
      <label for="comment">コメント：</label>
      <textarea
        id="comment"
        v-model="comment"
        style="border: 1px solid lightgreen; color: white"
      ></textarea>
      <br /><br />
      <v-btn color="primary" @click="createComment"
        >コメントをサーバに送る</v-btn
      >
      <h2 class="py-4">掲示板</h2>
      <div>
        <v-btn @click="$store.commit('increment')">+</v-btn>
        <br />
        {{ $store.state.counter }}
      </div>
      <div v-for="post in posts" :key="post.name">
        <br />
        <div>名前：{{ post.fields.name.stringValue }}</div>
        <div>コメント：{{ post.fields.comment.stringValue }}</div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'IndexPage',

  middleware({ store, redirect }) {
    // ユーザーが認証されていない場合
    if (!store.getters.idToken) {
      return redirect('myLogin')
    }
  },

  data() {
    return {
      name: '',
      comment: '',
      posts: [],
    }
  },

  computed: {
    idToken() {
      return this.$store.getters.idToken
    },
  },

  created() {
    axios
      .get(
        'https://firestore.googleapis.com/v1/projects/fir-pj3-26803/databases/(default)/documents/comments',
        {
          headers: {
            Authorization: `Bearer ${this.idToken}`,
          },
        }
      )
      .then((response) => {
        this.posts = response.data.documents
      })
  },

  methods: {
    createComment() {
      axios.post(
        'https://firestore.googleapis.com/v1/projects/fir-pj3-26803/databases/(default)/documents/comments',
        {
          fields: {
            name: {
              stringValue: this.name,
            },
            comment: {
              stringValue: this.comment,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.idToken}`,
          },
        }
      )

      this.name = ''
      this.comment = ''
    },
  },
}
</script>
