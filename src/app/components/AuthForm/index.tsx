import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../components/input/Input';
import Button from '../../../components/Button';
import AuthSocialButton from '../AuthSocialButton';
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { host, loginRoute, registerRoute } from '../../../utilAPI/APIRoute';
import { useDispatch } from 'react-redux';
import { isLogin } from '../../../store/slices/authSlice';



type Varinat = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Varinat>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const User = localStorage.getItem('messenger')

    useEffect(() => {
        if(User) {
            navigate('/user')
        }
    }, [User])

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const { register,
        handleSubmit,
        formState: {
            errors }
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            // Register
            if (data.username == '') {
                toast.error('Username is required!')
                setIsLoading(false)
                return
            } else if (data.email == '') {
                toast.error('Email is required!')
                setIsLoading(false)
                return
            } else if (data.password == '') {
                toast.error('Password is required!')
                setIsLoading(false)
                return
            }

            try {
                console.log(data)
                const respone = await axios.post(`${host}${registerRoute}`, data)

                if (respone.data.user === null) {
                    toast.error(respone.data.message)
                    console.log(respone.data)
                    setIsLoading(false)
                } else {
                    toast.success(respone.data.message)
                    setIsLoading(false)
                    setVariant('LOGIN')
                }
            } catch (error) {
                toast.error('Something went wrong !')
                setIsLoading(false)
            }


        }


        if (variant === 'LOGIN') {
            // Login
            if (data.email == '') {
                toast.error('Email is required!')
                setIsLoading(false)
                return
            } else if (data.password == '') {
                toast.error('Password is required!')
                setIsLoading(false)
                return
            }

            try {
                const respone = await axios.post(`${host}${loginRoute}`, {
                    username: data.email,
                    password: data.password
                })

                if (!respone) {
                    toast.error('Something went wrong !', {
                        icon: '🤔'
                    })
                } else {
                    toast.success('login success')
                    localStorage.setItem('messenger', JSON.stringify(respone.data))
                    dispatch(isLogin())
                    setTimeout(() => {
                        navigate('/user')
                    }, 1000);
                }

                setIsLoading(false)
            } catch (error) {
                toast.error('Something went wrong !')
                setIsLoading(false)
            }
        }
    };

    const socialAction = (action: string) => {
        toast('Is coming soon', {
            icon: '🥹'
        })
        setIsLoading(false);
    }

    return (
        <div
            className=' mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        >
            <div
                className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'
            >
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input
                            id='username'
                            lable='UserName'
                            type='name'
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id='email'
                        lable='Email address'
                        type='email'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id='password'
                        lable='Password'
                        type='password'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type='submit'
                        >
                            {variant === 'LOGIN' ? 'Sing in' : "Register"}
                        </Button>
                    </div>
                </form>

                <div className='mt-6'>
                    <div className=' relative'>
                        <div
                            className='
                            absolute
                            inset-0
                            flex
                            items-center'
                        >
                            <div className='
                                w-full
                                border-t
                                border-gray-300'
                            />
                        </div>
                        <div className='
                                    relative
                                    flex
                                    justify-center
                                    text-sm'
                        >
                            <span className='bg-white px-2 text-gray-500'>Or connect with</span>
                        </div>
                    </div>

                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                        <AuthSocialButton
                            icon={BsFacebook}
                            onClick={() => socialAction('facebook')}
                        />
                    </div>

                </div>
                <div className='flex gap-2 justify-center text-sm mt-5 px-2 text-gray-500'>
                    <div>
                        {variant === 'LOGIN' ? 'New to messenger?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className=' underline cursor-pointer'
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;