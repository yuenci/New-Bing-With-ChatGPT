import { loadChatPage, loadSearchPage } from './scrpt.js';
export function AddHeader(type = "chat") {
  let content = `
      <div id="welcome-header-left">
        <img src="./image/microsoft.png" id="microsoft-icon">
        <div class="welcome-header-icon-con">
          <img src="./image/search0.svg">
          <div>SRAECH</div>
        </div>
        <div class="welcome-header-icon-con"">
                <img src=" ./image/chat0.svg">
          <div>CHAT</div>
        </div>
      </div>
      <div id="welcome-header-right">
        <img src="./image/menu0.png">
        <div class="header-menu">
          <div class="header-menu-item" id="menu-key">Key</div>
          <div class="header-menu-item" id="menu-welcome">
            <div>Show Welcome</div>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
          <div class="header-menu-item" id="menu-seach">
            <div>Start From Search</div>
            <label class="switch">
              <input type="checkbox">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>`;
  let header = document.createElement('div');
  header.id = 'welcome-header';
  header.innerHTML = content;
  document.body.appendChild(header);
  addHeaderEvent(header);
  active(type);
  addMenuEvent();
}

function addHeaderEvent(dom) {
  let container = $(dom);
  let searchIconConatiner = container.find('.welcome-header-icon-con').eq(0);
  let searchIcon = searchIconConatiner.find('img');
  let searchText = searchIcon.find('div');
  let chatIconConatiner = container.find('.welcome-header-icon-con').eq(1);
  let chatIcon = chatIconConatiner.find('img');
  let chatText = chatIcon.find('div');
  let menuIcon = container.find('#welcome-header-right').find('img');

  searchIconConatiner.click(function () {
    // console.log('searchIconConatiner click');
    searchActive();
  });

  chatIconConatiner.click(function () {
    // console.log('chatIconConatiner click');
    chatActive();
  });


  menuIcon.click(function () {
    let menu = container.find('.header-menu');


    let src = $(this).attr('src');
    if (src == './image/menu0.png') {
      $(this).attr('src', './image/menu1.png');
      menu.show();
    }
    else {
      $(this).attr('src', './image/menu0.png');
      menu.hide();
    }
  });
}

export function AddWelcome() {
  AddHeader();
  let content = `
    <div id="welcome-body">
      <img src="./image/bing.svg" id="bing-icon">
      <h1>Welcome to the new Bing</h1>
      <div id="welcome-body-subtitle">Your AI-powered copilot for the web.</div>
      <div id="card-container">
        <div class="demo-card">
          <div class="card-title">🧐 Ask complex questions</div>
          <div class="card-content">"What are some meals I can make for my picky toddler who only eats orange-colored
            food?"</div>
        </div>
        <div class="demo-card">
          <div class="card-title">🙌 Get better answers</div>
          <div class="card-content">"What are the pros and cons of the top 3 selling pet vacuums?"</div>
        </div>
        <div class="demo-card">
          <div class="card-title">🎨 Get creative inspiration</div>
          <div class="card-content">Write a haiku about crocodiles in outer space in the voice of a pirate</div>
        </div>
      </div>
      <div>
        Let's learn together. Bing is powered by AI, so surprises and mistakes are possible. Make sure to check the
        facts, and
        <a href="">share feedback</a>
        so we can learn and improve!
      </div>
    </div>
    <div id="welcome-bottom">
      <a href="">Terms of Use</a>
      <span> | </span>
      <a href="">Privacy Statement</a>
    </div>
    `;
  let welcome = document.createElement('div');
  welcome.id = 'welcome-container';
  welcome.innerHTML = content;
  document.body.appendChild(welcome);

}
function chatActive() {
  loadChatPage();
  let body = $("body");
  body.css("background-image", "none");
  body.attr("class", "linear-creative");
}


function searchActive() {
  loadSearchPage();
}


function active(type) {
  let container = $('#welcome-header');
  let searchIcon = container.find('.welcome-header-icon-con').eq(0).find('img');
  let searchText = container.find('.welcome-header-icon-con').eq(0).find('div');
  let searchIconConatiner = container.find('.welcome-header-icon-con').eq(0);
  let chatIcon = container.find('.welcome-header-icon-con').eq(1).find('img');
  let chatText = container.find('.welcome-header-icon-con').eq(1).find('div');
  let chatIconConatiner = container.find('.welcome-header-icon-con').eq(1);

  if (type == "search") {
    searchIcon.attr('src', './image/search1.svg');
    searchText.css('font-weight', 'bold');
    searchIconConatiner.css("border-bottom", "3px solid #174ae4");

    chatIcon.attr('src', './image/chat0.svg');
    chatText.css('font-weight', 'normal');
    chatIconConatiner.css("border-bottom", "3px solid transparent");
  }
  else if (type == "chat") {
    searchIcon.attr('src', './image/search0.svg');
    searchText.css('font-weight', 'normal');
    searchIconConatiner.css("border-bottom", "3px solid transparent");

    chatIcon.attr('src', './image/chat1.svg');
    chatText.css('font-weight', 'bold');
    chatIconConatiner.css("border-bottom", "3px solid #174ae4");
  }
}

let modalShow = false;

function addMenuEvent() {
  let menu = $('#welcome-header').find('.header-menu');
  let key = menu.find('#menu-key');
  let welcome = menu.find('#menu-welcome');
  let seach = menu.find('#menu-seach');


  key.click(function () {
    let modal = document.getElementById("myModal");
    if (modalShow) {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
  });




  welcome.click(function () {
    console.log('welcome click');
    // change check
    let check = $(this).find('input');
    if (check.prop('checked')) {
      check.prop('checked', false);
    }
    else {
      check.prop('checked', true);
    }
  });

  seach.click(function () {
    console.log('seach click');
    // change check
    let check = $(this).find('input');
    if (check.prop('checked')) {
      check.prop('checked', false);
    }
    else {
      check.prop('checked', true);
    }
  });
}
