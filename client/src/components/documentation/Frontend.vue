<template>
    <div class="frontent-block">
        <h3 class="m-b-20">Frontent</h3>
        <h5>Arquitecture</h5>
        <ul class="doc-list">
            <li>Having chosen <b>Vue.js as the Frontend framework</b>, the whole client project has been created based on <b>Vue/Cli 3</b>.</li>
            <li><b>Single-file vue components:</b> The parent components for each view are located in /src/views and their children components in /src/components.</li>
            <li>A <b>global state of the application</b> is handled by the <b>Vuex</b> library. The /store.js contains the mutations, actions and getters that can be used in all the components. Some of the cases are the login/logout processes, save the logged user info in the global state, trigger a modal popup, etc...</li>
        </ul>
        <h5 class="m-t-20">Routes</h5>
        <ul class="doc-list">
            <li>The frontend is based on a <b>Single page application</b>. The main template is <b>/src/App.vue</b></li>
            <li>Our routes are defined at <b>/src/router.js</b> and handled by <b>Vue Router</b> in history mode.</li>
            <li>Lazy loading is used for each route and allows to split the js bundle for each view.</li>
        </ul>
        <h5 class="m-t-20">Stylings</h5>
        <ul class="doc-list">
            <li>The main layout is based on <b>Bootstrap 4</b>.</li>
            <li>Apart from bootstrap stylings, <b>custom stylings</b> are also imported to the app from <b>/src/assets/sass/app.scss</b>. Some of the bootstrap variables are overwritten in our custom <b>variables.scss</b> file.</li>
            <li><b>Vue components stylings</b> are defined in the style section of each in vue file. <b>SCSS language</b> is used and variables defined in /src/assets/sass/variables.scss can be used.</li>
        </ul>
        <h5 class="m-t-20">Http Requests</h5>
        <ul class="doc-list">
            <li>Http requests are handled by the <b>axios</b> library. Our main configuration is defined at <b>/api.js</b> file.</li>
            <li>The <b>$http method</b> within the Vue prototype will allow the use of axios inside all our vue components.</li>
            <li>An interceptor is used to <b>inject the token</b> in the header of all the requests.</li>
            <li>An interceptor is used to <b>handle the expired session</b> for all the responses. In case of an expired session, the user will be logged out and redirected to the login page with an expired session feedback.</li>
        </ul>
        <h5 class="m-t-20">Validation</h5>
        <ul class="doc-list">
            <li>Form validation is handled by the <b>vee-validate</b> npm library.</li>
        </ul>
        <h5 class="m-t-20">Tests</h5>
        <ul class="doc-list">
            <li><b>Unit tests</b> environment has been implemented based on <b>mocha, chai</b> libraires and using the vue/cli mocha plugin. A tests battery is available for the Dashboard / ItemsBlock vue component. It can be launched with the following command from the client directory: <b class="text-monospace">npm run test:unit</b></li>
            <li><b>To do:</b> End to end tests environment should have been implemented. I would have chosen to install <b>NightwatchJs</b> library using the vue-cli plugin.</li>
        </ul>
        <h5 class="m-t-20">Development practices</h5>
        <ul class="doc-list">
            <li>The <b class="text-monospace">npm run serve</b> command starts a dev server (based on webpack-dev-server) that comes with Hot-Module-Replacement working out of the box.</li>
            <li>Code Linting using the <b>eslint</b> library</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Frontent'
};
</script>
