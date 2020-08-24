/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.box__btn').addEventListener('click', () => {
    getData();
  });

  function getData() {
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

        changePageInfo(data.prize);
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
    document.querySelector('.section-main').classList.remove('first-priz');
    document.querySelector('.section-main').classList.remove('second-priz');
    document.querySelector('.section-main').classList.remove('third-priz');
    document.querySelector('.section-main').classList.remove('none-priz');
    switch (prizeType) {
      case 'FIRST':
        document.querySelector('.prizebox > h2').innerText = '恭喜你中頭獎了！日本東京來回雙人遊！';
        document.querySelector('.section-main').classList.add('first-priz');
        break;
      case 'SECOND':
        document.querySelector('.prizebox > h2').innerText = '二獎！90 吋電視一台！';
        document.querySelector('.section-main').classList.add('second-priz');
        break;
      case 'THIRD':
        document.querySelector('.prizebox > h2').innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        document.querySelector('.section-main').classList.add('third-priz');
        break;
      case 'NONE':
        document.querySelector('.prizebox > h2').innerText = '銘謝惠顧';
        document.querySelector('.section-main').classList.add('none-priz');
        break;
      default:
        break;
    }
  }
});
