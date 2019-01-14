FROM node:10.15

RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 5000

ENTRYPOINT ["/bin/bash", "/app/run.sh"]
CMD ["start"]