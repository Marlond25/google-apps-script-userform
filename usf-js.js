<script>
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems); //Initializing materialize css dropDown list
    });
    
    
    document.getElementById("employeeId").addEventListener("focusout", bringData); // Search Data
    document.getElementById("teId").addEventListener("focusout", teIdEntered); // Validate data
    document.getElementById("btn").addEventListener("click", btnClicked); // Send Data
    
      
            function bringData() {
                searchName();
                searchEmail();
                searchSoc();
            };
            
            
            function printName(whatToWritee) { 
            
                if (whatToWritee === "undefined") { 
                  M.toast({html: "El campo ID del empleado es requerido"});
                } else {
                  M.toast({html: "Bienvenido! " + whatToWritee});
                  document.getElementById("nm").innerHTML = whatToWritee;
                };
            };
            
            
            function printEmail(whatToWriteee) {
            
               if (whatToWriteee != "undefined") { 
                  document.getElementById("em").innerHTML = whatToWriteee;
               };
            };
            
            
            function printSoc(whatToWriteeee) {
            
               if (whatToWriteeee != "undefined") { 
                  document.getElementById("sc").innerHTML = whatToWriteeee;
               };
            };
            
            
            function searchName() {
               var userInf = {};
               userInf.emp = document.getElementById("employeeId").value;
               google.script.run.withSuccessHandler(printName).callName(userInf);
            };
            
            
            function searchEmail() {
               var userIn = {};
               userIn.emp = document.getElementById("employeeId").value;
               google.script.run.withSuccessHandler(printEmail).callEmail(userIn);
            };
            
            
             function searchSoc() {
               var userI = {};
               userI.emp = document.getElementById("employeeId").value;
               google.script.run.withSuccessHandler(printSoc).callSoc(userI);
            };
            
            
            function printETValidation(whatToWrite) {
            
                if (whatToWrite === "undefined") { 
                    M.toast({html: "El campo ID de viaje es requerido"});
                } else {
                
                    if (whatToWrite === "Yes"){
                        document.getElementById("warnMe").innerHTML = "";
                    } else{
                        M.toast({html: "ADVERTENCIA! Ya existen facturas ejecutadas en este número de viaje"});
                        document.getElementById("warnMe").innerHTML = "No se puede realizar la solicitud";
                    };
                }; 
            };
            
            
            function teIdEntered() {
                var val = document.getElementById("teId").value
                
                if (!isNaN(val)) {
                    var userInfo = {};
                    userInfo.emp = document.getElementById("employeeId").value;
                    userInfo.tei = document.getElementById("teId").value;
                    google.script.run.withSuccessHandler(printETValidation).etValidation(userInfo);
                } else {
                    document.getElementById("warnMe").innerHTML = "No se puede realizar la solicitud (ID de viaje debe ser un número)" 
                    M.toast({html: " Por favor, complete nuevamente el campo ID de viaje"});
                    document.getElementById("teId").value = "";
                }; 
            };
            
            
            function btnClicked() {
                  var counter = 0; 
                  var ele = document.getElementsByName("group1");
                  
                  for (var i = 0;i < ele.length; i++){
                  
                     if (ele[i].checked != false){
                         counter++
                     };
                  };
            
               if ((counter != 0) && (document.getElementById("nm").innerHTML != "Usuario No Existe") && (document.getElementById("warnMe").innerHTML != "No se puede realizar la solicitud (ID de viaje debe ser un número)") && (document.getElementById("employeeId").value != "") && (document.getElementById("teId").value != "") && (document.getElementById("aFileT").value != "")) {
                     document.getElementById('form').submit();
                     //google.script.run.postData(userInfoo);
                     clearAll();
                     document.getElementById("bod").innerHTML = '<div id="myProgress">' + '<div id="myBar">10%</div>' + '</div>'
                     move();
               } else {
          
                  if (counter === 0) {
                     M.toast({html: "Debe seleccionar una clase de viaje"}); 
                     document.getElementById("aFile").value = "";
                     document.getElementById("aFileT").value = "";
                     counter = 0;
                  };
                  
                  if (document.getElementById("aFileT").value === "") {
                     M.toast({html: "Por favor adjunte un archivo .ZIP"});
                     document.getElementById("aFile").value = "";
                     document.getElementById("aFileT").value = "";
                     counter = 0;
                   };
               
                  if (document.getElementById("warnMe").innerHTML === "No se puede realizar la solicitud (ID de viaje debe ser un número)") {
                     M.toast({html: "ID de viaje debe ser un número"});
                     document.getElementById("teId").value = "";
                     document.getElementById("aFile").value = "";
                     document.getElementById("aFileT").value = "";
                     counter = 0;
                  };
                  
                  if (document.getElementById("nm").innerHTML === "Usuario No Existe") {
                     M.toast({html: "Por favor ingrese un usuario valido"});
                     document.getElementById("employeeId").value = "";
                     document.getElementById("aFile").value = "";
                     document.getElementById("aFileT").value = "";
                     counter = 0;
                  };
                  
                  if (document.getElementById("employeeId").value === "" ) {
                     M.toast({html: "El campo ID del empleado es requerido"});  
                     document.getElementById("aFile").value = "";
                     document.getElementById("aFileT").value = "";
                     counter = 0;
                  };
                  
                  if (document.getElementById("teId").value === "") {
                     M.toast({html: "El campo ID de viaje es requerido"}); 
                     document.getElementById("aFile").value = "";
                     document.getElementById("aFileT").value = "";
                     counter = 0;
                  };
               };
            };
            
            
            function clearAll() {
                  document.getElementById("employeeId").value = "";
                  document.getElementById("nm").innerHTML = "Nombre del empleado";
                  document.getElementById("em").innerHTML = "e-mail";
                  document.getElementById("sc").innerHTML = "Sociedad";
                  document.getElementById("teId").value = "";
                  document.getElementById("aFile").value = "";
                  document.getElementById("aFileT").value = "";
                  document.getElementById("commentMe").value = "";
                  var ele = document.getElementsByName("group1");
                  
                  for (var i = 0;i < ele.length; i++){
                     ele[i].checked = false;
                  };
            };
            
            
    $('#aFile').on("focusout", function() {
        var file = this.files[0];
        var fr = new FileReader();
        fr.fileName = file.name;
        fr.onload = function(e) {
            e.target.result
            html = '<input type="hidden" name="data" value="' + e.target.result.replace(/^.*,/, '') + '" >';
            html += '<input type="hidden" name="mimetype" value="' + e.target.result.match(/^.*(?=;)/)[0] + '" >';
            html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
            html += '<input type="hidden" name="emp" value="' + document.getElementById("employeeId").value + '" >'; //review from here tomorrow
            html += '<input type="hidden" name="nam" value="' + document.getElementById("nm").innerHTML + '" >';
            html += '<input type="hidden" name="ema" value="' + document.getElementById("em").innerHTML + '" >';
            html += '<input type="hidden" name="soc" value="' + document.getElementById("sc").innerHTML + '" >';
            html += '<input type="hidden" name="tei" value="' + document.getElementById("teId").value + '" >';
            html += '<input type="hidden" name="rad" value="' + document.querySelector('input[name="group1"]:checked').value + '" >'; 
            html += '<input type="hidden" name="com" value="' + document.getElementById("commentMe").value + '" >'; 
            $("#data").empty().append(html);
        };
        fr.readAsDataURL(file);
    }); 
    
    
    function move() {
        var elem = document.getElementById("myBar"); 
        var width = 10;
        var id = setInterval(frame, 10);
        
        
        function frame() {
        
            if (width >= 100) {
            clearInterval(id);
            } else {
                width += 0.25; 
                elem.style.width = width + '%'; 
                elem.innerHTML = (width * 1 - 1) + '%';
            };
        };
    };
    
</script>