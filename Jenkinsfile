pipeline {
    agent any
    
    environment {
        DIRECTORY_PATH = '.'
        TESTING_ENVIRONMENT = 'NishaniTest'
        STAGING_ENVIRONMENT = 'NishaniStag'
        PRODUCTION_ENVIRONMENT = 'NishaniProd'
        REPO = 'https://github.com/nishlfernando11/EventsApp'
    }
    stages {
        stage('Build') {
            steps {
                sleep(2) //simulate a new commit to the repository
                echo "Checking out code from ${env.REPO}"
                sleep(1) //simulate a checking out
                echo 'Installing dependencises...'
                echo 'Running npm install' // NPM for building node
                echo 'Running webpack..'
                echo 'Bundling: webpack --config webpack.config.js' // Bundle modules with webpack
                echo 'Running npm run build' // Build application
                // build
                sleep(2) //simulate build
                echo 'Build complete!' // Build application
            }
        }
        stage('Unit and Integration Tests') {
            steps {
                echo "Running unit tests and integration tests on ${env.TESTING_ENVIRONMENT}.."
                echo 'npm test' // npm test are running for Node.JS application
                sleep(2) //simulate test run
                sh 'echo "Unit/Integration tests complete!" > tests.log'

            }
            post {
                always {
                    script {
                        echo "Current Build status: ${currentBuild.result}.."
                    }
                    emailext(
                    to: 'nlfernando11@gmail.com',
                    subject: "Unit and Integration Tests: ${currentBuild.result}!",
                    body: "Unit/Integration test run was completed for #${env.BUILD_NUMBER} on TEST env: ${env.TESTING_ENVIRONMENT}. The test suit ${currentBuild.result}!",
                    attachLog: true
                    )   
                }
            }
        }
        stage('Code Analysis') {
            steps {
                echo 'Running SonarQube for analysis...'
                echo 'Sonar scanner is running..'
                // run scanner
                sleep(2) //simulate sonar scanning
                echo 'Scan complete!'
            }
        }
        stage('Security Scan') {
            steps {
                echo 'Running CodeQL for security scan...'
                // run security scanner: CodeQL for semantic checks
                sleep(2) //simulate security scan
                echo 'Security scan complete!'
            }
            post {
                always {
                    script {
                        echo "Current Build status: ${currentBuild.result}.."
                    }
                    emailext(
                            to: 'nlfernando11@gmail.com',
                            subject: "Security Scan: ${currentBuild.result}!",
                            body: "Security Scan was completed for #${env.BUILD_NUMBER} on TEST env: ${env.TESTING_ENVIRONMENT}. Security Scan: ${currentBuild.result}!",
                            attachLog: true
                         )
                }
            }
        }
        stage('Deploy to Staging'){
            steps {
                echo "Deploy the code to the staging environment: ${env.STAGING_ENVIRONMENT}"
                echo 'Deploying to Azure Compute instance: STAGING..'
                // deploy
                sleep(2) //simulate deployment
                echo 'Deployment complete!'
            }
        }
        stage('Integration Tests on Staging') {
            steps {
                echo "Running unit tests and integration tests on ${env.STAGING_ENVIRONMENT}.."
                echo 'npm test' //npm test are running for Node.JS application
                sleep(3) //simulate test run
                echo 'Unit/Integration tests complete!'
            }
        }
        stage('Deploy to Production') {
            steps {
                echo "Deploy the application to the production environment : ${env.PRODUCTION_ENVIRONMENT}"
                echo 'Deploying to Azure Compute cluster: PRODUCTION..'
                 // deploy
                 sleep(3) //simulate deployment
                echo 'Deployment complete!'

            }
            
        }
     
    }
  
}
