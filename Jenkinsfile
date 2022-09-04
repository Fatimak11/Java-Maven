pipeline {
    agent any

    environment {

        
        AWS_ACCESS_KEY_ID     = credentials('Access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('Secret-access-key')

        AWS_S3_BUCKET = "fatima-s3-artifact"
        ARTIFACT_NAME = "helloworld.jar"
        AWS_EB_APP_NAME = "Java-app"
        AWS_EB_APP_VERSION = "${BUILD_ID}"
        AWS_EB_ENVIRONMENT = "Javaapp-env-1"
        
       
    }

    stages {
        stage('Validate') {
            steps {
                
                sh "mvn validate"

                sh "mvn clean"

            }
        }

         stage('Compile') {
            steps {
                
                sh "mvn compile"

            }
        }
        
         stage('Test') {
            steps {
                
                sh "mvn test"

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