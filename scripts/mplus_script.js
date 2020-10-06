document.getElementById("gobutton").onclick = function() {
    document.getElementById("outputbox").value = "";
    myFunction();
};

document.getElementById("clearbutton").onclick = function() {
    document.getElementById("outputbox").value = "";
};

document.getElementById("copybutton").onclick = function() {
    document.getElementById("outputbox").select();
    document.execCommand('copy');
};

function myFunction() {
    var textArea = document.getElementById('completedformtext');
    var lines = textArea.value.split('\n'); // lines is an array of strings

    createOutput(lines);
}

function processText(line) {
    // Performs a series of RegEx magic to santise the input as best as we can...
    line = line.replace('\(\@Name-Realm\)', '');
    if (line.match('\@.*$') != null) {
        line = line.match('\@.*$');
        line = line.toString().replace('\@', '');
    }

    // Strip out KH stuff
    line = line.toString().replace('\(KH\)', '');
    line = line.toString().replace('KH', '');
    line = line.toString().replace('KEY', '');
    line = line.toString().replace('Keyholder', '');

    return line;
}

function createOutput(lines) {
    var output = document.getElementById('outputbox');
    var keyholder = null;
    output.value += ('!keycompleted\n');
    output.value += (document.getElementById('advertisernametext').value + '\n');
    output.value += ("Unpaid\n");
    output.value += (document.getElementById('keyleveldropdown').innerText + '\n');
    output.value += (document.getElementById('keytypedropdown').innerText + '\n');
    output.value += (document.getElementById('discount').value + '\n');

    // Loop through all lines and process them with fancy regex stuff
    for (var i = 2; i < lines.length; i++) {
        output.value += (processText(lines[i]) + '\n');
        if (lines[i].includes('KH') || lines[i].includes('Keyholder') || lines[i].includes('(KH)')) {
            keyholder = processText(lines[i])
            keyholder = processKeyHolder(keyholder);
        }
    }

    if(keyholder != null)
    {
      output.value += keyholder;
    }
}

function processKeyHolder(line)
{
  line = line.toString().replace('\(KH\)', '');
  line = line.toString().replace('KH', '');
  line = line.toString().replace('KEY', '');
  line = line.toString().replace('Keyholder', '');
  console.log(line.toString() + '<< Keyholder during processKeyHolder call');
  return line;
}
