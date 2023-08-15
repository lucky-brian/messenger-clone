import React, { useState } from 'react'
import Modal from '../../../components/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { membersType } from './ProfileDrawer';
import { toast } from 'react-hot-toast';
import Button from '../../../components/Button';
import Input from '../../../components/input/Input';
import axios from 'axios';
import { editGroup, host } from '../../../utilAPI/APIRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate } from 'react-router-dom';

interface SettingGroupProps {
    isOpen: boolean;
    onClose: () => void;
    data: membersType;
}

const SettingGroupModal: React.FC<SettingGroupProps> = ({
    isOpen,
    onClose,
    data
}) => {

    const navigate = useNavigate()

    const currentUser = useSelector((state: RootState) => state.auth.user)
    const currentChat = useSelector((state: RootState) => state.chat.currentChatId)
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
            name: data?.name,
            image: data?.image
        }
    });

    const image = watch('image');

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setValue('name', '')
            setValue('image', '')

            const respone = await axios.post(`${host}${editGroup}${currentChat}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${currentUser?.accessToken}`
                    },
                }
            );
            navigate('/chat')
            onClose()
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
                    <h2 className=' text-base font-semibold leading-7 text-gray-900 '>
                        Edit Group
                    </h2>
                </div>

                <div className='mt-5 flex flex-col gap-y-8'>
                    <Input
                        disabled={isLoading}
                        lable='New group name'
                        id='name'
                        errors={errors}
                        required
                        register={register}
                        type="text"
                    />
                    <div>
                        <Input
                            disabled={isLoading}
                            lable='Url Image'
                            id='image'
                            errors={errors}
                            register={register}
                            type="text"
                        />
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
            </form>
        </Modal>
    )
}

export default SettingGroupModal