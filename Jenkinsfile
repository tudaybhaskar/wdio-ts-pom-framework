pipeline {
    agent any
    environment {
        // Enable Corepack in Jenkins
        PATH = "${tool 'NodeJS'}/bin:${env.PATH}"
        BASE_URL = params.BASE_URL ?: 'https://your-test-env.com'
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Auto-install correct Yarn version from package.json
                    sh '''
                        corepack enable
                        corepack prepare --all
                    '''
                }
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // sh # Ensure Yarn is used per package.json
                // corepack enable
                // sh 'yarn install --frozen-lockfile'
                yarn install --immutable
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
    parameters {
        string(name: 'BASE_URL', defaultValue: 'https://your-test-env.com', description: 'Test environment URL')
    }
}