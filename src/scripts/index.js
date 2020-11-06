import '../styles/index.css';
import {NewsApi} from './modules/NewsApi.js';
import {NewsCard} from './components/NewsCard.js';
import {NewsList} from './components/NewsList.js';
import {Validator} from './utils/Validator.js';
import {LocalStorage} from './modules/LocalStorage.js';

(function (){
  const searchNewsForm = document.forms.search;
  const searchNewsInput = searchNewsForm.elements.search__input;
  const preloader = document.querySelector('.preloader');
  const notFoundSection = document.querySelector('.not-found-section');
  const newsContainer = document.querySelector('.search-results__container');
  const newsListSection = document.querySelector('.search-results');


  const searchInputCheck = new Validator(searchNewsInput);
  const searchingRequest = new NewsApi();
  const demandToLS = new LocalStorage();
  const newsListClass = new NewsList(newsListSection, newsContainer, newsCardFill);

  //создает заполненную карточку, передается классу NewsList, чтобы заполнял карточку перед вставкой
  function newsCardFill (itemData) {
    const newsCard = new NewsCard(itemData);
    return newsCard.create();
  }

  //поиск-запрос с прикрученными изменениями интерфейса и записью в лс
  function searching (input) {
    document.querySelector('.preloader').style.display = 'flex';
    searchNewsInput.value = "";
    searchingRequest.getNews(input)
    .then ( res => {
      demandToLS.saveNewsToLS(res);
      preloader.style.display = 'none';
      console.log(res.totalResults);
      if(res.articles.length = 0){
        notFoundSection.style.display ='flex';
      }
    })
    .then (() => {
      newsListClass.render(Array.from(demandToLS.getNewsFromLS().articles));
    })
    .catch ((err) => {
      console.log(err);
    });
  }

  searchNewsInput.addEventListener('focus', () => {
    searchNewsInput.setCustomValidity('');
    searchNewsInput.reportValidity();
  }
  )

  //по сабмиту отпраляет на валидацию, если ок - поиск-запрос и распределение данных из поиск-запроса
    searchNewsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    notFoundSection.style.display ='none';
    searchInputCheck.checkInputValidity()

    if (searchInputCheck.checkInputValidity()){
      localStorage.setItem('searchedWord', searchNewsInput.value);
      newsContainer.innerHTML = '';
      console.log(newsContainer);
      const input = localStorage.getItem('searchedWord');
      console.log(input);
      searching(input);
    } else {
      console.log('что-то пошло не так');
    }
  });

}());
