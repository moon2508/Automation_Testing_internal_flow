describe('Update a audit order', () => {
  beforeEach(() => {
    cy.viewport(1920, 1024);
    cy.visit('http://192.168.100.192:1999/');
    //login
    cy.get('#exampleInputEmail1').type('hangptdv');
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
  })
  it('Update a audit order with status "Lưu tạm"', () => {
   
    
    //filter about status_audit
    cy.get('#statusAudit_chosen').click().type('Lưu tạm{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);

    //detail order
    cy.get('.text-center').eq(1).click();
    cy.get('button').contains('Chỉnh sửa điều chỉnh')
      .click();

    //update a order
    cy.get('.product-row').each(($row, index) => {
      cy.wrap($row)
        .find('.product-price')
        .then(($price) => {
          if ($price.text().includes("10,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 3);

          } else if ($price.text().includes("20,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 3);
          }
          else if ($price.text().includes("50,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);
          }
          else {
            cy.log('Sản phẩm k có trong đơn hàng');
          }
        });
    });
    cy.get('button').contains('Yêu cầu điều chỉnh').click();
    cy.wait(500);
    // cy.get('button').contains('Lưu');





  });
  it('Update a audit order with status "Từ chối điều chỉnh"', () => {
   
    
    //filter about status_audit
    cy.get('#statusAudit_chosen').click().type('Từ chối điều chỉnh{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);

    //detail order
    cy.get('.text-center').eq(1).click();
    cy.get('button').contains('Chỉnh sửa điều chỉnh')
      .click();

    //update a order
    cy.get('.product-row').each(($row, index) => {
      cy.wrap($row)
        .find('.product-price')
        .then(($price) => {
          if ($price.text().includes("10,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 3);

          } else if ($price.text().includes("20,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 3);
          }
          else if ($price.text().includes("50,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);
          }
          else {
            cy.log('Sản phẩm k có trong đơn hàng');
          }
        });
    });
    cy.get('button').contains('Lưu').click();
    cy.wait(500);
    // cy.get('button').contains('Lưu');





  })

})