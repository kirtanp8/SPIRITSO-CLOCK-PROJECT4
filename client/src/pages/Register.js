import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import ImageUploadFile from '../components/ImageUploadFile'

const Register = () => {
  const [error, setError] = useState('')
  const [data, setData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
    image: '',
  })

  const navigate = useNavigate()

   const handleSubmit = async (event) => {
    event.preventDefault()
    
    const config = {
      method: 'post',
      url: 'api/auth/register/',
      headers: { 
        'Content-Type': 'application/json',
      },
      data: data,
    }
    
    try {
      const response = await axios(config)
      navigate('/login')
    } catch (err) {
      if (
        !data.username ||
        !data.email ||
        !data.first_name ||
        !data.last_name ||
        !data.password ||
        !data.password_confirmation ||
        !data.image
      ) {
        setError('Please fill in all fields.')
      } else {
        setError('Error Registering')
      }
    }
  }


  const handleChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handleImageUrl = (url) => {
    setData({ ...data, image: url })
  }

  return (
    <div className='form-page-register'>
      <div className='take-space-register'></div>
      <div className='form-div-register'>
        <div className='form-box-register'>
        <h2 className='form-title'>Create Account</h2>
        <Form onSubmit={handleSubmit} className='form-container'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            name='first_name' 
            value={data.first_name}
            placeholder='First Name'
            onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            name='last_name' 
            value={data.last_name}
            placeholder='Last Name'
            onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            placeholder='Username'
            type='text'
            name='username'
            value={data.username}
            onChange={handleChange}
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            placeholder='Email'
            type='text'
            name='email'
            value={data.email}
            onChange={handleChange}
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password - Your password must be 8 characters or more</Form.Label>
          <Form.Control 
            placeholder='Password'
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control 
            placeholder='Password Confirmation'
            type='password'
            name='password_confirmation'
            value={data.password_confirmation}
            onChange={handleChange}
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <ImageUploadFile className='image-field'
            value={data.image}
            name='image'
            type='text'
            handleImageUrl={handleImageUrl}
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control className='submit' type='submit' value="Register" placeholder='Register'/>
          </Form.Group>
          <div>
            <p className='sign-up-message'>Already have an account? <Link to='/login' className='link'>Login in here.</Link></p> 
          </div>
        </Form>
        </div>
        </div>
      <p className='error-message'>{error}</p>
    </div>
  )
}

export default Register