/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };
  class Product {
    constructor(id, data){
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisProduct.initAcordion();
      console.log('new Product:', thisProduct);
    }
    renderInMenu(){
      const thisProduct = this;

      /* generate html based on template */
      const generateHTML = templates.menuProduct(thisProduct.data);
      /* create element using utils.createElementFromHTML */
      thisProduct.element = utils.createDOMFromHTML(generateHTML);
      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);
      /* add element to menu */
      menuContainer.appendChild(thisProduct.element);
    }
    initAcordion(){
      const thisProduct = this;
      /* find the clickable trigger (the element that should react to clicking) */
      const clickableTrigger = document.querySelector('.product__header');
      /* START: click event listener to trigger */
      clickableTrigger.addEventListener('click', function(){
      /* IN PROGRESS NO IDEA? */    
      
        const triggerClickHandler = function (event){
        /* prevent default action for event */
          event.preventDefault();
          const clickedElement = this;
          console.log('Element kliknięty! Zawartość event:', event);
          /* toggle active class on element of thisProduct */
          console.log('clickedElement:', clickedElement);
          thisProduct.element.classList.add('.product__header');       
          /* find all active products */
          const activeProducts = document.querySelectorAll('active');
          /* START LOOP: for each active product */
          for (let activeProduct of activeProducts){
            /* START: if the active product isn't the element of thisProduct */
            if (activeProduct != thisProduct.element){
              /* remove class active for the active product */
              thisProduct.element.classList.remove('.product__header');
            /* END: if the active product isn't the element of thisProduct */
            } 
            /* END LOOP: for each active product */
          }
          /* END: click event listener to trigger */
        };
        triggerClickHandler();
      });      
    }   
  }
  const app = {
    initMenu: function(){
      const thisApp = this;
      console.log('thisApp.data', thisApp.data);
      for(let productData in thisApp.data.products){
        new Product(productData, thisApp.data.products[productData]);
      }
    },
    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      
      thisApp.initData();  
      thisApp.initMenu();
    },
    initData: function(){
      const thisApp = this;
  
      thisApp.data = dataSource;
    }  
  };
  
  app.init();
}
