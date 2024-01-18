const { spawn } = require('node:child_process');



const codespace = spawn(/^win/.test(process.platform) ? 'npm run dev' : 'npm', ['run',  'codespace']);

codespace.stdout.on('data', (data) => {
    console.log(`[COMPILE]: ${data.toString()}`);
})

codespace.stderr.on('data', function (data) {
    console.error(`[COMPILE]: ${data.toString()}`);
  });
  
codespace.on('exit', function (code) {
    console.log('[COMPILE]Exited with code: ' + code.toString());
});



const node = spawn(/^win/.test(process.platform) ? 'node apps.js' : 'node', ['apps.js']);

node.stdout.on('data', (data) => {
    console.log(`[BACKEND]: ${data.toString()}`);
})

node.stderr.on('data', function (data) {
    console.error(`[BACKEND]: ${data.toString()}`);
  });
  
node.on('exit', function (code) {
    console.log('[BACKEND]Exited with code: ' + code.toString());
});