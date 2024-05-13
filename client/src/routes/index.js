import {
    createRouter,
    createWebHistory
  } from 'vue-router';
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/404error',
        name: '404error',
        component: () => import('../views/404error.view.vue')
      },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.view.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register.view.vue'),
  },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.view.vue'),
      children:[
        {
          path: '',
          name: 'home',
          component: () => import('../pages/client.page/home.page.vue'),
        },
        {
          path: 'category/:id',
          name: 'productbycat',
          component: () => import('../pages/client.page/productbycat.page.vue'),
        },
        {
          path: 'products/:id',
          name: 'productdetail',
          component: () => import('../pages/client.page/productdetail.page.vue'),
        },
        {
          path: 'carts',
          name: 'carts',
          component: () => import('../pages/client.page/order.page.vue'),
        }
        ,
        {
          path: 'carts/payments',
          name: 'payments',
          component: () => import('../pages/client.page/payment.page.vue'),
        },
        {
          path: "/payment_return",
          name: "payment_return",
          component: () => import("../pages/client.page/payment.return.vue"),
        },
        {
          path: 'informations',
          name: 'information',
          component: () => import('../pages/client.page/user.page.vue'),
        },
        {
          path: 'abouts',
          name: 'about',
          component: () => import('../pages/client.page/about.page.vue'),
        },
        {
          path: 'contacts',
          name: 'contact',
          component: () => import('../pages/client.page/contact.page.vue'),
        },
        {
          path: 'guarantees',
          name: 'guarantee',
          component: () => import('../pages/client.page/guarantee.page.vue'),
        }
      ]
    },

    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin.view.vue'),
        children:[
          {
            path: '',
            name: 'admin',
            component: () => import('../pages/admin.page/admin.page.vue'),
          },
          {
            path: 'user',
            name: 'user',
            component: () => import('../pages/admin.page/user.page.vue'),
          }, 
          {
            path: 'cat',
            name: 'cat',
            component: () => import('../pages/admin.page/cat.page.vue'),
          },
          {
            path: 'coupon',
            name: 'coupon',
            component: () => import('../pages/admin.page/coupon.page.vue'),
          },
          {
            path: 'product',
            name: 'product',
            component: () => import('../pages/admin.page/product.page.vue'),
          },
          {
            path: 'img',
            name: 'img',
            component: () => import('../pages/admin.page/img.page.vue'),
          },
          {
            path: 'order',
            name: 'order',
            component: () => import('../pages/admin.page/order.page.vue'),
          }
        ]
      }
    ],
    scrollBehavior(to, from, savedPosition) {
      // Trả về vị trí cuộn trang được lưu trữ (nếu có) hoặc cuộn về đầu trang
      return savedPosition || { top: 0 };
    }
    
  })
  export default router;