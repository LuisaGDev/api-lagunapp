var modulesRoot = '/app/modules';
var routesFolder = 'routes';
var pathPackage = require('path');
var Cobuild = require('cobuild2');


module.exports = function modulesLoader(app) {



    if(Cobuild.config.authentication.strategy == "jwt"){
      
        var authMiddleware = Cobuild.Utils.Files.getEntity( 'cobuild.jwt.index','middlewares' );
        app.use(authMiddleware.loadUserFromRequest);
    
    }
    Cobuild.Utils.Files.listFoldersInFolder(modulesRoot + '/cobuild')
    .forEach(function (moduleFolder) {
       
        debug(pathPackage.join(modulesRoot ,'cobuild' , moduleFolder, routesFolder));
        Cobuild.Utils.Files.requireFilesInFolderWithLimiter( pathPackage.join(modulesRoot ,'cobuild' , moduleFolder, routesFolder), app);

    });

    Cobuild.Utils.Files.listFoldersInFolder(modulesRoot)
    .forEach(function (moduleFolder) {
        
        if(moduleFolder != 'cobuild'){
            Cobuild.Utils.Files.requireFilesInFolderWithLimiter(pathPackage.join(modulesRoot, moduleFolder, routesFolder), app);
        }

    });

};
