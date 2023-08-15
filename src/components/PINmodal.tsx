import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal';
import Button from './Button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from './input/Input';
import { useDispatch } from 'react-redux';
import { isLogin } from '../store/slices/authSlice';

interface PINmodalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PINmodal: React.FC<PINmodalProps> = ({ isOpen, onClose }) => {
  const [isPINConfirmed, setIsPINConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      pin: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log(data)
      dispatch(isLogin())
      toast.success('Edit success fully')
    } catch (error) {
      toast.error('something is wrong!')
    }
  }



  return (
    <ConfirmModal isOpen={isOpen} onClose={() => setIsPINConfirmed(false)}>
      {isPINConfirmed ? (
        <div>
          <p>hi modal</p>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Input
              disabled={isLoading}
              lable='PIN'
              id='pin'
              errors={errors}
              required
              register={register}
              type={''}
            />
            <div className='mt-6 flex justify-center'>
              <Button
                disabled={isLoading}
                type='submit'
              >
                Submit
              </Button>
            </div>

          </form>
        </div>
      )}
    </ConfirmModal>
  );
}

export default PINmodal