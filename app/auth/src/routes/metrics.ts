import express, { Request, Response } from 'express';
import * as client from 'prom-client';

const router = express.Router();

// Create a Registry which registers the metrics
const register = new client.Registry();
// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'microservice-prometheus-auth-app',
});
// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

router.get('/metrics', async (_req: Request, res: Response) => {
  res.setHeader('Content-Type', register.contentType);
  const result = await register.metrics();
  return res.send(result);
});

export { router as metricsRouter };
