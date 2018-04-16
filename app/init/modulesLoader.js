var modulesRoot = '/app/modules';
var routesFolder = 'routes';
var pathPackage = require('path');
var Cobuild = require('cobuild2');


module.exports = function modulesLoader(app) {



    if(Cobuild.config.authentication.strategy == "jwt"){
      
        var authMiddleware = Cobuild.Utils.Files.getEntity( 'auth.jwt.index','middlewares' );
        app.use(authMiddleware.loadUserFromRequest);
    
    }
    Cobuild.Utils.Files.listFoldersInFolder(modulesRoot + '/auth')
    .forEach(function (moduleFolder) {
       
        debug(pathPackage.join(modulesRoot ,'auth' , moduleFolder, routesFolder));
        Cobuild.Utils.Files.requireFilesInFolderWithLimiter( pathPackage.join(modulesRoot ,'auth' , moduleFolder, routesFolder), app);

    });

    Cobuild.Utils.Files.listFoldersInFolder(modulesRoot)
    .forEach(function (moduleFolder) {
        
        if(moduleFolder != 'auth'){
            Cobuild.Utils.Files.requireFilesInFolderWithLimiter(pathPackage.join(modulesRoot, moduleFolder, routesFolder), app);
        }

    });

};
