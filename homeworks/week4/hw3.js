import request from 'request';
import process from 'process';

/**
 * 獲取所有國家
 * @param {string} name 搜尋國家字串
 */
function searchCountry(name) {
  const res = request
    .get(`https://restcountries.eu/rest/v2/name/${name}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return res;
}

// 印出相關國家
const inputName = process.argv[2];

searchCountry(inputName).on('response', (res) => {
  if (!inputName) {
    console.log('請輸入國家名稱');
    return;
  }
  if (!(res.statusCode >= 200 && res.statusCode < 300)) {
    if (res.statusCode === 404) {
      console.log('404 找不到資料');
      return;
    }
    console.log('發生錯誤 ', res.statusCode, res.statusMessage);
    return;
  }

  searchCountry(inputName).on('complete', ({ body }) => {
    try {
      const data = JSON.parse(body);
      for (let i = 0; i < data.length; i += 1) {
        console.log(`
        ============
        國家：${data[i].name}
        首都：${data[i].capital}
        貨幣：${data[i].currencies.map((x) => x.code).join(', ')}
        國碼：${data[i].callingCodes.map((x) => x).join(', ')}
        `);
      }
    } catch (error) {
      console.log(error);
    }
  });
});
