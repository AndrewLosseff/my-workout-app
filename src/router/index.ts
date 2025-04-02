import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const AddWorkoutView = () => import('../views/AddWorkoutView.vue')
const WorkoutDetailView = () => import('../views/WorkoutDetailView.vue')
const AddExerciseView = () => import('../views/AddExerciseView.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/add-workout',
    name: 'AddWorkout',
    component: AddWorkoutView,
  },
  {
    path: '/workout/:id',
    name: 'WorkoutDetail',
    component: WorkoutDetailView,
    props: true,
  },
  {
    path: '/workout/:id/add-exercise',
    name: 'AddExercise',
    component: AddExerciseView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
