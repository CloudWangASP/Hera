const ruleBtnContainer = document.getElementById('rule-btn-container');

function handleFileSelect(event){
    event.preventDefault();
    const files = event.dataTransfer.files;
    if(files.length == 0){
        return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function(event){
        const configFile = JSON.parse(event.target.result);
        generateButtons(configFile)
    };
    reader.readAsText(file);
}

function generateButtons(configFile){
    if(!Array.isArray(configFile)){
        console.log('配置文件格式错误！仅支持数组')
        return;
    }

    configFile.forEach((item, index) => {
        const button = document.createElement('button');
        button.textContent = '规则名称';
        button.addEventListener('click', () => {
            console.log()

        });
        ruleBtnContainer.appendChild(button);
    });
}

document.addEventListener('dragover', function(event){
    event.preventDefault();
});

document.addEventListener('drop',handleFileSelect);