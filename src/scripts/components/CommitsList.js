export class CommitsList  {
  constructor (container, commitsCardFill) {
    this.container = container;
    this.commitsCardFill = commitsCardFill;
  }

  addCard (item){
    const card = this.commitsCardFill(item);
    this.container.append(card);
  }

  render(commits) {
    commits.forEach(item => this.addCard(item));
  }
};
