function AuthService($rootScope, $http, $cookies) {
    let currentUser;

    return {
        loginToken: (token) => {
            $http.get(`http://api.kitchen.support/account?token=${token}`)
            .success((response) => {
                currentUser = response.user;
                $rootScope.$broadcast('event:auth-login', currentUser);
            });
        },
        login: (email, password, remember, callback) => {
            try {
                $http.post('http://api.kitchen.support/accounts/login',
                    {email, password}
                ).success((response) => {
                    currentUser = response.user;

                    // Store user info in cookies.
                    if (remember) {
                        $cookies.ksLoginToken = currentUser.token;
                    }

                    callback('SUCCESS');
                    return 'SUCCESS';
                })
                .error((err) => {
                    callback('FAILURE');
                    return 'FAILURE';
                });
            } catch (err) {
                callback('ERROR');
                return 'ERROR';
            }
        },
        logout: () => {
            currentUser = undefined;
            $cookies.ksLoginToken = undefined;
        },
        isLoggedIn: () => {
            return !!currentUser;
        },
        currentUser: () => { return currentUser; }
    };
}

export default AuthService;
