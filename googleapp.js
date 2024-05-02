var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1-cPIpzNjLG93tr4yGx_q_xQyq8J6Et1MbKoEXfdfOyk/edit#gid=0");
var sheet = ss.getSheetByName('TrafficLights');

function doGet(request) {
  const {method, trafficLightId,color} = request.parameter

  if (method === 'GET'){
    const JSONString =  JSON.stringify(GET())
    const JSONOutput = ContentService.createTextOutput(JSONString);
    JSONOutput.setMimeType(ContentService.MimeType.JSON);
    return JSONOutput
  }
  else if(method === "GetState")
  {
    const state = {
      color: GetState(trafficLightId)
    }
    
    const textState = ContentService.createTextOutput(JSON.stringify(state));
    textState.setMimeType(ContentService.MimeType.JSON);
    return textState;
  }
  else if(method === "SetState")
  {
    const JSONString =  JSON.stringify(SetState(trafficLightId, color))
    const JSONOutput = ContentService.createTextOutput(JSONString);
    JSONOutput.setMimeType(ContentService.MimeType.JSON);
    return JSONOutput
  }
  else if (method === 'GetTrafficLighs'){
    const trafficLighs = GetTrafficLighs();
    const JSONString =  JSON.stringify(trafficLighs);
    const JSONOutput = ContentService.createTextOutput(JSONString);
    JSONOutput.setMimeType(ContentService.MimeType.JSON);
    return JSONOutput;
}

  var data = sheet.getDataRange().getValues();
  var lights = data.map(function(row) {
    return {
      idTrafficLight: row[0],
      idLights: row[1],
      color: row[2],
      description: row[3],
      clickcount: row[4]
    };
  }); 
  
  return ContentService.createTextOutput(JSON.stringify(lights))
    .setMimeType(ContentService.MimeType.JSON);
}

function GET(){
    const res = getDataFromSpreadSheet()

    return res
}

function GetState(trafficLightId)
{
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == trafficLightId) {
      return data[i][1];
    }
  }

  return null;
}

function SetState(trafficLightId, color)
{
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == trafficLightId) {
      data[i][1] = color;
      sheet.getRange(i + 1, 2).setValue(data[i][1]);
      break;
    }
  }

  return GET();
}

function GetTrafficLighs() {
  var data = sheet.getDataRange().getValues();
  
  const trafficLighs = {};

  for (var i = 1; i < data.length; i++) {
    const trafficLightId = data[i][0];
    if(trafficLightId != "")
    {
      trafficLighs[trafficLightId] = GetState(trafficLightId);
    }
  }

  return trafficLighs;
}

function getDataFromSpreadSheet() {
    const res = {}
    const data = sheet.getDataRange().getValues()
    const headers = data[0]

    res.trafficLights = data.slice(1).map(row => {
      const tmp = {}

      tmp.idTrafficLight = row[0]
      tmp.color = row[1]

      return tmp
    })

    return res
}