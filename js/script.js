window.addEventListener('DOMContentLoaded', () => {

   function tabFunc(){
      const tabs = document.querySelectorAll('.tabheader__item'), // каждый элемент
    tabscontent = document.querySelectorAll('.tabcontent'), // каждая фоточка
    tabsParent = document.querySelector('.tabheader__items'); // отец элементов

    function hideTabContent(){   // тут я создал метод для скрытия не нужных элементов
       tabscontent.forEach(item =>{
         item.classList.add('hide'); // создал в css 
         item.classList.remove('show','fade'); // создал в css
       });

       tabs.forEach(item =>{
          item.classList.remove('tabheader__item_active');
       });
    }

    function showTabContent(i = 0) {  // тут я создал функцию для отображение выбранного элемента {i = 0 это удобная фишка по умолчанию первый элемент там будет стоять, потом мы можем менять по клику}
        tabscontent[i].classList.add('show','fade');
        tabscontent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

 tabsParent.addEventListener('click', (event)=>{  // event это исходный элемент, на котором произошло событие, в процессе всплытия он неизменен.
      const target = event.target; 
      if(target && target.classList.contains('tabheader__item')){ // определяем на какую кнопку нажали 
             tabs.forEach((item,i)=>{ // тут колбек функция будет перебирать все элементы 
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
             })
      } 
    })
   }
   tabFunc();


   function dateFunc(){
       const deadline = '2021-03-14';

     //это функция будет определять разницу между дедлайном и текушим временим
    function getTimeRemaining(endTime){
       const t = Date.parse(endTime) - Date.parse(new Date())
             days = Math.floor(t/ (1000*60*60*24)),
             hours = Math.floor((t/ (1000*60*60)%24)),
             minutes = Math.floor((t/ 1000/60)%60),
             seconds = Math.floor((t/ 1000)%60);
         
             return {
                  'total': t,
                  'days': days,
                  'hours': hours,
                  'minutes': minutes,
                  'seconds': seconds
             };
    }

    //это функцию будет устанавливать наш таймер на страницу 
    function setClock(selector,endTime){
       const timer = document.querySelector(selector),
       days = timer.querySelector('#days'),
       hours = timer.querySelector('#hours'),
       minutes = timer.querySelector('#minutes'),
       seconds = timer.querySelector('#seconds'),
       timerInterval = setInterval(updateClock,1000);

       updateClock();
       function updateClock(){
          const t = getTimeRemaining(endTime);

          days.innerHTML = t.days;
          hours.innerHTML = t.hours;
          minutes.innerHTML = t.minutes;
          seconds.innerHTML = t.seconds;

          if(t.total <=0){
             clearInterval(timerInterval);
          }
       }
    }

    setClock('.timer',deadline);
   }
   dateFunc();
 
   //modal 

   function modalFunc(){
       const modalTrigger = document.querySelectorAll('[data-modal]'), // находим все data-modal
   modal = document.querySelector('.modal'),  // находим модальный окно
   modalCloseBtn = document.querySelector('[data-close]'); // находим закрыть
   
   function openModal(){
      modal.classList.add('show','fadeOneSecond');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // позволяет не скролить при откытом домадальном окне 
        clearInterval(modalTimerById); // очишает наш таймер 
   }


   modalTrigger.forEach(btn =>{         // этот слушатель события  при нажатии на кнопку показывает модальный окно
     btn.addEventListener('click', openModal); 
   });    

    function closeModal(){       
          modal.classList.add('hide');
          modal.classList.remove('show','fadeOneSecond');
          document.body.style.overflow = '';
    }

   modalCloseBtn.addEventListener('click', closeModal);

   modal.addEventListener('click', (event)=>{   // закрывает окно в другой области
      if(event.target === modal){
      closeModal();
      }
   });

   document.addEventListener('keydown', (e)=>{     // закрывает окно при нажатии ESC
        if(e.code === 'Escape' && modal.classList.contains('show')){
           closeModal();
        }
   });

   const modalTimerById = setTimeout(openModal, 5000);

   function showModalByScroll(){ // в конце страницы показывает окно
       if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
         openModal();
         window.removeEventListener('scroll',showModalByScroll); // улаляет окно
      }
   }

   window.addEventListener('scroll',showModalByScroll);
   }
   modalFunc();

   // Используем классы для карточек

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSecetor, ...classes){
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSecetor);
         this.transfer = 27;
         this.changeToUAH();
      }

      changeToUAH(){
         this.price = this.price * this.transfer;
      }

      render(){
         const element = document.createElement('div');
         this.classes.forEach(className =>{
           element.classList.add(className);
         });
         element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
         `;
          this.parent.append(element);
      
      }
   }

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      '.menu .container',
       'menu__item',
       'big'

   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      14,
      '.menu .container',
       'menu__item',
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      16,
      '.menu .container',
      'menu__item',
   ).render();


   
   
});
