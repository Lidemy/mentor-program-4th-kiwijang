/* eslint-disable no-use-before-define */
import request from 'request';
import process from 'process';

const args = process.argv;

// ========== API ===================================================
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
/**
 * 獲取單一書籍 get
 * @param {number} id 書的 id
 */
function getBookById(id) {
  const res = request
    .get(`https://lidemy-book-store.herokuapp.com/books/${id}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return res;
}
/**
 * 刪除書籍 delete
 * @param {number} id 書的 id
 */
function deleteBookById(id) {
  const res = request
    .delete(`https://lidemy-book-store.herokuapp.com/books/${id}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return res;
}
/**
 * 新增書籍 post
 * @param {string} bookName 書名
 */
function createBook(bookName) {
  const res = request
    .post({ url: 'https://lidemy-book-store.herokuapp.com/books', form: { name: bookName } }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return res;
}
/**
 * 更改書籍資訊 patch
 * @param {number} id 書的 id
 */
function updBook(id, bookName) {
  const res = request
    .patch({ url: `https://lidemy-book-store.herokuapp.com/books/${id}`, form: { name: bookName } }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return res;
}

// ========== 印出 ===================================================
// 印出全部書籍
function showAllBooks() {
  getTopBooksArr().on('complete', (data) => {
    try {
      const books = JSON.parse(data.body);
      console.log('\n');
      console.log('目前所有書籍:\n');
      for (let i = 0; i < books.length; i += 1) {
        console.log(`${books[i].id} ${books[i].name}`);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

const action = args[2];
const params = args[3];

switch (action) {
  case undefined:
    showAllBooks();
    break;
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(params);
    break;
  case 'delete':
    deleteBook(params);
    break;
  case 'create':
    newBook(params);
    break;
  case 'update':
    updateBook(params, args[4]);
    break;
  default:
    console.log('Available commands: list, read, delete, create and update');
}

// node hw2.js list 印出前二十本書的 id 與書名
function listBooks() {
  getTopBooksArr(20).on('complete', ({ body }) => {
    try {
      const books = JSON.parse(body);
      for (let i = 0; i < 20; i += 1) {
        if (books[i]) {
          console.log(`${books[i].id} ${books[i].name}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}
// node hw2.js read 1 輸出 id 為 1 的書籍
function readBook(id) {
  getBookById(id).on('response', (res) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.statusCode === 404) {
        console.log('404 找不到資料');
        return;
      }
      console.log('發生錯誤 ', res.statusCode, res.statusMessage);
      return;
    }
    getBookById(id).on('complete', ({ body }) => {
      try {
        const book = JSON.parse(body);
        console.log(`${book.id} ${book.name}`);
      } catch (error) {
        console.log(error);
      }
    });
  });
}
// node hw2.js delete 1 刪除 id 為 1 的書籍
function deleteBook(id) {
  deleteBookById(id).on('response', (res) => {
    console.log(res.statusCode);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.statusCode === 404) {
        console.log('404 找不到資料');
        return;
      }
      console.log('發生錯誤 ', res.statusCode, res.statusMessage);
      return;
    }
    console.log('刪除成功!');

    showAllBooks();
  });
}
// node hw2.js create "I love coding" 新增一本名為 I love coding 的書
function newBook(bookName) {
  createBook(bookName).on('response', (res) => {
    console.log(res.statusCode);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.statusCode === 404) {
        console.log('404 找不到資料');
        return;
      }
      console.log('發生錯誤 ', res.statusCode, res.statusMessage);
      return;
    }
    console.log('新增成功!');

    showAllBooks();
  });
}
// node hw2.js update 1 "new name" 更新 id 為 1 的書名為 new name
function updateBook(id, bookName) {
  updBook(id, bookName).on('response', (res) => {
    console.log(res.statusCode);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.statusCode === 404) {
        console.log('404 找不到資料');
        return;
      }
      console.log('發生錯誤 ', res.statusCode, res.statusMessage);
      return;
    }
    console.log('修改成功!');

    showAllBooks();
  });
}
