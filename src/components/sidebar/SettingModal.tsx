import React, { useState } from 'react'
import { userType } from '../../store/slices/authSlice'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';
import Input from '../input/Input';
import Button from '../Button';
import axios from 'axios';
import { host, updateUserUsernameRoute } from '../../utilAPI/APIRoute';

interface SettingModalProps {
    currentUser: userType | null;
    isOpen: boolean;
    onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
    currentUser,
    isOpen,
    onClose
}) => {

    // console.log(currentUser)

    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            username: currentUser?.username,
            image: currentUser?.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const response = await axios.put(
                `${host}${updateUserUsernameRoute}`,
                { username: data.username },
                {
                    headers: {
                        'Authorization': `Bearer ${currentUser?.accessToken}`
                    },
                }
            );
            // toast.success('Edit success fully')
        } catch (error) {
            toast.error('something is wrong!')
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=' space-y-12'>
                    <div className=' border-b border-gray-900/10 pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Profile
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Edit your public information.
                        </p>

                        <div className='mt-5 flex flex-col gap-y-8'>
                            <Input
                                disabled={isLoading}
                                lable='Name'
                                id='username'
                                errors={errors}
                                required
                                register={register}
                                type={''}
                            />
                            <div>
                                <label className=' block text-sm font-medium leading-6 text-gray-900'>
                                    Photo
                                </label>
                                <p className='mt-1 text-sm leading-6 text-gray-600'>is coming soon</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type='submit'
                        >
                            Submit
                        </Button>

                    </div>
                </div>
            </form>

        </Modal>
    )
}

export default SettingModal