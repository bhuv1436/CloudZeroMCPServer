declare const CreateBillingConnection: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly cloud_provider: {
                readonly type: "string";
                readonly examples: readonly ["NewRelic", "MongoDB"];
            };
            readonly expected_ingest_rate: {
                readonly type: readonly ["number", any];
            };
            readonly is_enabled: {
                readonly type: "boolean";
            };
            readonly s3_bucket_info: {
                readonly anyOf: readonly [{
                    readonly type: "object";
                    readonly properties: {
                        readonly bucket_name: {
                            readonly type: "string";
                            readonly examples: readonly ["test-bucket"];
                        };
                        readonly bucket_path: {
                            readonly type: "string";
                            readonly examples: readonly ["path/to/data"];
                        };
                        readonly cloud_account_id: {
                            readonly description: "This is the AWS Account ID with the S3 Bucket that the AnyCost Adaptor will be writing Common Bill Format files into.";
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["bucket_name", "bucket_path"];
                }, {
                    readonly type: "null";
                }];
            };
        };
        readonly required: readonly ["name", "cloud_provider"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly connection: {
                    readonly type: "object";
                    readonly required: readonly ["capabilities", "cloud_provider", "connection_id", "connection_type", "created", "expected_ingest_rate", "id", "is_draft", "is_enabled", "last_updated", "name", "s3_bucket_info"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly connection_type: {
                            readonly type: "string";
                        };
                        readonly cloud_provider: {
                            readonly type: "string";
                        };
                        readonly s3_bucket_info: {
                            readonly type: "object";
                            readonly required: readonly ["bucket_name", "bucket_path"];
                            readonly properties: {
                                readonly bucket_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["test-bucket"];
                                };
                                readonly bucket_path: {
                                    readonly type: "string";
                                    readonly examples: readonly ["path/to/data"];
                                };
                                readonly cloud_account_id: {
                                    readonly description: "This is the AWS Account ID with the S3 Bucket that the AnyCost Adaptor will be writing Common Bill Format files into.";
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly expected_ingest_rate: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly is_enabled: {
                            readonly type: "boolean";
                        };
                        readonly capabilities: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                        readonly is_draft: {
                            readonly type: "boolean";
                        };
                        readonly connection_id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateBudget: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly description: "Budget name, must be unique within a View";
                readonly type: "string";
            };
            readonly planned_limits: {
                readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                readonly type: "object";
                readonly properties: {
                    readonly monthly: {
                        readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly description: "Amount for planned limit";
                            readonly type: "object";
                            readonly properties: {
                                readonly amount: {
                                    readonly description: "String representation of a dollar amount";
                                    readonly type: "string";
                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                    readonly default: "1.0";
                                };
                            };
                            readonly required: readonly ["amount"];
                        };
                    };
                };
                readonly required: readonly ["monthly"];
            };
            readonly view: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["id"];
                readonly description: "View associated with this Budget";
            };
            readonly alerts: {
                readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "string";
                    readonly enum: readonly ["Y", "N"];
                };
            };
        };
        readonly required: readonly ["name", "planned_limits", "view"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly budget: {
                    readonly type: "object";
                    readonly required: readonly ["cost_type", "created", "granularity", "id", "last_updated", "name", "planned_limits", "view"];
                    readonly properties: {
                        readonly name: {
                            readonly description: "Budget name, must be unique within a View";
                            readonly type: "string";
                        };
                        readonly planned_limits: {
                            readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                            readonly type: "object";
                            readonly required: readonly ["monthly"];
                            readonly properties: {
                                readonly monthly: {
                                    readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly description: "Amount for planned limit";
                                        readonly type: "object";
                                        readonly required: readonly ["amount"];
                                        readonly properties: {
                                            readonly amount: {
                                                readonly description: "String representation of a dollar amount";
                                                readonly type: "string";
                                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                                readonly default: "1.0";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly view: {
                            readonly type: "object";
                            readonly required: readonly ["id"];
                            readonly description: "View associated with this Budget";
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly alerts: {
                            readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "string";
                                readonly enum: readonly ["Y", "N"];
                                readonly description: "`Y` `N`";
                            };
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly cost_type: {
                            readonly description: "Type of charges included in the cost calculation, currently supports the following values:\n  `real_cost`: filters your bill to only display charges directly related to consumption\n\n\n`real_cost`";
                            readonly type: "string";
                            readonly enum: readonly ["real_cost"];
                        };
                        readonly granularity: {
                            readonly description: "Supported periods, e.g. \"monthly\"\n\n`monthly`";
                            readonly type: "string";
                            readonly enum: readonly ["monthly"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateCommentForOneInsight: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly message: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["message"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly insight_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Insight identifier";
                };
            };
            readonly required: readonly ["insight_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly comment: {
                    readonly type: "object";
                    readonly required: readonly ["author", "created", "id", "insight", "last_updated", "message"];
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly author: {
                            readonly type: "string";
                        };
                        readonly insight: {
                            readonly type: "object";
                            readonly required: readonly ["id"];
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateCostFormationDefinitionVersion: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly file: {
                readonly type: "array";
                readonly items: {};
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly validate_only: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the endpoint will only validate the CloudZero CostFormation definition, and NOT save or publish.\n";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly description: "Response for creating new version";
                readonly properties: {
                    readonly version: {
                        readonly type: "object";
                        readonly required: readonly ["version"];
                        readonly properties: {
                            readonly version: {
                                readonly type: "string";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly last_updated_by: {
                                readonly description: "email, username, or api key that created this entity (optional)";
                                readonly type: "string";
                            };
                        };
                    };
                };
            }, {
                readonly type: "object";
                readonly description: "Empty response if validate_only=true";
                readonly additionalProperties: true;
            }];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "422": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                        readonly errors: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly error: {
                                        readonly type: "string";
                                    };
                                    readonly value: {
                                        readonly type: "string";
                                    };
                                    readonly path: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateInsight: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly effort: {
                readonly type: "string";
                readonly enum: readonly ["not_set", "low", "medium", "high"];
            };
            readonly cost_impact: {
                readonly description: "String or float representation of a dollar amount";
                readonly oneOf: readonly [{
                    readonly description: "String representation of a dollar amount";
                    readonly type: "string";
                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                    readonly default: "1.0";
                }, {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                }];
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["new", "in_progress", "on_hold", "addressed", "ignored"];
            };
            readonly category: {
                readonly type: "string";
            };
            readonly link: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly title: {
                readonly type: "string";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly insight: {
                    readonly type: "object";
                    readonly required: readonly ["created", "id", "last_updated"];
                    readonly properties: {
                        readonly effort: {
                            readonly type: "string";
                            readonly enum: readonly ["not_set", "low", "medium", "high"];
                            readonly description: "`not_set` `low` `medium` `high`";
                        };
                        readonly cost_impact: {
                            readonly description: "String or float representation of a dollar amount";
                            readonly oneOf: readonly [{
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            }, {
                                readonly type: "number";
                                readonly format: "float";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            }];
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly enum: readonly ["new", "in_progress", "on_hold", "addressed", "ignored"];
                            readonly description: "`new` `in_progress` `on_hold` `addressed` `ignored`";
                        };
                        readonly category: {
                            readonly type: "string";
                        };
                        readonly link: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly title: {
                            readonly type: "string";
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const CreateOneAnyCostStreamConnectionBillingDrop: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly month: {
                readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                readonly type: "string";
                readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                readonly default: "2025-01-01T00:00:00Z";
            };
            readonly operation: {
                readonly description: "The type of operation to perform on the data.\n- `replace_drop`: Replace the data with the new data.\n- `replace_hourly`: Replace the data that have overlapping hours with the new data\n- `sum`: Append data to the existing data\nIf no prior data exists, a new drop with `data` will be created\n";
                readonly type: "string";
                readonly default: "replace_drop";
                readonly enum: readonly ["replace_drop", "replace_hourly", "sum"];
            };
            readonly data: {
                readonly type: "array";
                readonly items: {
                    readonly description: "https://docs.cloudzero.com/docs/anycost-common-bill-format-cbf#data-file-columns";
                    readonly type: "object";
                    readonly properties: {
                        readonly "lineitem/id": {
                            readonly type: "string";
                        };
                        readonly "lineitem/type": {
                            readonly type: "string";
                            readonly default: "Usage";
                            readonly enum: readonly ["Usage", "Tax", "Support", "Purchase", "CommittedUsePurchase", "Discount", "Credit", "Fee", "Adjustment"];
                        };
                        readonly "lineitem/description": {
                            readonly type: "string";
                        };
                        readonly "time/usage_start": {
                            readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                            readonly default: "2025-01-01T00:00:00Z";
                        };
                        readonly "time/usage_end": {
                            readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                            readonly default: "2025-01-01T00:00:00Z";
                        };
                        readonly "resource/id": {
                            readonly type: "string";
                        };
                        readonly "resource/service": {
                            readonly type: "string";
                        };
                        readonly "resource/account": {
                            readonly type: "string";
                        };
                        readonly "resource/region": {
                            readonly type: "string";
                        };
                        readonly "resource/usage_family": {
                            readonly type: "string";
                        };
                        readonly "action/operation": {
                            readonly type: "string";
                        };
                        readonly "action/usage_type": {
                            readonly type: "string";
                        };
                        readonly "action/region": {
                            readonly type: "string";
                        };
                        readonly "action/account": {
                            readonly type: "string";
                        };
                        readonly "usage/amount": {
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "usage/units": {
                            readonly type: "string";
                            readonly default: "1";
                        };
                        readonly "cost/cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/discounted_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/amortized_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/discounted_amortized_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/on_demand_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "bill/invoice_id": {
                            readonly type: "string";
                        };
                        readonly "k8s/cluster": {
                            readonly type: "string";
                        };
                        readonly "k8s/namespace": {
                            readonly type: "string";
                        };
                        readonly "k8s/deployment": {
                            readonly type: "string";
                        };
                        readonly "k8s/labels": {
                            readonly type: "string";
                        };
                    };
                    readonly patternProperties: {
                        readonly "resource/tag:.+": {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["time/usage_start", "cost/cost"];
                };
            };
        };
        readonly required: readonly ["data"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly connection_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Billing Connection identifier";
                };
            };
            readonly required: readonly ["connection_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly connection: {
                    readonly type: "object";
                    readonly properties: {
                        readonly drop_id: {
                            readonly type: "string";
                        };
                        readonly month: {
                            readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                            readonly default: "2025-01-01T00:00:00Z";
                        };
                        readonly row_count: {
                            readonly type: "integer";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DeleteOneBillingConnection: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly connection_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Billing Connection identifier";
                };
            };
            readonly required: readonly ["connection_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly connection: {
                    readonly type: "object";
                    readonly required: readonly ["capabilities", "cloud_provider", "connection_id", "connection_type", "created", "expected_ingest_rate", "id", "is_draft", "is_enabled", "last_updated", "name", "s3_bucket_info"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly connection_type: {
                            readonly type: "string";
                        };
                        readonly cloud_provider: {
                            readonly type: "string";
                        };
                        readonly s3_bucket_info: {
                            readonly type: "object";
                            readonly required: readonly ["bucket_name", "bucket_path"];
                            readonly properties: {
                                readonly bucket_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["test-bucket"];
                                };
                                readonly bucket_path: {
                                    readonly type: "string";
                                    readonly examples: readonly ["path/to/data"];
                                };
                                readonly cloud_account_id: {
                                    readonly description: "This is the AWS Account ID with the S3 Bucket that the AnyCost Adaptor will be writing Common Bill Format files into.";
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly expected_ingest_rate: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly is_enabled: {
                            readonly type: "boolean";
                        };
                        readonly capabilities: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                        readonly is_draft: {
                            readonly type: "boolean";
                        };
                        readonly connection_id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DeleteOneBudget: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly budget_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique budget identifier";
                };
            };
            readonly required: readonly ["budget_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly budget: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["id"];
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const DeleteOneInsight: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly insight_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Insight identifier";
                };
            };
            readonly required: readonly ["insight_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly insight: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["id"];
                };
                readonly comments: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["id"];
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAnyCostStreamConnectionBillingDropContents: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly connection_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Billing Connection identifier";
                };
                readonly month: {
                    readonly description: "Billing drop month (format YYYY-MM, e.g., 2023-10)";
                    readonly type: "string";
                    readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                    readonly default: "2025-01-01T00:00:00Z";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
            };
            readonly required: readonly ["connection_id", "month"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly billing_drop: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "https://docs.cloudzero.com/docs/anycost-common-bill-format-cbf#data-file-columns";
                        readonly type: "object";
                        readonly properties: {
                            readonly "lineitem/id": {
                                readonly type: "string";
                            };
                            readonly "lineitem/type": {
                                readonly type: "string";
                                readonly default: "Usage";
                                readonly enum: readonly ["Usage", "Tax", "Support", "Purchase", "CommittedUsePurchase", "Discount", "Credit", "Fee", "Adjustment"];
                                readonly description: "`Usage` `Tax` `Support` `Purchase` `CommittedUsePurchase` `Discount` `Credit` `Fee` `Adjustment`";
                            };
                            readonly "lineitem/description": {
                                readonly type: "string";
                            };
                            readonly "time/usage_start": {
                                readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                                readonly default: "2025-01-01T00:00:00Z";
                            };
                            readonly "time/usage_end": {
                                readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                                readonly default: "2025-01-01T00:00:00Z";
                            };
                            readonly "resource/id": {
                                readonly type: "string";
                            };
                            readonly "resource/service": {
                                readonly type: "string";
                            };
                            readonly "resource/account": {
                                readonly type: "string";
                            };
                            readonly "resource/region": {
                                readonly type: "string";
                            };
                            readonly "resource/usage_family": {
                                readonly type: "string";
                            };
                            readonly "action/operation": {
                                readonly type: "string";
                            };
                            readonly "action/usage_type": {
                                readonly type: "string";
                            };
                            readonly "action/region": {
                                readonly type: "string";
                            };
                            readonly "action/account": {
                                readonly type: "string";
                            };
                            readonly "usage/amount": {
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            };
                            readonly "usage/units": {
                                readonly type: "string";
                                readonly default: "1";
                            };
                            readonly "cost/cost": {
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            };
                            readonly "cost/discounted_cost": {
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            };
                            readonly "cost/amortized_cost": {
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            };
                            readonly "cost/discounted_amortized_cost": {
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            };
                            readonly "cost/on_demand_cost": {
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            };
                            readonly "bill/invoice_id": {
                                readonly type: "string";
                            };
                            readonly "k8s/cluster": {
                                readonly type: "string";
                            };
                            readonly "k8s/namespace": {
                                readonly type: "string";
                            };
                            readonly "k8s/deployment": {
                                readonly type: "string";
                            };
                            readonly "k8s/labels": {
                                readonly type: "string";
                            };
                        };
                        readonly patternProperties: {
                            readonly "resource/tag:.+": {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["time/usage_start", "cost/cost"];
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "404": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetAnyCostStreamConnectionBillingDrops: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly connection_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Billing Connection identifier";
                };
            };
            readonly required: readonly ["connection_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly billing_drops: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly drop_id: {
                                readonly type: "string";
                            };
                            readonly month: {
                                readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                                readonly default: "2025-01-01T00:00:00Z";
                            };
                            readonly row_count: {
                                readonly type: "integer";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetBillingConnections: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of items to return per page";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to page forward and back in your results. NOTE: This must be URL Encoded!\n - See the [Pagination](https://docs.cloudzero.com/reference/pagination) section of the API Reference for more information!\n";
                };
                readonly sort_key: {
                    readonly description: "Sortable Billing Connection properties";
                    readonly type: "string";
                    readonly enum: readonly ["connection_name", "creation_date", "name", "cloud_provider", "created", "last_updated", "is_enabled"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ASC or DESC sort order";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pagination: {
                    readonly description: "Supports programmatic pagination";
                    readonly type: "object";
                    readonly properties: {
                        readonly page_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly item_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly total_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly previous_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly has_next: {
                                    readonly type: "boolean";
                                };
                                readonly has_previous: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                    };
                };
                readonly sorting: {
                    readonly description: "This response key contains sorting options, where:\n  - `available`: is an object with two keys:\n      - `sort_keys`: list of available sort keys\n      - `sort_orders`: list of available sort orders\n  - `current`: is an array of `{sort_key: sort_order}` objects, the response is sorted in order of this array\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "object";
                            readonly properties: {
                                readonly sort_keys: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly description: "Sortable Billing Connection properties\n\n`connection_name` `creation_date` `name` `cloud_provider` `created` `last_updated` `is_enabled`";
                                        readonly type: "string";
                                        readonly enum: readonly ["connection_name", "creation_date", "name", "cloud_provider", "created", "last_updated", "is_enabled"];
                                        readonly examples: readonly ["last_updated"];
                                    };
                                    readonly examples: readonly ["last_updated"];
                                };
                                readonly sort_orders: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly examples: readonly ["asc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                    readonly examples: readonly ["asc", "desc"];
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sort_key: {
                                        readonly description: "Sortable Billing Connection properties\n\n`connection_name` `creation_date` `name` `cloud_provider` `created` `last_updated` `is_enabled`";
                                        readonly type: "string";
                                        readonly enum: readonly ["connection_name", "creation_date", "name", "cloud_provider", "created", "last_updated", "is_enabled"];
                                    };
                                    readonly sort_order: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                };
                            };
                        };
                    };
                };
                readonly filtering: {
                    readonly description: "This response key contains filtering options, where:\n  - `available`: is an array of filterable field objects\n  - `current`: is an object containing the currently filtered fields and the filter values\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly field: {
                                        readonly type: "string";
                                    };
                                    readonly valid_values: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                    readonly valid_types: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "array";
                                readonly items: {};
                            };
                        };
                    };
                };
                readonly connections: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["capabilities", "cloud_provider", "connection_id", "connection_type", "created", "expected_ingest_rate", "id", "is_draft", "is_enabled", "last_updated", "name", "s3_bucket_info"];
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly connection_type: {
                                readonly type: "string";
                            };
                            readonly cloud_provider: {
                                readonly type: "string";
                            };
                            readonly s3_bucket_info: {
                                readonly type: "object";
                                readonly required: readonly ["bucket_name", "bucket_path"];
                                readonly properties: {
                                    readonly bucket_name: {
                                        readonly type: "string";
                                        readonly examples: readonly ["test-bucket"];
                                    };
                                    readonly bucket_path: {
                                        readonly type: "string";
                                        readonly examples: readonly ["path/to/data"];
                                    };
                                    readonly cloud_account_id: {
                                        readonly description: "This is the AWS Account ID with the S3 Bucket that the AnyCost Adaptor will be writing Common Bill Format files into.";
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly expected_ingest_rate: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly is_enabled: {
                                readonly type: "boolean";
                            };
                            readonly capabilities: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly is_draft: {
                                readonly type: "boolean";
                            };
                            readonly connection_id: {
                                readonly type: "string";
                            };
                            readonly created: {
                                readonly description: "UTC timestamp for the creation of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetBillingCosts: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly start_date: {
                    readonly description: "ISO 8601 datetime string from which to view costs.\n- When using this form: `2023-10-26T14:27:46+00:00`\n- When using HTTP URL (This must be encoded!): \n    - Encoded: `2023-10-26T14%3A27%3A46%2B00%3A00`\n    - Decoded: `2023-10-26T14:27:46+00:00`        \n";
                    readonly type: "string";
                    readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                    readonly default: "2025-01-01T00:00:00Z";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly end_date: {
                    readonly description: "ISO 8601 datetime string until which to view costs (defaults to current date and time).\n- When using this form: `2023-10-26T14:27:46+00:00`\n- When using HTTP URL (This must be encoded!): \n    - Encoded: `2023-10-26T14%3A27%3A46%2B00%3A00`\n    - Decoded: `2023-10-26T14:27:46+00:00`   \n";
                    readonly type: "string";
                    readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                    readonly default: "2025-01-01T00:00:00Z";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly granularity: {
                    readonly description: "Supported periods, e.g. \"daily\"";
                    readonly type: "string";
                    readonly enum: readonly ["hourly", "daily", "weekly", "monthly", "yearly"];
                    readonly default: "daily";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly group_by: {
                    readonly type: "array";
                    readonly items: {
                        readonly description: "Identifier of a CloudZero Dimension, as used in the CostFormation language.\nSee https://docs.cloudzero.com/docs/dimensions for details.\n";
                        readonly type: "string";
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Dimension ID(s) by which to group the results. This is a multi-value query parameter, pass it more than once to specify multiple values.\n  -  When using this form: `Region` and `Tag:Name`\n  -  When using HTTP URL: `&group_by=Region&group_by=Tag:Name`\n";
                };
                readonly filters: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "An encoded JSON mapping of Dimension IDs to values by which to filter the results. The keys are dimension IDs; they may be negated with a '!' prefix. \n  - When using this form (Do not encode): \n    - `{\"Region\": [\"us-east-1\"], \"!Account\": [\"123456789012\"]}`\n  - When using HTTP URL (This must be encoded!): \n    - Encoded: `%26filters%3D%7B%22Region%22%3A%20%5B%22us-east-1%22%5D%2C%20%22%21Account%22%3A%20%5B%22123456789012%22%5D%7D`     \n    - Decoded: `&filters={\"Region\": [\"us-east-1\"], \"!Account\": [\"123456789012\"]}` \n";
                };
                readonly cost_type: {
                    readonly description: "https://docs.cloudzero.com/docs/explorer#cost-types";
                    readonly type: "string";
                    readonly enum: readonly ["billed_cost", "discounted_cost", "amortized_cost", "discounted_amortized_cost", "real_cost", "on_demand_cost", "invoiced_amortized_cost", "usage_amount"];
                    readonly default: "real_cost";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to page forward and back in your results. NOTE: This must be URL Encoded!\n - See the [Pagination](https://docs.cloudzero.com/reference/pagination) section of the API Reference for more information!\n";
                };
            };
            readonly required: readonly ["start_date"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly costs: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "Cost for a given usage date and set of group_by dimensions.\nThe response will contain additional fields based on the group by parameters passed in.\n\nYour response will look similar to this (with `Region` group by field as an example):\n\n \n `{\n\n\n    \"costs\": \n\n\n      [\n\n\n        {\n          \"usage_date\": \"2023-10-02T21:00:00+00:00\",\n          \"cost\": 0,\n          \"Region\": \"us-east-1\"\n        },\n\n\n        {\n          \"usage_date\": \"2023-10-02T21:00:00+00:00\",\n          \"cost\": 0,\n          \"Region\": \"us-west-1\"\n        },\n\n\n        {\n          \"usage_date\": \"2023-10-21T21:00:00+00:00\",\n          \"cost\": 0,\n          \"Region\": \"us-east-1\"\n        },\n\n\n        {\n          \"usage_date\": \"2023-10-22T21:00:00+00:00\",\n          \"cost\": 0,\n          \"Region\": \"us-west-1\"\n        } \n\n\n      ],\n\n\n    \"pagination\": \n\n\n      {\n        \"page_count\": 1,\n        \"item_count\": 32,\n        \"total_count\": 32,\n        \"cursor\": {\n          \"next_cursor\": null,\n          \"previous_cursor\": null,\n          \"has_next\": false,\n          \"has_previous\": false\n        }\n      },\n\n\n    \"sorting\": \n\n\n      {\n        \"available\": {\n          \"sort_keys\": [\n            \"usage_date\"\n          ],\n          \"sort_orders\": [\n            \"asc\"\n          ]\n        },\n        \"current\": [\n          {\n            \"sort_key\": \"usage_date\",\n            \"sort_order\": \"asc\"\n          }\n        ]\n      },\n\n\n    \"filtering\": \n\n\n     {\n        \"available\": [],\n        \"current\": {}\n      },\n\n\n      \"total_count\": 32\n\n      \n  }`\n";
                        readonly properties: {
                            readonly usage_date: {
                                readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                                readonly type: "string";
                                readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                                readonly default: "2025-01-01T00:00:00Z";
                            };
                            readonly cost: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                        };
                    };
                };
                readonly pagination: {
                    readonly description: "Supports programmatic pagination";
                    readonly type: "object";
                    readonly properties: {
                        readonly page_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly item_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly total_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly previous_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly has_next: {
                                    readonly type: "boolean";
                                };
                                readonly has_previous: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "410": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetBillingDimensions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly include_hidden: {
                    readonly type: "boolean";
                    readonly default: false;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Include dimensions marked as hidden in CostFormation, which do not appear in the CloudZero Explorer\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly dimensions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "A CloudZero dimension available for use in our APIs and CostFormation.\n";
                        readonly properties: {
                            readonly id: {
                                readonly description: "Identifier of a CloudZero Dimension, as used in the CostFormation language.\nSee https://docs.cloudzero.com/docs/dimensions for details.\n";
                                readonly type: "string";
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "410": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "429": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetBudgets: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of items to return per page";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to page forward and back in your results. NOTE: This must be URL Encoded!\n - See the [Pagination](https://docs.cloudzero.com/reference/pagination) section of the API Reference for more information!\n";
                };
                readonly sort_key: {
                    readonly description: "Sortable Budget properties";
                    readonly type: "string";
                    readonly enum: readonly ["last_updated", "name"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ASC or DESC sort order";
                };
                readonly expand: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["current"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, query will expand the properties specified.\nThis is a multi-value query parameter, pass it more than once to specify multiple values, e.g.\n  - `&expand=current&expand=history`\n";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pagination: {
                    readonly description: "Supports programmatic pagination";
                    readonly type: "object";
                    readonly properties: {
                        readonly page_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly item_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly total_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly previous_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly has_next: {
                                    readonly type: "boolean";
                                };
                                readonly has_previous: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                    };
                };
                readonly sorting: {
                    readonly description: "This response key contains sorting options, where:\n  - `available`: is an object with two keys:\n      - `sort_keys`: list of available sort keys\n      - `sort_orders`: list of available sort orders\n  - `current`: is an array of `{sort_key: sort_order}` objects, the response is sorted in order of this array\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "object";
                            readonly properties: {
                                readonly sort_keys: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly description: "Sortable Budget properties\n\n`last_updated` `name`";
                                        readonly type: "string";
                                        readonly enum: readonly ["last_updated", "name"];
                                        readonly examples: readonly ["last_updated"];
                                    };
                                    readonly examples: readonly ["last_updated", "name"];
                                };
                                readonly sort_orders: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly examples: readonly ["asc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                    readonly examples: readonly ["asc", "desc"];
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sort_key: {
                                        readonly description: "Sortable Budget properties\n\n`last_updated` `name`";
                                        readonly type: "string";
                                        readonly enum: readonly ["last_updated", "name"];
                                    };
                                    readonly sort_order: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                };
                            };
                        };
                    };
                };
                readonly filtering: {
                    readonly description: "This response key contains filtering options, where:\n  - `available`: is an array of filterable field objects\n  - `current`: is an object containing the currently filtered fields and the filter values\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly field: {
                                        readonly type: "string";
                                    };
                                    readonly valid_values: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                    readonly valid_types: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "array";
                                readonly items: {};
                            };
                        };
                    };
                };
                readonly budgets: {
                    readonly type: "array";
                    readonly items: {
                        readonly anyOf: readonly [{
                            readonly type: "object";
                            readonly required: readonly ["cost_type", "created", "granularity", "id", "last_updated", "name", "planned_limits", "view"];
                            readonly properties: {
                                readonly name: {
                                    readonly description: "Budget name, must be unique within a View";
                                    readonly type: "string";
                                };
                                readonly planned_limits: {
                                    readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                                    readonly type: "object";
                                    readonly required: readonly ["monthly"];
                                    readonly properties: {
                                        readonly monthly: {
                                            readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                                            readonly type: "object";
                                            readonly additionalProperties: {
                                                readonly description: "Amount for planned limit";
                                                readonly type: "object";
                                                readonly required: readonly ["amount"];
                                                readonly properties: {
                                                    readonly amount: {
                                                        readonly description: "String representation of a dollar amount";
                                                        readonly type: "string";
                                                        readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                                        readonly default: "1.0";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly view: {
                                    readonly type: "object";
                                    readonly required: readonly ["id"];
                                    readonly description: "View associated with this Budget";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                                readonly alerts: {
                                    readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                        readonly enum: readonly ["Y", "N"];
                                        readonly description: "`Y` `N`";
                                    };
                                };
                                readonly id: {
                                    readonly type: "string";
                                };
                                readonly created: {
                                    readonly description: "UTC timestamp for the creation of this entity";
                                    readonly type: "string";
                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                };
                                readonly last_updated: {
                                    readonly description: "UTC timestamp for the last update of this entity";
                                    readonly type: "string";
                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                };
                                readonly cost_type: {
                                    readonly description: "Type of charges included in the cost calculation, currently supports the following values:\n  `real_cost`: filters your bill to only display charges directly related to consumption\n\n\n`real_cost`";
                                    readonly type: "string";
                                    readonly enum: readonly ["real_cost"];
                                };
                                readonly granularity: {
                                    readonly description: "Supported periods, e.g. \"monthly\"\n\n`monthly`";
                                    readonly type: "string";
                                    readonly enum: readonly ["monthly"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly required: readonly ["cost_type", "created", "current", "granularity", "id", "last_updated", "name", "planned_limits", "view"];
                            readonly properties: {
                                readonly name: {
                                    readonly description: "Budget name, must be unique within a View";
                                    readonly type: "string";
                                };
                                readonly planned_limits: {
                                    readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                                    readonly type: "object";
                                    readonly required: readonly ["monthly"];
                                    readonly properties: {
                                        readonly monthly: {
                                            readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                                            readonly type: "object";
                                            readonly additionalProperties: {
                                                readonly description: "Amount for planned limit";
                                                readonly type: "object";
                                                readonly required: readonly ["amount"];
                                                readonly properties: {
                                                    readonly amount: {
                                                        readonly description: "String representation of a dollar amount";
                                                        readonly type: "string";
                                                        readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                                        readonly default: "1.0";
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                                readonly view: {
                                    readonly type: "object";
                                    readonly required: readonly ["id"];
                                    readonly description: "View associated with this Budget";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                                readonly alerts: {
                                    readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly type: "string";
                                        readonly enum: readonly ["Y", "N"];
                                        readonly description: "`Y` `N`";
                                    };
                                };
                                readonly id: {
                                    readonly type: "string";
                                };
                                readonly created: {
                                    readonly description: "UTC timestamp for the creation of this entity";
                                    readonly type: "string";
                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                };
                                readonly last_updated: {
                                    readonly description: "UTC timestamp for the last update of this entity";
                                    readonly type: "string";
                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                };
                                readonly cost_type: {
                                    readonly description: "Type of charges included in the cost calculation, currently supports the following values:\n  `real_cost`: filters your bill to only display charges directly related to consumption\n\n\n`real_cost`";
                                    readonly type: "string";
                                    readonly enum: readonly ["real_cost"];
                                };
                                readonly granularity: {
                                    readonly description: "Supported periods, e.g. \"monthly\"\n\n`monthly`";
                                    readonly type: "string";
                                    readonly enum: readonly ["monthly"];
                                };
                                readonly current: {
                                    readonly type: "object";
                                    readonly required: readonly ["actual", "planned"];
                                    readonly properties: {
                                        readonly actual: {
                                            readonly type: "string";
                                        };
                                        readonly planned: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCommentsForOneInsight: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly insight_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Insight identifier";
                };
            };
            readonly required: readonly ["insight_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly insight: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["id"];
                };
                readonly comments: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["author", "created", "id", "insight", "last_updated", "message"];
                        readonly properties: {
                            readonly message: {
                                readonly type: "string";
                            };
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly created: {
                                readonly description: "UTC timestamp for the creation of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly author: {
                                readonly type: "string";
                            };
                            readonly insight: {
                                readonly type: "object";
                                readonly required: readonly ["id"];
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetCostFormationDefinitionVersions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of items to return per page";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to page forward and back in your results. NOTE: This must be URL Encoded!\n - See the [Pagination](https://docs.cloudzero.com/reference/pagination) section of the API Reference for more information!\n";
                };
                readonly sort_key: {
                    readonly description: "Sortable CloudZero CostFormation Definition Properties";
                    readonly type: "string";
                    readonly enum: readonly ["version"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ASC or DESC sort order";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pagination: {
                    readonly description: "Supports programmatic pagination";
                    readonly type: "object";
                    readonly properties: {
                        readonly page_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly item_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly total_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly previous_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly has_next: {
                                    readonly type: "boolean";
                                };
                                readonly has_previous: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                    };
                };
                readonly sorting: {
                    readonly description: "This response key contains sorting options, where:\n  - `available`: is an object with two keys:\n      - `sort_keys`: list of available sort keys\n      - `sort_orders`: list of available sort orders\n  - `current`: is an array of `{sort_key: sort_order}` objects, the response is sorted in order of this array\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "object";
                            readonly properties: {
                                readonly sort_keys: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly description: "Sortable CloudZero CostFormation Definition Properties\n\n`version`";
                                        readonly type: "string";
                                        readonly enum: readonly ["version"];
                                        readonly examples: readonly ["last_updated"];
                                    };
                                    readonly examples: readonly ["version"];
                                };
                                readonly sort_orders: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly examples: readonly ["asc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                    readonly examples: readonly ["asc", "desc"];
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sort_key: {
                                        readonly description: "Sortable CloudZero CostFormation Definition Properties\n\n`version`";
                                        readonly type: "string";
                                        readonly enum: readonly ["version"];
                                    };
                                    readonly sort_order: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                };
                            };
                        };
                    };
                };
                readonly filtering: {
                    readonly description: "This response key contains filtering options, where:\n  - `available`: is an array of filterable field objects\n  - `current`: is an object containing the currently filtered fields and the filter values\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly field: {
                                        readonly type: "string";
                                    };
                                    readonly valid_values: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                    readonly valid_types: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "array";
                                readonly items: {};
                            };
                        };
                    };
                };
                readonly versions: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["version"];
                        readonly properties: {
                            readonly version: {
                                readonly type: "string";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly last_updated_by: {
                                readonly description: "email, username, or api key that created this entity (optional)";
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetInsights: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of items to return per page";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to page forward and back in your results. NOTE: This must be URL Encoded!\n - See the [Pagination](https://docs.cloudzero.com/reference/pagination) section of the API Reference for more information!\n";
                };
                readonly sort_key: {
                    readonly description: "Sortable Insight properties";
                    readonly type: "string";
                    readonly enum: readonly ["category", "cost_impact", "effort", "last_updated", "status", "title"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ASC or DESC sort order";
                };
                readonly "hide_resolved (Deprecated)": {
                    readonly description: "Prefer filtering by Status.";
                    readonly type: "boolean";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly status: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["new", "in_progress", "on_hold", "addressed", "ignored"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, query will be filtered by the properties specified.\nThis is a multi-value query parameter, pass it more than once to specify multiple values, e.g.\n  - `&status=new&status=in_progress`\n";
                };
                readonly effort: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["not_set", "low", "medium", "high"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, query will be filtered by the properties specified.\nThis is a multi-value query parameter, pass it more than once to specify multiple values, e.g.\n  - `&effort=low&effort=medium`\n";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pagination: {
                    readonly description: "Supports programmatic pagination";
                    readonly type: "object";
                    readonly properties: {
                        readonly page_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly item_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly total_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly previous_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly has_next: {
                                    readonly type: "boolean";
                                };
                                readonly has_previous: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                    };
                };
                readonly sorting: {
                    readonly description: "This response key contains sorting options, where:\n  - `available`: is an object with two keys:\n      - `sort_keys`: list of available sort keys\n      - `sort_orders`: list of available sort orders\n  - `current`: is an array of `{sort_key: sort_order}` objects, the response is sorted in order of this array\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "object";
                            readonly properties: {
                                readonly sort_keys: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly description: "Sortable Insight properties\n\n`category` `cost_impact` `effort` `last_updated` `status` `title`";
                                        readonly type: "string";
                                        readonly enum: readonly ["category", "cost_impact", "effort", "last_updated", "status", "title"];
                                        readonly examples: readonly ["last_updated"];
                                    };
                                    readonly examples: readonly ["category", "cost_impact", "effort", "last_updated", "status", "title"];
                                };
                                readonly sort_orders: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly examples: readonly ["asc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                    readonly examples: readonly ["asc", "desc"];
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sort_key: {
                                        readonly description: "Sortable Insight properties\n\n`category` `cost_impact` `effort` `last_updated` `status` `title`";
                                        readonly type: "string";
                                        readonly enum: readonly ["category", "cost_impact", "effort", "last_updated", "status", "title"];
                                    };
                                    readonly sort_order: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                };
                            };
                        };
                    };
                };
                readonly filtering: {
                    readonly description: "This response key contains filtering options, where:\n  - `available`: is an array of filterable field objects\n  - `current`: is an object containing the currently filtered fields and the filter values\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly field: {
                                        readonly type: "string";
                                        readonly examples: readonly ["hide_resolved"];
                                    };
                                    readonly valid_values: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                    readonly valid_types: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "array";
                                readonly items: {};
                            };
                        };
                    };
                };
                readonly insights: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["created", "id", "last_updated"];
                        readonly properties: {
                            readonly effort: {
                                readonly type: "string";
                                readonly enum: readonly ["not_set", "low", "medium", "high"];
                                readonly description: "`not_set` `low` `medium` `high`";
                            };
                            readonly cost_impact: {
                                readonly description: "String or float representation of a dollar amount";
                                readonly oneOf: readonly [{
                                    readonly description: "String representation of a dollar amount";
                                    readonly type: "string";
                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                    readonly default: "1.0";
                                }, {
                                    readonly type: "number";
                                    readonly format: "float";
                                    readonly minimum: -3.402823669209385e+38;
                                    readonly maximum: 3.402823669209385e+38;
                                }];
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            };
                            readonly status: {
                                readonly type: "string";
                                readonly enum: readonly ["new", "in_progress", "on_hold", "addressed", "ignored"];
                                readonly description: "`new` `in_progress` `on_hold` `addressed` `ignored`";
                            };
                            readonly category: {
                                readonly type: "string";
                            };
                            readonly link: {
                                readonly type: "string";
                            };
                            readonly description: {
                                readonly type: "string";
                            };
                            readonly title: {
                                readonly type: "string";
                            };
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly created: {
                                readonly description: "UTC timestamp for the creation of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOneBillingConnection: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly connection_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Billing Connection identifier";
                };
            };
            readonly required: readonly ["connection_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly connection: {
                    readonly type: "object";
                    readonly required: readonly ["capabilities", "cloud_provider", "connection_id", "connection_type", "created", "expected_ingest_rate", "id", "is_draft", "is_enabled", "last_updated", "name", "s3_bucket_info"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly connection_type: {
                            readonly type: "string";
                        };
                        readonly cloud_provider: {
                            readonly type: "string";
                        };
                        readonly s3_bucket_info: {
                            readonly type: "object";
                            readonly required: readonly ["bucket_name", "bucket_path"];
                            readonly properties: {
                                readonly bucket_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["test-bucket"];
                                };
                                readonly bucket_path: {
                                    readonly type: "string";
                                    readonly examples: readonly ["path/to/data"];
                                };
                                readonly cloud_account_id: {
                                    readonly description: "This is the AWS Account ID with the S3 Bucket that the AnyCost Adaptor will be writing Common Bill Format files into.";
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly expected_ingest_rate: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly is_enabled: {
                            readonly type: "boolean";
                        };
                        readonly capabilities: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                        readonly is_draft: {
                            readonly type: "boolean";
                        };
                        readonly connection_id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOneBudget: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly budget_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique budget identifier";
                };
            };
            readonly required: readonly ["budget_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly expand: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["current", "history", "burnup"];
                    };
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, query will expand the properties specified.\nThis is a multi-value query parameter, pass it more than once to specify multiple values, e.g.\n  - `&expand=current&expand=history`\n";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly budget: {
                    readonly anyOf: readonly [{
                        readonly type: "object";
                        readonly required: readonly ["cost_type", "created", "granularity", "id", "last_updated", "name", "planned_limits", "view"];
                        readonly properties: {
                            readonly name: {
                                readonly description: "Budget name, must be unique within a View";
                                readonly type: "string";
                            };
                            readonly planned_limits: {
                                readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                                readonly type: "object";
                                readonly required: readonly ["monthly"];
                                readonly properties: {
                                    readonly monthly: {
                                        readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly description: "Amount for planned limit";
                                            readonly type: "object";
                                            readonly required: readonly ["amount"];
                                            readonly properties: {
                                                readonly amount: {
                                                    readonly description: "String representation of a dollar amount";
                                                    readonly type: "string";
                                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                                    readonly default: "1.0";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            readonly view: {
                                readonly type: "object";
                                readonly required: readonly ["id"];
                                readonly description: "View associated with this Budget";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly alerts: {
                                readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Y", "N"];
                                    readonly description: "`Y` `N`";
                                };
                            };
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly created: {
                                readonly description: "UTC timestamp for the creation of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly cost_type: {
                                readonly description: "Type of charges included in the cost calculation, currently supports the following values:\n  `real_cost`: filters your bill to only display charges directly related to consumption\n\n\n`real_cost`";
                                readonly type: "string";
                                readonly enum: readonly ["real_cost"];
                            };
                            readonly granularity: {
                                readonly description: "Supported periods, e.g. \"monthly\"\n\n`monthly`";
                                readonly type: "string";
                                readonly enum: readonly ["monthly"];
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly required: readonly ["burnup", "cost_type", "created", "current", "granularity", "history", "id", "last_updated", "name", "planned_limits", "view"];
                        readonly properties: {
                            readonly name: {
                                readonly description: "Budget name, must be unique within a View";
                                readonly type: "string";
                            };
                            readonly planned_limits: {
                                readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                                readonly type: "object";
                                readonly required: readonly ["monthly"];
                                readonly properties: {
                                    readonly monthly: {
                                        readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                                        readonly type: "object";
                                        readonly additionalProperties: {
                                            readonly description: "Amount for planned limit";
                                            readonly type: "object";
                                            readonly required: readonly ["amount"];
                                            readonly properties: {
                                                readonly amount: {
                                                    readonly description: "String representation of a dollar amount";
                                                    readonly type: "string";
                                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                                    readonly default: "1.0";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            readonly view: {
                                readonly type: "object";
                                readonly required: readonly ["id"];
                                readonly description: "View associated with this Budget";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly alerts: {
                                readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly type: "string";
                                    readonly enum: readonly ["Y", "N"];
                                    readonly description: "`Y` `N`";
                                };
                            };
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly created: {
                                readonly description: "UTC timestamp for the creation of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                            readonly cost_type: {
                                readonly description: "Type of charges included in the cost calculation, currently supports the following values:\n  `real_cost`: filters your bill to only display charges directly related to consumption\n\n\n`real_cost`";
                                readonly type: "string";
                                readonly enum: readonly ["real_cost"];
                            };
                            readonly granularity: {
                                readonly description: "Supported periods, e.g. \"monthly\"\n\n`monthly`";
                                readonly type: "string";
                                readonly enum: readonly ["monthly"];
                            };
                            readonly current: {
                                readonly type: "object";
                                readonly required: readonly ["actual", "planned"];
                                readonly properties: {
                                    readonly actual: {
                                        readonly type: "string";
                                    };
                                    readonly planned: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly burnup: {
                                readonly type: "object";
                                readonly required: readonly ["daily"];
                                readonly properties: {
                                    readonly daily: {
                                        readonly type: "object";
                                        readonly patternProperties: {
                                            readonly "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?)?$": {
                                                readonly type: "object";
                                                readonly required: readonly ["actual", "planned"];
                                                readonly properties: {
                                                    readonly actual: {
                                                        readonly type: "string";
                                                    };
                                                    readonly planned: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                        readonly additionalProperties: true;
                                    };
                                };
                            };
                            readonly history: {
                                readonly type: "object";
                                readonly required: readonly ["monthly", "quarterly"];
                                readonly properties: {
                                    readonly monthly: {
                                        readonly type: "object";
                                        readonly patternProperties: {
                                            readonly "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?)?$": {
                                                readonly type: "object";
                                                readonly required: readonly ["actual", "planned"];
                                                readonly properties: {
                                                    readonly actual: {
                                                        readonly type: "string";
                                                    };
                                                    readonly planned: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                        readonly additionalProperties: true;
                                    };
                                    readonly quarterly: {
                                        readonly type: "object";
                                        readonly patternProperties: {
                                            readonly "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])(T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?)?$": {
                                                readonly type: "object";
                                                readonly required: readonly ["actual", "planned"];
                                                readonly properties: {
                                                    readonly actual: {
                                                        readonly type: "string";
                                                    };
                                                    readonly planned: {
                                                        readonly type: "string";
                                                    };
                                                };
                                            };
                                        };
                                        readonly additionalProperties: true;
                                    };
                                };
                            };
                        };
                    }];
                };
            };
            readonly required: readonly ["budget"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOneCostFormationDefinitionVersion: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly version: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique CloudZero CostFormation Definition Version; `latest` is as an alias for the most recent version.\n";
                };
            };
            readonly required: readonly ["version"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly version: {
                    readonly type: "object";
                    readonly required: readonly ["uri", "version"];
                    readonly properties: {
                        readonly version: {
                            readonly type: "string";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated_by: {
                            readonly description: "email, username, or api key that created this entity (optional)";
                            readonly type: "string";
                        };
                        readonly uri: {
                            readonly type: "string";
                            readonly format: "uri";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOneInsight: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly insight_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Insight identifier";
                };
            };
            readonly required: readonly ["insight_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly insight: {
                    readonly type: "object";
                    readonly required: readonly ["created", "id", "last_updated"];
                    readonly properties: {
                        readonly effort: {
                            readonly type: "string";
                            readonly enum: readonly ["not_set", "low", "medium", "high"];
                            readonly description: "`not_set` `low` `medium` `high`";
                        };
                        readonly cost_impact: {
                            readonly description: "String or float representation of a dollar amount";
                            readonly oneOf: readonly [{
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            }, {
                                readonly type: "number";
                                readonly format: "float";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            }];
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly enum: readonly ["new", "in_progress", "on_hold", "addressed", "ignored"];
                            readonly description: "`new` `in_progress` `on_hold` `addressed` `ignored`";
                        };
                        readonly category: {
                            readonly type: "string";
                        };
                        readonly link: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly title: {
                            readonly type: "string";
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetOneView: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly view_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique View identifier";
                };
            };
            readonly required: readonly ["view_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly view: {
                    readonly type: "object";
                    readonly required: readonly ["connections", "filter", "id", "last_updated", "name", "principal_dimension"];
                    readonly properties: {
                        readonly name: {
                            readonly description: "View name";
                            readonly type: "string";
                        };
                        readonly filter: {
                            readonly description: "Filter mapping of dimension name to allowed values";
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly description: "filters";
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly connections: {
                            readonly description: "Contains the connections that will receive notifications for this view";
                            readonly type: "object";
                            readonly properties: {
                                readonly email: {
                                    readonly description: "Email Connection";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly addresses: {
                                            readonly description: "List of email addresses to notify";
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "string";
                                            };
                                        };
                                        readonly include_all_organizers: {
                                            readonly description: "Whether or not to additionally notifiy all organizers in the organization";
                                            readonly type: "boolean";
                                        };
                                    };
                                };
                                readonly slack: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly description: "Slack Connection";
                                        readonly type: "object";
                                        readonly required: readonly ["id", "name"];
                                        readonly properties: {
                                            readonly id: {
                                                readonly type: "string";
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly principal_dimension: {
                            readonly description: "primary group by dimension for the view";
                            readonly type: "string";
                        };
                        readonly anomalies: {
                            readonly type: "object";
                            readonly description: "Anomalies configuration for the view. These fields are used to configure the anomaly detection for the view. \nAnomalies are detected by comparing the cost of a given day to the cost of the previous day. \nIf the cost of the current day is greater than or equal to the threshold, an anomaly event will be generated. \nThe anomaly event will be sent to the configured connections for the view. \nThe following fields are used to configure the anomaly detection:\n";
                            readonly properties: {
                                readonly enabled: {
                                    readonly description: "Specifies whether or not to enable anomaly detection for the view.\n  `true` (Default): anomaly detection is enabled for the view\n  `false`: anomaly detection is disabled for the view\n";
                                    readonly type: "boolean";
                                };
                                readonly threshold_type: {
                                    readonly description: "Type of threshold to use when detecting anomalies within this view. This field, combined with the `threshold_value` \nfield sets the threshold for anomalies detected within this view. The threshold is used to determine if a day to day \ncost spike is considered an anomaly. The cost spike  must be greater \nor equal to the threshold in order generate an anomaly event. The following values are currently supported:\n  `Automatic`: the threshold will be automatically calculated using a sliding scale based on the view's cost\n  `Percent`: the threshold will be a percentage of the view's cost\n\n\n`Automatic` `Percent`";
                                    readonly type: "string";
                                    readonly enum: readonly ["Automatic", "Percent"];
                                };
                                readonly threshold_value: {
                                    readonly description: "Value of the threshold to apply to anomalies for the specified view. The value is interpreted based on the `threshold_type`:\n  `Automatic`: threshold_value is ignored when the threshold type is `Automatic`\n  `Percent`: threshold_value is the percentage of the view's cost to use as the threshold\n";
                                    readonly type: "integer";
                                };
                            };
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const GetViews: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly limit: {
                    readonly type: "number";
                    readonly format: "int32";
                    readonly minimum: -2147483648;
                    readonly maximum: 2147483647;
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Number of items to return per page";
                };
                readonly cursor: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Allows you to page forward and back in your results. NOTE: This must be URL Encoded!\n - See the [Pagination](https://docs.cloudzero.com/reference/pagination) section of the API Reference for more information!\n";
                };
                readonly sort_key: {
                    readonly description: "Sortable View properties";
                    readonly type: "string";
                    readonly enum: readonly ["last_updated"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                };
                readonly sort_order: {
                    readonly type: "string";
                    readonly enum: readonly ["asc", "desc"];
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "ASC or DESC sort order";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly pagination: {
                    readonly description: "Supports programmatic pagination";
                    readonly type: "object";
                    readonly properties: {
                        readonly page_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly item_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly total_count: {
                            readonly type: "integer";
                            readonly format: "int32";
                            readonly minimum: -2147483648;
                            readonly maximum: 2147483647;
                        };
                        readonly cursor: {
                            readonly type: "object";
                            readonly properties: {
                                readonly next_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly previous_cursor: {
                                    readonly type: readonly ["string", any];
                                };
                                readonly has_next: {
                                    readonly type: "boolean";
                                };
                                readonly has_previous: {
                                    readonly type: "boolean";
                                };
                            };
                        };
                    };
                };
                readonly sorting: {
                    readonly description: "This response key contains sorting options, where:\n  - `available`: is an object with two keys:\n      - `sort_keys`: list of available sort keys\n      - `sort_orders`: list of available sort orders\n  - `current`: is an array of `{sort_key: sort_order}` objects, the response is sorted in order of this array\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "object";
                            readonly properties: {
                                readonly sort_keys: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly description: "Sortable View properties\n\n`last_updated`";
                                        readonly type: "string";
                                        readonly enum: readonly ["last_updated"];
                                        readonly examples: readonly ["last_updated"];
                                    };
                                    readonly examples: readonly ["last_updated"];
                                };
                                readonly sort_orders: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly examples: readonly ["asc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                    readonly examples: readonly ["asc", "desc"];
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly sort_key: {
                                        readonly description: "Sortable View properties\n\n`last_updated`";
                                        readonly type: "string";
                                        readonly enum: readonly ["last_updated"];
                                    };
                                    readonly sort_order: {
                                        readonly type: "string";
                                        readonly enum: readonly ["asc", "desc"];
                                        readonly description: "`asc` `desc`";
                                    };
                                };
                            };
                        };
                    };
                };
                readonly filtering: {
                    readonly description: "This response key contains filtering options, where:\n  - `available`: is an array of filterable field objects\n  - `current`: is an object containing the currently filtered fields and the filter values\n";
                    readonly type: "object";
                    readonly properties: {
                        readonly available: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly field: {
                                        readonly type: "string";
                                    };
                                    readonly valid_values: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                    readonly valid_types: {
                                        readonly type: "array";
                                        readonly items: {};
                                    };
                                };
                            };
                        };
                        readonly current: {
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "array";
                                readonly items: {};
                            };
                        };
                    };
                };
                readonly views: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["connections", "filter", "id", "last_updated", "name", "principal_dimension"];
                        readonly properties: {
                            readonly name: {
                                readonly description: "View name";
                                readonly type: "string";
                            };
                            readonly filter: {
                                readonly description: "Filter mapping of dimension name to allowed values";
                                readonly type: "object";
                                readonly additionalProperties: {
                                    readonly description: "filters";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                };
                            };
                            readonly connections: {
                                readonly description: "Contains the connections that will receive notifications for this view";
                                readonly type: "object";
                                readonly properties: {
                                    readonly email: {
                                        readonly description: "Email Connection";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly addresses: {
                                                readonly description: "List of email addresses to notify";
                                                readonly type: "array";
                                                readonly items: {
                                                    readonly type: "string";
                                                };
                                            };
                                            readonly include_all_organizers: {
                                                readonly description: "Whether or not to additionally notifiy all organizers in the organization";
                                                readonly type: "boolean";
                                            };
                                        };
                                    };
                                    readonly slack: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly description: "Slack Connection";
                                            readonly type: "object";
                                            readonly required: readonly ["id", "name"];
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            readonly principal_dimension: {
                                readonly description: "primary group by dimension for the view";
                                readonly type: "string";
                            };
                            readonly anomalies: {
                                readonly type: "object";
                                readonly description: "Anomalies configuration for the view. These fields are used to configure the anomaly detection for the view. \nAnomalies are detected by comparing the cost of a given day to the cost of the previous day. \nIf the cost of the current day is greater than or equal to the threshold, an anomaly event will be generated. \nThe anomaly event will be sent to the configured connections for the view. \nThe following fields are used to configure the anomaly detection:\n";
                                readonly properties: {
                                    readonly enabled: {
                                        readonly description: "Specifies whether or not to enable anomaly detection for the view.\n  `true` (Default): anomaly detection is enabled for the view\n  `false`: anomaly detection is disabled for the view\n";
                                        readonly type: "boolean";
                                    };
                                    readonly threshold_type: {
                                        readonly description: "Type of threshold to use when detecting anomalies within this view. This field, combined with the `threshold_value` \nfield sets the threshold for anomalies detected within this view. The threshold is used to determine if a day to day \ncost spike is considered an anomaly. The cost spike  must be greater \nor equal to the threshold in order generate an anomaly event. The following values are currently supported:\n  `Automatic`: the threshold will be automatically calculated using a sliding scale based on the view's cost\n  `Percent`: the threshold will be a percentage of the view's cost\n\n\n`Automatic` `Percent`";
                                        readonly type: "string";
                                        readonly enum: readonly ["Automatic", "Percent"];
                                    };
                                    readonly threshold_value: {
                                        readonly description: "Value of the threshold to apply to anomalies for the specified view. The value is interpreted based on the `threshold_type`:\n  `Automatic`: threshold_value is ignored when the threshold type is `Automatic`\n  `Percent`: threshold_value is the percentage of the view's cost to use as the threshold\n";
                                        readonly type: "integer";
                                    };
                                };
                            };
                            readonly id: {
                                readonly type: "string";
                            };
                            readonly last_updated: {
                                readonly description: "UTC timestamp for the last update of this entity";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateOneBillingConnection: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
            };
            readonly expected_ingest_rate: {
                readonly type: readonly ["number", any];
            };
            readonly is_enabled: {
                readonly type: "boolean";
            };
            readonly s3_bucket_info: {
                readonly anyOf: readonly [{
                    readonly type: "object";
                    readonly properties: {
                        readonly bucket_name: {
                            readonly type: "string";
                            readonly examples: readonly ["test-bucket"];
                        };
                        readonly bucket_path: {
                            readonly type: "string";
                            readonly examples: readonly ["path/to/data"];
                        };
                        readonly cloud_account_id: {
                            readonly type: readonly ["string", any];
                            readonly description: "This is the AWS Account ID with the S3 Bucket that the AnyCost Adaptor will be writing Common Bill Format files into.";
                        };
                    };
                }, {
                    readonly type: "null";
                }];
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly connection_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Billing Connection identifier";
                };
            };
            readonly required: readonly ["connection_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly connection: {
                    readonly type: "object";
                    readonly required: readonly ["capabilities", "cloud_provider", "connection_id", "connection_type", "created", "expected_ingest_rate", "id", "is_draft", "is_enabled", "last_updated", "name", "s3_bucket_info"];
                    readonly properties: {
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly name: {
                            readonly type: "string";
                        };
                        readonly connection_type: {
                            readonly type: "string";
                        };
                        readonly cloud_provider: {
                            readonly type: "string";
                        };
                        readonly s3_bucket_info: {
                            readonly type: "object";
                            readonly required: readonly ["bucket_name", "bucket_path"];
                            readonly properties: {
                                readonly bucket_name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["test-bucket"];
                                };
                                readonly bucket_path: {
                                    readonly type: "string";
                                    readonly examples: readonly ["path/to/data"];
                                };
                                readonly cloud_account_id: {
                                    readonly description: "This is the AWS Account ID with the S3 Bucket that the AnyCost Adaptor will be writing Common Bill Format files into.";
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly expected_ingest_rate: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly is_enabled: {
                            readonly type: "boolean";
                        };
                        readonly capabilities: {
                            readonly type: "object";
                            readonly additionalProperties: true;
                        };
                        readonly is_draft: {
                            readonly type: "boolean";
                        };
                        readonly connection_id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateOneBudget: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly description: "Budget name, must be unique within a View";
                readonly type: "string";
            };
            readonly planned_limits: {
                readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                readonly type: "object";
                readonly properties: {
                    readonly monthly: {
                        readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly description: "Amount for planned limit";
                            readonly type: "object";
                            readonly properties: {
                                readonly amount: {
                                    readonly description: "String representation of a dollar amount";
                                    readonly type: "string";
                                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                    readonly default: "1.0";
                                };
                            };
                            readonly required: readonly ["amount"];
                        };
                    };
                };
                readonly required: readonly ["monthly"];
            };
            readonly view: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "string";
                    };
                };
                readonly required: readonly ["id"];
                readonly description: "View associated with this Budget";
            };
            readonly alerts: {
                readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                readonly type: "object";
                readonly additionalProperties: {
                    readonly type: "string";
                    readonly enum: readonly ["Y", "N"];
                };
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly budget_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique budget identifier";
                };
            };
            readonly required: readonly ["budget_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly budget: {
                    readonly type: "object";
                    readonly required: readonly ["cost_type", "created", "granularity", "id", "last_updated", "name", "planned_limits", "view"];
                    readonly properties: {
                        readonly name: {
                            readonly description: "Budget name, must be unique within a View";
                            readonly type: "string";
                        };
                        readonly planned_limits: {
                            readonly description: "Mapping of `period` to planned budget limits for the given period. Supported `period`s are:\n  - `monthly`\n";
                            readonly type: "object";
                            readonly required: readonly ["monthly"];
                            readonly properties: {
                                readonly monthly: {
                                    readonly description: "Planned limit as a mapping of `date` to `amount`, where\n  - `date` is an timezone aware ISO Formatted string, e.g. `\"2022-02-01T00:00:00+00:00\"`\n  - `amount` is a Mapping of the literal string `\"amount\"` to a dollar amount, e.g. `{\"amount\": \"1000.00\"}`\n";
                                    readonly type: "object";
                                    readonly additionalProperties: {
                                        readonly description: "Amount for planned limit";
                                        readonly type: "object";
                                        readonly required: readonly ["amount"];
                                        readonly properties: {
                                            readonly amount: {
                                                readonly description: "String representation of a dollar amount";
                                                readonly type: "string";
                                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                                readonly default: "1.0";
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly view: {
                            readonly type: "object";
                            readonly required: readonly ["id"];
                            readonly description: "View associated with this Budget";
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                };
                            };
                        };
                        readonly alerts: {
                            readonly description: "Mapping of `1-100` to `Y/N`, where\n  - `1-100` is the percentage of the budget at which to send an alert\n  - `Y/N` is whether or not to send the alert\n";
                            readonly type: "object";
                            readonly additionalProperties: {
                                readonly type: "string";
                                readonly enum: readonly ["Y", "N"];
                                readonly description: "`Y` `N`";
                            };
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly cost_type: {
                            readonly description: "Type of charges included in the cost calculation, currently supports the following values:\n  `real_cost`: filters your bill to only display charges directly related to consumption\n\n\n`real_cost`";
                            readonly type: "string";
                            readonly enum: readonly ["real_cost"];
                        };
                        readonly granularity: {
                            readonly description: "Supported periods, e.g. \"monthly\"\n\n`monthly`";
                            readonly type: "string";
                            readonly enum: readonly ["monthly"];
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateOneCommentForOneInsight: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly message: {
                readonly type: "string";
            };
        };
        readonly required: readonly ["message"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly insight_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Insight identifier";
                };
                readonly comment_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Comment identifier";
                };
            };
            readonly required: readonly ["insight_id", "comment_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly comment: {
                    readonly type: "object";
                    readonly required: readonly ["author", "created", "id", "insight", "last_updated", "message"];
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly author: {
                            readonly type: "string";
                        };
                        readonly insight: {
                            readonly type: "object";
                            readonly required: readonly ["id"];
                            readonly properties: {
                                readonly id: {
                                    readonly type: "string";
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const UpdateOneInsight: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly effort: {
                readonly type: "string";
                readonly enum: readonly ["not_set", "low", "medium", "high"];
            };
            readonly cost_impact: {
                readonly description: "String or float representation of a dollar amount";
                readonly oneOf: readonly [{
                    readonly description: "String representation of a dollar amount";
                    readonly type: "string";
                    readonly pattern: "^\\d+(\\.\\d{1,})?$";
                    readonly default: "1.0";
                }, {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                }];
            };
            readonly status: {
                readonly type: "string";
                readonly enum: readonly ["new", "in_progress", "on_hold", "addressed", "ignored"];
            };
            readonly category: {
                readonly type: "string";
            };
            readonly link: {
                readonly type: "string";
            };
            readonly description: {
                readonly type: "string";
            };
            readonly title: {
                readonly type: "string";
            };
        };
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly insight_id: {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "Unique Insight identifier";
                };
            };
            readonly required: readonly ["insight_id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly insight: {
                    readonly type: "object";
                    readonly required: readonly ["created", "id", "last_updated"];
                    readonly properties: {
                        readonly effort: {
                            readonly type: "string";
                            readonly enum: readonly ["not_set", "low", "medium", "high"];
                            readonly description: "`not_set` `low` `medium` `high`";
                        };
                        readonly cost_impact: {
                            readonly description: "String or float representation of a dollar amount";
                            readonly oneOf: readonly [{
                                readonly description: "String representation of a dollar amount";
                                readonly type: "string";
                                readonly pattern: "^\\d+(\\.\\d{1,})?$";
                                readonly default: "1.0";
                            }, {
                                readonly type: "number";
                                readonly format: "float";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            }];
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly status: {
                            readonly type: "string";
                            readonly enum: readonly ["new", "in_progress", "on_hold", "addressed", "ignored"];
                            readonly description: "`new` `in_progress` `on_hold` `addressed` `ignored`";
                        };
                        readonly category: {
                            readonly type: "string";
                        };
                        readonly link: {
                            readonly type: "string";
                        };
                        readonly description: {
                            readonly type: "string";
                        };
                        readonly title: {
                            readonly type: "string";
                        };
                        readonly id: {
                            readonly type: "string";
                        };
                        readonly created: {
                            readonly description: "UTC timestamp for the creation of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                        readonly last_updated: {
                            readonly description: "UTC timestamp for the last update of this entity";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
declare const ValidateOneAnyCostStreamConnectionBillingDrop: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly month: {
                readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                readonly type: "string";
                readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                readonly default: "2025-01-01T00:00:00Z";
            };
            readonly operation: {
                readonly description: "The type of operation to perform on the data.\n- `replace_drop`: Replace the data with the new data.\n- `replace_hourly`: Replace the data that have overlapping hours with the new data\n- `sum`: Append data to the existing data\nIf no prior data exists, a new drop with `data` will be created\n";
                readonly type: "string";
                readonly default: "replace_drop";
                readonly enum: readonly ["replace_drop", "replace_hourly", "sum"];
            };
            readonly data: {
                readonly type: "array";
                readonly items: {
                    readonly description: "https://docs.cloudzero.com/docs/anycost-common-bill-format-cbf#data-file-columns";
                    readonly type: "object";
                    readonly properties: {
                        readonly "lineitem/id": {
                            readonly type: "string";
                        };
                        readonly "lineitem/type": {
                            readonly type: "string";
                            readonly default: "Usage";
                            readonly enum: readonly ["Usage", "Tax", "Support", "Purchase", "CommittedUsePurchase", "Discount", "Credit", "Fee", "Adjustment"];
                        };
                        readonly "lineitem/description": {
                            readonly type: "string";
                        };
                        readonly "time/usage_start": {
                            readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                            readonly default: "2025-01-01T00:00:00Z";
                        };
                        readonly "time/usage_end": {
                            readonly description: "ISO 8601 datetime string (e.g., 2023-10-26T14:27:46+00:00)";
                            readonly type: "string";
                            readonly pattern: "^\\d{4}-\\d\\d-\\d\\dT\\d\\d:\\d\\d:\\d\\d(\\.\\d+)?(([+-]\\d\\d:\\d\\d)|Z)?$";
                            readonly default: "2025-01-01T00:00:00Z";
                        };
                        readonly "resource/id": {
                            readonly type: "string";
                        };
                        readonly "resource/service": {
                            readonly type: "string";
                        };
                        readonly "resource/account": {
                            readonly type: "string";
                        };
                        readonly "resource/region": {
                            readonly type: "string";
                        };
                        readonly "resource/usage_family": {
                            readonly type: "string";
                        };
                        readonly "action/operation": {
                            readonly type: "string";
                        };
                        readonly "action/usage_type": {
                            readonly type: "string";
                        };
                        readonly "action/region": {
                            readonly type: "string";
                        };
                        readonly "action/account": {
                            readonly type: "string";
                        };
                        readonly "usage/amount": {
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "usage/units": {
                            readonly type: "string";
                            readonly default: "1";
                        };
                        readonly "cost/cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/discounted_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/amortized_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/discounted_amortized_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "cost/on_demand_cost": {
                            readonly description: "String representation of a dollar amount";
                            readonly type: "string";
                            readonly pattern: "^\\d+(\\.\\d{1,})?$";
                            readonly default: "1.0";
                        };
                        readonly "bill/invoice_id": {
                            readonly type: "string";
                        };
                        readonly "k8s/cluster": {
                            readonly type: "string";
                        };
                        readonly "k8s/namespace": {
                            readonly type: "string";
                        };
                        readonly "k8s/deployment": {
                            readonly type: "string";
                        };
                        readonly "k8s/labels": {
                            readonly type: "string";
                        };
                    };
                    readonly patternProperties: {
                        readonly "resource/tag:.+": {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["time/usage_start", "cost/cost"];
                };
            };
        };
        readonly required: readonly ["data"];
        readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "cloudzero-idempotency-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, any subsequent operation with the same value for this header will return the exact same result.\nThis is true for all responses, i.e. successes and errors.\n";
                };
                readonly "cloudzero-test-key": {
                    readonly type: "string";
                    readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
                    readonly description: "If passed, the operation executes in the namespace specified by this key.\nResource mutations in the namespace last for 1 hour.\n";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly connection: {
                    readonly type: "object";
                    readonly properties: {
                        readonly is_valid: {
                            readonly type: "boolean";
                        };
                        readonly errors: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "400": {
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "object";
                    readonly properties: {
                        readonly message: {
                            readonly type: "string";
                        };
                        readonly type: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "403": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
        readonly "413": {
            readonly type: "object";
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["message"];
            readonly $schema: "https://json-schema.org/draft/2020-12/schema#";
        };
    };
};
export { CreateBillingConnection, CreateBudget, CreateCommentForOneInsight, CreateCostFormationDefinitionVersion, CreateInsight, CreateOneAnyCostStreamConnectionBillingDrop, DeleteOneBillingConnection, DeleteOneBudget, DeleteOneInsight, GetAnyCostStreamConnectionBillingDropContents, GetAnyCostStreamConnectionBillingDrops, GetBillingConnections, GetBillingCosts, GetBillingDimensions, GetBudgets, GetCommentsForOneInsight, GetCostFormationDefinitionVersions, GetInsights, GetOneBillingConnection, GetOneBudget, GetOneCostFormationDefinitionVersion, GetOneInsight, GetOneView, GetViews, UpdateOneBillingConnection, UpdateOneBudget, UpdateOneCommentForOneInsight, UpdateOneInsight, ValidateOneAnyCostStreamConnectionBillingDrop };
