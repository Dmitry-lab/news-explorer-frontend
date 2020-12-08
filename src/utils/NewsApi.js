const baseUrl = 'https://newsapi.org/v2/everything?';
// const baseUrl = 'https://nomoreparties.co/news/v2/everything?';
const sortOrder ='sortBy=popularity&';
const pageSize = 'pageSize=100&';
const language='language=ru&'
const apiKey = 'apiKey=114235093df642b68331220569daca62'
const dateDelta = 7;

class NewsApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._sortOrder = options.sortOrder;
    this._key = options.apiKey;
    this._size = options.pageSize;
    this._language = options.language;
    this._delta = options.dateDelta;
  }

  _createUrl(keyword, from , to) {
    return `${this._url}q=${keyword}&from=${from}&to=${to}&${this._sortOrder}${this._language}${this._size}${this._key}`;
  }

  // функция для получения даты, с которой необходимо начать поиск
  _getFromDate(currentDate) {
    currentDate.setDate(currentDate.getDate() - this._delta);
    return currentDate;
  }

  // функция для приведения даты к формату строки запроса
  _dateToReqString(date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  }


  getNews(keyword) {
    const dateTo = new Date();
    const dateFrom = this._getFromDate(new Date());

    const stringForDateFrom = this._dateToReqString(dateFrom);
    const stringForDateTo = this._dateToReqString(dateTo);

    return fetch(this._createUrl(keyword, stringForDateFrom, stringForDateTo))
      .then((res) => {
        if (res.ok)
          return res.json()
        else
          return Promise.reject(res.status);
      })
  }
}

const currentNewsApi = new NewsApi({ baseUrl, sortOrder, pageSize, language, apiKey, dateDelta });

export default currentNewsApi;
