import express, { Router } from 'express';
import { readdirSync } from 'fs';

const router: Router = express.Router();
const currentPath: string = __dirname;

readdirSync(currentPath).forEach((file: string) => {
  if (file === 'index.ts' || file.substr(file.lastIndexOf('.') + 1) !== 'ts') return;
  const name: string = file.substr(0, file.indexOf('.'));
  router.use(require(`./${name}`).default);
});

export default router;
