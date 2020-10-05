document.getElementById("gobutton").onclick = function() {
    document.getElementById("outputbox").value = "";
    myFunction();
};

document.getElementById("clearbutton").onclick = function() {
    document.getElementById("outputbox").value = "";
};

document.getElementById("copybutton").onclick = function() {

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

    return line;
}

function createOutput(lines) {
    // Creates a series of new <p> elements to create the runsubmission output.
    var output = document.getElementById('outputbox');
    output.value += ('!visioncompleted\n');
    output.value += (document.getElementById('advertisernametext').value + '\n');
    output.value += ("Unpaid\n");
    output.value += (document.getElementById('maskleveldropdown').innerText + '\n');
    output.value += (document.getElementById('visiontypedropdown').innerText + '\n');
    output.value += (document.getElementById('discount').value + '\n');

    // Loop through all lines and process them with fancy regex stuff
    for (var i = 2; i < lines.length; i++) {
        output.value += (processText(lines[i]) + '\n');
    }
}
