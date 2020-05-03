import dCard from '../components/Custom/dCard'
import dNote from '../components/Custom/dNote'

export default async ({ app, Vue }) => {
  Vue.component('d-card', dCard)
  Vue.component('d-note', dNote)
}
