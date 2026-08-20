<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-card class="pa-6 rounded-xl" elevation="4" border>
        
        <div class="text-center mb-6">
          <v-avatar :color="color" size="80" variant="tonal" class="mb-4">
            <v-icon size="40">{{ icon }}</v-icon>
          </v-avatar>
          <h2 class="text-h5 font-weight-bold text-grey-darken-3">{{ title }}</h2>
        </div>

        <v-form @submit.prevent="submitForm">
          
          <v-label class="font-weight-bold mb-2 ml-1 text-grey-darken-2">Word / Phrase</v-label>
          <v-text-field
            v-model="localPost.title"
            placeholder="e.g. Bonjour"
            prepend-inner-icon="mdi-format-title"
            variant="outlined"
            bg-color="grey-lighten-5"
            color="primary"
            rounded="lg"
            class="mb-3"
          ></v-text-field>

          <v-label class="font-weight-bold mb-2 ml-1 text-grey-darken-2">Translation / Meaning</v-label>
          <v-textarea
            v-model="localPost.description"
            placeholder="e.g. Hello / Good day"
            prepend-inner-icon="mdi-translate"
            variant="outlined"
            bg-color="grey-lighten-5"
            color="primary"
            rounded="lg"
            rows="3"
            class="mb-3"
          ></v-textarea>

          <v-label class="font-weight-bold mb-2 ml-1 text-grey-darken-2">Language</v-label>
          <v-text-field
            v-model="localPost.language"
            placeholder="e.g. French"
            prepend-inner-icon="mdi-flag"
            variant="outlined"
            bg-color="grey-lighten-5"
            color="primary"
            rounded="lg"
            class="mb-6"
          ></v-text-field>

          <v-divider class="mb-6"></v-divider>

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
    post: {
      type: Object,
      default: () => ({ title: '', description: '', language: '' })
    },
    title: { type: String, default: 'Vocabulary' },
    btnText: { type: String, default: 'Save' },
    icon: { type: String, default: 'mdi-pencil' },
    color: { type: String, default: 'primary' }
  },
  data() {
    return {
      localPost: { ...this.post }
    }
  },
  watch: {
    post(newVal) {
      this.localPost = { ...newVal }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit-form', this.localPost)
    }
  }
}
</script>