const baseUrl = 'http://newsapi.org/v2/everything?';
const newsSort ='sortBy=popularity&';
const pageSize = 'pageSize=100&';
const language='language=ru&'
const apiKey = 'apiKey=114235093df642b68331220569daca62'
const dateDelta = 7;


class NewsApi {
  constructor({ url, sortOrder, key, size, language, delta }) {
    this.url = url;
    this.sortOrder = sortOrder;
    this.key = key;
    this.size = size;
    this.language = language;
    this.delta = delta;
  }

  _createUrl(keyword, from , to) {
    return `${this.url}q=${keyword}&from=${from}&to=${to}&${this.sortOrder}${this.language}${this.size}${this.key}`;
  }

  _getFromDate(currentDate) {
    currentDate.setDate(currentDate.getDate() - this.delta);
    return currentDate;
  }


  getNews(keyword) {
    const dateTo = new Date();
    const dateFrom = this._getFromDate(new Date());

    const stringForDateFrom = dateFrom.toISOString().slice(0, 10);
    const stringForDateTo = dateTo.toISOString().slice(0, 10);

    return fetch(this._createUrl(keyword, stringForDateFrom, stringForDateTo))
      .then((res) => {
        if (res.ok)
          return res.json()
        else
          return Promise.reject(res.status);
      })
  }
}

const currentNewsApi = new NewsApi(
  {
    url: baseUrl,
    sortOrder: newsSort,
    size: pageSize,
    language: language,
    key: apiKey,
    delta: dateDelta
  }
);

export default currentNewsApi;
