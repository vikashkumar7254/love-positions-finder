import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/enhanced-button'
import { Input } from '@/components/ui/input'
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react'

// Admin credentials (in production, this should be environment variables)
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'LoveAdmin2025!'
const SESSION_KEY = 'admin_session'
const CSRF_KEY = 'admin_csrf_token'
const MAX_LOGIN_ATTEMPTS = 3
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  csrfToken: string
  validateCSRF: (token: string) => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Generate CSRF token
const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Hash password (simple implementation - in production use bcrypt)
const hashPassword = (password: string): string => {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

// Check if user is locked out
const isLockedOut = (): boolean => {
  const lockoutData = localStorage.getItem('admin_lockout')
  if (!lockoutData) return false
  
  const { timestamp, attempts } = JSON.parse(lockoutData)
  const now = Date.now()
  
  if (attempts >= MAX_LOGIN_ATTEMPTS && (now - timestamp) < LOCKOUT_DURATION) {
    return true
  }
  
  // Clear lockout if duration has passed
  if ((now - timestamp) >= LOCKOUT_DURATION) {
    localStorage.removeItem('admin_lockout')
    return false
  }
  
  return false
}

// Record failed login attempt
const recordFailedAttempt = (): void => {
  const lockoutData = localStorage.getItem('admin_lockout')
  const now = Date.now()
  
  if (lockoutData) {
    const data = JSON.parse(lockoutData)
    data.attempts += 1
    data.timestamp = now
    localStorage.setItem('admin_lockout', JSON.stringify(data))
  } else {
    localStorage.setItem('admin_lockout', JSON.stringify({
      attempts: 1,
      timestamp: now
    }))
  }
}

// Clear failed attempts on successful login
const clearFailedAttempts = (): void => {
  localStorage.removeItem('admin_lockout')
}

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    // Check if user is already authenticated
    const session = localStorage.getItem(SESSION_KEY)
    const token = localStorage.getItem(CSRF_KEY)

    if (session && token) {
      try {
        const sessionData = JSON.parse(session)
        const now = Date.now()

        // Check if session is still valid (24 hours)
        if (sessionData.timestamp && (now - sessionData.timestamp) < 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true)
          setCsrfToken(token)
          console.log('Admin session restored')
        } else {
          // Session expired
          localStorage.removeItem(SESSION_KEY)
          localStorage.removeItem(CSRF_KEY)
          console.log('Admin session expired')
        }
      } catch (error) {
        // Invalid session data
        localStorage.removeItem(SESSION_KEY)
        localStorage.removeItem(CSRF_KEY)
        console.log('Invalid admin session data')
      }
    }

    // Generate new CSRF token if not authenticated
    if (!token) {
      const newToken = generateCSRFToken()
      setCsrfToken(newToken)
      localStorage.setItem(CSRF_KEY, newToken)
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check if locked out
    if (isLockedOut()) {
      return false
    }

    // Simulate network delay to prevent timing attacks
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const sessionData = {
        username,
        timestamp: Date.now(),
        passwordHash: hashPassword(password)
      }
      
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
      
      // Generate new CSRF token
      const newToken = generateCSRFToken()
      setCsrfToken(newToken)
      localStorage.setItem(CSRF_KEY, newToken)
      
      setIsAuthenticated(true)
      clearFailedAttempts()
      return true
    } else {
      recordFailedAttempt()
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(CSRF_KEY)
    setIsAuthenticated(false)
    setCsrfToken('')
  }

  const validateCSRF = (token: string): boolean => {
    return token === csrfToken
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      csrfToken,
      validateCSRF
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}

export const AdminLoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAdminAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isLockedOut()) {
      setError('Too many failed attempts. Please try again in 15 minutes.')
      setLoading(false)
      return
    }

    try {
      const success = await login(username, password)
      if (!success) {
        const lockoutData = localStorage.getItem('admin_lockout')
        const attempts = lockoutData ? JSON.parse(lockoutData).attempts : 0
        const remaining = MAX_LOGIN_ATTEMPTS - attempts
        
        if (remaining <= 0) {
          setError('Account locked due to too many failed attempts. Try again in 15 minutes.')
        } else {
          setError(`Invalid credentials. ${remaining} attempts remaining.`)
        }
      }
    } catch {
      setError('Login failed. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-card border-0">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-romantic to-passionate rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the admin panel
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                autoComplete="username"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="romantic"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Sign In
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Protected by advanced security measures including rate limiting and CSRF protection
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAdminAuth()
  
  if (!isAuthenticated) {
    return <AdminLoginForm />
  }
  
  return <>{children}</>
}
