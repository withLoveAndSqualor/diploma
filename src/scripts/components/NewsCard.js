export class NewsCard {
  static markup = `
  <a href="" class="link" target="_blank">
    <div class="search-results__item">
      <img src="" alt="Фото новости" class="search-results__photo">
      <div class="search-results__text-container">
        <p class="search-results__data"></p>
        <h3 class="search-results__title"></h3>
        <p class="search-results__text"></p>
        <p class="search-results__origin"></p>
      </div>
    </div>
  </a>`

  constructor (data) {
    this.data = data;
  }

  create () {
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', NewsCard.markup);
    element.querySelector('.search-results__photo').src = `${this.data.urlToImage}`;
    element.querySelector('.link').href = `${this.data.url}`;
    element.querySelector('.search-results__data').textContent = this.data.publishedAt;
    element.querySelector('.search-results__title').textContent = this.data.title;
    element.querySelector('.search-results__text').textContent = this.data.description;
    element.querySelector('.search-results__origin').textContent = this.data.source.name;


    this.card = element.firstElementChild;
    return this.card;
  }

}
