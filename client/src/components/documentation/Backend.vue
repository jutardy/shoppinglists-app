<template>
    <div class="backend-block">
        <h3 class="m-b-20">Backend</h3>
        <h5>Server</h5>
        <ul class="doc-list">
            <li>The server is started using the start.js file that is a <b>bridge requiring babel-register</b> so the rest of the application can be developed using <b>es6</b>.</li>
            <li>Proxy the requests through our index page with the <b>connect-history-api-fallback</b> library.</li>
        </ul>
        <h5 class="m-t-20">Database</h5>
        <ul class="doc-list">
            <li>The <b>Mongo database</b> is hosted on <b>mLab.com</b></li>
            <li>Object modeling and queries are handled by the <b>Mongoose</b> library.</li>
        </ul>
        <h5 class="m-t-20">Authentication</h5>
        <ul class="doc-list">
            <li>Token creation and verification is handled by the <b>jsonwebtoken</b> library.</li>
            <li><b>Token Verification</b> method is used as a <b>middleware</b> for all routes excepted authentication ones.</li>
            <li>Creation and verification methods are located at api/libs/token.js</li>
            <li><b>Token expiration</b> is by default 1 day but if the user logs in the app having checked the Remember me box, it will be set to 14 days.</li>
        </ul>
        <h5 class="m-t-20">Sockets</h5>
        <ul class="doc-list">
            <li>The real-time and bidirectional communication is handled by the <b>socket.io</b> library.</li>
            <li>Sockets communications methods are located at api/libs/sockets.js</li>
        </ul>
        <h5 class="m-t-20">Development practices</h5>
        <ul class="doc-list">
            <li>Automatic restart of the node application when file changes are detected with <b>nodemon</b> library.</li>
            <li>Log the HTTP requests using the <b>morgan</b> library.</li>
            <li>Code Linting using the <b>eslint</b> library</li> 
            <li><b>To do:</b> Unit tests environment should have been implemented to test our API. I would have chosen to install the following npm libraries <b>mocha, chai, sinon and sinon-mongoose</b></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Backend'
};
</script>
