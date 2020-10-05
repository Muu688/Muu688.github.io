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
        var keyType = document.getElementById('keytypedropdown').innerText;

        // If 'KH' is present in the boosters line, strip it out, along with brackets if any.
        if (line.includes('KH')) {
            line = line.toString().replace('KH', '');
            line = line.toString().replace('\(', '');
            line = line.toString().replace('\)', '');
        }
        // To-do: Redo the logic here to somehow return the boosters name again, but last.
        if (!keyType.includes('Key')) {
            console.log('KEYHOLDER REQUIRED');
        }
    }

    return line;
}

function createOutput(lines) {
    // Creates a series of new <p> elements to create the runsubmission output.
    var output = document.getElementById('outputbox');
    output.value += ('!keycompleted\n');
    output.value += (document.getElementById('advertisernametext').value + '\n');
    output.value += ("Unpaid\n");
    output.value += (document.getElementById('keyleveldropdown').innerText + '\n');
    output.value += (document.getElementById('keytypedropdown').innerText + '\n');
    output.value += (document.getElementById('discount').value + '\n');

    // Loop through all lines and process them with fancy regex stuff
    for (var i = 2; i < lines.length; i++) {
        output.value += (processText(lines[i]) + '\n');
    }
}
