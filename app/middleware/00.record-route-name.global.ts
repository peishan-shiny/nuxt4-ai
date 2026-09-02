export default defineNuxtRouteMiddleware((to, from) => {
  const { toRoute } = useSetting();

  const _copyRouteFieldList = [
    'fullPath',
    'params',
    'path',
    'meta',
    'name',
    'query',
    'hash',
  ] as Array<CustomRouteInfoKey>;
  toRoute.value = copyObjectFieldList(to, _copyRouteFieldList) as CustomRouteInfo;
  console.log('路由', toRoute.value);
});
