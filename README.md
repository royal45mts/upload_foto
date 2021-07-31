# UPLOAD IMAGE

## .env

```bash
PORT=3500
SERVER=http://localhost:3500/
HOST=localhost
DATABASE=test_upload_gambar
USERNAME=root
PASSWORD=null
PORT_MYSQL=3306
MYSQL=mysql

```

## Build Setup

```bash

# install dependencies
$ yarn install

# build for production and launch server
$ yarn start

# generate DATABASE
seaquelize db:migrate

```

# rest api

```bash
# get all
$ get: url/get_images

# get one
$ get: url/get_images/:id

# upload
$ put: url/get_images
# form data
# img

# deleted
$ deleted: url/get_images/:id

```

# DOCKER

```bash
$ docker build -t back_end:1 .

$ docker-compose up -d

```

