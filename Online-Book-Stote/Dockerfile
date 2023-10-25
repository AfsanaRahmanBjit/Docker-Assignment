FROM node:18.17.0

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install
# RUN npm install -g nodemon
# RUN npm install bcrypt


# Install the required build tools and rebuild the bcrypt package
RUN apt-get update && apt-get install -y build-essential
RUN npm install
RUN npm install -g nodemon
RUN npm install bcrypt

COPY . .

EXPOSE 8000

CMD [ "npm", "run","dev"]
