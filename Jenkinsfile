pipeline {
    agent any

    stages {
        stage('Code Coverage') {
            steps {
                script {
                    cobertura coberturaReportFile: 'coverage/cobertura-coverage.xml', conditionalCoverageTargets: '30, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '30, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '30, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
                }
            }
        }
    }
}
