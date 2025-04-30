export interface User {
  id: string
  name: string
  email: string
  picture?: string
}

export interface AuthError {
  code: string
  message: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AuthError | null
  token: string | null
}

export interface TokenPayload {
  sub: string
  name: string
  email: string
  picture: string
  exp: number
}

export interface LoginResponse {
  user: User
  token: string
} 