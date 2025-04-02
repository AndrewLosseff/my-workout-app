import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DashboardView from '@/views/DashboardView.vue'

vi.mock('@/stores/workout', () => ({
  useWorkoutStore: () => ({
    loadFromLocalStorage: vi.fn(),
    getWorkouts: [],
    deleteWorkout: vi.fn()
  })
}))

vi.mock('@/stores/exercise', () => ({
  useExerciseStore: () => ({
    loadFromLocalStorage: vi.fn()
  })
}))

describe('DashboardView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    setActivePinia(createPinia())

    wrapper = mount(DashboardView, {
      global: {
        stubs: {
          'v-btn': true,
          'v-icon': true,
          'v-card': true,
          'v-card-title': true,
          'v-alert': true,
          'v-row': true,
          'v-col': true,
          'workout-card': true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shows empty state when no workouts exist', () => {
    expect(wrapper.find('v-alert-stub').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Your Workouts')
  })
})
