import React, { Fragment, useMemo, useState } from 'react'
import { userType } from '../../../store/slices/authSlice'
import { format } from 'date-fns';
import { Transition, Dialog } from '@headlessui/react';
import { IoClose, IoTrash, IoSettings } from 'react-icons/io5'
import Avatar from '../../../components/Avatar';
import ConfirmModal from './ConfirmModal';

import { TbMessageCircleMinus } from 'react-icons/tb'
import SettingGroupModal from './SettingGroup';

export interface membersType {
    createdAt: Date;
    id: string;
    image: string | null;
    isGroup: boolean;
    name: string;
    members: userType[]
}

interface ProfileDrawerProps {
    data: userType;
    onClose: () => void;
    isOpen: boolean;
    membersData: membersType
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    data,
    onClose,
    isOpen,
    membersData
}) => {

    const [confirmOpen, setConfirmOpen] = useState(false)
    const [editGroup, setEditGroup] = useState(false)
    const [typeDelete, setTypeDelete] = useState('')

    const joinedsDate = useMemo(() => {
        if (data?.createdAt) {
            return format(new Date(data.createdAt), 'PP');
        }
        return '';
    }, [data?.createdAt]);

    const handleClick = (type: string) => {
        setTypeDelete(type)
        setConfirmOpen(true)
    }


    return (
        <>
            <ConfirmModal
                type={typeDelete}
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            />

            <SettingGroupModal
                isOpen={editGroup}
                onClose={() => setEditGroup(false)}
                data={membersData}
            />

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel
                                        className="pointer-events-auto w-screen max-w-md"
                                    >
                                        <div className=' flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                                            <div className='px-4 sm:px-6'>
                                                <div className='flex items-start justify-end'>
                                                    <div className='ml-3 flex h-7 items-center'>
                                                        <button
                                                            onClick={onClose}
                                                            type='button'
                                                            className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'

                                                        >
                                                            <span className='sr-only'> Close panel</span>
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=' rea mt-6 flex-1 px-4 sm:px-6'>
                                                <div className='flex flex-col items-center'>
                                                    <div>
                                                        <Avatar user={data} profile={true} />
                                                    </div>
                                                    <div className=' font-semibold'>
                                                        {data && data.isGroup ? data.name : data && data.username}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        {data?.isGroup && (
                                                            <>
                                                                <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                                                                    <div
                                                                        onClick={() => setEditGroup(true)}
                                                                        className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:text-yellow-500 hover:bg-red-100 transition"
                                                                    >
                                                                        <IoSettings size={20} />
                                                                    </div>
                                                                    <div className="text-sm font-light text-neutral-600">
                                                                        Edit
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                                                                    <div
                                                                        onClick={() => handleClick('Group')}
                                                                        className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:text-red-600 hover:bg-red-100 transition"
                                                                    >
                                                                        <IoTrash size={20} />
                                                                    </div>
                                                                    <div className="text-sm font-light text-neutral-600">
                                                                        Delete Group
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                        <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                                                            <div
                                                                onClick={() => handleClick('Message')}
                                                                className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:text-red-600 hover:bg-red-100 transition"
                                                            >
                                                                <TbMessageCircleMinus size={20} />
                                                            </div>
                                                            <div className="text-sm font-light text-neutral-600">
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full pb-5 pt-5 sm:px-0 sm:pt-0'>
                                                        <dl className=' space-y-8 px-4 sm:space-y-6 sm:px-6'>
                                                            {!data?.isGroup && (
                                                                <div>
                                                                    <dt className=' text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                                        Email
                                                                    </dt>
                                                                    <dd className=' mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                                        {data?.email}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data?.isGroup && (
                                                                <>
                                                                    <hr />
                                                                    <div>
                                                                        <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                                            Joined
                                                                        </dt>
                                                                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                                            {joinedsDate}
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}

                                                            {data?.isGroup && membersData && membersData?.members && (
                                                                <>
                                                                    <div>
                                                                        <dt className=' text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                                            Members
                                                                        </dt>
                                                                        <dd className=' mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                                            <ul>
                                                                                {
                                                                                    membersData?.members.map((user) => (
                                                                                        <div
                                                                                            key={user.id}
                                                                                            className='flex gap-3 items-center p-1'
                                                                                        >
                                                                                            <Avatar user={user} />
                                                                                            <div>
                                                                                                <p>{user.username}</p>
                                                                                                <p className=' font-light'>{user.email}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                }

                                                                            </ul>
                                                                        </dd>
                                                                    </div>

                                                                    <hr />

                                                                    <div>
                                                                        <dt className='text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0'>
                                                                            Created
                                                                        </dt>
                                                                        <dd className='mt-1 text-sm text-gray-900 sm:col-span-2'>
                                                                            {joinedsDate}
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default ProfileDrawer