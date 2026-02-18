import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import { useUserContext } from '../../context/UserContext'
import uploadImage from '../../utils/uploadimages'

const Signup = () => {
  const [profile, setProfile] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminInviteToken, setAdminInviteToken] = useState("")
  const [error, setError] = useState(null)

  const { register } = useUserContext()
  const navigate = useNavigate()

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

    let profileImageUrl = null;

    if (profile) {
      try {
        const uploadResponse = await uploadImage(profile);
        profileImageUrl = uploadResponse.imageUrl;
      } catch (err) {
        console.error("Image upload failed:", err);
        setError("Failed to upload profile image. Please try again.");
        return;
      }
    }

    const userData = {
      name: fullName,
      email,
      password,
      adminInviteToken,
      profileImageUrl: profileImageUrl
    }

    const result = await register(userData);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-full md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <ProfilePhotoSelector image={profile} setImage={setProfile} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Code (Optional)"
              type="text"
            />
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="btn-primary"
          >
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Already have an account?{' '}
            <Link to="/login" className="font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup
