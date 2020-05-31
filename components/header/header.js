import { createMarkup, createNewsMarkup } from '../pages/page.js';
import { models, cars, news, } from '../../data.js';
import { addToCart } from '../cart/cart.js'
import { openOrder } from '../modal/cartModal.js';
import { openItemModal } from '../modal/itemModal.js';

const header = () => {
    const navigationList = document.querySelector('.navigationList'); //ul
    const userProfile = document.querySelector('.userProfile');//div
    const listItems = document.querySelector('.listItems'); //ul
    const cartForModal = document.querySelector('.cartForModal');

    const userName = document.querySelector('.userName'); //span

    listItems.innerHTML = createMarkup(models);


    const setActiveLink = (event) => {
        if (event.target.nodeName === "A") {
            const currentActiveLink = navigationList.querySelector('.activeNavLink');
            currentActiveLink && currentActiveLink.classList.remove('activeNavLink');
            event.target.classList.add('activeNavLink');
            // pageName.textContent = event.target.dataset.page;
            listItems.innerHTML = createMarkup(models);
        }
        switch (event.target.dataset.page) {
            case 'models':
                listItems.innerHTML = createMarkup(models);
                break;
            case 'cars':
                listItems.innerHTML = createMarkup(cars);
                break;
            case 'news':
                listItems.innerHTML = createNewsMarkup(news);
                break;

            default:
                break;
        }
    }

    const setActiveUser = () => {
        userProfile.classList.toggle('activeProfile');
        (userName.textContent !== 'Artem') ? userName.textContent = 'Artem' : userName.textContent = 'Guest';
    }



    const addProduct = (event) => {
        const category = event.target.dataset.category;
        const id = event.target.dataset.id;
        if (category) {
            if (category === 'models') {
                for (const item of models) {
                    if (item.id === id) {
                        addToCart(item);
                    }
                }
            }
            if (category === 'cars') {
                for (const item of cars) {
                    if (item.id === id) {
                        addToCart(item);
                    }
                }
            }
        } else {
            console.log(event.target)
            const element = event.target.closest('[data-licategory]');
            console.log(element)
            const liCategory = element.dataset.licategory;
            const liid = element.dataset.liid;



            if (liCategory === 'models') {
                for (const item of models) {
                    if (item.id === liid) {
                        openItemModal(item)
                    }
                }
            }
            if (liCategory === 'cars') {
                for (const item of cars) {
                    if (item.id === liid) {
                        openItemModal(item)
                    }
                }
            }

        }
    }
    navigationList.addEventListener('click', setActiveLink); //ul
    userProfile.addEventListener('click', setActiveUser); //div
    cartForModal.addEventListener('click', openOrder);
    listItems.addEventListener('click', addProduct);

}


export default header;