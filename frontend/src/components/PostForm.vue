<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card class="pa-6 rounded-xl" elevation="4" border>
        
        <div class="text-center mb-6">
          <v-avatar :color="color" size="80" variant="tonal" class="mb-4">
            <v-img v-if="localPost.image" :src="localPost.image" cover></v-img>
            <v-icon v-else size="40">{{ icon }}</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold text-grey-darken-3">{{ title }}</h2>
        </div>

        <v-form @submit.prevent="submitForm">
          
          <label class="font-weight-bold ml-1 text-grey-darken-2">Word / Phrase</label>
          <div class="input-wrapper mb-4">
            <v-icon :color="color" class="input-icon">mdi-format-title</v-icon>
            <input type="text" v-model="localPost.title" placeholder="e.g. Pomme" class="safe-input">
          </div>

          <label class="font-weight-bold ml-1 text-grey-darken-2">Translation / Meaning</label>
          <div class="input-wrapper mb-4">
            <v-icon :color="color" class="input-icon">mdi-translate</v-icon>
            <textarea v-model="localPost.description" placeholder="e.g. Apple" rows="3" class="safe-input"></textarea>
          </div>

          <label class="font-weight-bold ml-1 text-grey-darken-2">Language</label>
          <div class="input-wrapper mb-6">
            <v-icon :color="color" class="input-icon">mdi-flag</v-icon>
            <input type="text" v-model="localPost.language" placeholder="e.g. French" class="safe-input">
          </div>

          <v-divider class="mb-4"></v-divider>
          <label class="font-weight-bold ml-1 text-grey-darken-2 mb-2 d-block">Add an Image</label>
          
          <div class="mb-3">
             <v-btn :color="color" variant="tonal" prepend-icon="mdi-camera" class="mr-2" @click="$refs.fileInput.click()">
               Upload from PC
             </v-btn>
             <input type="file" ref="fileInput" @change="onFileSelected" style="display: none" accept="image/*">
             <span v-if="fileName" class="text-caption text-grey">{{ fileName }}</span>
          </div>

          <div class="input-wrapper mb-6">
            <v-icon :color="color" class="input-icon">mdi-link</v-icon>
            <input type="text" v-model="localPost.image" placeholder="Or paste an image URL here..." class="safe-input">
          </div>

          <v-btn 
            type="submit" 
            :color="color" 
            block 
            size="x-large" 
            rounded="xl" 
            elevation="2" 
            class="font-weight-bold text-white"
          >
            {{ btnText }}
          </v-btn>

        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PostForm',
  props: {
    post: { type: Object, default: () => ({ title: '', description: '', language: '', image: '' }) },
    title: { type: String, default: 'Vocabulary' },
    btnText: { type: String, default: 'Save' },
    icon: { type: String, default: 'mdi-pencil' },
    color: { type: String, default: 'primary' }
  },
  data() {
    return {
      localPost: { ...this.post },
      fileName: ''
    }
  },
  watch: {
    post(newVal) {
      this.localPost = { ...newVal }
    }
  },
  methods: {

      onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.fileName = file.name;
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
      
          const maxWidth = 800; 
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
        
          ctx.drawImage(img, 0, 0, width, height);
          this.localPost.image = canvas.toDataURL('image/jpeg', 0.7);
        }
      };
</script>

<style scoped>
.input-wrapper { display: flex; align-items: center; background-color: #f9f9f9; border: 1px solid #ccc; border-radius: 8px; padding: 5px 15px; transition: 0.3s; }
.input-wrapper:focus-within { border-color: #4CAF50; background-color: white; }
.input-icon { margin-right: 10px; }
.safe-input { width: 100%; border: none; background: transparent; padding: 10px 0; font-size: 16px; outline: none; color: #333; }
textarea.safe-input { resize: vertical; }
</style>