const client = require('cheerio-httpcli');
const moment = require('moment');

const year = moment().format('YYYY');

const teams = {
  1: 'G', 2: 'S', 3: 'DB', 4: 'D', 5: 'T', 6: 'C',
  7: 'L', 8: 'F', 9: 'M', 11: 'Bs', 12: 'H',  376: 'E'
}

const playType = { p: '投手', b: '野手' }

let initial = true;
// チームごと
Object.keys(teams).forEach(teamNo => {
  // 投手・野手
  Object.keys(playType).forEach(typeInitials => {
    const URL = `https://baseball.yahoo.co.jp/npb/teams/${teamNo}/memberlist?type=${typeInitials}`
    // 選手情報取得
    client.fetch(URL, (err, $, res) => {
      $('tr').each((idx, el) => {
        // 対象の列
        if (Object.keys(el.attribs).length > 0) {
          // 支配下登録選手のみ
          if (el.children[1].children[0].data.length < 3) {
            // find name and no from HTML
            const name = el.children[3].children[0].children[0].data;
            const no = el.children[1].children[0].data;
            if (initial) { console.log('team,type,name,no,year'); initial = false; }
            // output
            console.log(`${teams[teamNo]},${typeInitials},${name},${no},${year}`)
          }
        }
      })
    })
  })
})