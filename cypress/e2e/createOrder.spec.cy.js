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


//khai bao sp, luong
const flow ="Luồng thẻ vcoin";
const productAmount =[20.000];
const quantity = 1;
// const type ='Mã thẻ';
const type = 'Thẻ cứng';


describe('Create a order', () => {
  beforeEach(()=>
  {
    cy.viewport(1920,1024);
    // cy.visit('http://192.168.100.56:2022/order-itopup/list-order');
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
  it('create a order', () => {
    //click button ADD
    cy.get('button').contains('Thêm mới').click();
    //insert data
    cy.get('#orderName').type('Hangptt test '+ type + " "+ randomNum + randomNum + " ngày " + formattedDate);
    cy.get('#typeProduct_chosen').type(type + '{enter}');
    cy.get('#flowId_chosen').type(`${flow}{enter}`);

    //insert product data
    cy.get('.product-row').each(($row, index) => {
      cy.wrap($row)
        .find('.product-price')
        .then(($price) => {
          if ($price.text().includes(productAmount[0])) 
          {
            cy.get('.quantity-' + index).click().type(quantity);

          } 
          else {
            cy.log('Sản phẩm k có trong đơn hàng');
          }
        });
    });
    // click button 'Gửi duyệt'
    cy.get('button').contains('Gửi duyệt').click();
    
  })
})