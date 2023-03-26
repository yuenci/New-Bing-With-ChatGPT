let settingsDefault = {
    key: "",
    showWelcome: true,
    startFromSearch: false,
}

export function getSettings() {

    let settings = localStorage.getItem("newBingSettings");
    if (settings) {
        return JSON.parse(settings);
    } else {
        localStorage.setItem("newBingSettings", JSON.stringify(settingsDefault));
        return settingsDefault;
    }
}

export function setSettings(newSetting) {
    let settings = getSettings();
    console.log(settings);
    let newSettings = Object.assign(settings, newSetting);
    localStorage.setItem("newBingSettings", JSON.stringify(newSettings));
}


export function AddKeyModal() {
    let content = `
		<div class="modal-content">
			<span class="close"">&times;</span>
			<h4>New Bing is powered by OpenAI</h4>
			<div id='modal-input'>
                <input type="text" id="inputKey" placeholder="Enter your OpenAI API key" />
			    <button id="submit-key">Submit</button>
            </div>
            <div>
                 <a href="https://beta.openai.com/account/api-keys" target="_blank">Get your API key</a>
            </div>
		</div>
    `;

    let modal = document.createElement('div');
    modal.id = 'myModal';
    modal.className = 'modal';
    modal.innerHTML = content;
    document.body.appendChild(modal);


    // close event
    let close = document.getElementsByClassName("close")[0];
    if (close) {
        close.onclick = function () {
            modal.style.display = "none";
        }
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // submit event
    let submitBtn = document.getElementById("submit-key");
    submitBtn.onclick = function () {
        let keyVal = document.getElementById("inputKey").value;
        console.log(keyVal);
        if (keyVal) {
            setSettings({ key: keyVal });
            modal.style.display = "none";
        }
    }
}