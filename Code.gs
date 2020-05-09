function doGet (){
    return HtmlService.createTemplateFromFile("usf").evaluate();
};


function etValidation(userInfo) {
               var a = String(userInfo.emp).trim();
               var b = String(userInfo.tei).trim();
               var compareTo = a + b;
               //Read google Sheet ["Data" columns "C" & "F"]
               const url = "https://docs.google.com/spreadsheets/";
               const ss = SpreadsheetApp.openByUrl(url);
               const ws = ss.getSheetByName("Data");
               var lastRow = ws.getLastRow() - 1;
               var range1 = ws.getRange(2, 3, lastRow);
               var values1 = range1.getValues();
               var range2 = ws.getRange(2, 6, lastRow);
               var values2 = range2.getValues();  
               var eva;                       
               //Data validation: compareTo must not exist in Data

             if (compareTo === "") {
                return "undefined";
             } else {
             
                for (var x=0; x < lastRow; x++) {
                   var aux = [];
                   aux[x] = values1[x] + values2[x];
                   //Logger.log(lastRow);
                   
                   if (compareTo === String(aux[x]).trim()) {
                      //Logger.log(lastRow + "no");
                      eva = "No";
                      x = lastRow; 
                   } else {
                      //Logger.log("Yess0 " + compareTo + " " + aux[x]);
                      eva = "Yes";
                   };
                };
                //Logger.log(eva);
                return eva;
             };
    //Logger.log(eva);
};


function callName(userInf) {
               var a = String(userInf.emp).trim();
               //Read google Sheet ["Data" columns "C" & "F"]
               const url = "https://docs.google.com/spreadsheets/";
               const ss = SpreadsheetApp.openByUrl(url);
               const ws = ss.getSheetByName("Users");
               var lastRow = ws.getLastRow() - 1;
               var range1 = ws.getRange(2, 1, lastRow);
               var values1 = range1.getValues();
               var range2 = ws.getRange(2, 2, lastRow);
               var values2 = range2.getValues();
               var eval;
  
           if (a === "") {
              return "undefined";
           } else {
           
              for (var x=0; x < lastRow; x++) {
                 var aux = [];
                 aux[x] = values1[x];
                 
                 if (a === String(aux[x])) {
                    eval = String(values2[x]);
                    x = lastRow;
                 } else {
                    //Logger.log("Yess0");
                    eval = "Usuario No Existe";
                 };
              };  
             return eval;
           };
};


function callEmail(userIn) {
               var a = String(userIn.emp).trim();
               //Read google Sheet ["Data" columns "C" & "F"]
               const url = "https://docs.google.com/spreadsheets/";
               const ss = SpreadsheetApp.openByUrl(url);
               const ws = ss.getSheetByName("Users");
               var lastRow = ws.getLastRow() - 1;
               var range1 = ws.getRange(2, 1, lastRow);
               var values1 = range1.getValues();
               var range2 = ws.getRange(2, 4, lastRow);
               var values2 = range2.getValues();
               var eve;
  
           if (a === "") {
              return "undefined";
           } else {
           
              for (var x=0; x < lastRow; x++) {
                 var aux = [];
                 aux[x] = values1[x];
                 
                 if (a === String(aux[x])) {
                    eve = String(values2[x]);
                    x = lastRow;
                 } else {
                    //Logger.log("Yess0");
                    eve = "e-mail de usuario No Existe";
                 };
              };  
             return eve;
           };
};


function callSoc(userI) {
               var a = String(userI.emp).trim();
               //Read google Sheet ["Data" columns "C" & "F"]
               const url = "https://docs.google.com/spreadsheets/";
               const ss = SpreadsheetApp.openByUrl(url);
               const ws = ss.getSheetByName("Users");
               var lastRow = ws.getLastRow() - 1;
               var range1 = ws.getRange(2, 1, lastRow);
               var values1 = range1.getValues();
               var range2 = ws.getRange(2, 3, lastRow);
               var values2 = range2.getValues();
               var ev;
  
           if (a === "") {
              return "undefined";
           } else {
           
              for (var x=0; x < lastRow; x++) {
                 var aux = [];
                 aux[x] = values1[x];
                 
                 if (a === String(aux[x])) {
                    ev = String(values2[x]);
                    x = lastRow;
                 } else {
                    //Logger.log("Yess0");
                    ev = "Sociedad de usuario No Existe";
                 };
              };  
             return ev;
           };
};


function postData(userInfoo, ur) {
  //Read google Sheet ["Data" columns "C" & "F"]
  const url = "https://docs.google.com/spreadsheets/";
  const ss = SpreadsheetApp.openByUrl(url);
  const ws = ss.getSheetByName("Data");
  var arra_y = [new Date(), userInfoo.emai, userInfoo.empl, userInfoo.name, userInfoo.soci, userInfoo.teid, userInfoo.radi, userInfoo.ur, userInfoo.comm, Session.getActiveUser().getEmail()]; //Call the same object declared in HTML
  ws.appendRow(arra_y);
  ss.getRange('A:A').activate();
  ss.getActiveRangeList().setNumberFormat('dd"/"mm"/"yyyy');
  ss.getRange('H:H').activate();
  ss.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
};


function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent(); //Call the html css code getContent() returns actual code
};


function doPost(e) {

  try{
        var data = Utilities.base64Decode(e.parameters.data);
        var blob = Utilities.newBlob(data, e.parameters.mimetype, e.parameters.filename);
        var dApp = DriveApp;
        var folderIter = dApp.getFoldersByName("Responses");
        var folder = folderIter.next();
        var file = folder.createFile(blob);
        var sn = {};
        sn.ur = file.getUrl();
        sn.empl = e.parameter.emp;
        sn.name = e.parameter.nam;
        sn.emai = e.parameter.ema;
        sn.soci = e.parameter.soc;
        sn.teid = e.parameter.tei;
        sn.radi = e.parameter.rad;
        sn.comm = e.parameter.com;  
        postData(sn);
        //Logger.log(file.getUrl());
        //Logger.log(sn);
        return HtmlService.createTemplateFromFile("outPage").evaluate();
    
    } catch(err) {
        return HtmlService.createTemplateFromFile("errorPage").evaluate();
    };
};
