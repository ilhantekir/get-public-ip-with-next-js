/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState } from 'react';

const Test = ({ ipAddress }) => {
  const [clientIP, setClientIP] = useState(null);

  const getPublicIPFunc = async () => {
    const getPublicIp = await fetch('/api/getIp').then(res => res.json());
    setClientIP(getPublicIp.ip);
  };

  return (
    <>
      <div>Server Side IP: {ipAddress}</div>
      <div>Client Side IP: {clientIP}</div>
      <div onClick={getPublicIPFunc}>Get IP</div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { req } = ctx;

  const result =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  let item = '';
  if (result) {
    item = result.split(',').length > 0 ? result.split(',')[0] : result;
  }

  return {
    props: {
      ipAddress: item
    }
  };
}

export default Test;
