import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import sparePartsNformation from '../components/management/sparePartsNformation'
import afterSales from '../components/management/afterSales'
import purchasing from '../components/logistics/purchasing'
import transport from '../components/logistics/transport'
import demand from '../components/supply/demand'
import manufacturer from '../components/supply/manufacturer'
import aSales from '../components/informationSharingTerminal/aSales'
import PartsNformation from '../components/informationSharingTerminal/PartsNformation'
import demandSituation from '../components/informationSharingTerminal/demandSituation'
import vehicleCondition from '../components/informationSharingTerminal/vehicleCondition'
import supply from '../components/supply'
import trafficLook from '../components/management/trafficLook'
import manageStore from '../components/manageStore'
import solutionqingk from '../components/informationSharingTerminal/solutionqingk'
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/PartsNformation', component: PartsNformation },
        { path: '/afterSales', component: afterSales },
        { path: '/purchasing', component: purchasing },
        { path: '/transport', component: transport },
        { path: '/demand', component: demand },
        { path: '/manufacturer', component: manufacturer },
        { path: '/PartsNformation', component: PartsNformation },
        { path: '/demandSituation', component: demandSituation },
        { path: '/vehicleCondition', component: vehicleCondition },
        { path: '/aSales', component: aSales },
        { path: '/sparePartsNformation', component: sparePartsNformation },
        { path: '/supply', component: supply },
        { path: '/trafficLook', component: trafficLook },
        { path: '/manageStore', component: manageStore },
        { path: '/solutionqingk', component: solutionqingk }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   else next()
// })

export default router
