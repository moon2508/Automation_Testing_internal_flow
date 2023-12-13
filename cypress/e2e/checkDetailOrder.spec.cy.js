
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
    