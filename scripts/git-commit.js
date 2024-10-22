const { execSync } = require('child_process');

if (process.argv.length < 3) {
    console.error('Por favor proporciona un mensaje de commit.');
    process.exit(1);
}

const message = process.argv.slice(2).join(' ');

try {
    execSync('git add .');
    execSync(`git commit -m "${message}"`);
    execSync('git push');
    console.log('Cambios guardados y enviados correctamente.');
} catch (error) {
    console.error('Error en la ejecución de los comandos de Git:', error.message);
}
