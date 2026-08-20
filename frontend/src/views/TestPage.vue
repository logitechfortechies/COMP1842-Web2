<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" md="6" class="text-center">
      
      <v-progress-linear v-if="currentWord" :model-value="progress" height="15" color="success" rounded class="mb-8"></v-progress-linear>

      <v-card v-if="currentWord" class="pa-8 rounded-xl" elevation="4" border>
        <div class="text-caption text-uppercase font-weight-bold text-grey mb-4">
          Translate this {{ currentWord.language }} word
        </div>
        
        <v-img 
          v-if="currentWord.image" 
          :src="currentWord.image" 
          height="150" 
          class="mb-4 rounded-lg mx-auto" 
          style="max-width: 200px;"
          cover
        ></v-img>

        <div class="text-h3 font-weight-black text-grey-darken-3 mb-6">
          {{ currentWord.title }}
        </div>

        <v-divider class="mb-6"></v-divider>

        <div v-if="!result" class="py-2">
           <div class="input-wrapper">
             <textarea 
                v-model="userAnswer"
                placeholder="Type the meaning here..." 
                rows="2"
                class="safe-input"
                @keydown.enter.prevent="checkAnswer"
             ></textarea>
           </div>
        </div>

        <div v-else class="py-2 animate__animated animate__fadeInUp">
          <v-alert
            :type="result === 'correct' ? 'success' : 'error'"
            :icon="result === 'correct' ? 'mdi-check-circle' : 'mdi-close-circle'"
            variant="tonal"
            class="mb-2 text-left"
          >
            <div class="text-h6 font-weight-bold">
              {{ result === 'correct' ? 'Correct!' : 'Incorrect' }}
            </div>
            <div v-if="result === 'incorrect'" class="text-body-1">
              Correct answer: <strong>{{ currentWord.description }}</strong>
            </div>
          </v-alert>
        </div>

      </v-card>

      <v-alert v-else type="warning" variant="tonal" class="mt-4">
        No words found! Go to "Learn" to add some words first.
      </v-alert>

      <div class="mt-8">
        <v-btn v-if="!result" :disabled="!userAnswer" color="success" size="x-large" block rounded="xl" @click="checkAnswer" elevation="4">
          CHECK ANSWER
        </v-btn>
        <v-btn v-else :color="result === 'correct' ? 'success' : 'error'" size="x-large" block rounded="xl" @click="nextWord" elevation="4">
          CONTINUE
        </v-btn>
      </div>

    </v-col>
  </v-row>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  data () { 
    return { 
      allWords: [], 
      currentWord: null, 
      userAnswer: '',
      result: null, 
      progress: 0
    } 
  },
  async mounted () {
    const response = await PostsService.fetchPosts()
    this.allWords = response.data.posts
    this.nextWord()
  },
  methods: {
    nextWord() {
      if (this.allWords.length > 0) {
        this.userAnswer = ''
        this.result = null
        const randomIndex = Math.floor(Math.random() * this.allWords.length)
        this.currentWord = this.allWords[randomIndex]
        this.progress += 10
        if(this.progress > 100) this.progress = 10
      }
    },
    checkAnswer() {
      if(!this.userAnswer) return
      const correct = this.currentWord.description.trim().toLowerCase()
      const user = this.userAnswer.trim().toLowerCase()
      if (user === correct) {
        this.result = 'correct'
      } else {
        this.result = 'incorrect'
      }
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #f9f9f9; 
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 15px;
  transition: 0.3s;
}

.input-wrapper:focus-within {
  border-color: #4CAF50; 
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  background-color: white;
}

.safe-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 18px; 
  outline: none;
  color: #333;
  resize: none;
  font-family: inherit;
}
</style>