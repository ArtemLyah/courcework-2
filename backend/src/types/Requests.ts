import { Request } from "express";

export interface Body<D> extends Request {
  body: D;
}

export interface Params<P extends {}> extends Request {
  params: P;
}

export interface Query<Q extends {}> extends Request {
  query: Q;
}