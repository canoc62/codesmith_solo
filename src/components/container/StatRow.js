import React, { Component } from 'react';

export default (props) => {
  return (
    <tr>
      <td>{ props.opponent }</td>
      <td>{ props.targets }</td>
      <td>{ props.completionsAllowed }</td>
      <td>{ props.yardsAllowed }</td>
      <td>{ props.tdsGivenUp }</td>
    </tr>
  );
}