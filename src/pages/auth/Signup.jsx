import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      firstName,
      email,
      name: firstName,
      loginTime: new Date().toISOString()
    }
    login(userData)
    showMessage('Account created successfully! Redirecting...', 'success')
    setTimeout(() => navigate('/dashboard'), 1000)
  }

  const showMessage = (message, type) => {
    const messageEl = document.createElement('div')
    messageEl.className = `fixed top-5 right-5 px-6 py-4 rounded-lg shadow-lg z-50 font-medium ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`
    messageEl.textContent = message
    document.body.appendChild(messageEl)
    setTimeout(() => messageEl.remove(), 3000)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-10 overflow-y-auto">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#6B46C1] mb-4">Redvion</h2>
          <h3 className="text-4xl font-bold text-[#1F2937] mb-2">Create Account</h3>
          <p className="text-[#6B7280] mb-8">Let's Create account for enter into Redvion Website.</p>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="flex items-center justify-center gap-3 w-full py-3.5 px-5 border-2 border-[#E5E7EB] rounded-xl bg-white text-[#1F2937] text-base font-medium hover:border-[#6B46C1] hover:bg-[#F9FAFB] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
            <button className="flex items-center justify-center gap-3 w-full py-3.5 px-5 border-2 border-[#E5E7EB] rounded-xl bg-white text-[#1F2937] text-base font-medium hover:border-[#6B46C1] hover:bg-[#F9FAFB] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button className="flex items-center justify-center gap-3 w-full py-3.5 px-5 border-2 border-[#E5E7EB] rounded-xl bg-white text-[#1F2937] text-base font-medium hover:border-[#6B46C1] hover:bg-[#F9FAFB] transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="flex items-center text-center my-8 text-[#6B7280]">
            <div className="flex-1 border-b border-[#E5E7EB]" />
            <span className="px-4 text-sm font-medium">OR</span>
            <div className="flex-1 border-b border-[#E5E7EB]" />
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1F2937] mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex: Abdul Ahad"
                required
                className="w-full py-3.5 px-4 border-2 border-[#E5E7EB] rounded-xl text-base text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1F2937] mb-2">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: abdulahadtesting@redvion.com"
                required
                className="w-full py-3.5 px-4 border-2 border-[#E5E7EB] rounded-xl text-base text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1F2937] mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="w-full py-3.5 px-4 pr-12 border-2 border-[#E5E7EB] rounded-xl text-base text-[#1F2937] bg-white focus:outline-none focus:border-[#6B46C1] focus:ring-3 focus:ring-[#6B46C1]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#6B46C1] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#6B46C1] text-white border-none rounded-xl text-lg font-semibold cursor-pointer hover:bg-[#5B21B6] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6B46C1]/30 transition-all"
            >
              Create account →
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-[#6B7280] text-sm">
              Have an Account?{' '}
              <Link to="/login" className="text-[#6B46C1] font-semibold hover:text-[#5B21B6] hover:underline transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Branding */}
      <div className="flex-[0_0_40%] bg-gradient-to-br from-[#6B46C1] to-[#5B21B6] relative overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col justify-between p-16 z-10">
          <div className="absolute top-[-100px] right-[-50px] w-96 h-96 border-4 border-white/40 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-white/10 animate-pulse" />
          <div className="absolute bottom-[-80px] right-5 w-64 h-64 border-3 border-white/30 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] rotate-45" />
          <div className="mt-auto mb-auto">
            <h1 className="text-6xl font-bold text-white leading-tight mb-1 tracking-tight">Flex</h1>
            <h1 className="text-6xl font-bold text-white leading-tight mb-1 tracking-tight">& Variable</h1>
            <h1 className="text-6xl font-bold text-white leading-tight tracking-tight">Design System</h1>
          </div>
          <p className="text-white/90 text-sm mt-auto mb-5">Redvion.com</p>
        </div>
      </div>
    </div>
  )
}

export default Signup

