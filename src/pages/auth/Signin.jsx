import React from 'react'
import { Button, Card } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import CustomInput from '../../components/reusable/CustomInput/CustomInput'
import { useFormik } from 'formik'
import { signInValidationSchema } from '../../utils/ValidationSchema'

export default function Signin() {
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: ''
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      
      // Handle form submission
      console.log(values)
      // navigate('/home')
    }
  })


  return (
    <>
      <div className='max-w-[800px] mx-auto mt-10'>
        <Card>
          <div className='flex'>
            <div className='w-1/2 flex justify-center items-center pl-10'>
              <img src='https://pitchmark.net/client/images/img-12.png' />
            </div>
            <div className='w-1/2 p-10'>
              <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-4 justify-center items-center'>
                  <h1 className='text-2xl font-[900]'>Sign In</h1>
                  <div className='w-full flex flex-col justify-start'>
                    <CustomInput
                      name='phoneNumber'
                      variant='filled'
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
                  <div className='flex justify-end w-full'>
                    <p className='underline text-[#2F855A] cursor-pointer'>Forgot password?</p>
                  </div>
                  <Button type='submit' className='w-full' variant={'outline'} colorScheme='green'>Sign In</Button>
                </div>
              </form>
              <div className='flex justify-center items-center mt-5 w-full'>
                <p >Don't have account? <span className='underline text-[#2F855A] cursor-pointer' onClick={() => navigate('/signup')}>Sign up</span></p>
              </div>
            </div>

          </div>
        </Card>
      </div>
    </>
  )
}
