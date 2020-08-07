import request from 'request';

/**
 * 最受歡迎的遊戲列表（Get Top Games）
 */
function getTopGames() {
  const options = {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'n1k78ho4sgcual55b8sdmb40s5gogr',
    },
  };
  const res = request
    .get(options, (err) => {
      if (err) {
        console.log(err);
      }
    });
  return res;
}

// 印出目前觀看人數跟遊戲名稱
getTopGames().on('response', (res) => {
  if (res.statusCode === 404) {
    console.log('404 找不到資料');
    return;
  }

  getTopGames().on('complete', ({ body }) => {
    const data = JSON.parse(body);
    const result = data.top.map(x => `${x.viewers} ${x.game.name}`);
    console.log(result.join('\n'));
  });
});
