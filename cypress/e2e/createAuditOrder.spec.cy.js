describe('Create a audit order', () => {
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
  it('create a audit order with status "Chưa điều chỉnh"', () => {

    cy.get('#statusAudit_chosen').click().type('Chưa điều chỉnh{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);

    cy.get('td.text-center')
      .each(($column) => {
        const text = $column.text();
        if (text.includes("Chưa điều chỉnh")) {
          cy.wrap($column).parent('tr').then(($row) => {
            cy.log("Tìm kiếm đúng trạng thái điều chỉnh");
            cy.log($row.text());
            cy.get('td.text-center a').eq(1).invoke('text').then((text) => {
              cy.log('Tạo đơn điều chỉnh với mã đơn ' + text);
            });;
            cy.get('.text-center').eq(1).click();
            cy.get('button').contains('Điều chỉnh đơn hàng').click();
            //update a order
            cy.get('.product-row').each(($row, index) => {
              cy.wrap($row)
                .find('.product-price')
                .then(($price) => {
                  if ($price.text().includes("10,000")) {
                    cy.get('.product-quantityReal-' + index).clear().type(index + 5);

                  } else if ($price.text().includes("20,000")) {
                    cy.get('.product-quantityReal-' + index).clear().type(index + 5);
                  }
                  // else if ($price.text().includes("50,000")) {
                  //   cy.get('.product-quantityReal-' + index).clear().type(index + 5);
                  // }
                  else {
                    cy.log('Sản phẩm k có trong đơn hàng');
                  }
                });
            });
            cy.get('button').contains('Yêu cầu điều chỉnh');
            cy.get('button').contains('Lưu').click();
          });
        }
        else {
          cy.log("Không tìm thấy dữ liệu trong hàng");

        }
      });

   
    
    // cy.get('.text-center').eq(1).click();
    // cy.get('button').contains('Điều chỉnh đơn hàng')
    //   .click();

    //update a order
    // cy.get('.product-row').each(($row, index) => {
    //   cy.wrap($row)
    //     .find('.product-price')
    //     .then(($price) => {
    //       if ($price.text().includes("10,000")) {
    //         cy.get('.product-quantityReal-' + index).clear().type(index + 5);

    //       } else if ($price.text().includes("20,000")) {
    //         cy.get('.product-quantityReal-' + index).clear().type(index + 5);
    //       }
    //       else if ($price.text().includes("50,000")) {
    //         cy.get('.product-quantityReal-' + index).clear().type(index + 5);
    //       }
    //       else {
    //         cy.log('Sản phẩm k có trong đơn hàng');
    //       }
    //     });
    // });
    // cy.get('button').contains('Yêu cầu điều chỉnh');
    // cy.get('button').contains('Lưu').click();






  });

  it.skip('create a audit order with status "Đã điều chỉnh"', () => {

    //filter about status_audit
    cy.get('#statusAudit_chosen').click().type('Đã điều chỉnh{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);

    //detail order
    cy.get('td.text-center a').eq(1).invoke('text').then((text) => {
      cy.log('Tạo đơn điều chỉnh với mã đơn ' + text);
    });;
    cy.get('.text-center').eq(1).click();
    cy.get('button').contains('Điều chỉnh đơn hàng')
      .click();

    //update a order
    cy.get('.product-row').each(($row, index) => {
      cy.wrap($row)
        .find('.product-price')
        .then(($price) => {
          if ($price.text().includes("10,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);

          } else if ($price.text().includes("20,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);
          }
          else if ($price.text().includes("50,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);
          }
          else {
            cy.log('Sản phẩm k có trong đơn hàng');
          }
        });
    });
    cy.get('button').contains('Yêu cầu điều chỉnh');
    cy.get('button').contains('Lưu');






  });
  it.skip('create a audit order with status "Hủy điều chỉnh"', () => {

    //filter about status_audit
    cy.get('#statusAudit_chosen').click();
    cy.get('.active-result[data-option-array-index="6"]').click();

    cy.get('#searchListOrder').click();
    cy.wait(300);

    //detail order
    cy.get('td.text-center a').eq(1).invoke('text').then((text) => {
      cy.log('Tạo đơn điều chỉnh với mã đơn ' + text);
    });;
    cy.get('.text-center').eq(1).click();
    cy.get('button').contains('Điều chỉnh đơn hàng')
      .click();

    //update a order
    cy.get('.product-row').each(($row, index) => {
      cy.wrap($row)
        .find('.product-price')
        .then(($price) => {
          if ($price.text().includes("10,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);

          } else if ($price.text().includes("20,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);
          }
          else if ($price.text().includes("50,000")) {
            cy.get('.product-quantityReal-' + index).clear().type(index + 5);
          }
          else {
            cy.log('Sản phẩm k có trong đơn hàng');
          }
        });
    });
    cy.get('button').contains('Yêu cầu điều chỉnh');
    cy.get('button').contains('Lưu');






  });


})