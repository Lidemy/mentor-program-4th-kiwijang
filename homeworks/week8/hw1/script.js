/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.box__btn').addEventListener('click', () => {
    getData(changePageInfo);
  });

  function getData(callbackForShow) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        let data = '';
        try {
          data = JSON.parse(xhr.response);
        } catch (err) {
          window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${err}`);
        }
        if (!data.prize) {
          window.alert('系統不穩定，請再試一次');
          return;
        }

        if (typeof callbackForShow === 'function') {
          callbackForShow(data.prize);
        } else {
          console.log('親愛的程式員，你沒有傳顯示到畫面的方法，所以只有撈到資料');
        }
      } else {
        window.alert('系統不穩定，請再試一次');
      }
    };
    xhr.onerror = () => {
      window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${xhr.status} ${xhr.statusText}`);
    };
    xhr.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
    xhr.send();
  }

  function changePageInfo(prizeType) {
    document.querySelector('.box').classList.add('d-none');
    document.querySelector('.prizebox').classList.remove('d-none');
    document.querySelector('#section-main').className = '';

    const prizes = {
      FIRST: {
        className: 'first-priz',
        title: '恭喜你中頭獎了！日本東京來回雙人遊！',
      },
      SECOND: {
        className: 'second-priz',
        title: '二獎！90 吋電視一台！',
      },
      THIRD: {
        className: 'third-priz',
        title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
      },
      NONE: {
        className: 'none-priz',
        title: '銘謝惠顧',
      },
    };

    const { className, title } = prizes[prizeType];
    document.querySelector('.prizebox > h2').innerText = title;
    document.querySelector('#section-main').classList.add(className);
  }
});
