pipeline {
    agent any
    stages {
        stage('Build') {
            steps{
                sh 'docker system prune -af'
                sh 'docker build -t database ./database/'
                sh 'docker build -t backend ./backend/'
                sh 'docker build -t frontend ./frontend/'
            }
        }
    }
}