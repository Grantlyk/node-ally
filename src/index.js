export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    message: err.message || 'An error has occured',
    code: err.status || 500,
  });
}

export function enableCORS(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-XSRF-TOKEN, Content-Type, Accept, X-Access-Token',
  );
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, PUT, DELETE');
  next();
}

export function notFound(req, res) {
  res.status(404).json({
    message: 'Endpoint not Found',
    code: 404,
  });
}

export function supportCrossOrigin(req, res, next) {
  res.status(200);
  enableCORS(req, res, next);
}

export function requestTime(req, res, next) {
  req.requestTime = Date.now();
  next();
}

export default {
  errorHandler,
  enableCORS,
  notFound,
  supportCrossOrigin,
  requestTime,
};
