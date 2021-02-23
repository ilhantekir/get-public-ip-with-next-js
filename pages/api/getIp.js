export default function getIp(req, res) {
  const ipAdress =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  res.status(200).json({ ip: ipAdress });
}
