// Fixed CloudZero SDK with proper CommonJS/ESM interop
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import CommonJS modules properly
const OasModule = require('oas');
const Oas = OasModule.default || OasModule;

const APICoreModule = require('api/dist/core');
const APICore = APICoreModule.default || APICoreModule;

// Import JSON with proper ESM syntax
import definition from './openapi.json' with { type: 'json' };

class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'cloudzero/2.0.0 (api/6.1.3)');
    }
    
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    
    /**
     * This API will return cost data according to the parameters passed in.
     *
     * - Rate Limit: 60 requests/day.
     * - Timeout: 30 seconds.
     * - Pagination: Results are paginated in blocks of 10,000 records.
     *   - Using cursors for pagination doesn't affect the rate limit.
     *   - You have 24 hours to page through your results before you will need to rerun your
     * query.
     *   - While using pagination, your results will be static as of run time.
     * - This data is statically sorted as `usage_date asc`.
     *
     *  NOTE: The Dimension IDs referenced within this document are the IDs by which you
     * reference dimensions when authoring in CostFormation. You can read more about this
     * [here](https://docs.cloudzero.com/docs/costformation-definition-language-guide#specifying-sources).
     *
     * @throws FetchError<400, types.GetBillingCostsResponse400> Bad Request Error
     * @throws FetchError<403, types.GetBillingCostsResponse403> Forbidden
     * @throws FetchError<410, types.GetBillingCostsResponse410> Expired Cache Error
     * @throws FetchError<429, types.GetBillingCostsResponse429> Rate Limit Error
     */
    getBillingCosts(metadata) {
        return this.core.fetch('/v2/billing/costs', 'get', metadata);
    }
    
    /**
     * This API will return a list of dimensions available for use in the `getBillingCosts` API
     * and in CostFormation.
     *
     * @throws FetchError<400, types.GetBillingDimensionsResponse400> Bad Request Error
     * @throws FetchError<403, types.GetBillingDimensionsResponse403> Forbidden
     * @throws FetchError<410, types.GetBillingDimensionsResponse410> Expired Cache Error
     * @throws FetchError<429, types.GetBillingDimensionsResponse429> Rate Limit Error
     */
    getBillingDimensions(metadata) {
        return this.core.fetch('/v2/billing/dimensions', 'get', metadata);
    }
}

const createSDK = (() => { return new SDK(); })();
export default createSDK;