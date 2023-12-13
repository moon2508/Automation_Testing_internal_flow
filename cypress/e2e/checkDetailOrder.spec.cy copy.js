
describe('Check data detail order screen', () => {
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

  it('Check data detail screen with status " Yêu cầu điều chỉnh" ', () => {
    //filter about status_audit
    cy.get('#statusAudit_chosen').click().type('Yêu cầu điều chỉnh{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);
    let orderNumber, total_value, order_status;

    //GET data in list screen
    cy.get('td.text-center a').eq(0).invoke('text').then((text) => {
      orderNumber = text.trim();
      cy.log('Order Number:' + orderNumber);
    });
    cy.get('td.text-right').eq(0).invoke('text').then((text) => {
      total_value = text.trim();
      cy.log('Total value in list screen:' + total_value);
    });
    cy.get('td.text-center').eq(4).invoke('text').then((text) => {
      order_status = text.trim();
      cy.log('Order Audit Status:' + order_status);
    });

    //GET data in detail screen in "Tổng hợp" TAB
    cy.get('td.text-center').eq(0).click();
    cy.wait(500);

    let orderCode, audit_status, order_code_detail, product, product_price, quantity, unit, amountBefore, commission, amountAfter, total_quantity, total_amountBefore, total_amountAfter;

    cy.get('.col-md-3.px-4.pdr-menu b').eq(0).invoke('text').then((text) => {
      orderCode = text.trim();
      cy.log('Mã đơn hàng :' + orderCode);
    });

    cy.get('.col-md-3.px-4.pdr-menu').eq(1).invoke('text').then((text) => {
      audit_status = text.trim();
      cy.log('Trạng thái điều chỉnh đơn hàng :' + audit_status);
    });

    cy.get('.col-md-12.mt-2.px-4 b').eq(0).invoke('text').then((text) => {
      order_code_detail = text.trim();
      cy.log('Đơn hàng chi tiết :' + order_code_detail);
    });
    cy.get('table.table-bordered').eq(0).each(($table) => {
      // Data Tổng hợp
      cy.wrap($table)
        .find('tbody tr')
        .then(($rows) => {
          const rowsCount = $rows.length - 1; // Exclude the last row

          $rows.each((index, $row) => {
            if (index < rowsCount) {

              cy.wrap($row).find('td').eq(1).invoke('text').as('product').then((text) => {
                product = text.trim();
                cy.log('Product:' + product);
              });
              cy.wrap($row).find('td').eq(2).invoke('text').as('product_price').then((text) => {
                product_price = text.trim();
                cy.log('Product_price:' + product_price);
              });
              cy.wrap($row).find('td').eq(3).invoke('text').as('quantity').then((text) => {
                quantity = text.trim();
                cy.log('Product_quantity:' + quantity);
              });
              cy.wrap($row).find('td').eq(4).invoke('text').as('unit').then((text) => {
                unit = text.trim();
                cy.log('Product_unit:' + unit);
              });
              cy.wrap($row).find('td').eq(5).invoke('text').then((text) => {
                // quantity = text.trim();
                if (text.trim() == product_price) {
                  cy.log('Đơn giá bằng với mệnh giá');

                }
              });

              cy.wrap($row).find('td').eq(6).invoke('text').as('amountBefore').then((text) => {
                amountBefore = text.trim();
                cy.log('Amount Before Commission:' + amountBefore);
              });
              cy.wrap($row).find('td').eq(7).invoke('text').then((text) => {
                commission = text.trim();
                cy.log('Commission:' + commission);
              });
              cy.wrap($row).find('td').eq(8).invoke('text').as('amountAfter').then((text) => {
                amountAfter = text.trim();
                cy.log('Amount After Commission:' + amountAfter);
              });
              // cy.log('Sản phẩm' + product + " " + product_price, "Số lượng " + quantity, "Thành tiền " + amountBefore, "Chiết khấu " + commission, "Thành tiền sau chiết khấu " + amountAfter)

              //compare data with audit data
              cy.get('button').contains('Chi tiết điều chỉnh').click();
              cy.get('table.table-bordered').eq(0).each(($table) => {

                cy.wrap($table)
                  .find('tbody tr')
                  .then(($rows) => {
                    const rowsCount = $rows.length - 1; // Exclude the last row

                    $rows.each((index, $row) => {
                      if (index < rowsCount) {
                        cy.wrap($row).find('td').eq(1).invoke('text').should('eq', product);
                        cy.wrap($row).find('td').eq(2).invoke('text').should('eq', product_price);
                        cy.wrap($row).find('td').eq(3).invoke('text').as('quantity_origion').then((text) =>{
                          let quantity_orgion =text.trim();
                          cy.log('Số lượng gốc: '+ quantity_orgion)
                        });
                        cy.wrap($row).find('td').eq(4).invoke('text').should('eq', unit);
                        cy.wrap($row).find('td').eq(5).invoke('text').should('eq', product_price);

                        cy.wrap($row).find('td').eq(6).invoke('text').as('amountBefore_origion').then((text) =>{
                          let amountBefore_origion =text.trim();
                          cy.log('Thành tiền nguyên mệnh giá gốc: '+ amountBefore_origion)
                        });
                        cy.wrap($row).find('td').eq(7).invoke('text').should('eq', commission);
                        cy.wrap($row).find('td').eq(8).invoke('text').as('amountAfter_origion').then((text) =>{
                          let amountAfter_origion =text.trim();
                          cy.log('Thành tiền sau chiết khấu gốc: '+ amountAfter_origion);
                        });
                        //Check dữ liệu điều chỉnh
                        cy.get('table.table-bordered').eq(2).each(($table) => {

                          cy.wrap($table)
                            .find('tbody tr')
                            .then(($rows) => {
                              const rowsCount = $rows.length - 1; // Exclude the last row
          
                              $rows.each((index, $row) => {
                                if (index < rowsCount) {
                                  cy.wrap($row).find('td').eq(1).invoke('text').should('eq', product);
                                  cy.wrap($row).find('td').eq(2).invoke('text').should('eq', product_price);
                                  cy.wrap($row).find('td').eq(3).invoke('text').as('quantity_au').then((text) =>{
                                    let quantity_orgion =text.trim();
                                    cy.log('Số lượng gốc: '+ quantity_orgion)
                                  });
                                  cy.wrap($row).find('td').eq(4).invoke('text').should('eq', unit);
                                  cy.wrap($row).find('td').eq(5).invoke('text').should('eq', product_price);
          
                                  cy.wrap($row).find('td').eq(6).invoke('text').as('amountBefore_origion').then((text) =>{
                                    let amountBefore_origion =text.trim();
                                    cy.log('Thành tiền nguyên mệnh giá gốc: '+ amountBefore_origion)
                                  });
                                  cy.wrap($row).find('td').eq(7).invoke('text').should('eq', commission);
                                  cy.wrap($row).find('td').eq(8).invoke('text').as('amountAfter_origion').then((text) =>{
                                    let amountAfter_origion =text.trim();
                                    cy.log('Thành tiền sau chiết khấu gốc: '+ amountAfter_origion);
                                  });









                        
                      } else {
                        //data origion
                        cy.wrap($row).find('td').eq(1).invoke('text').as('total_quantity').then((text) => {
                          total_quantity = text.trim();
                          cy.log('Total Product:' + total_quantity);

                        });
                        cy.wrap($row).find('td').eq(4).invoke('text').as('total_amountBefore').then((text) => {
                          total_amountBefore = text.trim();
                          cy.log('Total Amount before commission:' + total_amountBefore);

                        });
                        cy.wrap($row).find('td').eq(6).invoke('text').as('total_amountAfter').then((text) => {
                          total_amountAfter = text.trim();
                          cy.log('Total Amount after commission:' + total_amountAfter);

                        });
                      }

                    


                  });
              });

              //GET data in detail screen in "Chi tiết điều chỉnh" TAB
              cy.get('button').contains('Chi tiết điều chỉnh').click();
              // Check data origion
              // let order_code_detail_origion, product_origion, product_price_origion,quantity_origion;
              cy.get('.col-md-12.mt-2.px-4 b').eq(0).invoke('text').then((text) => {
                let order_code_detail_origion = text.trim();
                cy.log('Mã đơn hàng chi tiết ban đầu:' + order_code_detail_origion);

              });
              // compare data in Tonghop TAB and data in chitiet TAB
              //sum origion data and audit data
              cy.get('table.table-bordered').eq(0).each(($table) => {

                cy.wrap($table)
                  .find('tbody tr')
                  .then(($rows) => {
                    const rowsCount = $rows.length - 1; // Exclude the last row

                    $rows.each((index, $row) => {
                      if (index < rowsCount) {
                        cy.wrap($row).find('td').eq(1).invoke('text').should('eq', product);


                        cy.wrap($row).find('td').eq(2).invoke('text').should('eq',product_price)
                        cy.wrap($row).find('td').eq(3).invoke('text').then((text) => {
                          let quantity_origion = text.trim();
                          if (quantity_origion == quantity) {
                            cy.log('Trùng khớp số lượng sản phẩm - ' + quantity);
                          }
                        });
                        cy.wrap($row).find('td').eq(4).invoke('text').then((text) => {
                          let unit_origion = text.trim();
                          if (unit_origion == unit) {
                            cy.log('Trùng khớp đơn vị tính của sản phẩm - ' + unit);
                          }
                        });
                        cy.wrap($row).find('td').eq(5).invoke('text').then((text) => {
                          // quantity = text.trim();
                          if (text.trim() == product_price) {
                            cy.log('Đơn giá bằng với mệnh giá');

                          }
                        });

                        cy.wrap($row).find('td').eq(6).invoke('text').then((text) => {
                          let amountBefore_origion = text.trim();
                          if (amountBefore_origion == amountBefore) {
                            cy.log('Trùng khớp thành tiền của sản phẩm - ' + amountBefore);
                          }
                        });
                        cy.wrap($row).find('td').eq(7).invoke('text').then((text) => {
                          let commission_origion = text.trim();
                          if (commission_origion == commission) {
                            cy.log('Trùng khớp chiết khấu của sản phẩm -' + commission);
                          }
                        });
                        cy.wrap($row).find('td').eq(8).invoke('text').then((text) => {
                          let amountAfter_origion = text.trim();
                          if (amountAfter_origion == amountAfter) {
                            cy.log('Trùng khớp thành tiền sau chiết khấu sản phẩm - ' + amountAfter);
                          }
                        });
                        // cy.log('Sản phẩm' + product + " " + product_price, "Số lượng " + quantity, "Thành tiền " + amountBefore, "Chiết khấu " + commission, "Thành tiền sau chiết khấu " + amountAfter)


                      } else {
                        cy.wrap($row).find('td').eq(1).invoke('text').then((text) => {
                          let total_quantity_origion = text.trim();
                          cy.log(total_quantity_origion);
                          if (total_quantity_origion == total_quantity) {
                            cy.log('Trùng khớp Tổng số lượng của các sản phẩm - ' + total_quantity);
                          }

                        });
                        cy.wrap($row).find('td').eq(4).invoke('text').then((text) => {
                          let total_amountBefore_origion = text.trim();
                          cy.log(total_amountBefore_origion);
                          if (total_amountBefore_origion == total_amountBefore) {
                            cy.log('Trùng khớp tổng thành tiền của các sản phẩm - ' + total_amountBefore);
                          }
                        });
                        cy.wrap($row).find('td').eq(6).invoke('text').then((text) => {
                          let total_amountAfter_origion = text.trim();
                          cy.log(total_amountAfter_origion);
                          if (total_amountAfter_origion == total_amountAfter) {
                            cy.log('Trùng khớp tổng thành tiền sau chiết khấu của các sản phẩm -' + total_amountAfter);
                          }
                        });
                      }

                    })

                  });
              })
            })
          }
        })
      })
    })
  })
})















            


