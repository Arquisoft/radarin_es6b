const { setup: setupDevServer } = require("jest-dev-server")
module.exports = async () => {
    await setupDevServer([
<<<<<<< HEAD
     /* {
=======
    {
>>>>>>> parent of 9d1ae1af (Merge branch 'tests_uo269948')
        command: 'node start-db.js',
        launchTimeout: 100000,
        debug:true,
        port: 27017,
<<<<<<< HEAD
    }, 
     {
=======
    },
    {
>>>>>>> parent of 9d1ae1af (Merge branch 'tests_uo269948')
        command: 'node start-restapi.js',
        launchTimeout: 60000,
        debug:true,
        port: 5000,
<<<<<<< HEAD
    }  */
    /*  {
        command: process.platform === 'win32' ? 'SET BROWSER=none && npm start' : 'BROWSER=none npm start',
        launchTimeout: 60000,
        debug: true,
        port: 3000
    } */
=======
    },
>>>>>>> parent of 9d1ae1af (Merge branch 'tests_uo269948')
    {
        command: 'BROWSER=none npm start',
        launchTimeout: 60000,
        debug: true,
        port: 3000
<<<<<<< HEAD
    }
])  
=======
    }])
>>>>>>> parent of 9d1ae1af (Merge branch 'tests_uo269948')
}