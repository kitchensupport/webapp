const LoginModal = {
    isOpen: () => {
        return element(by.id('loginModal')).isPresent();
    },

    open: () => {
        element(by.id('login')).click();
    },

    login: (email, password) => {
        LoginModal.setEmail(email);
        LoginModal.setPassword(password);

        // Click the login button and wait.
        element(by.id('modal-loginButton')).click();
        return LoginModal.isLoggedIn();
    },

    logout: () => {
        element(by.id('logout')).click();
        return !LoginModal.isLoggedIn();
    },

    setEmail: (email) => {
        const input = element(by.model('account.email'));

        input.clear()
            .then(() => {
                input.sendKeys(email);
            });
    },

    setPassword: (password) => {
        const input = element(by.model('account.password'));

        input.clear()
            .then(() => {
                input.sendKeys(password);
            });
    },

    isLoggedIn: () => {
        return element(by.id('logout')).isPresent();
    }
};

export default LoginModal;
