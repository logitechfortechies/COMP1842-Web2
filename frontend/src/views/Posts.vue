<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      
      <div class="d-flex align-center justify-space-between mb-6">
        <h1 class="text-h4 font-weight-bold text-grey-darken-3">My Collection</h1>
        <v-btn color="success" size="large" rounded="xl" elevation="2" to="/posts/new" prepend-icon="mdi-plus">
          Add New Word
        </v-btn>
      </div>

      <div v-if="loading" class="text-center mt-10">
        <v-progress-circular indeterminate color="success" size="60"></v-progress-circular>
      </div>

      <div v-else-if="posts.length > 0">
        <v-card v-for="post in posts" :key="post._id" class="mb-4 rounded-xl" elevation="0" border>
          <div class="d-flex flex-row align-center pa-4">
            
            <v-avatar v-if="post.image" size="70" class="mr-4" rounded="lg">
              <v-img :src="post.image" cover></v-img>
            </v-avatar>
            <v-avatar v-else color="success" variant="tonal" size="60" class="mr-4">
              <span class="text-h6 font-weight-bold">{{ post.language ? post.language.substring(0,2).toUpperCase() : '??' }}</span>
            </v-avatar>

            <div class="flex-grow-1">
              <div class="text-h6 font-weight-bold text-grey-darken-3">{{ post.title }}</div>
              <div class="text-body-2 text-grey">{{ post.description }}</div>
              <v-chip size="x-small" color="success" variant="outlined" class="mt-1">
                {{ post.language }}
              </v-chip>
            </div>

            <div>
              <v-btn icon color="blue-lighten-2" variant="text" :to="{ name: 'EditPost', params: { id: post._id } }">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red-lighten-2" variant="text" @click="deletePost(post._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>

      <v-sheet v-else class="pa-10 text-center rounded-xl mx-auto" border max-width="500">
        <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-notebook-outline</v-icon>
        <h3 class="text-h6 text-grey-darken-2 mb-2">No words found</h3>
        <p class="text-body-2 text-grey mb-6">Start your learning journey by adding your first word.</p>
        <v-btn color="success" rounded="xl" size="large" to="/posts/new">Start Learning</v-btn>
      </v-sheet>

    </v-col>
  </v-row>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'Posts',
  data () {
    return {
      posts: [],
      loading: true
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      try {
        const response = await PostsService.fetchPosts()
        this.posts = response.data.posts
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async deletePost (id) {
      if(confirm("Remove this word?")) {
        await PostsService.deletePost(id)
        this.getPosts()
      }
    }
  }
}
</script>