const express = require('express')
const app = express()
const os = require('node:os')
const port = 3000
const fs = require('fs')
//red static files of folder frontend
app.use(express.static('frontend'))

//im' on the folder actually  (os.tmpdir()) => recupe le dossier tmp
const folderPath = (os.tmpdir());





/*****************  Afficher les information des dossiers et fichiers ******************************* */

// async await validate response 
app.get('/api/drive', async (request, response) => {
 
  //read data (promises), withFileTypes: true display on site 
  const readInfo = await fs.promises.readdir(folderPath, {withFileTypes: true});

  const tetsMap = readInfo.map((x) => {
  const FileOrNot =  x.isDirectory();
  
  //display size of documents /tmp/
  const height = fs.statSync(folderPath + "/" + x.name );
  if(FileOrNot){
    return {name: x.name, isFolder: x.isDirectory()};
  }
  else {
    return {
            name: x.name, 
            isFolder: x.isDirectory(), 
            size: height.size   
          };
  }

});

//display elements
  response.send(tetsMap)

});




/* *********************Retourner le contenue de {name} ***********************/


app.get('/api/drive/:name',async (request, response) => {
  //request.params.drive récuperer le paramettre de la requete , ici le nom du fichier
  const paramsName = request.params.name;
  // Lis les informations du fichier
 // const readFile = await fs.promises.readFile( folderPath + '/' +  paramsName, {encoding: 'utf8'});

  // Ouverture des Dossiers et affiche ce qu'il y à dedans 
  const readFolder = await fs.promises.readdir( folderPath + '/' +  paramsName, {encoding: 'utf8'});

  const openFolder = await fs.open(folderPath + '/' + paramsName , {encoding: 'utf8'})
  const readInfo = readFolder.map((elementsFolder)  => {
  const fileInfo = fs.statSync(folderPath + "/" + paramsName  + "/" + elementsFolder);
  if(fileInfo){
    return {
            name: 'Dossier', 
            isFolder: elementsFolder};
  }
else if (openFolder){
  return {
    name: 'Dossier', 
    isFolder: elementsFolder
  };
}
  else {
    return {
            name: 'file', 
            isFolder: elementsFolder, 
            size: height.size   
          };
  }
    
  })

  response.send(readInfo)

});







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(express.static('frontend/JS_alps-drive-project-frontend'))
