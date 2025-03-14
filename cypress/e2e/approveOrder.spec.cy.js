describe('Approve a order', () => {
    beforeEach(()=>
    {
      cy.viewport(1920,1024);
      // cy.visit('http://192.168.100.56:2022/order-itopup/list-order');
      cy.visit('http://192.168.100.192:1999/');
       //login
       cy.get('#exampleInputEmail1').type('haptdv');
       cy.get('#exampleInputPassword1').type('123456');
       cy.get('.btn-success').click();
       cy.wait(300);
    })
    it('Approving a order', () => {
      //click list order
    cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
    cy.get('li:contains("Quản lý Đơn hàng")').click()
    .children('ul.mm-collapse')
    .invoke('css', 'display', 'block')
    .find('a:contains("Danh sách")')
    .click();

    //filter about status
    cy.get('#status_chosen').click().type('Chờ duyệt{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);

    //detail order
    cy.get('.text-center').eq(1).click();
    cy.wait(300);
    cy.get('button').contains('Duyệt').click();
    cy.wait(600);
    // cy.get('button').contains('Quay lại').click();
    


    });
    it.skip('Rejecting a order', () => {
        //click list order
      cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
      cy.get('li:contains("Quản lý Đơn hàng")').click()
      .children('ul.mm-collapse')
      .invoke('css', 'display', 'block')
      .find('a:contains("Danh sách")')
      .click();
  
      //filter about status
      cy.get('#status_chosen').click().type('Chờ duyệt{enter}');
      cy.get('#searchListOrder').click();
      cy.wait(300);
  
      //detail order
      cy.get('.text-center').eq(1).click();
      cy.get('button').contains('Từ chối');
      cy.get('button').contains('Quay lại').click();
      
  
  
      });

      it.skip('Canceling a order', () => {
        //click list order
      cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
      cy.get('li:contains("Quản lý Đơn hàng")').click()
      .children('ul.mm-collapse')
      .invoke('css', 'display', 'block')
      .find('a:contains("Danh sách")')
      .click();
  
      //filter about status
      cy.get('#status_chosen').click().type('Chờ duyệt{enter}');
      cy.get('#searchListOrder').click();
      cy.wait(300);
  
      //detail order
      cy.get('.text-center').eq(1).click();
      cy.get('button[data-target="#cancelOrder"]');
      cy.get('button').contains('Quay lại').click();

  
  
      });
    


})