window.addEventListener('DOMContentLoaded', () => {

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


});
