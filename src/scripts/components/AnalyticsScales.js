export class AnalyticsScales  {
  constructor (container, dayDateRender) {
    this.container = container;
    this.dayDateRender = dayDateRender;
  }

  addDay (item){
    const day = this.dayDateRender(item);
    this.container.append(day);
  }

  render(array) {
    array.forEach(item => this.addDay(item));
  }
};
