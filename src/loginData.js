const getLoginData = () => {
  const loginData = sessionStorage.getItem('loginData');
  if(loginData !== null){
    const parsed = JSON.parse(loginData);
    if(parsed.type !== 'NotLoggedIn'){
      return parsed;
    }
  }

  throw new Error('Requires login');
};

export default getLoginData;
