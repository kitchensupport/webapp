const LoginModal = require('./../utils/LoginModal');

describe('homepage logout', () => {
    it('should log out', () => {
        browser.get('http://localhost:8001');
        LoginModal.logout();
        expect(LoginModal.isLoggedIn()).toEqual(false);
    });
});
