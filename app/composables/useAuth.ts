export const useAuth = () => {
  const { pageRoleEn } = useSetting();

  // 設定 accessToken cookie
  const cookieName = computed(() => `authInfo_${pageRoleEn.value}`);
  const authInfoCookie = computed<LoginResponseData | undefined>(
    () => useCookie<LoginResponseData>(cookieName.value).value,
  );

  /**
   * 改變 AccessToken Cookie
   * @param auth 授權資料
   */
  const changAccessTokenCookie = (auth?: LoginResponseData) => {
    const _expirationToMilliseconds = auth?.expiresIn ? auth.expiresIn * 1000 : 10000;
    const _accessTokenCookie = useCookie<LoginResponseData | undefined>(cookieName.value, {
      expires: new Date(Date.now() + _expirationToMilliseconds), // 過期時間
      sameSite: 'strict', // 限制 cookie 的傳送
    });

    // cookie 值為 undefined 將自動清除瀏覽器 cookie
    _accessTokenCookie.value = auth;
  };

  return {
    changAccessTokenCookie,
    authInfoCookie,
  };
};
