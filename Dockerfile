FROM lukechannings/deno:v1.29.2

EXPOSE 7777

WORKDIR /app

COPY deps.js .

RUN deno cache deps.js

COPY . .

CMD [ "deno", "run", "--allow-env", "--allow-net", "--allow-read", "--watch", "--unstable", "app.js" ]