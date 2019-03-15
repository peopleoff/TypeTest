function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success)
            success(JSON.parse(xhr.responseText));
        } else {
          if (error)
            error(xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }
  
  function getMode(modeID) {
    switch (modeID) {
      case 0:
        return '/wordLists/commonWords.json'
      case 1:
        return '/wordLists/easyWords.json'
      case 2:
        return '/wordLists/mediumWords.json'
      case 3:
        return '/wordLists/hardWords.json'
      default:
        return '/wordLists/commonWords.json'
    }
  }
  
  export function showJSON(modeID) {
    let wordList = [];
    loadJSON(getMode(modeID),
      function (data) {
        for (let i = 0; i < 50; i++) {
          wordList.push(data[Math.floor(Math.random() * data.length)]);
        }
        return wordList;
      },
      function (xhr) {
        console.error(xhr);
      }
    );
    return wordList;
  }