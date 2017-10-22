import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/app',
      name: 'app',
      component: require('@/components/Character/CharacterSheet').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
