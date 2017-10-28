import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app',
      component: require('@/components/Character/CharacterSheet').default
    }, {
      path: '/spells',
      name: 'spells',
      component: require('@/components/Spells/Spells').default
    }, {
      path: '/battle',
      name: 'battle',
      component: require('@/components/Battle/BattleInfo').default
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})
