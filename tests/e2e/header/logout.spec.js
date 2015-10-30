const LoginModal = require('./../utils/LoginModal');

describe('homepage logout', () => {
    it('should log out', () => {
        browser.get('http://localhost:8001');
        LoginModal.open();
        LoginModal.login('t@t.com', 'test');
        expect(LoginModal.logout()).toEqual(true);
    });
});
