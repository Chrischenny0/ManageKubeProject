pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh ./image_build.sh
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