FROM node:20.5.0-alpine3.18

WORKDIR /app/
RUN mkdir datos
COPY --chown=node package*.json .
RUN npm install
COPY --chown=node . .

EXPOSE 8550

CMD [ "npm", "run", "start" ]
