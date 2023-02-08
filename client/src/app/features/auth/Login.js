import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userData = await login({ email, password }).unwrap()

      dispatch(setCredentials({ ...userData, email }))
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (error) {
      if (!error?.response) {
        setErrMsg('Inget svar från servern')
      } else if (error?.response?.status === 400) {
        setErrMsg('Saknar användarnamn eller lösenord')
      } else if (error?.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Kunde inte logga in')
      }
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value)

  const handlePasswordInput = (e) => setPassword(e.target.value)

  const content = (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <section className="login">
        <p ref={errRef} className={errMsg ? 'error' : ''}>
          {errMsg}
        </p>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Logga in
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-post
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={handleEmailInput}
                    ref={userRef}
                    value={email}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lösenord
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={handlePasswordInput}
                    value={password}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Kom ihåg mig
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Glömt ditt lösenord?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    ''
                  )}
                  {isLoading ? 'Loggar in...' : 'Logga in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )

  return content
}

export default Login
