import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AddExerciseView from '@/views/AddExerciseView.vue'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  }),
  useRoute: () => ({
    params: {
      id: '123'
    }
  })
}))

vi.mock('@/stores/workout', () => ({
  useWorkoutStore: () => ({
    loadFromLocalStorage: vi.fn(),
    getWorkoutById: vi.fn().mockReturnValue({
      id: '123',
      name: 'Test Workout',
      exercises: []
    })
  })
}))

vi.mock('@/stores/exercise', () => ({
  useExerciseStore: () => ({
    addExercise: vi.fn()
  })
}))

describe('AddExerciseView', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    setActivePinia(createPinia())

    wrapper = mount(AddExerciseView, {
      global: {
        stubs: {
          'v-btn': true,
          'v-icon': true,
          'v-form': true,
          'v-card': true,
          'v-text-field': true,
          'v-row': true,
          'v-col': true,
          'v-card-actions': true,
          'v-spacer': true,
          'v-alert': true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('displays the workout name in the title', () => {
    expect(wrapper.find('h1').text()).toContain('Add Exercise to Test Workout')
  })

  it('initializes the form with default values', () => {
    expect(wrapper.vm.exercise.name).toBe('')
    expect(wrapper.vm.exercise.sets).toBe(3)
    expect(wrapper.vm.exercise.reps).toBe(10)
    expect(wrapper.vm.exercise.weight).toBe(0)
  })

  it('navigates back when back button is clicked', async () => {
    const backButton = wrapper.find('v-btn-stub[icon]')
    await backButton.trigger('click')

    expect(wrapper.vm.router.push).toHaveBeenCalledWith('/workout/123')
  })

  it('adds exercise and navigates on successful form submission', async () => {
    wrapper.vm.form = { validate: () => true }

    wrapper.vm.exercise.name = 'Bench Press'

    await wrapper.find('v-form-stub').trigger('submit')

    expect(wrapper.vm.exerciseStore.addExercise).toHaveBeenCalledWith({
      workoutId: '123',
      name: 'Bench Press',
      sets: 3,
      reps: 10,
      weight: 0
    })

    expect(wrapper.vm.router.push).toHaveBeenCalledWith('/workout/123')
  })

})
