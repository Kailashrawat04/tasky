import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'

const Signup = () => {
  const [profile, setProfile] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [error, setError] = useState(null)

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!fullName) {
      setError('Full name is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Invalid email address')
      return
    }

    if (!password) {
      setError('Password is required')
      return
    }

    setError("")
    // Add signup API call here
  }

  return (
    <AuthLayout>
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-xl font-semibold text-black mb-1">Create an Account</h1>
        <p className="text-sm text-gray-600 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
          <ProfilePhotoSelector image={profile} setImage={setProfile} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Min 8 Characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Invite Token</label>
              <input
                type="text"
                value={adminInviteToken}
                onChange={(e) => setAdminInviteToken(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="6 Digit Code"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            SIGN UP
          </button>

          <p className="text-sm mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
