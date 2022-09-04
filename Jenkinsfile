pipeline {
    agent any

    environment {

        
        AWS_ACCESS_KEY_ID     = credentials('Fatimah-K-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('Fatimah-K-aws-secret-access-key')

        AWS_S3_BUCKET = "fatimah-k-belt2d2-artifacts-123456"
        ARTIFACT_NAME = "helloworld.jar"
        AWS_EB_APP_NAME = "Java-app"
        AWS_EB_APP_VERSION = "${BUILD_ID}"
        AWS_EB_ENVIRONMENT = "Javaapp-env"
        
        SONAR_IP_HOST= "52.23.193.18"
        SONAR_TOKEN= "sqp_720d4c38a844e40d68d70b4206a4bd13f6de9b8f"

    }

    stages {
        stage('Validate') {
            steps {
                
                sh "mvn validate"

                sh "mvn clean"

            }
        }

         stage('compile') {
            steps {
                
                sh "mvn compile"

            }
        }
        
        stage('Qualty Scan') {
            steps{

                sh '''
                  
                mvn clean verify sonar:sonar \
                   -Dsonar.projectKey=online-Fatimah-K-B2D2 \
                   -Dsonar.host.url=http://$SONAR_IP_HOST \
                   -Dsonar.login=$SONAR_TOKEN
                '''

            }

        }
        
        stage('Package') {
            steps {
                
                sh "mvn package"

            }

            post {
                success {
                    archiveArtifacts artifacts: '**/target/**.jar', followSymlinks: false

                   
                }
            }
        }

        stage('Publish artefacts to S3 Bucket') {
            steps {

                sh "aws configure set region us-east-1"

                sh "aws s3 cp ./target/**.jar s3://$AWS_S3_BUCKET/$ARTIFACT_NAME"
                
            }
        }

        stage('Deploy') {
            steps {

                sh 'aws elasticbeanstalk create-application-version --application-name $AWS_EB_APP_NAME --version-label $AWS_EB_APP_VERSION --source-bundle S3Bucket=$AWS_S3_BUCKET,S3Key=$ARTIFACT_NAME'

                sh 'aws elasticbeanstalk update-environment --application-name $AWS_EB_APP_NAME --environment-name $AWS_EB_ENVIRONMENT --version-label $AWS_EB_APP_VERSION'
            
                
            }
        }
        
    }
}