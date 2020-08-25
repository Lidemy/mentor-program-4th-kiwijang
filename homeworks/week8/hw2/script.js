/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
document.addEventListener('DOMContentLoaded', () => {
  getTopFive(showTopFiveMenu);
});
function getTopFive(callbackForShow) {
  // get top {limit} games
  const limit = 5;
  let topFive = [];
  const xhr = new XMLHttpRequest();
  document.querySelector('.loading').classList.remove('d-none'); // xhr.readyState === 0

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let data = '';
      try {
        data = JSON.parse(xhr.response);
      } catch (err) {
        window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${err}`);
      }
      const result = data.top.map((x) => `${x.game.name}`);
      topFive = result;

      if (typeof callbackForShow === 'function') {
        callbackForShow(topFive);
      } else {
        console.log('親愛的程式員，你沒有傳顯示到畫面的方法，所以只有撈到資料');
      }

      document.querySelector('.loading').classList.add('d-none');
    } else {
      window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${xhr.status} ${xhr.statusText}`);
    }
  };
  xhr.onerror = () => {
    window.alert('在進行連線時發生錯誤，請檢查網路連線，謝謝您。');
  };
  xhr.open('get', `https://api.twitch.tv/kraken/games/top?limit=${limit}`);
  xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  xhr.setRequestHeader('Client-ID', 'n1k78ho4sgcual55b8sdmb40s5gogr');
  xhr.send();
}

function showTopFiveMenu(topFive) {
  let currentGame = '';
  let offset = 0;
  for (let i = 0; i < topFive.length; i += 1) {
    document.querySelector('.header__menu').innerHTML += `<h3>${topFive[i]}</h3>`;
  }
  document.querySelector('.header__menu').addEventListener('click', (e) => {
    document.querySelectorAll('.header__menu > h3').forEach((x) => {
      if (x.classList.contains('active')) {
        x.classList.remove('active');
      }
      document.querySelector('.list').innerHTML = '';
    });
    if (e.target.tagName === 'H3') {
      e.target.classList.add('active');
      getStream(e.target.textContent, 0, showStreams);
      currentGame = e.target.textContent;
    }
  });
  document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      getStream(currentGame, offset += 20, showStreams);
    }
  });
}

function getStream(gameName, offset, callbackForShow) {
  // get top {limit} game streams
  const limit = 20;
  const xhr = new XMLHttpRequest();
  document.querySelector('.loading').classList.remove('d-none'); // xhr.readyState === 0

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let data = '';
      try {
        data = JSON.parse(xhr.response);
      } catch (err) {
        window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${err}`);
      }

      if (typeof callbackForShow === 'function') {
        callbackForShow(data, limit);
      } else {
        console.log('親愛的程式員，你沒有傳顯示到畫面的方法，所以只有撈到資料');
      }

      document.querySelector('.loading').classList.add('d-none');
    } else {
      window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${xhr.status} ${xhr.statusText}`);
    }
  };
  xhr.onerror = () => {
    window.alert('在進行連線時發生錯誤，請檢查網路連線，謝謝您。');
  };
  xhr.open('get', `https://api.twitch.tv/kraken/streams/?game=${encodeURIComponent(gameName)}&limit=${limit}&offset=${offset}`);
  xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  xhr.setRequestHeader('Client-ID', 'n1k78ho4sgcual55b8sdmb40s5gogr');
  xhr.send();
}

function showStreams(data, limit) {
  if (data.streams.length < limit) {
    document.querySelector('.loadmore-btn').remove();
    document.querySelector('.loading').classList.add('d-none');
    return;
  }
  if (document.querySelector('.loadmore-btn')) {
    document.querySelector('.loadmore-btn').remove();
  }
  if (document.querySelector('.list > p')) {
    document.querySelector('.list').innerHTML = '';
  }
  for (let i = 0; i < limit; i += 1) {
    document.querySelector('.list').innerHTML += `      
        <div class="box">
          <a class="box__preview" href="${data.streams[i].channel.url}" target="_blank">
            <img alt="${data.streams[i].channel.description}" src="${data.streams[i].preview.large}">
          </a>
          <div class="box__channel">
            <a class="box__channel__logo" href="${data.streams[i].channel.url}/videos" target="_blank">
              <img alt="${data.streams[i].channel.display_name}" src="${data.streams[i].channel.logo}">
            </a>
            <div class="box__channel__wrap">
              <a class="box__channel__wrap__status" href="${data.streams[i].channel.url}" target="_blank">${data.streams[i].channel.status}</a>
              <a class="box__channel__wrap__display_name" href="${data.streams[i].channel.url}/videos" target="_blank">${data.streams[i].channel.display_name}</a>
            </div>
          </div>
        </div>          
        `;
  }
  if (!document.querySelector('.loadmore-btn')) {
    document.querySelector('.list').innerHTML += '<button class="loadmore-btn">more 20!</button>';
  }
}
