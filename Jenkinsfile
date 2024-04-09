pipeline {
    agent any

    stages {
        stage('Build') {
            node {
                def testImage = docker.build("database", "./database")
            }
        }
    }
}