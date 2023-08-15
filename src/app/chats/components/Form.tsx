import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import MessageInput from './MessageInput'
import { host, sendMessage } from '../../../utilAPI/APIRoute'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useEffect } from 'react'
import getOneUserOrGroup from '../../actions/getUserOrGroup'


const Form = () => {
    const { id } = useParams()


    const fetchData = async () => {
        const findOne = await getOneUserOrGroup(id)
        return findOne.isGroup;
    }

    useEffect(() => {
        fetchData();
    }, [])

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            body: '',
            isGroup: ''
        }
    })
    const accessToken = useSelector((state: RootState) => state.auth.user?.accessToken)


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const userGroup = await fetchData();

        setValue('body', '', { shouldValidate: true })

        await axios.post(`${host}${sendMessage}${id}`, {
            body: data.body,
            isGroup: userGroup
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

    }
    return (
        <div
            className='py-4 px-4 bg-white flex items-center gap-2 lg:gap-4 w-full'
        >
            <HiPhoto size={30} className=" text-sky-500" />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex items-center gap-2 lg:gap-4 w-full'
            >
                <MessageInput
                    id='body'
                    register={register}
                    error={errors}
                    required
                    placeholder="Write a message"
                />

                <button
                    type='submit'
                    className=' rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition text-white'
                >
                    <HiPaperAirplane size={20} />

                </button>
            </form>
        </div>
    )
}

export default Form