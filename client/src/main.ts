import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './public/style/reset.less';
import './public/style/variable.less';
import './public/style/common.less';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
