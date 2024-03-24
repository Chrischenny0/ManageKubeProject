### Use the official MySQL image as the base image
FROM mysql:latest

### Set the root password, database name, and any other environment variable you wish to set at build-time
ENV MYSQL_ROOT_PASSWORD=your_root_password_here
ENV MYSQL_DATABASE=sakila

### Expose port 3306 to allow communication to/from the server
EXPOSE 3306

### Copy the sakila schema/data dump into the container to be executed upon initialization
COPY ./sakila.sql /docker-entrypoint-initdb.d/

### Use the default command for the mysql image, which starts the database server.
### Custom commands can be specified but are generally not needed unless you have specific requirements.
### CMD ["mysqld", "-uroot", "-pyour_root_password_here"] is not necessary as the mysql image handles this.