const client = require('prom-client');

// Default Node.js process metrics (CPU, memory, event loop lag)
client.collectDefaultMetrics();

const requests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const duration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.01, 0.05, 0.1, 0.3, 1, 3],
});

// Records metrics and writes one JSON log line per request
function track(req, res, next) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const seconds = Number(process.hrtime.bigint() - start) / 1e9;
    // Use the route pattern (/users/:id), not the real URL, to keep label values few
    const route = req.route ? req.baseUrl + req.route.path : 'unmatched';
    requests.inc({ method: req.method, route, status: res.statusCode });
    duration.observe({ method: req.method, route }, seconds);

    if (req.path !== '/metrics' && req.path !== '/healthz' && req.path !== '/readyz') {
      console.log(JSON.stringify({
        time: new Date().toISOString(),
        method: req.method,
        route,
        status: res.statusCode,
        ms: Math.round(seconds * 1000),
      }));
    }
  });
  next();
}

async function metricsHandler(req, res) {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
}

module.exports = { track, metricsHandler };
