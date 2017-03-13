import React from 'react';

export default (props) => {
  return (
    <div>
      <input type='text' placeholder='Username' value={ props.username } onChange={ props.handleUsernameChange } className='username'/>
      <input type='text' placeholder='Email' value={ props.email } onChange={ props.handleEmailChange } className='email'/>
      <input type='password' placeholder='Password' value={ props.password } onChange={ props.handlePasswordChange } className='password'/>
      <input type='password' placeholder='Confirm Password' value={ props.passwordConfirm } onChange={ props.handlePasswordConfirmChange } className='password'/>
      <button type='submit' className='signupBtn' onClick={ props.handleClick }>{ props.btnText }</button>
    </div>
  )
}