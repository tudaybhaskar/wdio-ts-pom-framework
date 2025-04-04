pipeline {
    agent any 
    
    environment {
        // You can add environment variables here if needed
        NODEJS_HOME = '/usr/local/bin/node' // Path to your Node.js
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/tudaybhaskar/wdio-ts-pom-framework.git'
            }
        }

        stage('Install Dependences') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'chmod +x run-tests.sh' // Ensure script is executable
                sh './run-tests.sh'
            }
            post {
                always {
                    // Archive test results
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-report/**', 
            fingerprint: true
            cleanWs()
        }
    }
}