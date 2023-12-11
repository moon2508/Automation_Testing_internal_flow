describe('Create a audit order', () => {
    beforeEach(()=>
    {
      cy.viewport(1920,1024);
      cy.visit('http://192.168.100.192:1999/');
       //login
       cy.get('#exampleInputEmail1').type('hangptdv');
       cy.get('#exampleInputPassword1').type('123456');
       cy.get('.btn-success').click();
       cy.wait(300);
    })
    it('create a audit order', () => {
      //click list order
      
      cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
      cy.get('li:contains("Quản lý Đơn hàng")').click()
      .children('ul.mm-collapse')
      .invoke('css', 'display', 'block')
      .find('a:contains("Danh sách")')
      .click();
    //filter about status_audit
    cy.get('#statusAudit_chosen').click().type('Chưa điều chỉnh{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);

    //detail order
    cy.get('.text-center').eq(1).click();
    cy.get('button').contains('Điều chỉnh đơn hàng')
    .click();
    
    //click audit order button
      
  
  
     
  
      
    })
  })