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
  const moreResultsButton = document.querySelector('.search-results__button');
  const errorSection = document.querySelector('.error-section');
  const searchButton = document.querySelector('.search-field__button');


  const searchInputCheck = new Validator(searchNewsInput);
  const searchingRequest = new NewsApi(errorSection);
  const demandToLS = new LocalStorage();
  const newsListClass = new NewsList(newsListSection, newsContainer, newsCardFill);

  //создает заполненную карточку, передается классу NewsList, чтобы заполнял карточку перед вставкой
  function newsCardFill (itemData) {
    const newsCard = new NewsCard(itemData);
    return newsCard.create();
  }

  //поиск-запрос с прикрученными изменениями интерфейса и записью в лс
  function searching (input) {
    //включаем прелоадер, очищаем инпут, блокируем кнопку и инпут, убираем старые результаты
    document.querySelector('.preloader').style.display = 'flex';
    newsListSection.style.display = 'none';
    //searchNewsInput.value = "";
    searchNewsInput.setAttribute("disabled", "true");
    searchButton.setAttribute("disabled", "true");
    //отправляем запрос
    searchingRequest.getNews(input)
    .then ( res => {
      if(res.articles.length === '0'){
        notFoundSection.style.display ='flex';
        preloader.style.display = 'none';
        searchNewsInput.removeAttribute("disabled");
        searchButton.removeAttribute("disabled");
      } else {
      demandToLS.saveNewsToLS(res);
      preloader.style.display = 'none';
      }
    })
    .then (() => {
      newsListClass.render(Array.from(demandToLS.getNewsFromLS().articles));
      searchNewsInput.removeAttribute("disabled");
      searchButton.removeAttribute("disabled");
      searchNewsInput.setCustomValidity('');
      searchNewsInput.reportValidity();
    })
    .catch ((err) => {
      console.log(err);
      errorSection.style.display = 'flex';
      preloader.style.display = 'none';
      searchButton.removeAttribute("disabled");
    });
  }


  //по сабмиту отпраляет на валидацию, если ок - поиск-запрос и распределение данных из поиск-запроса
    searchNewsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    notFoundSection.style.display ='none';
    errorSection.style.display = 'none';
    searchInputCheck.checkInputValidity()

    if (searchInputCheck.checkInputValidity()){
      localStorage.setItem('searchedWord', searchNewsInput.value);
      newsContainer.innerHTML = '';
      const input = localStorage.getItem('searchedWord');
      searching(input);
    } else {
      console.log('что-то пошло не так');
    }
  });

  //слушатель на кнопку добавления новостей
  moreResultsButton.addEventListener('click', () => newsListClass.render(Array.from(demandToLS.getNewsFromLS().articles)))

}());
