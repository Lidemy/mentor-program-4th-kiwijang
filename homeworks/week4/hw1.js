import request from 'request';

// Request emits a "response" event when a response is received.
// The response argument will be an instance of http.IncomingMessage.

/**
 * 獲取所有書籍 get
 * @param {number} _limit 限制回傳資料數量
 */
function getTopBooksArr(_limit) {
  const res = request
    .get(`https://lidemy-book-store.herokuapp.com/books?${_limit === undefined ? '' : `_limit=${_limit}`}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return res;
}

// 印出前十
getTopBooksArr(10).on('complete', ({ body }) => {
  const books = JSON.parse(body);
  for (let i = 0; i < 20; i += 1) {
    if (books[i]) {
      console.log(`${books[i].id} ${books[i].name}`);
    }
  }
});
