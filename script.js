const fonts = [
  {
    name: 'Source Sans Pro',
    urls: [
      'fonts/source_sans_pro/SourceSansPro-Regular.ttf',
      'fonts/source_sans_pro/SourceSansPro-Italic.ttf',
    ]
  },
  {
    name: 'Recursive',
    urls: [
      'fonts/Recursive/Recursive-VF.ttf',
    ]
  },
];

function populateFontList() {
  const fontList = document.getElementById('font-list');

  fonts.forEach(font => {
    const fontCard = document.createElement('div');
    fontCard.className = 'font-card';
    fontCard.textContent = font.name;
    fontCard.addEventListener('click', function() {
      handleFontSelection(font.urls);
    });

    fontList.appendChild(fontCard);
  });
}

function loadFont(fontUrls) {
  const fontPromises = fontUrls.map(function(fontUrl) {
    return new FontFace('CustomFont', `url(${fontUrl})`).load();
  });

  Promise.all(fontPromises)
    .then(function(loadedFonts) {
      loadedFonts.forEach(function(loadedFont) {
        document.fonts.add(loadedFont);
      });
      document.body.style.fontFamily = 'CustomFont';
    })
    .catch(function(error) {
      console.error('Error loading font:', error);
    });
}

function displayPreview(font) {
  const previewContainer = document.getElementById('preview-container');
  previewContainer.innerHTML = '';

  const preview = document.createElement('div');
  preview.className = 'preview';

  const previewTitle = document.createElement('h2');
  previewTitle.textContent = font.name;
  preview.appendChild(previewTitle);

  const characterGrid = document.createElement('div');
  characterGrid.className = 'character-grid';

  for (let i = 32; i <= 126; i++) { // Display characters from space (32) to tilde (126)
    const character = document.createElement('div');
    character.className = 'character';
    character.textContent = String.fromCharCode(i);
    characterGrid.appendChild(character);
  }

  preview.appendChild(characterGrid);
  previewContainer.appendChild(preview);
}

function handleFontSelection(fontUrls) {
  loadFont(fontUrls);
  displayPreview(fontUrls[0]); // Display preview for the first variation by default
}

populateFontList();
