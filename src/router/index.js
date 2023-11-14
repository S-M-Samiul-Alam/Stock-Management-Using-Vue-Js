import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: "/dashboard/category",
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    redirect: "/dashboard/category",
    children: [{ path: 'category', name: 'category', component:() => import('../views/TheCategoryView.vue')  },
              { path: 'add-category', name: 'add-category', component:() => import('../components/AddCategory.vue')  },
              { path: 'stock-category', name: 'stock-category', component:() => import('../views/StockCategoryView.vue')  },
              { path: 'product-add', name: 'product-add', component:() => import('../views/ProductAddView.vue')  }]
    },
   {
    path: '/product-category',
    name: 'product-category',
    component: () => import('../views/ProductCategoryView.vue')
   },
   ]
})

export default router
