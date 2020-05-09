# T&E_Userform
This application was design to read information from a user. The user form will perform a data validation from a google sheet database with usernames, user e-mails and user IDs. In order to successfully register a transaction, there should not be an existing entity (row) for the combination of the attributes (columns): (ID del empleado and ID de viaje) and the user has to be previously added to the "Users" sheet in order to be recognized by the user form. The next step is to take the information given by the user to a google spreadsheet, it should include a link to the file provided by the user (an attachment in the user form is required). The application will then send an HTTP POST request to google drive to be able to upload the file in the designated folder and it will return a success window (Landing page) with a link to fill out a new document. In the event of the script not being able to perform the request, it will prompt an error page giving access to the previous user form.

## File manifest
There are 9 files involved in the deployment of the application:
	1. Code.gs = Server side code
	2. usf.html = GUI application
	3. usf-css.html = Visual effects
	4. usf-js.html =  JavaScript functionality
	5. macros.gs = Actions in the google spreadsheet
	6. outPage.html = Landing page on {"Success"}
	7. errorPage.html = Landing page on {"Error"}
	8. T&E UserformResponse (Google sheets) | Sheets = [Data, Users]
	9. Responses (Google Drive Folder)

## Application usage
This is a list of all the fields a user has to provide to the user form:
	*-Timestamp: Current date and time at the moment the request was made.
	*-Email Address: The email address of the user filling out the information.
	-ID del empleado: The user ID as an employee.
	*-Nombre del empleado: The name of the user.
	*-Sociedad: The branch that the user belongs to.
	-ID de viaje: A number required by T&E.
	-Clase de Viaje: This is a categorization of the purpose of the request.
	-File: A .ZIP file to be sent to T&E.
	-Comentarios: Any additional observation that the user has for the recipients of the information at T&E.
	*-Active user: The name and username associated with the active Google account will be recorded when uploading files and submitting the form.

(*-) This information is autocompleted by the application.
(-) This information is hard typed by the user.
