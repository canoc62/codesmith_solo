import React from 'react';

export default (props) => {
  return (
    <div>
      <input type='email' placeholder='email' value={ props.username } onChange={ props.handleUsernameChange } className='email'/>
      <input type='password' placeholder='password' value={ props.password } onChange={ props.handlePasswordChange } className='password'/>
      <button type='submit' className='loginBtn' onClick={ props.handleClick }>{props.btnText}</button>
    </div>
  )
}