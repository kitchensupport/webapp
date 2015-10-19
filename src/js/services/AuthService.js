function AuthService($http, $cookies, $mdDialog) {
    let currentUser;
    let modalIsOpen = false;
    let modal;

    return {
        loginToken: (token, success, error) => {
            if (token && token.length > 0) {
                $http.get(`http://api.kitchen.support/account?token=${token}`)
                .then((response) => {
                    currentUser = response.data.user;
                    success(response);
                }).catch((err) => {
                    console.error('Token Login Error', err);
                    error(err);
                });
            }
        },
        register: (email, password, success, error) => {
            $http.post('http://api.kitchen.support/accounts/create', {
                email,
                password
            }).then((response) => {
                success(response);
            }).catch((err) => {
                error(err);
            });
        },
        login: (email, password, remember, success, error) => {
            $http.post('http://api.kitchen.support/accounts/login', {
                email,
                password
            }).then((response) => {
                currentUser = response.data.user;

                // Store user info in cookies.
                if (remember) {
                    $cookies.ksLoginToken = response.data.user.api_token;
                }

                success(response);
            }).catch((err) => {
                console.error('Login Error', err);
                error(err);
            });

        },
        logout: () => {
            currentUser = undefined;
            $cookies.ksLoginToken = undefined;
        },
        forgotPassword: (email, success, error) => {
            $http.post('http://api.kitchen.support/accounts/reset/request', {
                email
            }).then((response) => {
                success(response);
            }).catch((err) => {
                error(err);
            });
        },
        forgotPasswordConfirm: (resetToken, password, success, error) => {
            $http.post('http://api.kitchen.support/accounts/reset/confirm', {
                reset_token: resetToken,
                password
            }).then((response) => {
                success(response);
            }).catch((err) => {
                error(err);
            });
        },
        isLoggedIn: () => {
            return !!currentUser;
        },
        currentUser: () => { return currentUser; },

        // login modal functions
        loginModal: {
            open: ($event) => {
                modalIsOpen = true;
                $mdDialog.show({
                    templateUrl: 'templates/login-modal.html',
                    controller: 'LoginController',
                    clickOutsideToClose: true,
                    targetEvent: $event,
                    onRemoving: () => { modalIsOpen = false; }
                });
            },
            close: () => {
                if (modalIsOpen) {
                    $mdDialog.hide(modal);
                }
            },
            getModal: () => {
                return modal;
            },
            isOpen: () => {
                return modalIsOpen;
            }
        }
    };
}

export default ['$http', '$cookies', '$mdDialog', AuthService];
