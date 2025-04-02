<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Exercise } from '@/stores/exercise'

defineOptions({
  name: 'ExerciseItem',
})

const props = defineProps<{
  exercise: Exercise
}>()

const emit = defineEmits<{
  (e: 'toggle-completion', id: string): void
  (e: 'delete', id: string): void
}>()

const deleteDialog = ref(false)

const isCompleted = computed({
  get: () => props.exercise.completed,
  set: (value) => {
    if (value !== props.exercise.completed) {
      emit('toggle-completion', props.exercise.id)
    }
  },
})

const confirmDelete = () => {
  deleteDialog.value = true
}

const deleteExercise = () => {
  emit('delete', props.exercise.id)
  deleteDialog.value = false
}
</script>

<template>
  <v-card
    :class="{ 'completed-exercise': exercise.completed }"
    class="mb-3 exercise-item"
    elevation="2"
  >
    <v-card-text class="d-flex align-center">
      <v-checkbox
        v-model="isCompleted"
        hide-details
        class="mr-2"
      ></v-checkbox>

      <div class="flex-grow-1">
        <h3 class="text-h6" :class="{ 'text-decoration-line-through': exercise.completed }">
          {{ exercise.name }}
        </h3>
        <p class="text-body-2 mb-0">
          {{ exercise.sets }} sets × {{ exercise.reps }} reps × {{ exercise.weight }}kg
        </p>
      </div>

      <v-btn icon color="error" @click="confirmDelete" size="small">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-text>

    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete Exercise</v-card-title>
        <v-card-text>
          Are you sure you want to delete this exercise? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="deleteExercise">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
.exercise-item {
  transition: all 0.3s ease;
}

.completed-exercise {
  border-left: 4px solid #4caf50;
  background-color: rgba(76, 175, 80, 0.05);
}
</style>
