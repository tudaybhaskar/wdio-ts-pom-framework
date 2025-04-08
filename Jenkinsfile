pipeline {
    agent any
    environment {
        TEST_SCRIPT = 'jenkins/e2e-run-tests.sh'
        BASE_URL = "${params.BASE_URL ?: 'https://your-test-env.com'}"
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Create Yarn release directory if needed
                    sh '''
                    mkdir -p .yarn/releases
                    if [ ! -f .yarn/releases/yarn-4.8.1.cjs ]; then
                        echo "Downloading Yarn 4.8.1..."
                        curl -L https://github.com/yarnpkg/berry/raw/%40yarnpkg/cli/4.8.1/packages/yarnpkg-cli/bin/yarn.js \
                            -o .yarn/releases/yarn-4.8.1.cjs
                        chmod +x .yarn/releases/yarn-4.8.1.cjs
                    fi
                    '''

                    // Read Node version from .nvmrc
                    env.NODE_VERSION = sh(script: "cat .nvmrc | tr -d '[:space:]'", returnStdout: true).trim()

                    // Alternative Yarn version detection without readYaml
                    env.YARN_VERSION = sh(script: """
                        grep 'yarnPath' .yarnrc.yml | awk -F'-' '{print \$2}' | awk -F'.' '{print \$1\".\"\$2\".\"\$3}'
                    """, returnStdout: true).trim()

                    // Verify Node installation
                    sh "node --version | grep 'v${env.NODE_VERSION}' || { echo 'Node version mismatch'; exit 1; }"
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Tools') {
            steps {
                script {
                    // Verify Yarn version
                    sh """
                    if ! yarn --version | grep -q "${env.YARN_VERSION}"; then
                        npm install -g yarn@${env.YARN_VERSION}
                    fi
                    """
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                yarn config set nodeLinker node-modules
                yarn install --immutable --inline-builds
                '''
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Verify script exists and is executable
                    sh """
                    if [ ! -f ${env.TEST_SCRIPT} ]; then
                        echo "Error: Test script not found at ${env.TEST_SCRIPT}"
                        exit 1
                    fi
                    chmod +x ${env.TEST_SCRIPT}
                    ./${env.TEST_SCRIPT} \
                        "${env.BASE_URL}" \
                        "smoke" \
                        "" \
                        "" \
                        "" \
                        "quarantine" || true
                    """
                }
            }
            post {
                always {
                    script {
                        if (fileExists('wdio/allure-results')) {
                            allure includeProperties: false,
                                  jdk: '',
                                  results: [[path: 'wdio/allure-results']]
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('wdio/allure-report')) {
                    archiveArtifacts artifacts: 'wdio/allure-report/**'
                }
            }
            cleanWs()
        }
    }

    parameters {
        string(
            name: 'BASE_URL',
            defaultValue: 'https://your-test-env.com',
            description: 'Test environment URL'
        )
    }
}