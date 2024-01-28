const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.concordnow.com',
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.concordnow.com',
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.concordnow.com',
      changeOrigin: true,
      secure: false,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.concordnow.com',
      changeOrigin: true,
      secure: false,
    })
  );
   
};
