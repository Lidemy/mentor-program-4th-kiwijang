/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
document.addEventListener('DOMContentLoaded', () => {
  // get top {limit} games
  const limit = 5;
  let topFive = [];
  const xhr = new XMLHttpRequest();
  if (xhr.readyState !== 4) {
    document.querySelector('.loading').classList.remove('d-none');
  }
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.response);
        const result = data.top.map((x) => `${x.game.name}`);
        let currentGame = '';
        let offset = 0;
        topFive = result;

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
            const idx = [...document.querySelectorAll('.header__menu > h3')].map((x) => x.textContent).indexOf(e.target.textContent);
            e.target.classList.add('active');
            getStream(topFive[idx], 0);
            currentGame = topFive[idx];
          }
        });
        document.querySelector('.list').addEventListener('click', (e) => {
          if (e.target.tagName === 'BUTTON') {
            getStream(currentGame, offset += 20);
          }
        });
        document.querySelector('.loading').classList.add('d-none');
      } catch (err) {
        window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${err}`);
      }
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
});

function getStream(gameName, offset) {
  // get top {limit} game streams
  const limit = 20;
  const xhr = new XMLHttpRequest();
  if (xhr.readyState !== 4) {
    document.querySelector('.loading').classList.remove('d-none');
  }
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.response);
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
        document.querySelector('.loading').classList.add('d-none');
      } catch (err) {
        window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${err}`);
      }
    } else {
      window.alert(`發生錯誤，請重新整理頁面再試一遍，或與程式管理員聯絡，謝謝您。\n${xhr.status} ${xhr.statusText}`);
    }
  };
  xhr.onerror = () => {
    window.alert('在進行連線時發生錯誤，請檢查網路連線，謝謝您。');
  };
  xhr.open('get', `https://api.twitch.tv/kraken/streams/?game=${gameName}&limit=${limit}&offset=${offset}`);
  xhr.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  xhr.setRequestHeader('Client-ID', 'n1k78ho4sgcual55b8sdmb40s5gogr');
  xhr.send();
}
