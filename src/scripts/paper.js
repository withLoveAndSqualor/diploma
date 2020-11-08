import '../styles/paper.css';
import { SearchedWordTitles } from './components/SearchedWordTitles';
import { LocalStorage } from './modules/LocalStorage.js';
import { AnalyticsScales } from './components/AnalyticsScales.js';
import { OneDayRow } from './components/OneDayRow.js';

const demandToLS = new LocalStorage();

const searchedWordTitle = document.querySelector('.searched-word__title');
const amountSpan = document.querySelector('.searced-word__amount');
const mentioningsSpan = document.querySelector('.searced-word__mentionings');
const word = demandToLS.getFromLS('searchedWord');
const monthSpan = document.querySelector('.analytics__month');
const daysContainer = document.querySelector('.analytics__days-container');

const newsArray = Array.from(demandToLS.getFromLS('news').articles);
const searchedWordTitles = new SearchedWordTitles(searchedWordTitle, amountSpan, mentioningsSpan, monthSpan);
const daysScales = new AnalyticsScales(daysContainer, dayDateRender);

function dayDateRender(dayData) {
  const oneDayRow = new OneDayRow(dayData);
  return oneDayRow.create();
};

searchedWordTitles.renderData(word, newsArray);

function groupInDays(newsArray) {
  //делаем промежуточный объект с датами-ключами
  const temporaryObject = newsArray.reduce(function (sum, elem) {
    //убираем время из даты
    const date = elem.publishedAt.split('T')[0];

    //если ключа-даты еще нет в объекте - заводим массив
    if (!sum[date]) {
      sum[date] = [];
    }

    //если есть - кладем в массив
    sum[date].push(elem);
    return sum;
  }, {});

  const keysArray = Object.getOwnPropertyNames(temporaryObject);

  //превращаем массив ключей в массив значений
  return keysArray.map(key => temporaryObject[key]);
}

const groupedInDays = groupInDays(newsArray);
console.log(groupedInDays);

daysScales.render(groupedInDays);






