describe('Admin Login', () => {
    it('should allow an admin to log in', () => {
        cy.visit('/admin/login');
        cy.get('input[name="email"]').type('admin@example.com');
        cy.get('input[name="password"]').type('yourpassword{enter}');

        // Tambahkan asersi untuk memastikan login berhasil
        // Misalnya, memeriksa apakah URL berubah ke dashboard admin
        cy.url().should('include', '/admin/dashboard');
    });
});
