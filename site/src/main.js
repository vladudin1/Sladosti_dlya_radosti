import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import Portfolio from './components/Portfolio.vue';
import FlavorsAndPrices from './components/FlavorsAndPrices.vue';
import About from './components/About.vue';
import Contacts from './components/Contacts.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/portfolio', component: Portfolio },
    { path: '/flavors-and-prices', component: FlavorsAndPrices },
    { path: '/about', component: About },
    { path: '/contacts', component: Contacts }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
