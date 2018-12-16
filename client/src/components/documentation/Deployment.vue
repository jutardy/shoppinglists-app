<template>
    <div class="deployment-block">
        <h3 class="m-b-20">Deployment</h3>
        <ul class="doc-list">
            <li class="m-t-20">
                Node Installation
                <!-- eslint-disable -->
                <pre><code>curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs
sudo apt install -y build-essential</code></pre>
                <!-- eslint-enable -->
            </li>
            <li class="m-t-20">
                Nginx Installation
                <!-- eslint-disable -->
                <pre><code>sudo apt update
sudo apt install -y nginx
sudo ufw allow 'Nginx HTTP'</code></pre>
                <!-- eslint-enable -->
            </li>
            <li class="m-t-20">
                Nginx Configuration in /etc/nginx/sites-available/default
                <!-- eslint-disable -->
                <pre><code>server {
    listen 80 default_server;
    listen [::]:80 default_server; 
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_ssl_session_reuse off;
        proxy_set_header Host $http_host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }
} </code></pre>
                <!-- eslint-enable -->
                Start nginx service
                <code>sudo systemctl start nginx</code>
            </li>
            <li class="m-t-20">
                Git Installation and project upload
                <!-- eslint-disable -->
                <pre><code>sudo apt-get install git-core
cd ~
sudo git clone https://github.com/jutardy/shoppinglists-app.git shoppinglists</code></pre>
                <!-- eslint-enable -->
            </li>
            <li class="m-t-20">
                Backend configuration
                <!-- eslint-disable -->
                <pre><code>cd ~/shoppinglists
sudo npm install node-sass -g --unsafe-perm
sudo npm install</code></pre>
                <!-- eslint-enable -->
                Duplicate .env.example as .env file entering the app secret and database credentials
            </li>
            <li class="m-t-20">
                Frontend configuration
                <!-- eslint-disable -->
                <pre><code>cd ~/shoppinglists/client
sudo npm install node-sass --save-dev --unsafe-perm
sudo npm install
sudo npm run build #This process was killed, see workarounds section below</code></pre>
                <!-- eslint-enable -->
            </li>
            <li class="m-t-20">
                Provision our node script as a service using <b>forever</b> and <b>forever-service</b> libraries
                <!-- eslint-disable -->
                <pre><code>cd ~/shoppinglists
sudo npm install -g forever forever-service
sudo forever-service install shoppinglists --script start.js
sudo service shoppinglists start</code></pre>
                <!-- eslint-enable -->
            </li>
        </ul>
        <h5 class="m-t-20">Workarounds</h5>
        <ul class="doc-list">
            <li>During the frontend configuration step, I faced an issue launching the command <code>sudo npm run build</code>. This process that is meant to build the production files in a dist folder was always killed. I suspect a RAM issue is the possible cause. My workaround was to launch this command locally and then transfer the local dist folder to the server at ~/shoppinglists/client</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Deployment'
};
</script>
