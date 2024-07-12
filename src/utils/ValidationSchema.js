import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/


export const signInValidationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Phone Number is required').matches(phoneRegExp, 'Please enter a valid phone number (Eg. 8844221134)'),
    password: Yup.string().required('Password is required'),
})

export const signUpValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Please enter the valid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number is required').matches(phoneRegExp, 'Please enter a valid phone number (Eg. 8844221134)'),
    password: Yup.string().required('Password is required').matches(passwordRules, { message: "Password should contain minimum 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit." })

})
