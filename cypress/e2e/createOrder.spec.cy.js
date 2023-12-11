describe('Create a order', () => {
  beforeEach(()=>
  {
    cy.visit('http://192.168.100.192:1999/');
    cy
  })
  it('create a order', () => {
    cy.get('#exampleInputEmail1').type('superadmin');
    cy.get('#exampleInputPassword1').type('123456');
    cy.get('.btn-success').click();
    
  })
})