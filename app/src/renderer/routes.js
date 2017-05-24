export default [
  {
    path: '/',
    name: 'home',
    component: require('components/Home')
  },
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/rankinglist',
    component: require('components/Rankinglist')
  }
]
