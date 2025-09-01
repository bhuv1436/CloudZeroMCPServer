import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

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
  config(config: ConfigOptions) {
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
  auth(...values: string[] | number[]) {
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
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Get a list of Insights
   *
   * @throws FetchError<400, types.GetInsightsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetInsightsResponse403> Forbidden
   */
  getInsights(metadata?: types.GetInsightsMetadataParam): Promise<FetchResponse<200, types.GetInsightsResponse200>> {
    return this.core.fetch('/v2/insights', 'get', metadata);
  }

  /**
   * Create a new Insight
   *
   * @throws FetchError<400, types.CreateInsightResponse400> Bad Request Error
   * @throws FetchError<403, types.CreateInsightResponse403> Forbidden
   */
  createInsight(body?: types.CreateInsightBodyParam, metadata?: types.CreateInsightMetadataParam): Promise<FetchResponse<200, types.CreateInsightResponse200>> {
    return this.core.fetch('/v2/insights', 'post', body, metadata);
  }

  /**
   * Get a single Insight
   *
   * @throws FetchError<400, types.GetOneInsightResponse400> Bad Request Error
   * @throws FetchError<403, types.GetOneInsightResponse403> Forbidden
   */
  getOneInsight(metadata: types.GetOneInsightMetadataParam): Promise<FetchResponse<200, types.GetOneInsightResponse200>> {
    return this.core.fetch('/v2/insights/{insight_id}', 'get', metadata);
  }

  /**
   * Delete a single Insight
   *
   * @throws FetchError<400, types.DeleteOneInsightResponse400> Bad Request Error
   * @throws FetchError<403, types.DeleteOneInsightResponse403> Forbidden
   */
  deleteOneInsight(metadata: types.DeleteOneInsightMetadataParam): Promise<FetchResponse<200, types.DeleteOneInsightResponse200>> {
    return this.core.fetch('/v2/insights/{insight_id}', 'delete', metadata);
  }

  /**
   * Update a single Insight
   *
   * @throws FetchError<400, types.UpdateOneInsightResponse400> Bad Request Error
   * @throws FetchError<403, types.UpdateOneInsightResponse403> Forbidden
   */
  updateOneInsight(body: types.UpdateOneInsightBodyParam, metadata: types.UpdateOneInsightMetadataParam): Promise<FetchResponse<200, types.UpdateOneInsightResponse200>>;
  updateOneInsight(metadata: types.UpdateOneInsightMetadataParam): Promise<FetchResponse<200, types.UpdateOneInsightResponse200>>;
  updateOneInsight(body?: types.UpdateOneInsightBodyParam | types.UpdateOneInsightMetadataParam, metadata?: types.UpdateOneInsightMetadataParam): Promise<FetchResponse<200, types.UpdateOneInsightResponse200>> {
    return this.core.fetch('/v2/insights/{insight_id}', 'patch', body, metadata);
  }

  /**
   * Get a list of Comments for an Insight
   *
   * @throws FetchError<400, types.GetCommentsForOneInsightResponse400> Bad Request Error
   * @throws FetchError<403, types.GetCommentsForOneInsightResponse403> Forbidden
   */
  getCommentsForOneInsight(metadata: types.GetCommentsForOneInsightMetadataParam): Promise<FetchResponse<200, types.GetCommentsForOneInsightResponse200>> {
    return this.core.fetch('/v2/insights/{insight_id}/comments', 'get', metadata);
  }

  /**
   * Create a new Comment for an Insight
   *
   * @throws FetchError<400, types.CreateCommentForOneInsightResponse400> Bad Request Error
   * @throws FetchError<403, types.CreateCommentForOneInsightResponse403> Forbidden
   */
  createCommentForOneInsight(body: types.CreateCommentForOneInsightBodyParam, metadata: types.CreateCommentForOneInsightMetadataParam): Promise<FetchResponse<200, types.CreateCommentForOneInsightResponse200>> {
    return this.core.fetch('/v2/insights/{insight_id}/comments', 'post', body, metadata);
  }

  /**
   * Update one Comment for an Insight
   *
   * @throws FetchError<400, types.UpdateOneCommentForOneInsightResponse400> Bad Request Error
   * @throws FetchError<403, types.UpdateOneCommentForOneInsightResponse403> Forbidden
   */
  updateOneCommentForOneInsight(body: types.UpdateOneCommentForOneInsightBodyParam, metadata: types.UpdateOneCommentForOneInsightMetadataParam): Promise<FetchResponse<200, types.UpdateOneCommentForOneInsightResponse200>> {
    return this.core.fetch('/v2/insights/{insight_id}/comments/{comment_id}', 'patch', body, metadata);
  }

  /**
   * Get a list of Budgets
   *
   * @throws FetchError<400, types.GetBudgetsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetBudgetsResponse403> Forbidden
   */
  getBudgets(metadata?: types.GetBudgetsMetadataParam): Promise<FetchResponse<200, types.GetBudgetsResponse200>> {
    return this.core.fetch('/v2/budgets', 'get', metadata);
  }

  /**
   * Create a new Budget
   *
   * @throws FetchError<400, types.CreateBudgetResponse400> Bad Request Error
   * @throws FetchError<403, types.CreateBudgetResponse403> Forbidden
   */
  createBudget(body: types.CreateBudgetBodyParam, metadata?: types.CreateBudgetMetadataParam): Promise<FetchResponse<200, types.CreateBudgetResponse200>> {
    return this.core.fetch('/v2/budgets', 'post', body, metadata);
  }

  /**
   * Get a single Budget
   *
   * @throws FetchError<400, types.GetOneBudgetResponse400> Bad Request Error
   * @throws FetchError<403, types.GetOneBudgetResponse403> Forbidden
   */
  getOneBudget(metadata: types.GetOneBudgetMetadataParam): Promise<FetchResponse<200, types.GetOneBudgetResponse200>> {
    return this.core.fetch('/v2/budgets/{budget_id}', 'get', metadata);
  }

  /**
   * Update a single Budget
   *
   * @throws FetchError<400, types.UpdateOneBudgetResponse400> Bad Request Error
   * @throws FetchError<403, types.UpdateOneBudgetResponse403> Forbidden
   */
  updateOneBudget(body: types.UpdateOneBudgetBodyParam, metadata: types.UpdateOneBudgetMetadataParam): Promise<FetchResponse<200, types.UpdateOneBudgetResponse200>>;
  updateOneBudget(metadata: types.UpdateOneBudgetMetadataParam): Promise<FetchResponse<200, types.UpdateOneBudgetResponse200>>;
  updateOneBudget(body?: types.UpdateOneBudgetBodyParam | types.UpdateOneBudgetMetadataParam, metadata?: types.UpdateOneBudgetMetadataParam): Promise<FetchResponse<200, types.UpdateOneBudgetResponse200>> {
    return this.core.fetch('/v2/budgets/{budget_id}', 'patch', body, metadata);
  }

  /**
   * Delete a single Budget
   *
   * @throws FetchError<400, types.DeleteOneBudgetResponse400> Bad Request Error
   * @throws FetchError<403, types.DeleteOneBudgetResponse403> Forbidden
   */
  deleteOneBudget(metadata: types.DeleteOneBudgetMetadataParam): Promise<FetchResponse<200, types.DeleteOneBudgetResponse200>> {
    return this.core.fetch('/v2/budgets/{budget_id}', 'delete', metadata);
  }

  /**
   * Get a list of CloudZero CostFormation Definition Versions
   *
   * @throws FetchError<400, types.GetCostFormationDefinitionVersionsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetCostFormationDefinitionVersionsResponse403> Forbidden
   */
  getCostFormationDefinitionVersions(metadata?: types.GetCostFormationDefinitionVersionsMetadataParam): Promise<FetchResponse<200, types.GetCostFormationDefinitionVersionsResponse200>> {
    return this.core.fetch('/v2/costformation/definition/versions', 'get', metadata);
  }

  /**
   * Create a new CloudZero CostFormation Definition Version
   *
   * @throws FetchError<400, types.CreateCostFormationDefinitionVersionResponse400> Bad Request Error
   * @throws FetchError<403, types.CreateCostFormationDefinitionVersionResponse403> Forbidden
   * @throws FetchError<422, types.CreateCostFormationDefinitionVersionResponse422> Bad CloudZero CostFormation Definition Version Create Request Error
   */
  createCostFormationDefinitionVersion(body?: types.CreateCostFormationDefinitionVersionBodyParam, metadata?: types.CreateCostFormationDefinitionVersionMetadataParam): Promise<FetchResponse<200, types.CreateCostFormationDefinitionVersionResponse200>> {
    return this.core.fetch('/v2/costformation/definition/versions', 'post', body, metadata);
  }

  /**
   * Get a CloudZero CostFormation Definition Version
   *
   * @throws FetchError<400, types.GetOneCostFormationDefinitionVersionResponse400> Bad Request Error
   * @throws FetchError<403, types.GetOneCostFormationDefinitionVersionResponse403> Forbidden
   */
  getOneCostFormationDefinitionVersion(metadata: types.GetOneCostFormationDefinitionVersionMetadataParam): Promise<FetchResponse<200, types.GetOneCostFormationDefinitionVersionResponse200>> {
    return this.core.fetch('/v2/costformation/definition/versions/{version}', 'get', metadata);
  }

  /**
   * Get a list of Views
   *
   * @throws FetchError<400, types.GetViewsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetViewsResponse403> Forbidden
   */
  getViews(metadata?: types.GetViewsMetadataParam): Promise<FetchResponse<200, types.GetViewsResponse200>> {
    return this.core.fetch('/v2/views', 'get', metadata);
  }

  /**
   * Get a single View
   *
   * @throws FetchError<400, types.GetOneViewResponse400> Bad Request Error
   * @throws FetchError<403, types.GetOneViewResponse403> Forbidden
   */
  getOneView(metadata: types.GetOneViewMetadataParam): Promise<FetchResponse<200, types.GetOneViewResponse200>> {
    return this.core.fetch('/v2/views/{view_id}', 'get', metadata);
  }

  /**
   * Get a list of Billing Connections
   *
   * @throws FetchError<400, types.GetBillingConnectionsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetBillingConnectionsResponse403> Forbidden
   */
  getBillingConnections(metadata?: types.GetBillingConnectionsMetadataParam): Promise<FetchResponse<200, types.GetBillingConnectionsResponse200>> {
    return this.core.fetch('/v2/connections/billing', 'get', metadata);
  }

  /**
   * Create a new Billing Connection
   *
   * @throws FetchError<400, types.CreateBillingConnectionResponse400> Bad Request Error
   * @throws FetchError<403, types.CreateBillingConnectionResponse403> Forbidden
   */
  createBillingConnection(body: types.CreateBillingConnectionBodyParam, metadata?: types.CreateBillingConnectionMetadataParam): Promise<FetchResponse<200, types.CreateBillingConnectionResponse200>> {
    return this.core.fetch('/v2/connections/billing', 'post', body, metadata);
  }

  /**
   * Get a single Billing Connection
   *
   * @throws FetchError<400, types.GetOneBillingConnectionResponse400> Bad Request Error
   * @throws FetchError<403, types.GetOneBillingConnectionResponse403> Forbidden
   */
  getOneBillingConnection(metadata: types.GetOneBillingConnectionMetadataParam): Promise<FetchResponse<200, types.GetOneBillingConnectionResponse200>> {
    return this.core.fetch('/v2/connections/billing/{connection_id}', 'get', metadata);
  }

  /**
   * Update a single Billing Connection
   * Note: Billing Connections managed by CloudZero AnyCost adaptors (e.g., Azure, GCP, AWS)
   * cannot be modified.
   * This operation is supported for custom connections only.
   *
   * @throws FetchError<400, types.UpdateOneBillingConnectionResponse400> Bad Request Error
   * @throws FetchError<403, types.UpdateOneBillingConnectionResponse403> Forbidden
   */
  updateOneBillingConnection(body: types.UpdateOneBillingConnectionBodyParam, metadata: types.UpdateOneBillingConnectionMetadataParam): Promise<FetchResponse<200, types.UpdateOneBillingConnectionResponse200>>;
  updateOneBillingConnection(metadata: types.UpdateOneBillingConnectionMetadataParam): Promise<FetchResponse<200, types.UpdateOneBillingConnectionResponse200>>;
  updateOneBillingConnection(body?: types.UpdateOneBillingConnectionBodyParam | types.UpdateOneBillingConnectionMetadataParam, metadata?: types.UpdateOneBillingConnectionMetadataParam): Promise<FetchResponse<200, types.UpdateOneBillingConnectionResponse200>> {
    return this.core.fetch('/v2/connections/billing/{connection_id}', 'patch', body, metadata);
  }

  /**
   * Delete a single Billing Connection
   * Upon disconnect of a billing connection, after the next ingest, all billing data related
   * to that connection will be removed from the platform. However, be aware that although
   * this data is no longer visible in the platform, it will still exist in the CloudZero
   * data stores. If you need a more permanent deletion due to audit or security concerns,
   * see your CloudZero Account Manager.
   * Note: This is not supported for AWS and Snowflake connections
   *
   * @throws FetchError<400, types.DeleteOneBillingConnectionResponse400> Bad Request Error
   * @throws FetchError<403, types.DeleteOneBillingConnectionResponse403> Forbidden
   */
  deleteOneBillingConnection(metadata: types.DeleteOneBillingConnectionMetadataParam): Promise<FetchResponse<200, types.DeleteOneBillingConnectionResponse200>> {
    return this.core.fetch('/v2/connections/billing/{connection_id}', 'delete', metadata);
  }

  /**
   * Get all AnyCost Stream Connection Billing Drops
   *
   * @throws FetchError<400, types.GetAnyCostStreamConnectionBillingDropsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetAnyCostStreamConnectionBillingDropsResponse403> Forbidden
   */
  getAnyCostStreamConnectionBillingDrops(metadata: types.GetAnyCostStreamConnectionBillingDropsMetadataParam): Promise<FetchResponse<200, types.GetAnyCostStreamConnectionBillingDropsResponse200>> {
    return this.core.fetch('/v2/connections/billing/anycost/{connection_id}/billing_drops', 'get', metadata);
  }

  /**
   * Create a single AnyCost Stream Connection Billing Drop.
   * Note: An uncompressed request body larger than 5 MB will result in a 413 Request Entity
   * Too Large response
   *
   * @throws FetchError<400, types.CreateOneAnyCostStreamConnectionBillingDropResponse400> Bad Request Error
   * @throws FetchError<403, types.CreateOneAnyCostStreamConnectionBillingDropResponse403> Forbidden
   * @throws FetchError<413, types.CreateOneAnyCostStreamConnectionBillingDropResponse413> Request Entity Too Large Error
   */
  createOneAnyCostStreamConnectionBillingDrop(body: types.CreateOneAnyCostStreamConnectionBillingDropBodyParam, metadata: types.CreateOneAnyCostStreamConnectionBillingDropMetadataParam): Promise<FetchResponse<200, types.CreateOneAnyCostStreamConnectionBillingDropResponse200>> {
    return this.core.fetch('/v2/connections/billing/anycost/{connection_id}/billing_drops', 'post', body, metadata);
  }

  /**
   * Read AnyCost Stream Connection Billing Drop contents
   *
   * @throws FetchError<400, types.GetAnyCostStreamConnectionBillingDropContentsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetAnyCostStreamConnectionBillingDropContentsResponse403> Forbidden
   * @throws FetchError<404, types.GetAnyCostStreamConnectionBillingDropContentsResponse404> Not Found Error
   */
  getAnyCostStreamConnectionBillingDropContents(metadata: types.GetAnyCostStreamConnectionBillingDropContentsMetadataParam): Promise<FetchResponse<200, types.GetAnyCostStreamConnectionBillingDropContentsResponse200>> {
    return this.core.fetch('/v2/connections/billing/anycost/{connection_id}/billing_drops/{month}', 'get', metadata);
  }

  /**
   * Validate a single AnyCost Stream Connection Billing Drop.
   * Note: An uncompressed request body larger than 5 MB will result in a 413 Request Entity
   * Too Large response
   *
   * @throws FetchError<400, types.ValidateOneAnyCostStreamConnectionBillingDropResponse400> Bad Request Error
   * @throws FetchError<403, types.ValidateOneAnyCostStreamConnectionBillingDropResponse403> Forbidden
   * @throws FetchError<413, types.ValidateOneAnyCostStreamConnectionBillingDropResponse413> Request Entity Too Large Error
   */
  validateOneAnyCostStreamConnectionBillingDrop(body: types.ValidateOneAnyCostStreamConnectionBillingDropBodyParam, metadata?: types.ValidateOneAnyCostStreamConnectionBillingDropMetadataParam): Promise<FetchResponse<200, types.ValidateOneAnyCostStreamConnectionBillingDropResponse200>> {
    return this.core.fetch('/v2/connections/billing/anycost/validate_billing_drop', 'post', body, metadata);
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
   * **API Call Examples**
   * For the following examples, the following updates need to be made before running:
   * - Replace <START_DATE_HERE> with a properly formatted start date (`2023-10-26` or (date
   * and time encoded) `2023-10-26T14%3A27%3A46%2B00%3A00`)  
   * - Replace <GRANULARITY_VALUE_HERE> with the desired granularity (`hourly`, `daily`, 
   * `weekly`, `monthly`, `yearly`)
   *
   * **Real Cost Grouped by Account and Service, Filtered by Cloud Provider = AWS**
   * -
   * `https://api.cloudzero.com/v2/billing/costs?start_date=<START_DATE_HERE>&granularity=<GRANULARITY_VALUE_HERE>&group_by=Account&group_by=Service&filters=%7B%22CloudProvider%22%3A%20%5B%22AWS%22%5D%7D&cost_type=real_cost`
   *
   * **Real Cost Grouped by Account and Service Detail Dimension, Filtered by Service =
   * AmazonS3**
   * -
   * `https://api.cloudzero.com/v2/billing/costs?start_date=<START_DATE_HERE>&granularity=<GRANULARITY_VALUE_HERE>&group_by=Account&group_by=CZ%3ADefined%3AServiceDetail&filters=%7B%22Service%22%3A%20%5B%22AmazonS3%22%5D%7D&cost_type=real_cost`
   *        
   *
   * **Real Cost Grouped by by Account Name and Service**
   * -
   * `https://api.cloudzero.com/v2/billing/costs?start_date=<START_DATE_HERE>&granularity=<GRANULARITY_VALUE_HERE>&group_by=User%3ADefined%3AAccountName&group_by=Service&cost_type=real_cost`
   *
   * @throws FetchError<400, types.GetBillingCostsResponse400> Bad Request Error
   * @throws FetchError<403, types.GetBillingCostsResponse403> Forbidden
   * @throws FetchError<410, types.GetBillingCostsResponse410> Expired Cache Error
   * @throws FetchError<429, types.GetBillingCostsResponse429> Rate Limit Error
   */
  getBillingCosts(metadata: types.GetBillingCostsMetadataParam): Promise<FetchResponse<200, types.GetBillingCostsResponse200>> {
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
  getBillingDimensions(metadata?: types.GetBillingDimensionsMetadataParam): Promise<FetchResponse<200, types.GetBillingDimensionsResponse200>> {
    return this.core.fetch('/v2/billing/dimensions', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CreateBillingConnectionBodyParam, CreateBillingConnectionMetadataParam, CreateBillingConnectionResponse200, CreateBillingConnectionResponse400, CreateBillingConnectionResponse403, CreateBudgetBodyParam, CreateBudgetMetadataParam, CreateBudgetResponse200, CreateBudgetResponse400, CreateBudgetResponse403, CreateCommentForOneInsightBodyParam, CreateCommentForOneInsightMetadataParam, CreateCommentForOneInsightResponse200, CreateCommentForOneInsightResponse400, CreateCommentForOneInsightResponse403, CreateCostFormationDefinitionVersionBodyParam, CreateCostFormationDefinitionVersionMetadataParam, CreateCostFormationDefinitionVersionResponse200, CreateCostFormationDefinitionVersionResponse400, CreateCostFormationDefinitionVersionResponse403, CreateCostFormationDefinitionVersionResponse422, CreateInsightBodyParam, CreateInsightMetadataParam, CreateInsightResponse200, CreateInsightResponse400, CreateInsightResponse403, CreateOneAnyCostStreamConnectionBillingDropBodyParam, CreateOneAnyCostStreamConnectionBillingDropMetadataParam, CreateOneAnyCostStreamConnectionBillingDropResponse200, CreateOneAnyCostStreamConnectionBillingDropResponse400, CreateOneAnyCostStreamConnectionBillingDropResponse403, CreateOneAnyCostStreamConnectionBillingDropResponse413, DeleteOneBillingConnectionMetadataParam, DeleteOneBillingConnectionResponse200, DeleteOneBillingConnectionResponse400, DeleteOneBillingConnectionResponse403, DeleteOneBudgetMetadataParam, DeleteOneBudgetResponse200, DeleteOneBudgetResponse400, DeleteOneBudgetResponse403, DeleteOneInsightMetadataParam, DeleteOneInsightResponse200, DeleteOneInsightResponse400, DeleteOneInsightResponse403, GetAnyCostStreamConnectionBillingDropContentsMetadataParam, GetAnyCostStreamConnectionBillingDropContentsResponse200, GetAnyCostStreamConnectionBillingDropContentsResponse400, GetAnyCostStreamConnectionBillingDropContentsResponse403, GetAnyCostStreamConnectionBillingDropContentsResponse404, GetAnyCostStreamConnectionBillingDropsMetadataParam, GetAnyCostStreamConnectionBillingDropsResponse200, GetAnyCostStreamConnectionBillingDropsResponse400, GetAnyCostStreamConnectionBillingDropsResponse403, GetBillingConnectionsMetadataParam, GetBillingConnectionsResponse200, GetBillingConnectionsResponse400, GetBillingConnectionsResponse403, GetBillingCostsMetadataParam, GetBillingCostsResponse200, GetBillingCostsResponse400, GetBillingCostsResponse403, GetBillingCostsResponse410, GetBillingCostsResponse429, GetBillingDimensionsMetadataParam, GetBillingDimensionsResponse200, GetBillingDimensionsResponse400, GetBillingDimensionsResponse403, GetBillingDimensionsResponse410, GetBillingDimensionsResponse429, GetBudgetsMetadataParam, GetBudgetsResponse200, GetBudgetsResponse400, GetBudgetsResponse403, GetCommentsForOneInsightMetadataParam, GetCommentsForOneInsightResponse200, GetCommentsForOneInsightResponse400, GetCommentsForOneInsightResponse403, GetCostFormationDefinitionVersionsMetadataParam, GetCostFormationDefinitionVersionsResponse200, GetCostFormationDefinitionVersionsResponse400, GetCostFormationDefinitionVersionsResponse403, GetInsightsMetadataParam, GetInsightsResponse200, GetInsightsResponse400, GetInsightsResponse403, GetOneBillingConnectionMetadataParam, GetOneBillingConnectionResponse200, GetOneBillingConnectionResponse400, GetOneBillingConnectionResponse403, GetOneBudgetMetadataParam, GetOneBudgetResponse200, GetOneBudgetResponse400, GetOneBudgetResponse403, GetOneCostFormationDefinitionVersionMetadataParam, GetOneCostFormationDefinitionVersionResponse200, GetOneCostFormationDefinitionVersionResponse400, GetOneCostFormationDefinitionVersionResponse403, GetOneInsightMetadataParam, GetOneInsightResponse200, GetOneInsightResponse400, GetOneInsightResponse403, GetOneViewMetadataParam, GetOneViewResponse200, GetOneViewResponse400, GetOneViewResponse403, GetViewsMetadataParam, GetViewsResponse200, GetViewsResponse400, GetViewsResponse403, UpdateOneBillingConnectionBodyParam, UpdateOneBillingConnectionMetadataParam, UpdateOneBillingConnectionResponse200, UpdateOneBillingConnectionResponse400, UpdateOneBillingConnectionResponse403, UpdateOneBudgetBodyParam, UpdateOneBudgetMetadataParam, UpdateOneBudgetResponse200, UpdateOneBudgetResponse400, UpdateOneBudgetResponse403, UpdateOneCommentForOneInsightBodyParam, UpdateOneCommentForOneInsightMetadataParam, UpdateOneCommentForOneInsightResponse200, UpdateOneCommentForOneInsightResponse400, UpdateOneCommentForOneInsightResponse403, UpdateOneInsightBodyParam, UpdateOneInsightMetadataParam, UpdateOneInsightResponse200, UpdateOneInsightResponse400, UpdateOneInsightResponse403, ValidateOneAnyCostStreamConnectionBillingDropBodyParam, ValidateOneAnyCostStreamConnectionBillingDropMetadataParam, ValidateOneAnyCostStreamConnectionBillingDropResponse200, ValidateOneAnyCostStreamConnectionBillingDropResponse400, ValidateOneAnyCostStreamConnectionBillingDropResponse403, ValidateOneAnyCostStreamConnectionBillingDropResponse413 } from './types';
