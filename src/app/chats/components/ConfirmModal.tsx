import axios from 'axios';
import React, { useCallback, useState } from 'react'
import { deleteGroupRoute, deleteMessageRoute, host } from '../../../utilAPI/APIRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { FiAlertTriangle } from 'react-icons/fi'
import { Dialog } from '@headlessui/react';
import Button from '../../../components/Button';
import { toast } from 'react-hot-toast';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    type
}) => {

    const { id } = useParams()
    const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const onDelete = useCallback(async (type: string) => {
        setIsLoading(true)
        if (type === 'Message') {
            await axios.delete(`${host}${deleteMessageRoute}${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

        }

        if (type === 'Group') {
            await axios.delete(`${host}${deleteGroupRoute}${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        }

        setIsLoading(false)
        setTimeout(() => {
            navigate(`/chat`)
        }, 500);
        toast.success('Deleted!')
    }, [id, accessToken]);


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex justify-center h-12 w-12 flex-shrink-0 items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <div>
                        <FiAlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                    >
                        {
                            type == "Message" ? ('Delete Messages') : ('Delete Group')
                        }

                    </Dialog.Title>

                    <div className='mt-2'>
                        <p className='text-sm text-gray-500'>
                            {
                                type == "Message" ? ('Are you sure you want to delete this messages ?') : ('Are you sure you want to delete this Group ?')
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className=' mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                <Button
                    disabled={isLoading}
                    danger
                    onClick={() => onDelete(type)}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>

        </Modal>
    )
}

export default ConfirmModal