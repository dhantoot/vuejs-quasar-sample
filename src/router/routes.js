
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/tutorial',
        name: '_list',
        component: () => import('pages/tutorial/Index.vue'),
        children: [
          { path: '', component: () => import('pages/tutorial/List.vue') },
          { path: 'create', name: '_create', component: () => import('pages/tutorial/Create.vue') },
          { path: 'detail', name: '_detail', component: () => import('pages/tutorial/Detail.vue') }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
