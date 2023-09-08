const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  playsong
}
function playsong(events)
{
  console.log(events);
  let m_url = events.currentTarget.dataset.item.songurl
  let m_name = events.currentTarget.dataset.item.name
  let m_img = events.currentTarget.dataset.item.image.url
  let m_author = events.currentTarget.dataset.item.singer
  let m_ID = events.currentTarget.dataset.item.songid
  wx.navigateTo({
    //encodeURIComponent()方法使参数忽略，维护地址完整性
    url: '/pages/playpage/playpage?musicUrl='+encodeURIComponent(m_url)+'&musicName='+m_name+'&musicImg='+encodeURIComponent(m_img)+'&author='+m_author+'&musicID='+m_ID,
    //url: '/pages/playpage/playpage?musicurl='+m_url,
  })
}
