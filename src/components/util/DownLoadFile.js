export default function DownLoadFile(filePath) {
  const time = new Date().getTime();
  const ifr = document.createElement('iframe');
  ifr.style.display = 'none';
  ifr.className = 'download-iframe';
  ifr.setAttribute('time', time);
  ifr.src = filePath;
  document.body.appendChild(ifr);

  const iframes = document.querySelectorAll('.download-iframe');

  iframes.forEach((iframe) => {
    // 清除存在一分钟以上的下载iframe
    if (iframe.getAttribute('time') < time - (60 * 1000)) {
      iframe.remove();
    }
  });
}
