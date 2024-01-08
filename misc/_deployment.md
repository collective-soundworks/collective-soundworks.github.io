# Deploying on the Internets

If you want want to deploy a single application on a single server, there is no particular complexity as the only thing you will have to do is to start the server on the port 80 for `http` or port 443 for `https`.

However, a more common situation is the need deploy several applications on the same server. Generally this is done by having a proxy server (`Nginx` or `Apache`) that handle the requests (and possibly the `https` certificates) and internally route the requests the proper `Node.js` / `soundworks` server.

In the remaining of this page we assume your domain is `http(s)://my-domain.com` and that you want to run an application behind the path `my-app`, so that the default soundworks client should be accessible at `http(s)://my-domain.com/my-app`

## Application Configure 

The first thing to do is to create a new `env` config file (e.g. `config/env/prod.json`) that will contain your production informations:

```js
// cf. config/env/prod.json
{
  // you are in a production environement
  type: 'production',
  // the soundworks server will listen to the port 8002
  port: 8002,
  // the application will be accessible at the subpath `my-app`
  subpath: 'my-app',
  // no need to use https as this will be handled by the proxy server
  useHttps: false,
}

```

Then, simply launch the `soundworks` application using this config file:

```sh
ENV=prod node ./.build/server/index.js
```

:::tip 
An interesting free tool to deploy and monitor several applications is [`pm2`](https://pm2.keymetrics.io/)
:::

## Nginx Config

The `nginx` proxy server will need to be configured so that it route all request to `/my-app/*` to the port `8002`

This is done simply by adding a new `location` configuration in the nginx config file (generally located at `/etc/nginx/nginx.conf`), such as:

```js
// cf. /etc/nginx/nginx.conf
http {
  # need this map
  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }

  server {
    listen 80;
    # listen 443; # for https

    # location that internaly redirects all requests to 
    # `/my-app/*` to the port 8002
    location /my-app {
      rewrite ^/my-app/?(.*)$ /$1 break;
      proxy_pass http://localhost:8002;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
    }
  }
}
```

Then reload the `nginx` config:

```sh
nginx -s reload
```

And your application should be accessible on the internets at `http(s)://my-domain.com/my-app`!

## Apache Config

:::warning @todo
...
:::

