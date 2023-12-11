function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNum = getRandomInt(1, 100);
// get date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
const day = currentDate.getDate();

// Format the date as per your requirements
const formattedDate = `${day}/${month}/${year}`;

describe('Create a order', () => {
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
  it.skip('create a order', () => {
    //click list order
    
    cy.get('.app-sidebar__heading').contains('Mua/Bán hàng hoá Viễn thông');
    cy.get('li:contains("Quản lý Đơn hàng")').click()
    .children('ul.mm-collapse')
    .invoke('css', 'display', 'block')
    .find('a:contains("Danh sách")')
    .click();
  
    //click button ADD
    cy.get('button').contains('Thêm mới').click();
    //insert data
    cy.get('#orderName').type('Hangptt test đơn hàng' + " "+ randomNum + randomNum + " ngày " + formattedDate);
    cy.get('#flowId_chosen').type('luồng thẻ cào 5/12{enter}');
    //insert product data
    cy.get('.product-row').each(($row, index) => {
      cy.wrap($row)
        .find('.product-price')
        .then(($price) => {
          if ($price.text().includes("10,000")) 
          {
            cy.get('.quantity-' + index).type('2');

          } else if ($price.text().includes("20,000"))
          {
            cy.get('.quantity-' + index).type('2');
          }
          else if ($price.text().includes("50,000"))
          {
            cy.get('.quantity-' + index).type('2');
          }
          else 
          {
            cy.log('Sản phẩm k có trong đơn hàng');
          }
        });
    });
    // click button 'Gửi duyệt'
    cy.get('button').contains('Gửi duyệt').click();


   

    
  })
})