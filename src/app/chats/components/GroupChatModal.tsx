import React, { useState } from 'react'
import { userType } from '../../../store/slices/authSlice';
import Modal from '../../../components/Modal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../components/input/Input';
import Select from '../../../components/input/Select';
import Button from '../../../components/Button';
import toast from 'react-hot-toast';
import axios from 'axios';
import { groupCreateRoute, host } from '../../../utilAPI/APIRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { membersType } from './ProfileDrawer';
import { useNavigate } from 'react-router-dom';

interface GroupChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    users: userType[];
}
const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users
}) => {

    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(false);
    const [group, setGroup] = useState<membersType>()
    const currentUser = useSelector((state: RootState) => state.auth.user)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    })

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const membersid = data.members.map((user: any) => user.value)

        try {
            const respone = await axios.post(`${host}${groupCreateRoute}`,
                {
                    name: data.name,
                    memberIds: membersid,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${currentUser?.accessToken}`
                    },

                })
            onClose();
            toast.success('Group created!')
 
        } catch (error) {
            toast.error('something is wrong')
        }
        setIsloading(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=' space-y-12'>
                    <div className='border-b border-gray-900/10 pb-12'>
                        <h2 className='text-bese font-semibold leading-7 text-gray-900'>
                            Create a group chat
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Create a chat with more than 2 people.
                        </p>
                        <div className=' flex mt-10 flex-col gap-y-8'>
                            <Input
                                register={register}
                                lable='Name'
                                id='name'
                                disabled={isLoading}
                                required
                                errors={errors}
                                type='text'
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.username
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type='button'
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type='submit'
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal