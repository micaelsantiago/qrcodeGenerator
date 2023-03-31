function createQRCode () {
  const content = document.querySelector('#contentQRCode').value;
  const error = document.querySelector('#msgError');

  if (content == '') {
    error.innerHTML = `
      <span>Enter some URL or text!</span>
    `
    setTimeout(() => {
      error.innerHTML = ''
    }, 2000);

    return;
  }

  const qrcode = new QRCode(document.querySelector('#qrcode'), {
    text: content,
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });

  document.querySelector('#contentQRCode').disabled = true; 
  document.querySelector('.buttons').style.display = 'flex';
}

function newQRCode() {
  document.querySelector('#contentQRCode').value = '';
  document.querySelector('.buttons').style.display = 'none';
  document.querySelector('#contentQRCode').disabled = false;
  document.querySelector('#qrcode').textContent = '';
}

function downloadQRCode() {
  const img = document.querySelector('img');
  const imgURL = img.src;
  
  fetch (imgURL)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'qrcode.png';

      document.body.appendChild(a);

      a.click();

      URL.revokeObjectURL(url);
    })
}