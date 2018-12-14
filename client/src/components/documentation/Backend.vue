<template>
    <div class="backend-block">
        <h3 class="m-b-20">Backend</h3>
        <h5>Server</h5>
        <ul class="doc-list">
        	<li>The server is started using the start.js file that is a bridge requiring babel-register so the rest of the application can be developed using es6.</li>
        	<li></li>
        </ul>
        <h5 class="m-t-20">Database</h5>
        <ul class="doc-list">
        	<li>The Mongo database is hosted on mLab.com</li>
        	<li>Object modeling and queries are handled by the Mongoose library.</li>
        </ul>
        <h5 class="m-t-20">Authentication</h5>
        <ul class="doc-list">
        	<li>Token creation and verification is handled by the jsonwebtoken library.</li>
        	<li>api/libs/token.js</li>
        </ul>
        <h5 class="m-t-20">Sockets</h5>
        <ul class="doc-list">
        	<li>The real-time and bidirectional communication is handled by the socket.io library.</li>
        	<li>api/libs/sockets.js</li>
        </ul>
        <h5 class="m-t-20">Development practices</h5>
        <ul class="doc-list">
        	<li>nodemon</li>
        	<li>morgan</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Backend'
};
</script>
