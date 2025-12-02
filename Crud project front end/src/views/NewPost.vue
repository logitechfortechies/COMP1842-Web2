<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card class="pa-6 rounded-xl" elevation="4" border>
        
        <div class="text-center mb-6">
          <v-avatar color="success" size="80" variant="tonal" class="mb-4">
            <v-img v-if="image" :src="image" cover></v-img>
            <v-icon v-else size="40">mdi-plus-circle</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold text-grey-darken-3">Add New Word</h2>
        </div>

        <form @submit.prevent="addPost">
          
          <label class="font-weight-bold ml-1 text-grey-darken-2">Word / Phrase</label>
          <div class="input-wrapper mb-4">
            <v-icon color="success" class="input-icon">mdi-format-title</v-icon>
            <input type="text" v-model="title" placeholder="e.g. Gato" class="safe-input">
          </div>

          <label class="font-weight-bold ml-1 text-grey-darken-2">Translation / Meaning</label>
          <div class="input-wrapper mb-4">
            <v-icon color="success" class="input-icon">mdi-translate</v-icon>
            <textarea v-model="description" placeholder="e.g. Cat" rows="3" class="safe-input"></textarea>
          </div>

          <label class="font-weight-bold ml-1 text-grey-darken-2">Language</label>
          <div class="input-wrapper mb-6">
            <v-icon color="success" class="input-icon">mdi-flag</v-icon>
            <input type="text" v-model="language" placeholder="e.g. Spanish" class="safe-input">
          </div>

          <v-divider class="mb-4"></v-divider>
          <label class="font-weight-bold ml-1 text-grey-darken-2 mb-2 d-block">Add an Image (Optional)</label>
          
          <div class="mb-3">
             <v-btn color="success" variant="tonal" prepend-icon="mdi-camera" class="mr-2" @click="$refs.fileInput.click()">
               Upload Image
             </v-btn>
             <input type="file" ref="fileInput" @change="onFileSelected" style="display: none" accept="image/*">
             <span v-if="fileName" class="text-caption text-grey">{{ fileName }}</span>
          </div>

          <div class="input-wrapper mb-6">
            <v-icon color="success" class="input-icon">mdi-link</v-icon>
            <input type="text" v-model="image" placeholder="Or paste image URL..." class="safe-input">
          </div>

          <v-btn 
            type="submit" 
            color="success" 
            block 
            size="x-large" 
            rounded="xl" 
            elevation="2" 
            class="font-weight-bold text-white"
          >
            ADD TO COLLECTION
          </v-btn>

        </form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'NewPost',
  data () {
    return {
      title: '',
      description: '',
      language: '',
      image: '',
      fileName: ''
    }
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
    async addPost () {
      if(!this.title || !this.description) {
        alert("Please fill in the Word and Meaning!")
        return
      }
      try {
        await PostsService.addPost({
          title: this.title,
          description: this.description,
          language: this.language,
          image: this.image
        })
        this.$router.push({ name: 'Posts' })
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
.input-wrapper { display: flex; align-items: center; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 8px; padding: 5px 15px; transition: 0.3s; }
.input-wrapper:focus-within { border-color: #4CAF50; background-color: white; }
.input-icon { margin-right: 10px; }
.safe-input { width: 100%; border: none; background: transparent; padding: 10px 0; font-size: 16px; outline: none; color: #333; }
textarea.safe-input { resize: vertical; }
</style>