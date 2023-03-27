var myWebSocket;
const ruleBtnContainer = document.getElementById('rule-btn-container');

var modal;

window.onload = function() {
  modal = document.getElementById("myModal");
};

// 拖拽文件函数处理
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

// 动态生成规则触发按钮
function generateButtons(configFile){
    if(!Array.isArray(configFile)){
        console.log('Configuration file format error! Array only support')
        return;
    }

    configFile.forEach((item, index) => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = item.name;
        button.addEventListener('click', async () => {
            const wasmModule = new WebAssembly.Module(await fetch('../cpp/rule_fission.wasm').then(response => response.arrayBuffer()));
            const wasmInstance = new WebAssembly.Instance(wasmModule,{});
            const fissionFunc = wasmInstance.exports.add;
            const a = 1;
            const b = 2;
            const result = fissionFunc(a, b);
            console.log(result);
            if(index == 0){
                alert(item.name);
            }else{
                showModal();
            }
        });
        ruleBtnContainer.appendChild(button);
    });
}

// 测试websocket链接
function connectToWS() {
    var endpoint = document.getElementById("endpoint").value;
    if (myWebSocket !== undefined) {
        myWebSocket.close()
    }
    myWebSocket = new WebSocket(endpoint);
    myWebSocket.onmessage = function(event) {
        var leng;
        if (event.data.size === undefined) {
            leng = event.data.length
        } else {
            leng = event.data.size
        }
        console.log("onmessage. size: " + leng + ", content: " + event.data);
    }
    myWebSocket.onopen = function(evt) {
        console.log("onopen.");
    };
    myWebSocket.onclose = function(evt) {
        console.log("onclose.");
    };
    myWebSocket.onerror = function(evt) {
        console.log("Error!");
    };
}

function sendMsg() {
    var message = document.getElementById("myMessage").value;
    myWebSocket.send(message);
}
function closeConn() {
    myWebSocket.close();
}

// 屏蔽浏览器默认拦截
document.addEventListener('dragover', function(event){
    event.preventDefault();
});

document.addEventListener('drop',handleFileSelect);

// 弹窗控制
function showModal() {
  modal.style.display = "block";
}
function hideModal() {
  modal.style.display = "none";
}