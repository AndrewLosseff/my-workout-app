import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useWorkoutStore } from './workout'
import { STORE_NAME } from '@/constants/stores'

export interface Exercise {
  id: string
  workoutId: string
  name: string
  sets: number
  reps: number
  weight: number
  completed: boolean
}

export const useExerciseStore = defineStore(STORE_NAME.EXERCISE, {
  state: () => ({
    exercises: [] as Exercise[],
  }),

  getters: {
    getExercisesByWorkoutId: (state) => (workoutId: string) => {
      return state.exercises.filter((exercise) => exercise.workoutId === workoutId)
    },
  },

  actions: {
    addExercise(exercise: Omit<Exercise, 'id' | 'completed'>) {
      const newExercise: Exercise = {
        ...exercise,
        id: uuidv4(),
        completed: false,
      }

      this.exercises.push(newExercise)
      this.saveToLocalStorage()
      return newExercise
    },

    toggleExerciseCompletion(id: string) {
      const exercise = this.exercises.find((e) => e.id === id)
      if (exercise) {
        exercise.completed = !exercise.completed
        this.saveToLocalStorage()

        const workoutStore = useWorkoutStore()
        workoutStore.updateWorkoutStatus(exercise.workoutId)
      }
    },

    deleteExercise(id: string) {
      const exercise = this.exercises.find((e) => e.id === id)
      if (exercise) {
        const workoutId = exercise.workoutId
        this.exercises = this.exercises.filter((e) => e.id !== id)
        this.saveToLocalStorage()

        const workoutStore = useWorkoutStore()
        workoutStore.updateWorkoutStatus(workoutId)
      }
    },

    deleteExercisesByWorkoutId(workoutId: string) {
      this.exercises = this.exercises.filter((exercise) => exercise.workoutId !== workoutId)
      this.saveToLocalStorage()
    },

    loadFromLocalStorage() {
      const storedExercises = localStorage.getItem('exercises')
      if (storedExercises) {
        this.exercises = JSON.parse(storedExercises)
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('exercises', JSON.stringify(this.exercises))
    },
  },
})
