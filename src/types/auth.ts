export interface AuthLoginBodyRequest {
	Body: {
		username: string
		password: string
	  }
}

export interface AuthRegisterBodyRequest {
    Body: {
		username: string
		password: string
		email: string
	  }
}

export interface AuthLoginBodyResponse {
	id: string
	username: string
	email: string
	accessToken?: string
  }

  export interface AuthRefreshTokenResponse {
	accessToken: string
  }