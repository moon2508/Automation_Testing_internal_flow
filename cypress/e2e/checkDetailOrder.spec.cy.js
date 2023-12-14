
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
      cy.log(orderCode);
    });

    cy.get('.col-md-3.px-4.pdr-menu').eq(1).invoke('text').then((text) => {
      audit_status = text.trim();
      cy.log(audit_status);
    });

    cy.get('.col-md-12.mt-2.px-4 b').eq(0).invoke('text').then((text) => {
      order_code_detail = text.trim();
      cy.log('Đơn hàng chi tiết :' + order_code_detail);
    });
    // Lưu trữ dữ liệu từ bảng thông tin
    const product_row = [];

    // Lấy số hàng của bảng
    cy.get('table.table-bordered').eq(0).find('th').then(($rows) => {
      const rowCount = $rows.length;
      cy.log(rowCount);

      // Lặp qua từng hàng trong bảng
      for (let i = 0; i < rowCount - 1; i++) {
        const rowData = {};

        // Lấy các ô trong hàng hiện tại
        cy.get(`table tbody tr:eq(${i}) td`).invoke('text').as('product_row_' + i).then((text) => {
          let rowData = text.trim();
            cy.log( product_row);
            cy.log( text);
          });
        }
        const inputString = "3Viettel 50.000 50,0002Thẻ50,000100,000397,000";

        // Define a regular expression pattern to match the desired data
        const pattern = /(\d+)([A-Za-z\s]+)(\d+\.\d+)\s(\d+,\d+)/g;
        
        // Initialize an array to store the extracted data
        const extractedData = [];
        
        // Execute the regular expression pattern on the input string
        let match;
        while ((match = pattern.exec(inputString)) !== null) {
          const quantity = match[1];
          const name = match[2].trim();
          const price = parseFloat(match[3].replace('.', '').replace(',', '.'));
          const total = parseFloat(match[4].replace(',', ''));
        
          // Create an object with the extracted data
          const rowData = {
            quantity,
            name,
            price,
            total,
          };
        
          // Push the rowData object into the extractedData array
          extractedData.push(rowData);
        }
        
        // Display the extracted data
        cy.log(extractedData);
          
         

})
})
})


  // .then(() => {
  //   // Sử dụng dữ liệu từ bảng thông tin
  //   // Ví dụ: Hiển thị dữ liệu trong console
  //   console.log('Table Data:', tableData);

  // Thực hiện các thao tác khác với dữ liệu
  // Ví dụ: Tìm kiếm, sắp xếp, phân tích, v.v.
  // });

