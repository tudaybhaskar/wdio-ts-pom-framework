pipeline {
    agent any 
    
    environment {
        NODEJS_HOME = '/usr/local/bin/node'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', 
                url: 'https://github.com/tudaybhaskar/wdio-ts-pom-framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'chmod +x run-tests.sh'
                sh './run-tests.sh'
            }
            post {
                always {
                    script {
                        if (fileExists('allure-results')) {
                            allure includeProperties: false, 
                                  jdk: '', 
                                  results: [[path: 'allure-results']]
                        }
                        sh 'pkill -f "allure open" || true'
                    }
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