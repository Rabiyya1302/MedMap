const { spawn } = require('child_process');
const path = require('path');

function runDiagnosisPython(inputText) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../python/nlp_predict.py');
    const process = spawn('python3', [scriptPath, inputText]);

    let result = '';
    process.stdout.on('data', data => {
      result += data.toString();
    });

    process.stderr.on('data', data => {
      console.error('Python Error:', data.toString());
    });

    process.on('close', code => {
      if (code === 0) {
        resolve(result.trim());
      } else {
        reject(new Error(`Python script exited with code ${code}`));
      }
    });
  });
}

module.exports = { runDiagnosisPython };
