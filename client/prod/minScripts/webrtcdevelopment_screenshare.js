function captureSourceId(){DetectRTC.screen.getChromeExtensionStatus(function(e){return"installed-enabled"!=e?void window.parent.postMessage({chromeExtensionStatus:e},"*"):void DetectRTC.screen.getSourceId(function(e){window.parent.postMessage({chromeMediaSourceId:e},"*")})})}var DetectRTC={},screenCallback;DetectRTC.screen={chromeMediaSource:"screen",getSourceId:function(e){screenCallback=e,window.postMessage("get-sourceId","*")},onMessageCallback:function(e){if("PermissionDeniedError"==e){if(DetectRTC.screen.chromeMediaSource="PermissionDeniedError",screenCallback)return screenCallback("PermissionDeniedError");throw new Error("PermissionDeniedError")}"rtcmulticonnection-extension-loaded"==e&&(DetectRTC.screen.chromeMediaSource="desktop"),e.sourceId&&(DetectRTC.screen.sourceId=e.sourceId,screenCallback&&screenCallback(DetectRTC.screen.sourceId))},getChromeExtensionStatus:function(e){if(!props)return void alert(" Please insert extensionId into the property File ");console.log(props);var r=props.extensionID,n=document.createElement("img");n.src="chrome-extension://"+r+"/icon.png",n.onload=function(){DetectRTC.screen.chromeMediaSource="screen",window.postMessage("are-you-there","*"),setTimeout(function(){e("screen"==DetectRTC.screen.chromeMediaSource?"installed-disabled":"installed-enabled")},2e3)},n.onerror=function(){e("not-installed")}}},window.addEventListener("message",function(e){e.data&&("string"==typeof e.data||e.data.sourceId||e.data.captureSourceId)&&(e.data.captureSourceId&&captureSourceId(),DetectRTC.screen.onMessageCallback(e.data))});