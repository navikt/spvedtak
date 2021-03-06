class Environment {

    private env = (window as any)._env_;

    get isDev() {
        return this.env.ENVIRONMENT === 'dev'
    }

    get isQ1() {
        return this.env.ENVIRONMENT === 'q1'
    }

    get isProd() {
        return this.env.ENVIRONMENT === 'prod'
    }

    get syfoapiRoot() {
        return this.env.SYFOAPI_ROOT
    }

    get sykmeldingerBackendProxyRoot() {
        return this.env.SYKMELDINGER_BACKEND_PROXY_ROOT
    }

    get spinnsynRoot() {
        return this.env.SPINNSYN_ROOT
    }

    get flexinntektsmeldingRoot() {
        return this.env.FLEXINNTEKTSMELDING_ROOT
    }

    get isMockBackend() {
        return this.env.MOCK_BACKEND === 'true'
    }

    get isOpplaering() {
        return this.env.OPPLAERING === 'true'
    }

    get loginServiceUrl() {
        return this.env.LOGINSERVICE_URL
    }

    get loginServiceRedirectUrl() {
        return this.env.LOGINSERVICE_REDIRECT_URL
    }

    get baseName() {
        return this.env.BASE_NAME
    }

    get sykefravaerUrl() {
        return this.env.SYKEFRAVAER_URL
    }
}

const env = new Environment()

export default env
