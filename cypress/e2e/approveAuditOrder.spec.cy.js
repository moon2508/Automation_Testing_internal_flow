describe('Approve a audit order', () => {
    beforeEach(() => {
      cy.viewport(1920, 1024);
      cy.visit('http://192.168.100.192:1999/');
      //login
      cy.get('#exampleInputEmail1').type('haptdv');
      cy.get('#exampleInputPassword1').type('123456');
      cy.get('.btn-success').click();
      cy.wait(300);
       //click list order
  
       cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
       cy.get('li:contains("Quản lý Đơn hàng")').click()
         .children('ul.mm-collapse')
         .invoke('css', 'display', 'block')
         .find('a:contains("Danh sách")')
         .click();
    });
    it('Approve a audit order with status "Chưa điều chỉnh"', () => {
   
        //filter about status_audit
        cy.get('#statusAudit_chosen').click().type('Chưa điều chỉnh{enter}');
        cy.get('#searchListOrder').click();
        cy.wait(300);
    
        //detail order
        cy.get('td.text-center a').eq(1).invoke('text').then((text) => {
          cy.log('Tạo đơn điều chỉnh với mã đơn ' + text );
        });;
        cy.get('.text-center').eq(1).click();
        cy.get('button').contains('Điều chỉnh đơn hàng')
          .click();
    })


})