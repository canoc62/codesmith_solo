import React from 'react';

export default (props) => {
  return (
    <div>
      <input type='text' placeholder='username' value={ props.username } onChange={ props.handleUsernameChange } className='username'/>
      <input type='password' placeholder='password' value={ props.password } onChange={ props.handlePasswordChange } className='password'/>
      <button type='submit' className='loginBtn' onClick={ props.handleClick }>{ props.btnText }</button>
    </div>
  )
}