pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                ./image_build.sh
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}