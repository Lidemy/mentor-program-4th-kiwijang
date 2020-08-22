/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.box__btn').addEventListener('click', () => {
    getData();
  });
  document.querySelector('.prizebox__btn').addEventListener('click', () => {
    getData();
  });

  function getData() {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        try {
          const data = JSON.parse(xhr.response);
          if (data.prize) {
            changePageInfo(data.prize);
          } else {
            window.alert('系統不穩定，請再試一次');
          }
        } catch (err) {
          window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${err}`);
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
    switch (prizeType) {
      case 'FIRST':
        document.querySelector('.box').classList.add('d-none');
        document.querySelector('.prizebox').classList.remove('d-none');
        document.querySelector('.prizebox > h2').innerText = '恭喜你中頭獎了！日本東京來回雙人遊！';
        document.querySelector('.section-main').style.color = 'black';
        document.querySelector('.section-main').style.backgroundImage = 'url("./img/flight.jpg")';
        break;
      case 'SECOND':
        document.querySelector('.box').classList.add('d-none');
        document.querySelector('.prizebox').classList.remove('d-none');
        document.querySelector('.prizebox > h2').innerText = '二獎！90 吋電視一台！';
        document.querySelector('.section-main').style.color = 'black';
        document.querySelector('.section-main').style.backgroundImage = 'url("./img/tv.jpg")';
        break;
      case 'THIRD':
        document.querySelector('.box').classList.add('d-none');
        document.querySelector('.prizebox').classList.remove('d-none');
        document.querySelector('.prizebox > h2').innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        document.querySelector('.section-main').style.color = 'black';
        document.querySelector('.section-main').style.backgroundImage = 'url("./img/yt.jpg")';
        break;
      case 'NONE':
        document.querySelector('.box').classList.add('d-none');
        document.querySelector('.prizebox').classList.remove('d-none');
        document.querySelector('.prizebox > h2').innerText = '銘謝惠顧';
        document.querySelector('.section-main').style.color = 'white';
        document.querySelector('.section-main').style.backgroundImage = 'none';
        document.querySelector('.section-main').style.backgroundColor = 'black';
        break;
      default:
        break;
    }
  }
});
