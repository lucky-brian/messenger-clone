import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
    id: string;
    placeholder: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    error: FieldValues;
}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    placeholder,
    type,
    required,
    register,
    error
}) => {
    return (
        <div className=' relative w-full'>
            <input
                type={type}
                autoComplete={id}
                {...register(id, { required })}
                placeholder={placeholder}
                className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
            />

        </div>
    )
}

export default MessageInput