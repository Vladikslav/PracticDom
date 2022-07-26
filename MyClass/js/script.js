/* JavaScript код */
const containers = document.querySelectorAll(".js-buttons-container");
const settingButtons = document.querySelectorAll('[data-setting-name]');
const setButtonActive = (params) => {
    for (const [key, value] of Object.entries(params)) {
        const activeButton = Array.from(settingButtons)
            .find((element) => element.dataset['settingName'] === key && element.classList.contains('active'));
        activeButton.classList.remove('active');
        const setButton = Array.from(settingButtons)
            .find((element) => element.dataset['settingName'] === key && element.dataset['settingValue'] === value);

        setButton.classList.add('active');
    }
};
const setClass = ({ settingTarget }, params) => {
    const element = document.querySelector(settingTarget);
    for (const [key, value] of Object.entries(params)) {
        const elements = Array.from(settingButtons).filter((element) => element.dataset['settingName'] == key);
        elements.forEach(item => {
            element.classList.remove(item.dataset.settingValue);
        });
        element.classList.add(value);
    }
}
const setAttribute = ({ settingTarget }, params) => {
    const element = document.querySelector(settingTarget);
    for (const [key, value] of Object.entries(params)) {
        element.dataset[key] = value;
    }
}
const applySetting = (setting, params) => {
    if (setting.settingType === 'class') {
        setClass(setting, params);
    }
    else if (setting.settingType === 'attribute') {
        setAttribute(setting, params);
    }
    setButtonActive(params);
}
const buttonHandlerClick = (setting, evt) => {
    const button = evt.target.closest('button');
    if (!button) {
        return;
    }
    let params = {};
    let settingName = button.dataset.settingName;
    let settingValue = button.dataset.settingValue;
    params[settingName] = settingValue;
    applySetting(setting, params);
}
const init = () => {
    containers.forEach((container) => {
        const setting = container.dataset;
        container.addEventListener('click', (evt) => {
            buttonHandlerClick(setting, evt);
        });
    });
}
init();