var StateBar = new Object();

StateBar.trigger = true; //* 是否觸發Submit *屬性已無用，為了向下相容保留
StateBar.showLoading = true; //* 是否Show出Loading

var isSubmitflag = false;
var ori_WebForm_OnSubmit;

try {

    ori_WebForm_OnSubmit = WebForm_OnSubmit;
    WebForm_OnSubmit = ILS_OnSubmit;
} catch (e) {

    ori_WebForm_OnSubmit = function() {
        return true;
    };
    if (document.aspnetForm != null)
        document.aspnetForm.onsubmit = ILS_OnSubmit;
}

/*--------------------------------------------------------------------------*/

function ILS_OnSubmit() {

    if (isSubmitflag) {
        //匯出之後會導致系統判斷為"程式執行中"而無法執行其他動作，先暫時拿掉
        //alert("程式執行中");	        
        //return false;		
    }

    if (ori_WebForm_OnSubmit() == false)
        return false;

    if (StateBar.showLoading == true) {
        ShowLoadBar(); //秀Loading                          		       		   		
        isSubmitflag = true; //防止重複Click Button,關閉進度條則ㄧ併關閉防止double click
    }

    return true;
}

var Submit_imgLoadName = "Submit_imgLoad"; //* 圖檔名稱
/*--------------------------------------------------------------------------*/
function ShowLoadBar() {
    var img = document.getElementsByName(Submit_imgLoadName);

    try {
        img[0].style.display = "inline";
    } catch (e) {

        window.status = 'Loading.........';
    }

    //LoadFram.style.visibility="visible";	
    //LoadFram.style.height="768";		
    //LoadFram.style.width="1024";    
    //會造成閃動效果所以先拿掉 20070623 by Shawn		    		
    //LoadFram.style.display="";			
}