import AuthForm from '../../app/components/AuthForm'

const AuthPage = () => {
  return (
    <div
      className='flex h-screen min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'
    >
      <div
        className='sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center'
      >
        <img
          src="/logo.png"
          alt="logo"
          className='h-16 mx-auto w-auto'
        />
        <h2
          className='text-xl font-bold mt-4 text-center'
        >
          Sign in to your account
        </h2>
      </div>
      {/* Auth from */}
      <AuthForm />


    </div>
  )
}

export default AuthPage