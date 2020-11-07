export class NewsList  {
  constructor (section, container, newsCardFill) {
    this.section = section;
    this.container = container;
    this.newsCardFill = newsCardFill;
    this.counter = 0;
  }

  addCard (item){
    const card = this.newsCardFill(item);
    this.container.append(card);
    this.section.style.display = 'flex';
  }

  render(newsArray) {
    const newsToRender = newsArray.slice(this.counter, this.counter + 3);
    console.log (newsToRender);
    newsToRender.forEach(item => this.addCard(item));
    return this.counter = this.counter + 3;
  }
};
