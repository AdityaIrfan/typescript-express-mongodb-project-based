import { Response } from 'express'

export enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003'
}
export enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

export enum Status {
  SUCCESS = 'success',
  FAILED = 'failed'
}

abstract class ApiResponse {
  protected constructor(
    protected Code: StatusCode,
    protected StatusCode: ResponseStatus,
    protected Message: string
  ) {}

  private static sanitize<T extends ApiResponse>(response: T): T {
    // Create new variable with type object and convert to generic type
    const clone: T = {} as T

    // Copy response param to clone variable
    Object.assign(clone, response)

    // Check if clone has attribute status, then delete it
    // @ts-expect-error
    if (clone.status !== undefined) {
      // Delete attribute status
      // @ts-expect-error
      delete clone.status
    }

    // Looping every attribute inside clone variable.
    // If there is attribute that undefined, then delete it
    for (const i in clone) if (clone[i] === 'undefined') delete clone[i]

    return clone
  }

  protected prepare<T extends ApiResponse>(res: Response, response: T, headers?: { [key: string]: string }): Response {
    // for (const [key, value] of Object.entries(headers)) res.append(key, value)
    return res.status(this.StatusCode).json(ApiResponse.sanitize(response))
  }

  public send(res: Response, headers?: { [key: string]: string }): Response {
    return this.prepare<ApiResponse>(res, this, headers)
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message: string = 'Not Found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message)
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<NotFoundResponse>(res, this, headers)
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message: string = 'Forbidden') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message)
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message: string = 'Bad Parameters') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message)
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message: string = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message)
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message)
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message)
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(
    message: string,
    private readonly Data?: T
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message)
  }
}

export class SuccessListResponse<X, Y> extends ApiResponse {
  constructor(
    message: string,
    private readonly Data?: X,
    private readonly Paginate?: Y
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message)
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private readonly instruction = 'refresh_token'

  constructor(message = 'Access token invalid') {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message)
  }
}

export class AccessTokenResponse extends ApiResponse {
  constructor(
    message: string,
    private readonly Data: {
      AccessToken: string
      RefreshToken: string
    }
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message)
  }
}

export class UnauthorizedResponse extends ApiResponse {
  constructor(message: string = 'Unauthorized') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message)
  }
}

export class UnprocessableEntityResponse extends ApiResponse {
  constructor(message: string = 'Unprocessable entity') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message)
  }
}
