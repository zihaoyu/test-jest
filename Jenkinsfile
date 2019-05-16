pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    git changelog: false, poll: false, url: 'git@github.com:zihaoyu/test-jest.git'
                }
            }
        }

        stage('Code Coverage') {
            steps {
                script {
                    cobertura coberturaReportFile: 'coverage/cobertura-coverage.xml', conditionalCoverageTargets: '30, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '30, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '30, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false

                    def response = httpRequest(
                        url: 'http://jenkins/job/z-tests/job/test-code-coverage/lastSuccessfulBuild/cobertura/api/json?depth=2',
                        httpMode: 'GET',
                        authentication: 'zihaoyu-api-token',
                        responseHandle: 'STRING',
                        validResponseCodes: '200',
                        acceptType: 'APPLICATION_JSON'
                    )
                    def resp = readJSON(text: response.content)
                    def prevCoverage = resp.results.elements

                    response = httpRequest(
                        url: "http://jenkins/job/z-tests/job/test-code-coverage/${env.BUILD_NUMBER}/cobertura/api/json?depth=2",
                        httpMode: 'GET',
                        authentication: 'zihaoyu-api-token',
                        responseHandle: 'STRING',
                        validResponseCodes: '200',
                        acceptType: 'APPLICATION_JSON'
                    )
                    resp = readJSON(text: response.content)
                    def currCoverage = resp.results.elements

                    def prevFiles = prevCoverage.find{ it.name.equals('Files') }.ratio
                    def prevClasses = prevCoverage.find{ it.name.equals('Classes') }.ratio
                    def prevMethods = prevCoverage.find{ it.name.equals('Methods') }.ratio
                    def prevLines = prevCoverage.find{ it.name.equals('Lines') }.ratio
                    def prevCond = prevCoverage.find{ it.name.equals('Conditionals') }.ratio

                    def currFiles = currCoverage.find{ it.name.equals('Files') }.ratio
                    def currClasses = currCoverage.find{ it.name.equals('Classes') }.ratio
                    def currMethods = currCoverage.find{ it.name.equals('Methods') }.ratio
                    def currLines = currCoverage.find{ it.name.equals('Lines') }.ratio
                    def currCond = currCoverage.find{ it.name.equals('Conditionals') }.ratio

                    boolean dropped = (currFiles < prevFiles) || (currClasses < prevClasses) || (currMethods < prevMethods) || (currLines < prevMethods) || (currCond < prevCond)

                    String message = "Code Coverage:\n" +
                            "[ Files        ] ${currFiles}%, previous ${prevFiles}%\n" +
                            "[ Classes      ] ${currClasses}%, previous ${prevClasses}%\n" +
                            "[ Methods      ] ${currMethods}%, previous ${prevMethods}%\n" +
                            "[ Lines        ] ${currLines}%, previous ${prevLines}%\n" +
                            "[ Conditionals ] ${currCond}%, previous ${prevCond}%"
                    echo message

                    if (dropped) {
                        error("Code coverage failed.")
                    }
                }
            }
        }
    }
}
