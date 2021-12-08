fullykioskurl = ''
fullykioskpassword = ''

// verbose variant
function logTabs(tabs) {
    let tab = tabs[0]; // Safe to assume there will only be one result
    console.log(tab.url);
    fetchContent(fullykioskurl + '/?password=' + fullykioskpassword + '&type=json&cmd=loadUrl&url=' + tab.url);

}
  

function handleClick() {

    console.log('Click');

    fetchContent(fullykioskurl + '/?password=' + fullykioskpassword + '&cmd=screenOn&type=json');
    browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);

}

function fetchContent(configURL) {

    fetch(configURL)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
  
          // Examine the text in the response
          response.json().then(function(data) {
  
            // Do something better
            jsonContents = data;
            console.log(jsonContents);
  
  
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  
    }

browser.browserAction.onClicked.addListener(handleClick);