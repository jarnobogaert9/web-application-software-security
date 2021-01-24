import React, { useEffect } from 'react'
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

const EmailCheker = ({ children }) => {
  const history = useHistory();
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    if (parsed.error === 'unauthorized') {
      history.push(`/?error_description=${parsed.error_description}`);
    }
  }, [])
  return (
    <>
      {children}
    </>
  )
}

export default EmailCheker
