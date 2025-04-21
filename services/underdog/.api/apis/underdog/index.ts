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
    this.core = new APICore(this.spec, 'underdog/2.0.0 (api/6.1.3)');
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
   * This endpoint allows you to retrieve a paginated list of all your Projects.
   *
   * @summary List all Projects
   * @throws FetchError<401, types.GetV2ProjectsResponse401> Unauthorized
   */
  getV2Projects(metadata?: types.GetV2ProjectsMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsResponse200>> {
    return this.core.fetch('/v2/projects', 'get', metadata);
  }

  /**
   * This endpoint allows you to create a new Project.
   *
   * @summary Create a Project
   * @throws FetchError<401, types.PostV2ProjectsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsResponse404> Not Found
   */
  postV2Projects(body: types.PostV2ProjectsBodyParam): Promise<FetchResponse<202, types.PostV2ProjectsResponse202>> {
    return this.core.fetch('/v2/projects', 'post', body);
  }

  /**
   * This endpoint allows you to search Projects with a query.
   *
   * @summary Search Projects
   * @throws FetchError<401, types.GetV2ProjectsSearchResponse401> Unauthorized
   */
  getV2ProjectsSearch(metadata: types.GetV2ProjectsSearchMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsSearchResponse200>> {
    return this.core.fetch('/v2/projects/search', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve a Project by providing the Project ID.
   *
   * @summary Retrieve a Project
   * @throws FetchError<401, types.GetV2ProjectsProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsProjectidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsProjectidResponse404> Not Found
   */
  getV2ProjectsProjectid(metadata: types.GetV2ProjectsProjectidMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsProjectidResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to perform an update on a Project.
   *
   * @summary Update a Project
   * @throws FetchError<401, types.PutV2ProjectsProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.PutV2ProjectsProjectidResponse403> Forbidden
   * @throws FetchError<404, types.PutV2ProjectsProjectidResponse404> Not Found
   */
  putV2ProjectsProjectid(body: types.PutV2ProjectsProjectidBodyParam, metadata: types.PutV2ProjectsProjectidMetadataParam): Promise<FetchResponse<200, types.PutV2ProjectsProjectidResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}', 'put', body, metadata);
  }

  /**
   * This endpoint allows you to perform a partial update on a Project.
   *
   * @summary Partial Update a Project
   * @throws FetchError<401, types.PatchV2ProjectsProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.PatchV2ProjectsProjectidResponse403> Forbidden
   * @throws FetchError<404, types.PatchV2ProjectsProjectidResponse404> Not Found
   */
  patchV2ProjectsProjectid(body: types.PatchV2ProjectsProjectidBodyParam, metadata: types.PatchV2ProjectsProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsProjectidResponse200>>;
  patchV2ProjectsProjectid(metadata: types.PatchV2ProjectsProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsProjectidResponse200>>;
  patchV2ProjectsProjectid(body?: types.PatchV2ProjectsProjectidBodyParam | types.PatchV2ProjectsProjectidMetadataParam, metadata?: types.PatchV2ProjectsProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsProjectidResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}', 'patch', body, metadata);
  }

  /**
   * This endpoint allows you to retrieve stats about the NFTs in a Project.
   *
   * @summary Retrieve Project Stats
   * @throws FetchError<401, types.GetV2ProjectsProjectidStatsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsProjectidStatsResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsProjectidStatsResponse404> Not Found
   */
  getV2ProjectsProjectidStats(metadata: types.GetV2ProjectsProjectidStatsMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsProjectidStatsResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}/stats', 'get', metadata);
  }

  /**
   * This endpoint allows you to withdraw Project royalties.
   *
   * @summary Withdraw Project Royalties
   * @throws FetchError<401, types.PostV2ProjectsProjectidRoyaltiesWithdrawResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidRoyaltiesWithdrawResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidRoyaltiesWithdrawResponse404> Not Found
   */
  postV2ProjectsProjectidRoyaltiesWithdraw(body: types.PostV2ProjectsProjectidRoyaltiesWithdrawBodyParam, metadata: types.PostV2ProjectsProjectidRoyaltiesWithdrawMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidRoyaltiesWithdrawResponse202>> {
    return this.core.fetch('/v2/projects/{projectId}/royalties/withdraw', 'post', body, metadata);
  }

  /**
   * This endpoint allows you to create an NFT.
   *
   * @summary Create an NFT
   * @throws FetchError<401, types.PostV2ProjectsProjectidNftsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidNftsResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidNftsResponse404> Not Found
   */
  postV2ProjectsProjectidNfts(body: types.PostV2ProjectsProjectidNftsBodyParam, metadata: types.PostV2ProjectsProjectidNftsMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidNftsResponse202>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts', 'post', body, metadata);
  }

  /**
   * This endpoints allows you to retrieve a paginated list of all NFTs in a Project.
   *
   * @summary List all NFTs
   * @throws FetchError<401, types.GetV2ProjectsProjectidNftsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsProjectidNftsResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsProjectidNftsResponse404> Not Found
   */
  getV2ProjectsProjectidNfts(metadata: types.GetV2ProjectsProjectidNftsMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsProjectidNftsResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts', 'get', metadata);
  }

  /**
   * This endpoint allows you to lazily create an NFT.
   *
   * @summary Lazy Create an NFT
   * @throws FetchError<401, types.PostV2ProjectsProjectidNftsLazyResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidNftsLazyResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidNftsLazyResponse404> Not Found
   */
  postV2ProjectsProjectidNftsLazy(body: types.PostV2ProjectsProjectidNftsLazyBodyParam, metadata: types.PostV2ProjectsProjectidNftsLazyMetadataParam): Promise<FetchResponse<200, types.PostV2ProjectsProjectidNftsLazyResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/lazy', 'post', body, metadata);
  }

  /**
   * This endpoint allows you to create a batch of NFTs.
   *
   * @summary Create NFTs
   * @throws FetchError<401, types.PostV2ProjectsProjectidNftsBatchResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidNftsBatchResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidNftsBatchResponse404> Not Found
   */
  postV2ProjectsProjectidNftsBatch(body: types.PostV2ProjectsProjectidNftsBatchBodyParam, metadata: types.PostV2ProjectsProjectidNftsBatchMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidNftsBatchResponse202>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/batch', 'post', body, metadata);
  }

  /**
   * This endpoints allows you to search a paginated list of NFTs by owner, mint, or claimer
   * address.
   *
   * @summary Search NFTs
   * @throws FetchError<401, types.GetV2ProjectsProjectidNftsSearchResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsProjectidNftsSearchResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsProjectidNftsSearchResponse404> Not Found
   */
  getV2ProjectsProjectidNftsSearch(metadata: types.GetV2ProjectsProjectidNftsSearchMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsProjectidNftsSearchResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/search', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve an NFT by ID.
   *
   * @summary Retrieve an NFT
   * @throws FetchError<401, types.GetV2ProjectsProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsProjectidNftsNftidResponse404> Not Found
   */
  getV2ProjectsProjectidNftsNftid(metadata: types.GetV2ProjectsProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/{nftId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to perform an update on an NFT.
   *
   * @summary Update an NFT
   * @throws FetchError<401, types.PutV2ProjectsProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.PutV2ProjectsProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.PutV2ProjectsProjectidNftsNftidResponse404> Not Found
   */
  putV2ProjectsProjectidNftsNftid(body: types.PutV2ProjectsProjectidNftsNftidBodyParam, metadata: types.PutV2ProjectsProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PutV2ProjectsProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/{nftId}', 'put', body, metadata);
  }

  /**
   * This endpoint allows you to perform a partial update on an NFT.
   *
   * @summary Partial Update an NFT
   * @throws FetchError<401, types.PatchV2ProjectsProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.PatchV2ProjectsProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.PatchV2ProjectsProjectidNftsNftidResponse404> Not Found
   */
  patchV2ProjectsProjectidNftsNftid(body: types.PatchV2ProjectsProjectidNftsNftidBodyParam, metadata: types.PatchV2ProjectsProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/{nftId}', 'patch', body, metadata);
  }

  /**
   * This endpoint allows you to transfer an NFT.
   *
   * @summary Transfer an NFT
   * @throws FetchError<401, types.PostV2ProjectsProjectidNftsNftidTransferResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidNftsNftidTransferResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidNftsNftidTransferResponse404> Not Found
   */
  postV2ProjectsProjectidNftsNftidTransfer(body: types.PostV2ProjectsProjectidNftsNftidTransferBodyParam, metadata: types.PostV2ProjectsProjectidNftsNftidTransferMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidNftsNftidTransferResponse202>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/{nftId}/transfer', 'post', body, metadata);
  }

  /**
   * This endpoint allows you to burn an NFT.
   *
   * @summary Burn an NFT
   * @throws FetchError<401, types.PostV2ProjectsProjectidNftsNftidBurnResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidNftsNftidBurnResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidNftsNftidBurnResponse404> Not Found
   */
  postV2ProjectsProjectidNftsNftidBurn(metadata: types.PostV2ProjectsProjectidNftsNftidBurnMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidNftsNftidBurnResponse202>> {
    return this.core.fetch('/v2/projects/{projectId}/nfts/{nftId}/burn', 'post', metadata);
  }

  /**
   * This endpoint allows you to create an SFT.
   *
   * @summary Create an SFT
   * @throws FetchError<401, types.PostV2ProjectsProjectidSftsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidSftsResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidSftsResponse404> Not Found
   */
  postV2ProjectsProjectidSfts(body: types.PostV2ProjectsProjectidSftsBodyParam, metadata: types.PostV2ProjectsProjectidSftsMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidSftsResponse202>>;
  postV2ProjectsProjectidSfts(metadata: types.PostV2ProjectsProjectidSftsMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidSftsResponse202>>;
  postV2ProjectsProjectidSfts(body?: types.PostV2ProjectsProjectidSftsBodyParam | types.PostV2ProjectsProjectidSftsMetadataParam, metadata?: types.PostV2ProjectsProjectidSftsMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidSftsResponse202>> {
    return this.core.fetch('/v2/projects/{projectId}/sfts', 'post', body, metadata);
  }

  /**
   * This endpoint allows you to create a batch of SFTs.
   *
   * @summary Create SFTs
   * @throws FetchError<401, types.PostV2ProjectsProjectidSftsBatchResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsProjectidSftsBatchResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsProjectidSftsBatchResponse404> Not Found
   */
  postV2ProjectsProjectidSftsBatch(body: types.PostV2ProjectsProjectidSftsBatchBodyParam, metadata: types.PostV2ProjectsProjectidSftsBatchMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidSftsBatchResponse202>>;
  postV2ProjectsProjectidSftsBatch(metadata: types.PostV2ProjectsProjectidSftsBatchMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidSftsBatchResponse202>>;
  postV2ProjectsProjectidSftsBatch(body?: types.PostV2ProjectsProjectidSftsBatchBodyParam | types.PostV2ProjectsProjectidSftsBatchMetadataParam, metadata?: types.PostV2ProjectsProjectidSftsBatchMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsProjectidSftsBatchResponse202>> {
    return this.core.fetch('/v2/projects/{projectId}/sfts/batch', 'post', body, metadata);
  }

  /**
   * This endpoint allows you to create a new Project.
   *
   * @summary Create a Project
   * @throws FetchError<401, types.PostV2ProjectsTResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsTResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsTResponse404> Not Found
   */
  postV2ProjectsT(body: types.PostV2ProjectsTBodyParam): Promise<FetchResponse<202, types.PostV2ProjectsTResponse202>> {
    return this.core.fetch('/v2/projects/t', 'post', body);
  }

  /**
   * This endpoint allows you to retrieve a Project by providing the Project ID.
   *
   * @summary Retrieve a Project
   * @throws FetchError<401, types.GetV2ProjectsTProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsTProjectidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsTProjectidResponse404> Not Found
   */
  getV2ProjectsTProjectid(metadata: types.GetV2ProjectsTProjectidMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsTProjectidResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to perform an update on a Project.
   *
   * @summary Update a Project
   * @throws FetchError<401, types.PutV2ProjectsTProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.PutV2ProjectsTProjectidResponse403> Forbidden
   * @throws FetchError<404, types.PutV2ProjectsTProjectidResponse404> Not Found
   */
  putV2ProjectsTProjectid(body: types.PutV2ProjectsTProjectidBodyParam, metadata: types.PutV2ProjectsTProjectidMetadataParam): Promise<FetchResponse<200, types.PutV2ProjectsTProjectidResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}', 'put', body, metadata);
  }

  /**
   * This endpoint allows you to perform a partial update on a Project.
   *
   * @summary Partial Update a Project
   * @throws FetchError<401, types.PatchV2ProjectsTProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.PatchV2ProjectsTProjectidResponse403> Forbidden
   * @throws FetchError<404, types.PatchV2ProjectsTProjectidResponse404> Not Found
   */
  patchV2ProjectsTProjectid(body: types.PatchV2ProjectsTProjectidBodyParam, metadata: types.PatchV2ProjectsTProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsTProjectidResponse200>>;
  patchV2ProjectsTProjectid(metadata: types.PatchV2ProjectsTProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsTProjectidResponse200>>;
  patchV2ProjectsTProjectid(body?: types.PatchV2ProjectsTProjectidBodyParam | types.PatchV2ProjectsTProjectidMetadataParam, metadata?: types.PatchV2ProjectsTProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsTProjectidResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}', 'patch', body, metadata);
  }

  /**
   * This endpoint allows you to retrieve stats about the NFTs in a Project.
   *
   * @summary Retrieve Project Stats
   * @throws FetchError<401, types.GetV2ProjectsTProjectidStatsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsTProjectidStatsResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsTProjectidStatsResponse404> Not Found
   */
  getV2ProjectsTProjectidStats(metadata: types.GetV2ProjectsTProjectidStatsMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsTProjectidStatsResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}/stats', 'get', metadata);
  }

  /**
   * This endpoints allows you to retrieve a paginated list of all NFTs in a Project.
   *
   * @summary List all NFTs
   * @throws FetchError<401, types.GetV2ProjectsTProjectidNftsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsTProjectidNftsResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsTProjectidNftsResponse404> Not Found
   */
  getV2ProjectsTProjectidNfts(metadata: types.GetV2ProjectsTProjectidNftsMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsTProjectidNftsResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}/nfts', 'get', metadata);
  }

  /**
   * This endpoint allows you to create a new NFT.
   *
   * @summary Create an NFT
   * @throws FetchError<401, types.PostV2ProjectsTProjectidNftsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsTProjectidNftsResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsTProjectidNftsResponse404> Not Found
   */
  postV2ProjectsTProjectidNfts(body: types.PostV2ProjectsTProjectidNftsBodyParam, metadata: types.PostV2ProjectsTProjectidNftsMetadataParam): Promise<FetchResponse<200, types.PostV2ProjectsTProjectidNftsResponse200> | FetchResponse<202, types.PostV2ProjectsTProjectidNftsResponse202>> {
    return this.core.fetch('/v2/projects/t/{projectId}/nfts', 'post', body, metadata);
  }

  /**
   * This endpoints allows you to search a paginated list of NFTs by owner, mint, or claimer
   * address.
   *
   * @summary Search NFTs
   * @throws FetchError<401, types.GetV2ProjectsTProjectidNftsSearchResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsTProjectidNftsSearchResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsTProjectidNftsSearchResponse404> Not Found
   */
  getV2ProjectsTProjectidNftsSearch(metadata: types.GetV2ProjectsTProjectidNftsSearchMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsTProjectidNftsSearchResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}/nfts/search', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve an NFT by NFT ID.
   *
   * @summary Retrieve an NFT
   * @throws FetchError<401, types.GetV2ProjectsTProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsTProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsTProjectidNftsNftidResponse404> Not Found
   */
  getV2ProjectsTProjectidNftsNftid(metadata: types.GetV2ProjectsTProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsTProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}/nfts/{nftId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to perform an update on an NFT.
   *
   * @summary Update an NFT
   * @throws FetchError<401, types.PutV2ProjectsTProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.PutV2ProjectsTProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.PutV2ProjectsTProjectidNftsNftidResponse404> Not Found
   */
  putV2ProjectsTProjectidNftsNftid(body: types.PutV2ProjectsTProjectidNftsNftidBodyParam, metadata: types.PutV2ProjectsTProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PutV2ProjectsTProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}/nfts/{nftId}', 'put', body, metadata);
  }

  /**
   * This endpoint allows you to perform a partial update on an NFT.
   *
   * @summary Partial Update an NFT
   * @throws FetchError<401, types.PatchV2ProjectsTProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.PatchV2ProjectsTProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.PatchV2ProjectsTProjectidNftsNftidResponse404> Not Found
   */
  patchV2ProjectsTProjectidNftsNftid(body: types.PatchV2ProjectsTProjectidNftsNftidBodyParam, metadata: types.PatchV2ProjectsTProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsTProjectidNftsNftidResponse200>>;
  patchV2ProjectsTProjectidNftsNftid(metadata: types.PatchV2ProjectsTProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsTProjectidNftsNftidResponse200>>;
  patchV2ProjectsTProjectidNftsNftid(body?: types.PatchV2ProjectsTProjectidNftsNftidBodyParam | types.PatchV2ProjectsTProjectidNftsNftidMetadataParam, metadata?: types.PatchV2ProjectsTProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsTProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/t/{projectId}/nfts/{nftId}', 'patch', body, metadata);
  }

  /**
   * This endpoint allows you to create a new Project.
   *
   * @summary Create a Project
   * @throws FetchError<401, types.PostV2ProjectsNResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsNResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsNResponse404> Not Found
   */
  postV2ProjectsN(body: types.PostV2ProjectsNBodyParam): Promise<FetchResponse<202, types.PostV2ProjectsNResponse202>> {
    return this.core.fetch('/v2/projects/n', 'post', body);
  }

  /**
   * This endpoint allows you to retrieve a Project by Project ID.
   *
   * @summary Retrieve a Project
   * @throws FetchError<401, types.GetV2ProjectsNProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsNProjectidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsNProjectidResponse404> Not Found
   */
  getV2ProjectsNProjectid(metadata: types.GetV2ProjectsNProjectidMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsNProjectidResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to perform an update on a Project.
   *
   * @summary Update a Project
   * @throws FetchError<401, types.PutV2ProjectsNProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.PutV2ProjectsNProjectidResponse403> Forbidden
   * @throws FetchError<404, types.PutV2ProjectsNProjectidResponse404> Not Found
   */
  putV2ProjectsNProjectid(body: types.PutV2ProjectsNProjectidBodyParam, metadata: types.PutV2ProjectsNProjectidMetadataParam): Promise<FetchResponse<200, types.PutV2ProjectsNProjectidResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}', 'put', body, metadata);
  }

  /**
   * This endpoint allows you to perform a partial update on a Project.
   *
   * @summary Partial Update a Project
   * @throws FetchError<401, types.PatchV2ProjectsNProjectidResponse401> Unauthorized
   * @throws FetchError<403, types.PatchV2ProjectsNProjectidResponse403> Forbidden
   * @throws FetchError<404, types.PatchV2ProjectsNProjectidResponse404> Not Found
   */
  patchV2ProjectsNProjectid(body: types.PatchV2ProjectsNProjectidBodyParam, metadata: types.PatchV2ProjectsNProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsNProjectidResponse200>>;
  patchV2ProjectsNProjectid(metadata: types.PatchV2ProjectsNProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsNProjectidResponse200>>;
  patchV2ProjectsNProjectid(body?: types.PatchV2ProjectsNProjectidBodyParam | types.PatchV2ProjectsNProjectidMetadataParam, metadata?: types.PatchV2ProjectsNProjectidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsNProjectidResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}', 'patch', body, metadata);
  }

  /**
   * This endpoint allows you to retrieve stats about the NFTs in a Project.
   *
   * @summary Retrieve Project Stats
   * @throws FetchError<401, types.GetV2ProjectsNProjectidStatsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsNProjectidStatsResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsNProjectidStatsResponse404> Not Found
   */
  getV2ProjectsNProjectidStats(metadata: types.GetV2ProjectsNProjectidStatsMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsNProjectidStatsResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}/stats', 'get', metadata);
  }

  /**
   * This endpoints allows you to retrieve a paginated list of all NFTs in a Project.
   *
   * @summary List all NFTs
   * @throws FetchError<401, types.GetV2ProjectsNProjectidNftsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsNProjectidNftsResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsNProjectidNftsResponse404> Not Found
   */
  getV2ProjectsNProjectidNfts(metadata: types.GetV2ProjectsNProjectidNftsMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsNProjectidNftsResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts', 'get', metadata);
  }

  /**
   * This endpoint allows you to create a new NFT.
   *
   * @summary Create an NFT
   * @throws FetchError<401, types.PostV2ProjectsNProjectidNftsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsNProjectidNftsResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsNProjectidNftsResponse404> Not Found
   */
  postV2ProjectsNProjectidNfts(body: types.PostV2ProjectsNProjectidNftsBodyParam, metadata: types.PostV2ProjectsNProjectidNftsMetadataParam): Promise<FetchResponse<200, types.PostV2ProjectsNProjectidNftsResponse200> | FetchResponse<202, types.PostV2ProjectsNProjectidNftsResponse202>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts', 'post', body, metadata);
  }

  /**
   * This endpoints allows you to search a paginated list of NFTs by owner, mint, or claimer
   * address.
   *
   * @summary Search NFTs
   * @throws FetchError<401, types.GetV2ProjectsNProjectidNftsSearchResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsNProjectidNftsSearchResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsNProjectidNftsSearchResponse404> Not Found
   */
  getV2ProjectsNProjectidNftsSearch(metadata: types.GetV2ProjectsNProjectidNftsSearchMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsNProjectidNftsSearchResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts/search', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve an NFT by NFT ID.
   *
   * @summary Retrieve an NFT
   * @throws FetchError<401, types.GetV2ProjectsNProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsNProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsNProjectidNftsNftidResponse404> Not Found
   */
  getV2ProjectsNProjectidNftsNftid(metadata: types.GetV2ProjectsNProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsNProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts/{nftId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to perform an update on an NFT.
   *
   * @summary Update an NFT
   * @throws FetchError<401, types.PutV2ProjectsNProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.PutV2ProjectsNProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.PutV2ProjectsNProjectidNftsNftidResponse404> Not Found
   */
  putV2ProjectsNProjectidNftsNftid(body: types.PutV2ProjectsNProjectidNftsNftidBodyParam, metadata: types.PutV2ProjectsNProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PutV2ProjectsNProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts/{nftId}', 'put', body, metadata);
  }

  /**
   * This endpoint allows you to perform a partial update on an NFT.
   *
   * @summary Partial Update an NFT
   * @throws FetchError<401, types.PatchV2ProjectsNProjectidNftsNftidResponse401> Unauthorized
   * @throws FetchError<403, types.PatchV2ProjectsNProjectidNftsNftidResponse403> Forbidden
   * @throws FetchError<404, types.PatchV2ProjectsNProjectidNftsNftidResponse404> Not Found
   */
  patchV2ProjectsNProjectidNftsNftid(body: types.PatchV2ProjectsNProjectidNftsNftidBodyParam, metadata: types.PatchV2ProjectsNProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsNProjectidNftsNftidResponse200>>;
  patchV2ProjectsNProjectidNftsNftid(metadata: types.PatchV2ProjectsNProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsNProjectidNftsNftidResponse200>>;
  patchV2ProjectsNProjectidNftsNftid(body?: types.PatchV2ProjectsNProjectidNftsNftidBodyParam | types.PatchV2ProjectsNProjectidNftsNftidMetadataParam, metadata?: types.PatchV2ProjectsNProjectidNftsNftidMetadataParam): Promise<FetchResponse<200, types.PatchV2ProjectsNProjectidNftsNftidResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts/{nftId}', 'patch', body, metadata);
  }

  /**
   * This endpoint generates a claim link for your NFT.
   *
   * @summary Generate NFT Claim Link
   * @throws FetchError<401, types.GetV2ProjectsNProjectidNftsNftidClaimResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2ProjectsNProjectidNftsNftidClaimResponse403> Forbidden
   * @throws FetchError<404, types.GetV2ProjectsNProjectidNftsNftidClaimResponse404> Not Found
   */
  getV2ProjectsNProjectidNftsNftidClaim(metadata: types.GetV2ProjectsNProjectidNftsNftidClaimMetadataParam): Promise<FetchResponse<200, types.GetV2ProjectsNProjectidNftsNftidClaimResponse200>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts/{nftId}/claim', 'get', metadata);
  }

  /**
   * This endpoint allows you to revoke a non-transferable NFT.
   *
   * @summary Revoke an NFT
   * @throws FetchError<401, types.PostV2ProjectsNProjectidNftsNftidRevokeResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsNProjectidNftsNftidRevokeResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsNProjectidNftsNftidRevokeResponse404> Not Found
   */
  postV2ProjectsNProjectidNftsNftidRevoke(metadata: types.PostV2ProjectsNProjectidNftsNftidRevokeMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsNProjectidNftsNftidRevokeResponse202>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts/{nftId}/revoke', 'post', metadata);
  }

  /**
   * This endpoint allows you to burn a non-transferable NFT.
   *
   * @summary Burn an NFT
   * @throws FetchError<401, types.PostV2ProjectsNProjectidNftsNftidBurnResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2ProjectsNProjectidNftsNftidBurnResponse403> Forbidden
   * @throws FetchError<404, types.PostV2ProjectsNProjectidNftsNftidBurnResponse404> Not Found
   */
  postV2ProjectsNProjectidNftsNftidBurn(metadata: types.PostV2ProjectsNProjectidNftsNftidBurnMetadataParam): Promise<FetchResponse<202, types.PostV2ProjectsNProjectidNftsNftidBurnResponse202>> {
    return this.core.fetch('/v2/projects/n/{projectId}/nfts/{nftId}/burn', 'post', metadata);
  }

  /**
   * Create an Inscription
   *
   */
  postV2Inscriptions(body: types.PostV2InscriptionsBodyParam): Promise<FetchResponse<202, types.PostV2InscriptionsResponse202>> {
    return this.core.fetch('/v2/inscriptions', 'post', body);
  }

  /**
   * List Inscriptions
   *
   */
  getV2Inscriptions(metadata?: types.GetV2InscriptionsMetadataParam): Promise<FetchResponse<200, types.GetV2InscriptionsResponse200>> {
    return this.core.fetch('/v2/inscriptions', 'get', metadata);
  }

  /**
   * Retrieve an Inscription
   *
   */
  getV2InscriptionsAddress(metadata: types.GetV2InscriptionsAddressMetadataParam): Promise<FetchResponse<200, types.GetV2InscriptionsAddressResponse200>> {
    return this.core.fetch('/v2/inscriptions/{address}', 'get', metadata);
  }

  /**
   * Retrieve an NFT
   *
   * @throws FetchError<404, types.GetV2NftsMintaddressResponse404> Not Found
   */
  getV2NftsMintaddress(metadata: types.GetV2NftsMintaddressMetadataParam): Promise<FetchResponse<200, types.GetV2NftsMintaddressResponse200>> {
    return this.core.fetch('/v2/nfts/{mintAddress}', 'get', metadata);
  }

  /**
   * Retrieve NFT Claim Transaction
   *
   * @throws FetchError<401, types.PostV2NftsMintaddressClaimResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2NftsMintaddressClaimResponse403> Forbidden
   * @throws FetchError<404, types.PostV2NftsMintaddressClaimResponse404> Not Found
   */
  postV2NftsMintaddressClaim(body: types.PostV2NftsMintaddressClaimBodyParam, metadata: types.PostV2NftsMintaddressClaimMetadataParam): Promise<FetchResponse<200, types.PostV2NftsMintaddressClaimResponse200>>;
  postV2NftsMintaddressClaim(metadata: types.PostV2NftsMintaddressClaimMetadataParam): Promise<FetchResponse<200, types.PostV2NftsMintaddressClaimResponse200>>;
  postV2NftsMintaddressClaim(body?: types.PostV2NftsMintaddressClaimBodyParam | types.PostV2NftsMintaddressClaimMetadataParam, metadata?: types.PostV2NftsMintaddressClaimMetadataParam): Promise<FetchResponse<200, types.PostV2NftsMintaddressClaimResponse200>> {
    return this.core.fetch('/v2/nfts/{mintAddress}/claim', 'post', body, metadata);
  }

  /**
   * List NFT Collections
   *
   */
  getV2Collections(metadata: types.GetV2CollectionsMetadataParam): Promise<FetchResponse<200, types.GetV2CollectionsResponse200>> {
    return this.core.fetch('/v2/collections', 'get', metadata);
  }

  /**
   * Retrieve NFT Collection
   *
   * @throws FetchError<404, types.GetV2CollectionsMintaddressResponse404> Not Found
   */
  getV2CollectionsMintaddress(metadata: types.GetV2CollectionsMintaddressMetadataParam): Promise<FetchResponse<200, types.GetV2CollectionsMintaddressResponse200>> {
    return this.core.fetch('/v2/collections/{mintAddress}', 'get', metadata);
  }

  /**
   * List Domains
   *
   */
  getV2Domains(metadata?: types.GetV2DomainsMetadataParam): Promise<FetchResponse<200, types.GetV2DomainsResponse200>> {
    return this.core.fetch('/v2/domains', 'get', metadata);
  }

  /**
   * Retrieve a Domain
   *
   */
  getV2DomainsNamespace(metadata: types.GetV2DomainsNamespaceMetadataParam): Promise<FetchResponse<200, types.GetV2DomainsNamespaceResponse200>> {
    return this.core.fetch('/v2/domains/{namespace}', 'get', metadata);
  }

  /**
   * List all Orgs
   *
   * @throws FetchError<401, types.GetV2OrgsResponse401> Unauthorized
   */
  getV2Orgs(metadata?: types.GetV2OrgsMetadataParam): Promise<FetchResponse<200, types.GetV2OrgsResponse200>> {
    return this.core.fetch('/v2/orgs', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve stats about the Org.
   *
   * @summary Retrieve Org Stats
   * @throws FetchError<401, types.GetV2OrgsOrgidStatsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2OrgsOrgidStatsResponse403> Forbidden
   * @throws FetchError<404, types.GetV2OrgsOrgidStatsResponse404> Not Found
   */
  getV2OrgsOrgidStats(metadata: types.GetV2OrgsOrgidStatsMetadataParam): Promise<FetchResponse<200, types.GetV2OrgsOrgidStatsResponse200>> {
    return this.core.fetch('/v2/orgs/{orgId}/stats', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve a paginated list of all your Transactions.
   *
   * @summary List all Transactions
   * @throws FetchError<401, types.GetV2TransactionsResponse401> Unauthorized
   */
  getV2Transactions(metadata?: types.GetV2TransactionsMetadataParam): Promise<FetchResponse<200, types.GetV2TransactionsResponse200>> {
    return this.core.fetch('/v2/transactions', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve a transaction by providing a transaction ID.
   *
   * @summary Retrieve a Transaction
   * @throws FetchError<401, types.GetV2TransactionsTransactionidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2TransactionsTransactionidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2TransactionsTransactionidResponse404> Not Found
   */
  getV2TransactionsTransactionid(metadata: types.GetV2TransactionsTransactionidMetadataParam): Promise<FetchResponse<200, types.GetV2TransactionsTransactionidResponse200>> {
    return this.core.fetch('/v2/transactions/{transactionId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to retry a transaction with the given transaction ID.
   *
   * @summary Retry a Transaction
   * @throws FetchError<401, types.PostV2TransactionsTransactionidRetryResponse401> Unauthorized
   * @throws FetchError<403, types.PostV2TransactionsTransactionidRetryResponse403> Forbidden
   * @throws FetchError<404, types.PostV2TransactionsTransactionidRetryResponse404> Not Found
   */
  postV2TransactionsTransactionidRetry(metadata: types.PostV2TransactionsTransactionidRetryMetadataParam): Promise<FetchResponse<200, types.PostV2TransactionsTransactionidRetryResponse200>> {
    return this.core.fetch('/v2/transactions/{transactionId}/retry', 'post', metadata);
  }

  /**
   * This endpoint allows you to retrieve a paginated list of all your Requests.
   *
   * @summary List all Requests
   * @throws FetchError<401, types.GetV2RequestsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2RequestsResponse403> Forbidden
   */
  getV2Requests(metadata?: types.GetV2RequestsMetadataParam): Promise<FetchResponse<200, types.GetV2RequestsResponse200>> {
    return this.core.fetch('/v2/requests', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve a request by providing a request ID.
   *
   * @summary Retrieve a Request
   * @throws FetchError<401, types.GetV2RequestsRequestidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2RequestsRequestidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2RequestsRequestidResponse404> Not Found
   */
  getV2RequestsRequestid(metadata: types.GetV2RequestsRequestidMetadataParam): Promise<FetchResponse<200, types.GetV2RequestsRequestidResponse200>> {
    return this.core.fetch('/v2/requests/{requestId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to create a new Webhook.
   *
   * @summary Create a Webhook
   * @throws FetchError<401, types.PostV2WebhooksResponse401> Unauthorized
   */
  postV2Webhooks(body: types.PostV2WebhooksBodyParam): Promise<FetchResponse<201, types.PostV2WebhooksResponse201>> {
    return this.core.fetch('/v2/webhooks', 'post', body);
  }

  /**
   * This endpoint allows you to retrieve a paginated list of all your Webhooks.
   *
   * @summary List all Webhooks
   * @throws FetchError<401, types.GetV2WebhooksResponse401> Unauthorized
   */
  getV2Webhooks(metadata?: types.GetV2WebhooksMetadataParam): Promise<FetchResponse<200, types.GetV2WebhooksResponse200>> {
    return this.core.fetch('/v2/webhooks', 'get', metadata);
  }

  /**
   * This endpoint allows you to retrieve a Webhook by providing a Webhook ID.
   *
   * @summary Retrieve a Webhook
   * @throws FetchError<401, types.GetV2WebhooksWebhookidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV2WebhooksWebhookidResponse403> Forbidden
   * @throws FetchError<404, types.GetV2WebhooksWebhookidResponse404> Not Found
   */
  getV2WebhooksWebhookid(metadata: types.GetV2WebhooksWebhookidMetadataParam): Promise<FetchResponse<200, types.GetV2WebhooksWebhookidResponse200>> {
    return this.core.fetch('/v2/webhooks/{webhookId}', 'get', metadata);
  }

  /**
   * This endpoint allows you to delete a Webhook.
   *
   * @summary Delete a Webhook
   * @throws FetchError<401, types.DeleteV2WebhooksWebhookidResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV2WebhooksWebhookidResponse403> Forbidden
   * @throws FetchError<404, types.DeleteV2WebhooksWebhookidResponse404> Not Found
   */
  deleteV2WebhooksWebhookid(metadata: types.DeleteV2WebhooksWebhookidMetadataParam): Promise<FetchResponse<204, types.DeleteV2WebhooksWebhookidResponse204>> {
    return this.core.fetch('/v2/webhooks/{webhookId}', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { DeleteV2WebhooksWebhookidMetadataParam, DeleteV2WebhooksWebhookidResponse204, DeleteV2WebhooksWebhookidResponse401, DeleteV2WebhooksWebhookidResponse403, DeleteV2WebhooksWebhookidResponse404, GetV2CollectionsMetadataParam, GetV2CollectionsMintaddressMetadataParam, GetV2CollectionsMintaddressResponse200, GetV2CollectionsMintaddressResponse404, GetV2CollectionsResponse200, GetV2DomainsMetadataParam, GetV2DomainsNamespaceMetadataParam, GetV2DomainsNamespaceResponse200, GetV2DomainsResponse200, GetV2InscriptionsAddressMetadataParam, GetV2InscriptionsAddressResponse200, GetV2InscriptionsMetadataParam, GetV2InscriptionsResponse200, GetV2NftsMintaddressMetadataParam, GetV2NftsMintaddressResponse200, GetV2NftsMintaddressResponse404, GetV2OrgsMetadataParam, GetV2OrgsOrgidStatsMetadataParam, GetV2OrgsOrgidStatsResponse200, GetV2OrgsOrgidStatsResponse401, GetV2OrgsOrgidStatsResponse403, GetV2OrgsOrgidStatsResponse404, GetV2OrgsResponse200, GetV2OrgsResponse401, GetV2ProjectsMetadataParam, GetV2ProjectsNProjectidMetadataParam, GetV2ProjectsNProjectidNftsMetadataParam, GetV2ProjectsNProjectidNftsNftidClaimMetadataParam, GetV2ProjectsNProjectidNftsNftidClaimResponse200, GetV2ProjectsNProjectidNftsNftidClaimResponse401, GetV2ProjectsNProjectidNftsNftidClaimResponse403, GetV2ProjectsNProjectidNftsNftidClaimResponse404, GetV2ProjectsNProjectidNftsNftidMetadataParam, GetV2ProjectsNProjectidNftsNftidResponse200, GetV2ProjectsNProjectidNftsNftidResponse401, GetV2ProjectsNProjectidNftsNftidResponse403, GetV2ProjectsNProjectidNftsNftidResponse404, GetV2ProjectsNProjectidNftsResponse200, GetV2ProjectsNProjectidNftsResponse401, GetV2ProjectsNProjectidNftsResponse403, GetV2ProjectsNProjectidNftsResponse404, GetV2ProjectsNProjectidNftsSearchMetadataParam, GetV2ProjectsNProjectidNftsSearchResponse200, GetV2ProjectsNProjectidNftsSearchResponse401, GetV2ProjectsNProjectidNftsSearchResponse403, GetV2ProjectsNProjectidNftsSearchResponse404, GetV2ProjectsNProjectidResponse200, GetV2ProjectsNProjectidResponse401, GetV2ProjectsNProjectidResponse403, GetV2ProjectsNProjectidResponse404, GetV2ProjectsNProjectidStatsMetadataParam, GetV2ProjectsNProjectidStatsResponse200, GetV2ProjectsNProjectidStatsResponse401, GetV2ProjectsNProjectidStatsResponse403, GetV2ProjectsNProjectidStatsResponse404, GetV2ProjectsProjectidMetadataParam, GetV2ProjectsProjectidNftsMetadataParam, GetV2ProjectsProjectidNftsNftidMetadataParam, GetV2ProjectsProjectidNftsNftidResponse200, GetV2ProjectsProjectidNftsNftidResponse401, GetV2ProjectsProjectidNftsNftidResponse403, GetV2ProjectsProjectidNftsNftidResponse404, GetV2ProjectsProjectidNftsResponse200, GetV2ProjectsProjectidNftsResponse401, GetV2ProjectsProjectidNftsResponse403, GetV2ProjectsProjectidNftsResponse404, GetV2ProjectsProjectidNftsSearchMetadataParam, GetV2ProjectsProjectidNftsSearchResponse200, GetV2ProjectsProjectidNftsSearchResponse401, GetV2ProjectsProjectidNftsSearchResponse403, GetV2ProjectsProjectidNftsSearchResponse404, GetV2ProjectsProjectidResponse200, GetV2ProjectsProjectidResponse401, GetV2ProjectsProjectidResponse403, GetV2ProjectsProjectidResponse404, GetV2ProjectsProjectidStatsMetadataParam, GetV2ProjectsProjectidStatsResponse200, GetV2ProjectsProjectidStatsResponse401, GetV2ProjectsProjectidStatsResponse403, GetV2ProjectsProjectidStatsResponse404, GetV2ProjectsResponse200, GetV2ProjectsResponse401, GetV2ProjectsSearchMetadataParam, GetV2ProjectsSearchResponse200, GetV2ProjectsSearchResponse401, GetV2ProjectsTProjectidMetadataParam, GetV2ProjectsTProjectidNftsMetadataParam, GetV2ProjectsTProjectidNftsNftidMetadataParam, GetV2ProjectsTProjectidNftsNftidResponse200, GetV2ProjectsTProjectidNftsNftidResponse401, GetV2ProjectsTProjectidNftsNftidResponse403, GetV2ProjectsTProjectidNftsNftidResponse404, GetV2ProjectsTProjectidNftsResponse200, GetV2ProjectsTProjectidNftsResponse401, GetV2ProjectsTProjectidNftsResponse403, GetV2ProjectsTProjectidNftsResponse404, GetV2ProjectsTProjectidNftsSearchMetadataParam, GetV2ProjectsTProjectidNftsSearchResponse200, GetV2ProjectsTProjectidNftsSearchResponse401, GetV2ProjectsTProjectidNftsSearchResponse403, GetV2ProjectsTProjectidNftsSearchResponse404, GetV2ProjectsTProjectidResponse200, GetV2ProjectsTProjectidResponse401, GetV2ProjectsTProjectidResponse403, GetV2ProjectsTProjectidResponse404, GetV2ProjectsTProjectidStatsMetadataParam, GetV2ProjectsTProjectidStatsResponse200, GetV2ProjectsTProjectidStatsResponse401, GetV2ProjectsTProjectidStatsResponse403, GetV2ProjectsTProjectidStatsResponse404, GetV2RequestsMetadataParam, GetV2RequestsRequestidMetadataParam, GetV2RequestsRequestidResponse200, GetV2RequestsRequestidResponse401, GetV2RequestsRequestidResponse403, GetV2RequestsRequestidResponse404, GetV2RequestsResponse200, GetV2RequestsResponse401, GetV2RequestsResponse403, GetV2TransactionsMetadataParam, GetV2TransactionsResponse200, GetV2TransactionsResponse401, GetV2TransactionsTransactionidMetadataParam, GetV2TransactionsTransactionidResponse200, GetV2TransactionsTransactionidResponse401, GetV2TransactionsTransactionidResponse403, GetV2TransactionsTransactionidResponse404, GetV2WebhooksMetadataParam, GetV2WebhooksResponse200, GetV2WebhooksResponse401, GetV2WebhooksWebhookidMetadataParam, GetV2WebhooksWebhookidResponse200, GetV2WebhooksWebhookidResponse401, GetV2WebhooksWebhookidResponse403, GetV2WebhooksWebhookidResponse404, PatchV2ProjectsNProjectidBodyParam, PatchV2ProjectsNProjectidMetadataParam, PatchV2ProjectsNProjectidNftsNftidBodyParam, PatchV2ProjectsNProjectidNftsNftidMetadataParam, PatchV2ProjectsNProjectidNftsNftidResponse200, PatchV2ProjectsNProjectidNftsNftidResponse401, PatchV2ProjectsNProjectidNftsNftidResponse403, PatchV2ProjectsNProjectidNftsNftidResponse404, PatchV2ProjectsNProjectidResponse200, PatchV2ProjectsNProjectidResponse401, PatchV2ProjectsNProjectidResponse403, PatchV2ProjectsNProjectidResponse404, PatchV2ProjectsProjectidBodyParam, PatchV2ProjectsProjectidMetadataParam, PatchV2ProjectsProjectidNftsNftidBodyParam, PatchV2ProjectsProjectidNftsNftidMetadataParam, PatchV2ProjectsProjectidNftsNftidResponse200, PatchV2ProjectsProjectidNftsNftidResponse401, PatchV2ProjectsProjectidNftsNftidResponse403, PatchV2ProjectsProjectidNftsNftidResponse404, PatchV2ProjectsProjectidResponse200, PatchV2ProjectsProjectidResponse401, PatchV2ProjectsProjectidResponse403, PatchV2ProjectsProjectidResponse404, PatchV2ProjectsTProjectidBodyParam, PatchV2ProjectsTProjectidMetadataParam, PatchV2ProjectsTProjectidNftsNftidBodyParam, PatchV2ProjectsTProjectidNftsNftidMetadataParam, PatchV2ProjectsTProjectidNftsNftidResponse200, PatchV2ProjectsTProjectidNftsNftidResponse401, PatchV2ProjectsTProjectidNftsNftidResponse403, PatchV2ProjectsTProjectidNftsNftidResponse404, PatchV2ProjectsTProjectidResponse200, PatchV2ProjectsTProjectidResponse401, PatchV2ProjectsTProjectidResponse403, PatchV2ProjectsTProjectidResponse404, PostV2InscriptionsBodyParam, PostV2InscriptionsResponse202, PostV2NftsMintaddressClaimBodyParam, PostV2NftsMintaddressClaimMetadataParam, PostV2NftsMintaddressClaimResponse200, PostV2NftsMintaddressClaimResponse401, PostV2NftsMintaddressClaimResponse403, PostV2NftsMintaddressClaimResponse404, PostV2ProjectsBodyParam, PostV2ProjectsNBodyParam, PostV2ProjectsNProjectidNftsBodyParam, PostV2ProjectsNProjectidNftsMetadataParam, PostV2ProjectsNProjectidNftsNftidBurnMetadataParam, PostV2ProjectsNProjectidNftsNftidBurnResponse202, PostV2ProjectsNProjectidNftsNftidBurnResponse401, PostV2ProjectsNProjectidNftsNftidBurnResponse403, PostV2ProjectsNProjectidNftsNftidBurnResponse404, PostV2ProjectsNProjectidNftsNftidRevokeMetadataParam, PostV2ProjectsNProjectidNftsNftidRevokeResponse202, PostV2ProjectsNProjectidNftsNftidRevokeResponse401, PostV2ProjectsNProjectidNftsNftidRevokeResponse403, PostV2ProjectsNProjectidNftsNftidRevokeResponse404, PostV2ProjectsNProjectidNftsResponse200, PostV2ProjectsNProjectidNftsResponse202, PostV2ProjectsNProjectidNftsResponse401, PostV2ProjectsNProjectidNftsResponse403, PostV2ProjectsNProjectidNftsResponse404, PostV2ProjectsNResponse202, PostV2ProjectsNResponse401, PostV2ProjectsNResponse403, PostV2ProjectsNResponse404, PostV2ProjectsProjectidNftsBatchBodyParam, PostV2ProjectsProjectidNftsBatchMetadataParam, PostV2ProjectsProjectidNftsBatchResponse202, PostV2ProjectsProjectidNftsBatchResponse401, PostV2ProjectsProjectidNftsBatchResponse403, PostV2ProjectsProjectidNftsBatchResponse404, PostV2ProjectsProjectidNftsBodyParam, PostV2ProjectsProjectidNftsLazyBodyParam, PostV2ProjectsProjectidNftsLazyMetadataParam, PostV2ProjectsProjectidNftsLazyResponse200, PostV2ProjectsProjectidNftsLazyResponse401, PostV2ProjectsProjectidNftsLazyResponse403, PostV2ProjectsProjectidNftsLazyResponse404, PostV2ProjectsProjectidNftsMetadataParam, PostV2ProjectsProjectidNftsNftidBurnMetadataParam, PostV2ProjectsProjectidNftsNftidBurnResponse202, PostV2ProjectsProjectidNftsNftidBurnResponse401, PostV2ProjectsProjectidNftsNftidBurnResponse403, PostV2ProjectsProjectidNftsNftidBurnResponse404, PostV2ProjectsProjectidNftsNftidTransferBodyParam, PostV2ProjectsProjectidNftsNftidTransferMetadataParam, PostV2ProjectsProjectidNftsNftidTransferResponse202, PostV2ProjectsProjectidNftsNftidTransferResponse401, PostV2ProjectsProjectidNftsNftidTransferResponse403, PostV2ProjectsProjectidNftsNftidTransferResponse404, PostV2ProjectsProjectidNftsResponse202, PostV2ProjectsProjectidNftsResponse401, PostV2ProjectsProjectidNftsResponse403, PostV2ProjectsProjectidNftsResponse404, PostV2ProjectsProjectidRoyaltiesWithdrawBodyParam, PostV2ProjectsProjectidRoyaltiesWithdrawMetadataParam, PostV2ProjectsProjectidRoyaltiesWithdrawResponse202, PostV2ProjectsProjectidRoyaltiesWithdrawResponse401, PostV2ProjectsProjectidRoyaltiesWithdrawResponse403, PostV2ProjectsProjectidRoyaltiesWithdrawResponse404, PostV2ProjectsProjectidSftsBatchBodyParam, PostV2ProjectsProjectidSftsBatchMetadataParam, PostV2ProjectsProjectidSftsBatchResponse202, PostV2ProjectsProjectidSftsBatchResponse401, PostV2ProjectsProjectidSftsBatchResponse403, PostV2ProjectsProjectidSftsBatchResponse404, PostV2ProjectsProjectidSftsBodyParam, PostV2ProjectsProjectidSftsMetadataParam, PostV2ProjectsProjectidSftsResponse202, PostV2ProjectsProjectidSftsResponse401, PostV2ProjectsProjectidSftsResponse403, PostV2ProjectsProjectidSftsResponse404, PostV2ProjectsResponse202, PostV2ProjectsResponse401, PostV2ProjectsResponse403, PostV2ProjectsResponse404, PostV2ProjectsTBodyParam, PostV2ProjectsTProjectidNftsBodyParam, PostV2ProjectsTProjectidNftsMetadataParam, PostV2ProjectsTProjectidNftsResponse200, PostV2ProjectsTProjectidNftsResponse202, PostV2ProjectsTProjectidNftsResponse401, PostV2ProjectsTProjectidNftsResponse403, PostV2ProjectsTProjectidNftsResponse404, PostV2ProjectsTResponse202, PostV2ProjectsTResponse401, PostV2ProjectsTResponse403, PostV2ProjectsTResponse404, PostV2TransactionsTransactionidRetryMetadataParam, PostV2TransactionsTransactionidRetryResponse200, PostV2TransactionsTransactionidRetryResponse401, PostV2TransactionsTransactionidRetryResponse403, PostV2TransactionsTransactionidRetryResponse404, PostV2WebhooksBodyParam, PostV2WebhooksResponse201, PostV2WebhooksResponse401, PutV2ProjectsNProjectidBodyParam, PutV2ProjectsNProjectidMetadataParam, PutV2ProjectsNProjectidNftsNftidBodyParam, PutV2ProjectsNProjectidNftsNftidMetadataParam, PutV2ProjectsNProjectidNftsNftidResponse200, PutV2ProjectsNProjectidNftsNftidResponse401, PutV2ProjectsNProjectidNftsNftidResponse403, PutV2ProjectsNProjectidNftsNftidResponse404, PutV2ProjectsNProjectidResponse200, PutV2ProjectsNProjectidResponse401, PutV2ProjectsNProjectidResponse403, PutV2ProjectsNProjectidResponse404, PutV2ProjectsProjectidBodyParam, PutV2ProjectsProjectidMetadataParam, PutV2ProjectsProjectidNftsNftidBodyParam, PutV2ProjectsProjectidNftsNftidMetadataParam, PutV2ProjectsProjectidNftsNftidResponse200, PutV2ProjectsProjectidNftsNftidResponse401, PutV2ProjectsProjectidNftsNftidResponse403, PutV2ProjectsProjectidNftsNftidResponse404, PutV2ProjectsProjectidResponse200, PutV2ProjectsProjectidResponse401, PutV2ProjectsProjectidResponse403, PutV2ProjectsProjectidResponse404, PutV2ProjectsTProjectidBodyParam, PutV2ProjectsTProjectidMetadataParam, PutV2ProjectsTProjectidNftsNftidBodyParam, PutV2ProjectsTProjectidNftsNftidMetadataParam, PutV2ProjectsTProjectidNftsNftidResponse200, PutV2ProjectsTProjectidNftsNftidResponse401, PutV2ProjectsTProjectidNftsNftidResponse403, PutV2ProjectsTProjectidNftsNftidResponse404, PutV2ProjectsTProjectidResponse200, PutV2ProjectsTProjectidResponse401, PutV2ProjectsTProjectidResponse403, PutV2ProjectsTProjectidResponse404 } from './types';
