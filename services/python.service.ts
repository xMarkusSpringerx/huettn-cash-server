var result = "";
var pyshell = new PythonShell('read.py');

pyshell.send('hello');

pyshell.on('message', function (nfcId) {
    console.log("From JS: " + nfcId);
    result = nfcId;
});

return pyshell.end(function (err) {
    if (err) throw err;
    console.log('finished');

    return result;
});