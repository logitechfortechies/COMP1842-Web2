<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card class="pa-6 rounded-xl" elevation="4" border>
        
        <div class="text-center mb-6">
          <v-avatar color="blue" size="80" variant="tonal" class="mb-4">
             <v-img v-if="image" :src="image" cover></v-img>
            <v-icon v-else size="40">mdi-pencil</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold text-grey-darken-3">Edit Word</h2>
        </div>

        <form @submit.prevent="updatePost">
          
          <label class="font-weight-bold ml-1 text-grey-darken-2">Word / Phrase</label>
          <div class="input-wrapper mb-4">
            <v-icon color="blue" class="input-icon">mdi-format-title</v-icon>
            <input type="text" v-model="title" class="safe-input">
          </div>

          <label class="font-weight-bold ml-1 text-grey-darken-2">Translation / Meaning</label>
          <div class="input-wrapper mb-4">
            <v-icon color="blue" class="input-icon">mdi-translate</v-icon>
            <textarea v-model="description" rows="3" class="safe-input"></textarea>
          </div>

          <label class="font-weight-bold ml-1 text-grey-darken-2">Language</label>
          <div class="input-wrapper mb-6">
            <v-icon color="blue" class="input-icon">mdi-flag</v-icon>
            <input type="text" v-model="language" class="safe-input">
          </div>

          <v-divider class="mb-4"></v-divider>
          <label class="font-weight-bold ml-1 text-grey-darken-2 mb-2 d-block">Update Image</label>
          
          <div class="mb-3">
             <v-btn color="blue" variant="tonal" prepend-icon="mdi-camera" class="mr-2" @click="$refs.fileInput.click()">
               Upload New Image
             </v-btn>
             <input type="file" ref="fileInput" @change="onFileSelected" style="display: none" accept="image/*">
             <span v-if="fileName" class="text-caption text-grey">{{ fileName }}</span>
          </div>

          <div class="input-wrapper mb-6">
            <v-icon color="blue" class="input-icon">mdi-link</v-icon>
            <input type="text" v-model="image" placeholder="Or paste image URL..." class="safe-input">
          </div>

          <v-btn 
            type="submit" 
            color="blue" 
            block 
            size="x-large" 
            rounded="xl" 
            elevation="2" 
            class="font-weight-bold text-white"
          >
            SAVE CHANGES
          </v-btn>

        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'EditPost',
  data () {
    return {
      title: '',
      description: '',
      language: '',
      image: '',
      fileName: ''
    }
  },
  async mounted () {
    const response = await PostsService.fetchPosts()
    const post = response.data.posts.find(p => p._id === this.$route.params.id)
    
    this.title = post.title
    this.description = post.description
    this.language = post.language
    this.image = post.image
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.image = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        language: this.language,
        image: this.image
      })
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>

<style scoped>
.input-wrapper { display: flex; align-items: center; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 8px; padding: 5px 15px; transition: 0.3s; }
.input-wrapper:focus-within { border-color: #2196F3; background-color: white; } /* Blue focus color */
.input-icon { margin-right: 10px; }
.safe-input { width: 100%; border: none; background: transparent; padding: 10px 0; font-size: 16px; outline: none; color: #333; }
textarea.safe-input { resize: vertical; }
</style>