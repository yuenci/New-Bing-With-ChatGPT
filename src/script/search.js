export function loadSearchPageContent() {
    setBackGroudImage();
    addSearchContent();
}
function changeHearderStyle() {
    let logo = $("#microsoft-icon");
    logo.attr("src", "./image/microsoft-white.png");
    let text = $(".welcome-header-icon-con").find("div");
    text.css("color", "white");
}


async function setBackGroudImage() {
    let url = await getToDailyWallpaper();
    changeHearderStyle()
    let body = $("body");
    body.css("background-image", `url(${url})`);
    body.attr("class", "none");
}


async function getToDailyWallpaper() {
    let url = "https://bing.biturl.top";
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    return data.url;
}


function addSearchContent() {
    let content = `
        <div id="search-input-container">
            <img id="search-input-engine"  src="image/bing.png" />
            <input id="search-input" type="text" placeholder="Search the web">
            <svg t="1679826520712" class="search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2766" ><path d="M446.112323 177.545051c137.567677 0.219798 252.612525 104.59798 266.162424 241.493333 13.562828 136.895354-78.778182 261.818182-213.617777 289.008485-134.852525 27.203232-268.386263-52.156768-308.945455-183.608889s25.018182-272.252121 151.738182-325.779394A267.235556 267.235556 0 0 1 446.112323 177.545051m0-62.060607c-182.794343 0-330.989899 148.195556-330.989899 330.989899s148.195556 330.989899 330.989899 330.989899 330.989899-148.195556 330.989899-330.989899-148.195556-330.989899-330.989899-330.989899z m431.321212 793.341415a30.849293 30.849293 0 0 1-21.94101-9.102223l-157.220202-157.220202c-11.752727-12.179394-11.584646-31.534545 0.37495-43.50707 11.972525-11.972525 31.327677-12.140606 43.494141-0.37495l157.220202 157.220202a31.036768 31.036768 0 0 1 6.723232 33.810101 31.004444 31.004444 0 0 1-28.651313 19.174142z m0 0" p-id="2767"></path></svg>
        </div>
        <div id="search-engines-container">
            <div class="search-engine">
                <img class="search-engine-icon" src="image/bing.png" />
            </div>
            <div class="search-engine">
                <img class="search-engine-icon"  src="image/google.png"   />
            </div>
            <div class="search-engine">
                <img class="search-engine-icon" src="image/baidu.png" />
            </div>
        </div>
    `;

    let container = document.createElement("div");
    container.id = "search-container";
    container.innerHTML = content;
    document.body.appendChild(container);
    addSearchEvent(container);

}

function addSearchEvent(container) {
    let $container = $(container);
    let searchEngineBtn = $container.find(".search-engine");
    let searchEngineIcon = $container.find("#search-input-engine");
    let searchInput = $container.find("#search-input");
    let searchSvg = $container.find(".search-icon");

    searchEngineBtn.click(function () {
        let icon = $(this).find("img");
        let src = icon.attr("src");
        searchEngineIcon.attr("src", src);
    });

    // enter key
    searchInput.keydown(function (e) {
        if (e.keyCode == 13) {
            let engine = searchEngineIcon.attr("src");
            let value = searchInput.val();
            search(value, engine);
        }
    });

    searchSvg.click(function () {
        let engine = searchEngineIcon.attr("src");
        let value = searchInput.val();
        search(value, engine);
    });
}


function search(value, engine) {
    let url = "";
    switch (engine) {
        case "image/bing.png":
            url = `https://cn.bing.com/search?q=${value}`;
            break;
        case "image/google.png":
            url = `https://www.google.com/search?q=${value}`;
            break;
        case "image/baidu.png":
            url = `https://www.baidu.com/s?wd=${value}`;
            break;
    }
    // window.open(url);
    // open in current window
    window.location.href = url
}