// src/types/express/index.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Replace User with your actual user type
    }
  }
}
