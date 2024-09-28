pipeline {
    agent any
    environment {
        REPO = 'https://github.com/nishlfernando11/EventsApp.git'
        DOCKER_CREDENTIALS_ID = 'dockerhub' // Jenkins credentials ID
        DOCKER_USERNAME=credentials('docker-username')
        DOCKER_PASSWORD=credentials('docker-pass')
        DOCKER_IMAGE_CLIENT = 'nishani/eventapp-client' //client image
        DOCKER_IMAGE = 'nishani/eventapp-server'  // server image
        DOCKER_TAG = 'latest'  // get latest images to build
        DOCKERFILE_PATH = '.'  // docker root path
        REGISTRY_URL = 'https://hub.docker.com/repositories'
        SSH_KEY = credentials('azure-ssh-key') // Jenkins SSH credentials for Azure VM
        PRODUCTION_ENVIRONMENT = credentials('azure-vm-host')
        SONARQUBE_SERVER = 'SonarQube-server' // SonarQube instance configured in Jenkins
        SONARQUBE_CLIENT = 'SonarQube-client' // SonarQube instance configured in Jenkins
        SONARQUBE_TOKEN = credentials('sonar-token-eventapp-client')
        SONARQUBE_TOKEN_API = credentials('sonar-token-eventapp-server')
        SONARQUBE_HOST='http://localhost:9000' // SonarQube host
        CONTAINER_NAME_API = 'event-app-server-container' // Name of the running container
        CONTAINER_NAME = 'event-app-client-container' // Name of the running container
        NEXT_PUBLIC_API_URL='http://myeventson.online/:8080/api'
        FRONT_END_URL='http://myeventson.online'

    }
    stages {
        stage('git Build') {
            parallel {
                stage('checkout') {
                    steps {                    
                        echo "Checking out code from ${env.REPO}"
                        git branch: 'main', url: "${env.REPO}"
                    }
                }
                stage('server') {
                    steps {
                        dir('server') {
                             script {
                                sh 'npm install'
                            }
                            // docker build
                            script {
                                dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}","--build-arg FRONT_END_URL=${FRONT_END_URL} --no-cache ${DOCKERFILE_PATH}")
                            }

                            // push docker
                            script{
                                withCredentials([usernamePassword(credentialsId: "$DOCKER_CREDENTIALS_ID", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                                    sh """
                                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                                        docker push $DOCKER_IMAGE:$DOCKER_TAG
                                    """
                                }
                            }
                        }

                    }     

                }
                stage('client') {
                    steps {
                        dir('client') {
                            script {
                                sh 'npm install'
                             }
                            script {
                                dockerImage = docker.build("${DOCKER_IMAGE_CLIENT}:${DOCKER_TAG}", "--build-arg NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} --no-cache ${DOCKERFILE_PATH}")
                            }
                            script {
                                withCredentials([usernamePassword(credentialsId: "$DOCKER_CREDENTIALS_ID", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                                sh """
                                    docker push $DOCKER_IMAGE_CLIENT:$DOCKER_TAG
                                """
                                }
                            }
                            script {
                                sh "docker rmi ${DOCKER_IMAGE_CLIENT}:${DOCKER_TAG}"
                            }
                        }

                    }
                }

            }
        }
        stage('Unit and Integration Tests') { // unit test on test environment
            parallel {
                stage('server') {
                    steps {
                        echo "Running server unit tests"
                        dir('server') {
                            sh 'npm run test'
                        }
                    }   

                }
                stage('client') {
                    steps {
                        echo "Running client unit tests"
                        dir('client') {
                            sh 'npm run test'
                        }
                    }
                }
            }
            post {
                always {
                    script {
                        echo "Current Build status: ${currentBuild.result}.."
                    }
                    emailext(
                    to: 'nlfernando11@gmail.com',
                    subject: "Unit and Integration Tests: ${currentBuild.result}!",
                    body: "Unit/Integration test run was completed for #${env.BUILD_NUMBER} on TEST environment. The test suit ${currentBuild.result}!",
                    attachLog: true
                    )   
                }
            }
        }
        stage('Code Analysis') { // code analysis on test environment
            parallel {
                stage('server'){
                    steps {
                        echo 'Running SonarQube for analysis...'
                        echo 'Sonar scanner is running..'
                        // server
                        dir('server') {
                            // Run SonarQube analysis
                            withSonarQubeEnv("${SONARQUBE_SERVER}") { 
                                sh """
                                sonar-scanner \
                                -Dsonar.projectKey=EventApp-Server \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=$SONARQUBE_HOST \
                                -Dsonar.login=$SONARQUBE_TOKEN_API
                                """
                            }
                        }
                        echo 'Server scan complete!'
                    }

                }
                stage('client'){
                    steps {
                        // client
                        dir('client') {
                            script {
                                // Run SonarQube analysis
                                withSonarQubeEnv("${SONARQUBE_CLIENT}") { 
                                    sh """
                                    sonar-scanner \
                                    -Dsonar.projectKey=EventApp-Client \
                                    -Dsonar.sources=. \
                                    -Dsonar.host.url=$SONARQUBE_HOST \
                                    -Dsonar.login=$SONARQUBE_TOKEN
                                    """
                                }
                            }
                        }
                        echo 'Client scan complete!'
                    }

                }
            }
        }
        stage('Approval') {
            steps {
                script {
                    def userInput = input(
                        message: 'Permission to Release?', 
                        ok: 'Yes, proceed', 
                        submitter: 'admin',
                        parameters: [choice(name: 'Approval', choices: ['Proceed', 'Abort'], description: 'Select an option')]
                    )

                    if (userInput == 'Proceed') {
                        echo 'Approved, proceeding...'
                    } else {
                        error 'Approval was denied, stopping the pipeline.'
                    }
                }
            }
        }
        stage('Deploy'){ // deploy to test environment
            parallel {
                stage('server') {
                    steps {
                        echo "Deploy the code to the test environment (local)"
                        dir('server') {
                            script {
                                sh 'docker compose down'
                                sh 'docker compose up -d'
                            }
                        }
                        echo 'Deployment complete!'
                    }

                }
                stage('client') {
                    steps {
                        dir('client') {
                            script {
                                sh 'docker compose down'
                                sh 'docker compose up -d'
                            }
                        }
                    }

                }

            }
            
        }
        stage('Release') { // release to producttion environment
            steps {
                echo "Deploy the application to the production environment : ${env.PRODUCTION_ENVIRONMENT}"
                script {
                    sh """
                        ssh -i ${SSH_KEY} ${PRODUCTION_ENVIRONMENT} << EOF
                        docker pull ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker stop ${CONTAINER_NAME_API}
                        docker rm ${CONTAINER_NAME_API}
                        docker run -d --name ${CONTAINER_NAME_API} -p 8080:3003 ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker pull ${DOCKER_IMAGE_CLIENT}:${DOCKER_TAG}
                        docker stop ${CONTAINER_NAME}
                        docker rm ${CONTAINER_NAME}
                        docker run -d --name ${CONTAINER_NAME} -p 80:3000 -e NEXT_PUBLIC_API_URL='http://20.70.137.156:8080/api' ${DOCKER_IMAGE_CLIENT}:${DOCKER_TAG}
EOF
                    """
                }
                echo 'Deployment complete!'

            }
            
        }
     
    }
  
}
