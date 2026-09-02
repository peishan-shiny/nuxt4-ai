const useToRouteState = () => useState<CustomRouteInfo>('toRoute');

export const useSetting = () => {
  const toRoute = useToRouteState();

  const currentRouteName = computed(() => (toRoute.value?.name as string) || '');

  const pageRoleEn = computed(() => {
    const [role] = currentRouteName.value.split('-');
    return role as Role;
  });

  return {
    toRoute,
    pageRoleEn,
    currentRouteName,
  };
};
