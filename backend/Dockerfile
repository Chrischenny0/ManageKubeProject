FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=your_root_password_here
ENV MYSQL_DATABASE=sakila

EXPOSE 3306

COPY ./sakila-db/sakila-schema.sql /docker-entrypoint-initdb.d/
COPY ./sakila-db/sakila-data.sql /docker-entrypoint-initdb.d/