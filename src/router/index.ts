import PagesFormsBuilderColEditComponentEdit from '@/pages/forms-builder/col/component/edit.vue';
import PagesFormsBuilderColEditComponentNew  from '@/pages/forms-builder/col/component/new.vue';
import PagesFormsBuilderColEdit              from '@/pages/forms-builder/col/edit.vue';
import PagesFormsBuilderEdit                 from '@/pages/forms-builder/edit.vue';
import PagesFormsBuilderIndex                from '@/pages/forms-builder/index.vue';
import PagesFormsBuilderNew                  from '@/pages/forms-builder/new.vue';
import PagesFormsIndex                       from '@/pages/forms/index.vue';
import PagesFormsRead                        from '@/pages/forms/read.vue';
import FormsBuilderView                      from '@/views/FormsBuilderView.vue';
import FormsView                             from '@/views/FormsView.vue';
import Vue                                   from 'vue';
import VueRouter, { RouteConfig }            from 'vue-router';
import HomeView                              from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path:      '/',
    name:      'home',
    component: HomeView,
  },
  {
    path:      '/forms',
    name:      'forms',
    component: FormsView,
    children:  [
      {
        path:      '/',
        component: PagesFormsIndex,
      },
      {
        path:      ':id',
        name:      'formRead',
        component: PagesFormsRead,
      },
    ],
  },
  {
    path:      '/forms-builder',
    name:      'forms-builder',
    component: FormsBuilderView,
    children:  [
      {
        path:      '/',
        component: PagesFormsBuilderIndex,
        children:  [
          {
            path:      'new',
            name:      'new',
            component: PagesFormsBuilderNew,
          },
        ],
      },
      {
        path:      ':id',
        name:      'formEdit',
        component: PagesFormsBuilderEdit,
        children:  [
          {
            path:      'cols/:colId',
            name:      'colEdit',
            component: PagesFormsBuilderColEdit,
            children:  [
              {
                path:      'components/new',
                name:      'componentNew',
                component: PagesFormsBuilderColEditComponentNew,
              },
              {
                path:      'components/:componentId',
                name:      'componentEdit',
                component: PagesFormsBuilderColEditComponentEdit,
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
