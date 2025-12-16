const genElement = document.querySelector('.js-gen-btn');
const qrElement = document.querySelector('.js-qr');
const textElement = document.querySelector('.js-input');
const copyElement = document.querySelector('.js-copy-img');
const showcopyElement = document.querySelector('.js-tool-tip');


genElement.addEventListener( 'click' , () => {
  const rawText = textElement.value.trim();
  if(!rawText) {
    textElement.classList.add('animation');
    setTimeout( () => {
      textElement.classList.remove('animation')
    }, 1000)
  } else {
    const text = encodeURIComponent(rawText);
    document.querySelector('.image-section').style.display = "flex"; 
    textElement.value = "";
    getAPI(text);
  }
});

function getAPI( text ) {
  qrElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
};

copyElement.addEventListener( 'click' , () => {
  if(!qrElement.src) {
    alert('nothing to copy');
  } else {
    copyImage();
  }
});

async function copyImage() {
  try {
    const request = await fetch(qrElement.src);
    const blob = await request.blob();
    await navigator.clipboard.write( [ 
      new ClipboardItem( {'image/png' : blob })
    ]);
    showcopyElement.classList.add('visible');
    setTimeout( () => {
      showcopyElement.classList.remove('visible');
    }, 1000);
  }
  catch (error) {
    console.log(error);
    alert('Failed to copy, server error maybe...');
  };
};

textElement.addEventListener( 'keydown' , (event) => {
  if( event.key === 'Enter') {
    genElement.click();
  }
});