/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'

import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { login } from '../src/Services/authService'


const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
})

const initialValues = {
    email: '',
    password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export default function Login() {

    const router = useRouter();
    const { callbackUrl } = router.query;

    const [loading, setLoading] = useState(false)

    const [errorMsg, setErrorMsg] = useState('')



    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setLoading(true)



            //   setTimeout(() => {
            //     login(values.email, values.password)
            //       .then((response) => {

            //         setLoading(false)
            //         window.location.reload();
            var inMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);


            // Cookie.set("User", "ABC", {expires : inMinutes});

            login(values.email, values.password)
                .then(res => {
                    setLoading(false);

                    console.log('response from login ', res.data);

                    Cookie.remove('UserObj');
                    Cookie.set("UserObj", JSON.stringify(res.data), { expires: inMinutes });
                    if (callbackUrl) {
                        router.push(callbackUrl)

                    } else {
                        router.push('/')
                    }



                })
                .catch(err => {

                    setLoading(false);

                    let Obj = err.toJSON();

                    console.log('Obj == ', Obj);



                    if (Obj.message === 'Network Error') {
                        setErrorMsg('API Server is down....')
                    }
                    else {
                        let obj2 = JSON.parse(Obj.message);
                        setErrorMsg(obj2.errorMessage);
                    }

                    console.log('message == ', errorMsg);



                })







        },
    })

    return (
        <div
            className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed mt-5'
        >

            <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20 mt-5'>

                <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>



                    <form
                        className='form w-100  p-5 card'
                        onSubmit={formik.handleSubmit}
                        noValidate
                        id='kt_login_signin_form'
                    >
                        {/* begin::Heading */}
                        <div className='text-center mb-10'>
                            <h2 className='text-dark mb-3'>Sign In to GYM APP</h2>
                            {/* <div className='text-gray-400 fw-bold fs-4'>
          New Here?{' '}
          <Link to='/auth/registration' className='link-primary '>
            Create an Account
          </Link>
        </div> */}
                        </div>
                        {/* begin::Heading */}
                        {errorMsg &&
                            <div className='mb-lg-15 alert alert-danger'>
                                <div className='alert-text font-weight-bold'>{errorMsg}</div>
                            </div>
                        }

                        {formik.status ? (
                            <div className='mb-lg-15 alert alert-danger'>
                                <div className='alert-text font-weight-bold'>{formik.status}</div>
                            </div>
                        ) : ''}

                        {/* {hasErrors ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{hasErrors}</div>
        </div>
      ) : ''} */}

                        {/* //  : (
      //   <div className='mb-10 bg-light-info p-8 rounded'>
      //     <div className='text-info'>
      //       Use account <strong>admin@demo.com</strong> and password <strong>demo</strong> to
      //       continue.
      //     </div>
      //   </div>
      // )} */}

                        {/* begin::Form group */}
                        <div className='fv-row mb-10'>
                            <label className='form-label fs-6  text-dark'>Email</label>
                            <input
                                placeholder='Email'
                                {...formik.getFieldProps('email')}
                                className={clsx(
                                    'form-control form-control-lg form-control-solid',
                                    { 'is-invalid': formik.touched.email && formik.errors.email },
                                    {
                                        'is-valid': formik.touched.email && !formik.errors.email,
                                    }
                                )}
                                type='email'
                                name='email'
                                autoComplete='off'
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert'>{formik.errors.email}</span>
                                </div>
                            )}
                        </div>
                        {/* end::Form group */}

                        {/* begin::Form group */}
                        <div className='fv-row mb-10 mt-3'>
                            <div className='d-flex justify-content-between mt-n5'>
                                <div className='d-flex flex-stack mb-2'>
                                    {/* begin::Label */}
                                    <label className='form-label  text-dark fs-6 mb-0'>Password</label>
                                    {/* end::Label */}
                                    {/* begin::Link */}
                                    {/* <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 '
              style={{marginLeft: '5px'}}
            >
              Forgot Password ?
            </Link> */}
                                    {/* end::Link */}
                                </div>
                            </div>
                            <input
                                type='password'
                                autoComplete='off'
                                {...formik.getFieldProps('password')}
                                className={clsx(
                                    'form-control form-control-lg form-control-solid',
                                    {
                                        'is-invalid': formik.touched.password && formik.errors.password,
                                    },
                                    {
                                        'is-valid': formik.touched.password && !formik.errors.password,
                                    }
                                )}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className='fv-plugins-message-container'>
                                    <div className='fv-help-block'>
                                        <span role='alert'>{formik.errors.password}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* end::Form group */}

                        {/* begin::Action */}
                        <div className='text-center'>
                            <button
                                type='submit'
                                id='kt_sign_in_submit'
                                className='btn btn-lg btn-primary w-100 mb-5 mt-5'
                                disabled={!formik.isValid}
                            // disabled={formik.isSubmitting || !formik.isValid}
                            >
                                {!loading && <span className='indicator-label'>Continue</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Please wait...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>

                            {/* begin::Separator */}
                            {/* <div className='text-center text-muted text-uppercase  mb-5'>or</div> */}
                            {/* end::Separator */}

                            {/* begin::Google link */}
                            {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Continue with Google
        </a> */}
                            {/* end::Google link */}

                            {/* begin::Google link */}
                            {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          Continue with Facebook
        </a> */}
                            {/* end::Google link */}

                            {/* begin::Google link */}
                            {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          Continue with Apple
        </a> */}
                            {/* end::Google link */}
                        </div>
                        {/* end::Action */}
                    </form>
                </div>

            </div>

        </div>
    )

}


Login.getLayout = function PageLayout(page) {

    return (
        <>
            {page}
        </>
    )
}

