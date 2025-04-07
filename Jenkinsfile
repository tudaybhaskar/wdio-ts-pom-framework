pipeline {
    agent any
    environment {
        NODEJS_HOME = '/usr/local/bin/node'
        BASE_URL = 'https://your-test-env.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh """
                        chmod +x e2e-run-tests.sh
                        ./e2e-run-tests.sh \
                            "$BASE_URL" \
                            "smoke" \
                            "" \
                            "" \
                            "" \
                            "quarantine"
                    """
                }
            }
            post {
                always {
                    if (fileExists('wdio/allure-results')) {
                        allure includeProperties: false, 
                        jdk: '', 
                        results: [[path: 'wdio/allure-results']]
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'wdio/allure-report/**'
            cleanWs()
        }
    }
}