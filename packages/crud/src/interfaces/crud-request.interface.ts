import { ParsedRequestParams } from '@n4it/crud-request';

import { CrudRequestOptions } from '../interfaces';

export interface CrudRequest<AUTH = {}, EXTRA = {}> {
  parsed: ParsedRequestParams<EXTRA>;
  options: CrudRequestOptions;
  /** authenticated user's from request */
  auth?: AUTH;
}
