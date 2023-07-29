window.J$B_M0D = window.J$B_M0D = {
    createStyle: function(){
        var styles = '.notification {position: fixed;top: -100px;right: 20px;width: 300px;padding: 16px;background-color: #4CAF50;color: #fff;border-radius: 4px;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);opacity: 0;z-index: 9999;transition: top 0.3s, opacity 0.3s;}';
        styles += '.notification.show {top: 20px;opacity: 1;}';
        styles += '.close-btn {float: right;font-size: 18px;font-weight: bold;cursor: pointer;}';
        styles += '.close-btn {float: right;font-size: 18px;font-weight: bold;cursor: pointer;}';
        styles += '.close-btn:hover {color: #eee;}';
        styles += '.kht *, .kht *:before, .kht *:after { box-sizing: border-box; } .kht .modal-container { display:none; margin: 0 auto; padding-top: 60px; position: relative; width: 160px; } .kht .modal-container button { display: block; margin: 0 auto; color: #fff; width: 160px; height: 50px; line-height: 50px; background: #446CB3; font-size: 22px; border: 0; border-radius: 3px; box-shadow: 0 5px 5px -5px #333; transition: background 0.3s ease-in; } .kht .modal-container .modal-backdrop { height: 0; width: 0; opacity: 0; overflow: hidden; transition: opacity 0.2s ease-in; } .kht .modal-container #modal-toggle { position: absolute; left: 0; top: 0; height: 100%; width: 100%; margin: 0; opacity: 0; cursor: pointer; } .kht .modal-container #modal-toggle:hover ~ button { background: #1E824C; } .kht .modal-container #modal-toggle:checked { width: 100vw; height: 100vh; position: fixed; left: 0; top: 0; z-index: 9; opacity: 0; } .kht .modal-container #modal-toggle:checked ~ .modal-backdrop { background-color: rgba(0, 0, 0, 0.6); width: 100vw; height: 100vh; position: fixed; left: 0; top: 0; z-index: 9; pointer-events: none; opacity: 1; } .kht .modal-container #modal-toggle:checked ~ .modal-backdrop .modal-content { background-color: #fff; max-width: 400px; width: 100%; height: auto; padding: 10px 30px; position: absolute; left: calc(50% - 200px); top: 12%; border-radius: 4px; z-index: 999; pointer-events: auto; cursor: auto; box-shadow: 0 3px 7px rgba(0, 0, 0, 0.6); } @media (max-width: 400px) { .kht .modal-container #modal-toggle:checked ~ .modal-backdrop .modal-content { left: 0; } } .kht .modal-container #modal-toggle:checked ~ .modal-backdrop .modal-content .modal-close { color: #666; position: absolute; right: 2px; top: 0; padding-top: 7px; background: #fff; font-size: 16px; width: 25px; height: 28px; font-weight: bold; text-align: center; cursor: pointer; } .kht .modal-container #modal-toggle:checked ~ .modal-backdrop .modal-content .modal-close.button { top: initial; bottom: 5px; right: 20px; background: #4CAF50; color: #fff; width: 50px; border-radius: 2px; font-size: 14px; font-weight: normal; } .kht .modal-container #modal-toggle:checked ~ .modal-backdrop .modal-content .modal-close.button:hover { color: #fff; background: #1E824C; } .kht .modal-container #modal-toggle:checked ~ .modal-backdrop .modal-content .modal-close:hover { color: #333; }';
        var css = document.createElement('style');
        css.type = 'text/css';
        css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName("head")[0].appendChild(css);
    },
    loadSocket:function(callback){
        var fr=document.createElement("script");
        fr.setAttribute("type","text/javascript");
        fr.setAttribute("data-cfasync",false);
        fr.setAttribute("data-id","kr-js-aync-load-1111");
        fr.async=true;
        fr.setAttribute("src","https://cdn.socket.io/4.5.4/socket.io.min.js");
        // Add a load event listener to ensure the callback is triggered when the script is loaded
        fr.addEventListener("load", callback);
        document.getElementsByTagName("head")[0].appendChild(fr);
    },
    loadSocketIo:function(data){
        console.log(data);
        // var sendScript= 'const socket = io("http://64.227.190.185:3000", { transports: ["websocket"] });';https://alertify.live/
        var server_data="";
        var sendScript= 'const socket = io("https://alertify.live/", { transports: ["websocket"] });';
        sendScript += 'const audioContext = new (window.AudioContext || window.webkitAudioContext)();const audioElement = document.querySelector("audio");socket.on("connect", () => { console.log("WebSocket connection opened"); socket.emit("createRoom", "'+data+'"); });';
        // sendScript += 'socket.on("serverMessage", (server_data) => { console.log(server_data); const { send_server_msg, audioData } = server_data; const blob = new Blob([audioData], { type: "audio/mpeg" }); const audioPlayer = document.getElementById("audioPlayer"); audioPlayer.src = URL.createObjectURL(blob); document.getElementById("server_msg").innerHTML=send_server_msg; showNotification(); });';
        sendScript += 'socket.on("serverMessage", server_data); function server_data(event){ const audioData = event.audio; const send_server_msg= event.send_server_msg; console.log(server_data); document.getElementById("server_msg").innerHTML=send_server_msg; showNotification(123); };';
        sendScript += 'socket.on("disconnect", () => { console.log("WebSocket connection closed"); });';
        sendScript += 'socket.on("error", (error) => { console.error("WebSocket error:", error); }); showConfirmation();';

        var js= document.createElement('script');
        js.type= 'text/javascript';

        js.appendChild(document.createTextNode(sendScript));
        document.getElementsByTagName("head")[0].appendChild(js);
    },
    createPopUp:function(){
        var first_div=document.createElement("div");
        first_div.setAttribute("class","notification");
        first_div.setAttribute("id","notification");

        var sec_div=document.createElement("div");

        var third_div= document.createElement("span");
        third_div.setAttribute("class", "close-btn");
        third_div.setAttribute("onclick", "closeNotification()");
        third_div.innerHTML="&times;";

        var fourth_div= document.createElement("p");
        fourth_div.setAttribute("id", "server_msg");
        fourth_div.innerHTML="hello";

        // var first_div=document.createElement("div");
        // first_div.setAttribute("id","gritter-notice-wrapper");

        // var sec_div = document.createElement("div");
        // sec_div.setAttribute("id","gritter-item-3");
        // sec_div.setAttribute("class", "gritter-item-wrapper gritter-error");

        // var third_div= document.createElement("div");
        // third_div.setAttribute("class", "gritter-center");

        // var fourth_div= document.createElement("div");
        // fourth_div.setAttribute("class", "gritter-item");
        // fourth_div.innerHTML= '<div id="close" class="gritter-close" style="display: inline;"></div><span class="gritter-title"><strong>Hello</strong><p>durgesh</p></span><div style="clear:both"></div>';

        // var gritterBottom= document.createElement("div");
        // gritterBottom.setAttribute("class", "gritter-bottom");

        var fifth_div = document.createElement("button");
        fifth_div.setAttribute("id","requestPermissionButton");
        fifth_div.setAttribute("style", "display:none;");
        fifth_div.innerHTML= "Request";

        var audio_div= document.createElement("audio");
        audio_div.setAttribute("id", "audioPlayer");
        audio_div.setAttribute("controls", "false");
        audio_div.setAttribute("style", "display:none;");
        audio_div.setAttribute("autoplay", "true");
        audio_div.innerHTML= '<source src="https://alertify.live/alien_shoot.mp3" type="audio/mpeg">';

        var mainKht= document.createElement("div");
        mainKht.setAttribute("class", "kht");

        var mainKht1= document.createElement("div");
        mainKht1.setAttribute("class", "modal-container");
        mainKht1.innerHTML= '<input id="modal-toggle" type="checkbox"><div class="modal-backdrop"><div class="modal-content"><p>Welcome To Our Fooder Panel.</p><label class="modal-close button" for="modal-toggle" onClick="requestAutoplayPermission(1)">OK</label></div></div>';

        document.body.appendChild(first_div);
        first_div.appendChild(sec_div);
        sec_div.appendChild(third_div);
        sec_div.appendChild(fourth_div);
        document.body.appendChild(fifth_div);
        document.body.appendChild(audio_div);
        document.body.appendChild(mainKht);
        mainKht.appendChild(mainKht1);
    },
    createModel:function(){
        var modalJSData= 'function handleAudioStream(event) { const audioData = event.data; audioContext.decodeAudioData(audioData.buffer, (buffer) => { const sourceNode = audioContext.createBufferSource();sourceNode.buffer = buffer;sourceNode.connect(audioContext.destination);sourceNode.start();});} function play(){ var audio = new Audio("https://alertify.live/alien_shoot.mp3"); audio.play(); } function showNotification(data) { console.log("data"+data); var notification = document.getElementById("notification"); notification.classList.add("show"); requestAutoplayPermission(data);} const requestPermissionButton = document.getElementById("requestPermissionButton"); const audioPlayer = document.getElementById("audioPlayer"); requestPermissionButton.addEventListener("click", requestAutoplayPermission(1)); async function requestAutoplayPermission(data="") { console.log("data="+data); console.log(typeof data); if(data == "1"){ console.log("mute"); audioPlayer.muted = true; }else{ console.log("unmut"); audioPlayer.muted = false; audioPlayer.play(); }} function showConfirmation() { document.getElementById("modal-toggle").click();}';
        modalJSData += 'function closeNotification() { var notification = document.getElementById("notification"); notification.classList.remove("show"); }';
        var js= document.createElement('script');
        js.type= 'text/javascript';

        js.appendChild(document.createTextNode(modalJSData));
        document.getElementsByTagName("head")[0].appendChild(js);
    },
    closeModel:function(){

    },
    callPg: function(data){
        var self = this;

        this.createStyle();
        this.createPopUp();
        this.createModel();
        // Load the Socket.io script first and then call loadSocketIo when it's fully loaded
        this.loadSocket(function() {
            self.loadSocketIo(data);
        });
    }
}
// Get all script tags in the DOM
var scriptTags = document.getElementsByTagName('script');

// Get the current script tag (notifier.js) by finding the one with the 'src' attribute
var currentScriptTag;

for (var i = 0; i < scriptTags.length; i++) {
  if (scriptTags[i].src && scriptTags[i].src.includes('notifier.js')) {
    currentScriptTag = scriptTags[i];
    break;
  }
}

// Get the 'src' attribute of the current script tag
var src = currentScriptTag.src;

// Parse the query parameters from the 'src' URL
var url = new URL(src);
var data = url.searchParams.get('data');

// Now, 'data' contains the value of the 'data' query parameter (in this case, 'abhi')
// console.log('Data:', data);
J$B_M0D.callPg(data);
