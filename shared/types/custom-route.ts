import type { RouteLocationNormalizedGeneric } from 'vue-router';

export interface CustomRouteInfo {
  fullPath: RouteLocationNormalizedGeneric['fullPath'];
  params: RouteLocationNormalizedGeneric['params'];
  path: RouteLocationNormalizedGeneric['path'];
  meta: RouteLocationNormalizedGeneric['meta'];
  name: RouteLocationNormalizedGeneric['name'];
  query: RouteLocationNormalizedGeneric['query'];
  hash: RouteLocationNormalizedGeneric['hash'];
}

export type CustomRouteInfoKey = keyof CustomRouteInfo;
