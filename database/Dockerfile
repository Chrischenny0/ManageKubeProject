### Use the official MySQL image as the base image
FROM mysql:latest

### Set the root password, database name, and any other environment variable you wish to set at build-time
ENV MYSQL_ROOT_PASSWORD=your_root_password_here
ENV MYSQL_DATABASE=sakila

### Copy the sakila schema/data dump into the container to be executed upon initialization
COPY ./sakila-schema.sql /docker-entrypoint-initdb.d/1.sql
COPY ./sakila-data.sql /docker-entrypoint-initdb.d/2.sql