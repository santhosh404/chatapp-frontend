import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../../components/reusable/CustomInput/CustomInput'
import { useFormik } from 'formik';
import { signUpValidationSchema } from '../../utils/ValidationSchema';
import { signUp } from '../../services/AuthServices';
import { CommonContextProvider } from '../../context/CommonContext';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //context usage
  const { toast } = useContext(CommonContextProvider)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: ''
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await signUp(values);
        if (response) {
          setLoading(false);
          sessionStorage.setItem('userInfo', JSON.stringify(response.data.user));
          sessionStorage.setItem('token', response.data.token);
          toast({
            title: response.message,
            status: 'success',
            position: 'top-center'
          });
          navigate('/chat')
        }
      }
      catch (err) {
        setLoading(false);
        toast({
          title: err.response.data.message,
          description: err.response.data.data.error,
          status: 'error',
          position: 'top-center'
        });
      }

    }
  })

  useEffect(() => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if (userInfo) {
      navigate('/chat')
    }
  }, [navigate])

  return (
    <div className='max-w-[800px] mx-auto mt-10'>
      <Card>
        <div className='flex'>
          <div className='w-1/2 p-10'>
            <form onSubmit={formik.handleSubmit}>
              <div className='flex flex-col gap-4 justify-center items-center'>
                <h1 className='text-2xl font-[900]'>Sign Up</h1>
                <div className='w-full flex flex-col justify-start'>
                  <CustomInput
                    name='username'
                    variant='filled'
                    borderRadius={'12px'}
                    placeholder='Enter the username'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {
                    formik.touched.username && formik.errors.username && (
                      <small className='text-[red] ml-2'>
                        {formik.errors.username}
                      </small>
                    )
                  }
                </div>

                <div className='w-full flex flex-col justify-start'>
                  <CustomInput
                    name='email'
                    className='text-xl'
                    variant='filled'
                    borderRadius={'12px'}
                    placeholder='Enter the email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {
                    formik.touched.email && formik.errors.email && (
                      <small className='text-[red] ml-2'>
                        {formik.errors.email}
                      </small>
                    )
                  }
                </div>
                <div className='w-full flex flex-col justify-start'>
                  <CustomInput
                    variant='filled'
                    name='phoneNumber'
                    borderRadius={'12px'}
                    placeholder='Enter the phone number'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {
                    formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <small className='text-[red] ml-2'>
                        {formik.errors.phoneNumber}
                      </small>
                    )
                  }
                </div>

                <div className='w-full flex flex-col justify-start'>
                  <CustomInput
                    name='password'
                    type='password'
                    variant='filled'
                    borderRadius={'12px'}
                    placeholder='Enter the password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {
                    formik.touched.password && formik.errors.password && (
                      <small className='text-[red] ml-2'>
                        {formik.errors.password}
                      </small>
                    )
                  }
                </div>
                <Button isLoading={loading} type='submit' className='w-full' variant={'outline'} colorScheme='green'>Sign Up</Button>
              </div>
            </form>
            <div className='flex justify-center items-center mt-5 w-full'>
              <p >Already have account? <span className='underline text-[#2F855A] cursor-pointer' onClick={() => navigate('/signin')}>Sign In</span></p>
            </div>
          </div>
          <div className='w-1/2 flex justify-center items-center'>
            <img src='https://pitchmark.net/client/images/img-12.png' />
          </div>
        </div>
      </Card>
    </div>
  )
}
