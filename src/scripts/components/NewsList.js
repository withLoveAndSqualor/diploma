export class NewsList  {
  constructor (section, container, newsCardFill) {
    this.section = section;
    this.container = container;
    this.newsCardFill = newsCardFill;
  }

  addCard (item){
    const card = this.newsCardFill(item);
    this.container.append(card);
    this.section.style.display = 'flex';
  }

  render(newsArray) {
    newsArray.forEach(item => this.addCard(item));
  }
};
