import request from 'request';
import process from 'process';

// ========== API ===================================================

// Request emits a "response" event when a response is received.
// The response argument will be an instance of http.IncomingMessage.

/**
 * 獲取所有書籍 get
 * @param {number} _limit 限制回傳資料數量
 */
function getTopBooksArr(_limit) {
  const req = request
    .get(`https://lidemy-book-store.herokuapp.com/books?${_limit === undefined ? '' : `_limit=${_limit}`}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return req;
}
/**
 * 獲取單一書籍 get
 * @param {number} id 書的 id
 */
function getBookById(id) {
  const req = request
    .get(`https://lidemy-book-store.herokuapp.com/books/${id}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return req;
}
/**
 * 刪除書籍 delete
 * @param {number} id 書的 id
 */
function deleteBookById(id) {
  const req = request
    .delete(`https://lidemy-book-store.herokuapp.com/books/${id}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return req;
}
/**
 * 新增書籍 post
 * @param {string} bookName 書名
 */
function createBook(bookName) {
  const req = request
    .post({ url: 'https://lidemy-book-store.herokuapp.com/books', form: { name: bookName } }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return req;
}
/**
 * 更改書籍資訊 patch
 * @param {number} id 書的 id
 */
function updBook(id, bookName) {
  const req = request
    .patch({ url: `https://lidemy-book-store.herokuapp.com/books/${id}`, form: { name: bookName } }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return req;
}

// ========== 印出 ===================================================

// 印出全部書籍
function showAllBooks() {
  getTopBooksArr().on('complete', (data) => {
    const books = JSON.parse(data.body);
    console.log('\n');
    console.log('目前所有書籍:\n');
    for (let i = 0; i < books.length; i += 1) {
      console.log(`${books[i].id} ${books[i].name}`);
    }
  });
}

if (!process.argv[2]) {
  showAllBooks();
}
// node hw2.js list 印出前二十本書的 id 與書名
if (process.argv[2] === 'list') {
  getTopBooksArr(20).on('complete', ({ body }) => {
    const books = JSON.parse(body);
    for (let i = 0; i < 20; i += 1) {
      if (books[i]) {
        console.log(`${books[i].id} ${books[i].name}`);
      }
    }
  });
}
// node hw2.js read 1 輸出 id 為 1 的書籍
if (process.argv[2] === 'read') {
  const id = process.argv[3];

  getBookById(id).on('response', (res) => {
    if (res.statusCode === 404) {
      console.log('404 找不到資料');
      return;
    }

    getBookById(id).on('complete', ({ body }) => {
      const book = JSON.parse(body);
      console.log(`${book.id} ${book.name}`);
    });
  });
}
// node hw2.js delete 1 刪除 id 為 1 的書籍
if (process.argv[2] === 'delete') {
  const id = process.argv[3];

  deleteBookById(id).on('response', (res) => {
    console.log(res.statusCode);
    if (res.statusCode === 404) {
      console.log('404 找不到資料');
      return;
    }
    console.log('刪除成功!');

    showAllBooks();
  });
}
// node hw2.js create "I love coding" 新增一本名為 I love coding 的書
if (process.argv[2] === 'create') {
  const bookName = process.argv[3];

  createBook(bookName).on('response', (res) => {
    console.log(res.statusCode);
    if (res.statusCode === 404) {
      console.log('404 找不到資料');
      return;
    }
    console.log('新增成功!');

    showAllBooks();
  });
}
// node hw2.js update 1 "new name" 更新 id 為 1 的書名為 new name
if (process.argv[2] === 'update') {
  const id = process.argv[3];
  const bookName = process.argv[4];

  updBook(id, bookName).on('response', (res) => {
    console.log(res.statusCode);
    if (res.statusCode === 404) {
      console.log('404 找不到資料');
      return;
    }
    console.log('修改成功!');

    showAllBooks();
  });
}
