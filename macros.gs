function dateff() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A:A').activate();
  spreadsheet.setCurrentCell(spreadsheet.getRange('A32'));
  spreadsheet.getActiveRangeList().setNumberFormat('dd"/"mm"/"yyyy');
};


function clip() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('H:H').activate();
  spreadsheet.setCurrentCell(spreadsheet.getRange('H60'));
  spreadsheet.getActiveRangeList().setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
};