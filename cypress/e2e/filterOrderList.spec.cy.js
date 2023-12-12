describe('Filter order with conditions', () => {
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
    it.skip('Filter order with order code', () => {

        //filter about order code
        cy.get('#keySearch').click().type('DH111220238083{enter}');
        cy.get('#searchListOrder').click();
        cy.wait(300);
        cy.get('.text-center').eq(1).should('be.text', 'DH111220238083');
    });
    it.skip('Filter order with order name', () => {

        //filter about order code
        cy.get('#keySearch').click().type('đơn hàng test{enter}');
        cy.get('#searchListOrder').click();
        cy.wait(300);
        cy.get('td.text-left').eq(1).should('be.text', 'đơn hàng test');

    });
    it.skip('Filter order with flow name', () => {

        //filter about order code
        cy.get('#flowId_chosen').click().type('luồng thẻ cào 5/12{enter}');
        cy.get('#searchListOrder').click();
        cy.wait(400);

        cy.get('td.text-left')
            .each(($column) => {
                const text = $column.text();
                if (text.includes("luồng thẻ cào 5/12")) {
                    cy.wrap($column).parent('tr').then(($row) => {
                        cy.log("Tìm kiếm đúng tên luồng");
                        cy.log($row.text());
                    });
                }
                else {
                    cy.log("Không tìm thấy dữ liệu trong hàng:");

                }
            });


    });
    it.skip('Filter order with Status', () => {

        
       //filter about status
    cy.get('#status_chosen').click().type('Chờ duyệt{enter}');
    cy.get('#searchListOrder').click();
    cy.wait(300);;

        cy.get('td.text-center')
            .each(($column) => {
                const text = $column.text();
                if (text.includes("Chờ duyệt")) {
                    cy.wrap($column).parent('tr').then(($row) => {
                        cy.log("Tìm kiếm đúng trạng thái");
                        cy.log($row.text());
                    });
                }
                else {
                    cy.log("Không tìm thấy dữ liệu trong hàng");

                }
            });


    });
    it.skip('Filter order with status audit', () => {

    //filter about status_audit
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
                    });
                }
                else {
                    cy.log("Không tìm thấy dữ liệu trong hàng");

                }
            });


    });
    it.skip('Filter order with create date', () => {

        //filter about order code
        cy.get('#from').clear().type('2023-10-15');
        cy.get('#to').clear().type('2023-12-20');
        cy.get('#searchListOrder').click();
        cy.wait(400);

        cy.get('td.text-center')
            .each(($time) => {
                const create_date_text = $time.text();
                const create_date = new Date(create_date_text);
                const startTime = new Date('2023-10-15T00:00:00'); 
                const endTime = new Date('2023-12-20T23:59:59'); 

                if (create_date >= startTime && create_date <= endTime) {
                    cy.wrap($time).parent('tr').then(($row) => {
                      cy.log("Đúng khoảng thời gian:");
                      cy.log($row.text());
                    });
                  } else {
                    cy.log("Nằm ngoài khoảng thời gian");
                
                  }
                });


    });

    it('Filter order with approve date', () => {

         //filter about order code
         cy.get('#fromApprove').clear().type('2023-11-25');
         cy.get('#toApprove').clear().type('2023-12-12');
         cy.get('#searchListOrder').click();
         cy.wait(400);
 
         cy.get('td.text-center')
             .each(($time) => {
                 const create_date_text = $time.text();
                 const create_date = new Date(create_date_text);
                 const startTime = new Date('2023-10-15T00:00:00'); 
                 const endTime = new Date('2023-12-20T23:59:59'); 
 
                 if (create_date >= startTime && create_date <= endTime) {
                     cy.wrap($time).parent('tr').then(($row) => {
                       cy.log("Đúng khoảng thời gian:");
                       cy.log($row.text());
                     });
                   } else {
                     cy.log("Nằm ngoài khoảng thời gian");
                 
                   }
                 });
    });
 
 
})

