pipeline {
    agent any
    environment {
        // Dynamic versions will be set in Setup stage
        NODE_VERSION = ""
        YARN_VERSION = ""
        TEST_SCRIPT = "jenkins/e2e-run-tests.sh"
        // Safe parameter handling - Jenkins Error Throwed
        BASE_URL = "${params.BASE_URL ? params.BASE_URL : 'https://your-test-env.com'}"
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Ensure Yarn binary exists
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
                    def nodeVersion = readFile('.nvmrc').trim()
                    env.NODE_VERSION = nodeVersion

                    // Read Yarn version from .yarnrc.yml
                    def yarnrc = readYaml file: '.yarnrc.yml'
                    env.YARN_VERSION = yarnrc.yarnPath.split('-')[1].replace('.cjs', '')

                    // Configure paths
                    env.PATH = "${tool "NodeJS-${NODE_VERSION}"}/bin:${env.PATH}"
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
                sh """
                    # Verify Node
                    if ! node --version | grep -q "v${NODE_VERSION}"; then
                        echo "ERROR: Need Node ${NODE_VERSION}"
                        exit 1
                    fi

                    # Verify Yarn
                    if ! yarn --version | grep -q "${YARN_VERSION}"; then
                        echo "ERROR: Need Yarn ${YARN_VERSION}"
                        exit 1
                    fi
                """
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
                sh """
                    chmod +x ${TEST_SCRIPT}
                    ./${TEST_SCRIPT} \
                        "${BASE_URL}" \
                        "smoke" \
                        "" \
                        "" \
                        "" \
                        "quarantine"
                """
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
        string(name: 'BASE_URL', 
               defaultValue: 'https://your-test-env.com', 
               description: 'Test environment URL')
    }
}