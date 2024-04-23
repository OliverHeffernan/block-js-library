/**
 * This function is used to process the <imports> tag and import the files listed within it to the <blocks> tag.
 */
function processImports() {
    // Get the <imports> tag and check if valid for imports
    let importsTag = document.getElementsByTagName("imports");
    if (importsTag.length > 1)
        return error("Only one <imports> tag is allowed. Please ensure that all files you want to import are listed within a single <imports> tag, separated by commas.");
    
    if (importsTag.length == 0)
        return null;

    // Prevent using imports when there isn't a server running
    if (window.location.protocol === "file:")
        return error("Cannot use <imports> tag without a server, such as localhost or a web server.");

    // Get the <blocks> tag and check if valid for imports
    let blocksTag = document.getElementsByTagName("blocks");
    if (blocksTag.length > 1)
        return error("Only one <blocks> tag is allowed. Please ensure that all blocks you want to import are listed within a single <blocks> tag, separated by commas.");
    
    if (blocksTag.length == 0) 
        return error("Error: The <blocks> tag is missing. Please ensure you have a <blocks> tag in order to use imports.");

    // Get the content of the <imports> tag and hide it
    importsTag = importsTag[0];
    importsTag.style.display = "none";

    // Add each imported file to the <blocks> tag
    const imports = importsTag.innerHTML.split(",");
    imports.forEach(function (file) {
        blocksTag[0].innerHTML = importFromFile(file) + blocksTag[0].innerHTML;
    });
}

/**
 * This function is used to import a file from a URL.
 * @param {*} url - The URL of the file to import
 * @returns - The content of the file
 */
function importFromFile(url) {
    if (!window.XMLHttpRequest)
        return error("Your browser does not support XMLHttpRequest. Please use a modern browser to use the <imports> tag.");
    
    const xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object

    xhr.open("GET", url, true); // Prepare the request
    xhr.send(); // Send the request

    // Return the response text if the request was successful
    return xhr.status === 200 ? xhr.responseText : error("Failed to import file: " + url);
}

function FillCopies() {
    console.log("filled");
    var blocks = document.getElementsByTagName('block');
    blocks = [...blocks];


    blocks.forEach(function (block)
    {
        var hasAtrs = true;
        var blockName;
        if (!block.className.includes(' '))
        {
            hasAtrs = false;
            blockName = block.className;
        }
        else
        {
            var blockFtrs = block.className.split(' ');
            blockName = blockFtrs[0];
            var blockAtrs = blockFtrs[1].split(",");
        }
        var blockCopies = document.getElementsByTagName(blockName)
        var blockCopiesArray = [...blockCopies];

        blockCopiesArray.forEach(function (copy) {
            var content = block.innerHTML;
            if (hasAtrs)
            {
                var copyAtrs = copy.className.split(',');
                blockAtrs.forEach(function (atr, index) {
                    content = content.replace("[" + atr + "]", copyAtrs[index]);
                });
            }
            copy.innerHTML = content;

            copy.style.display = 'block';
        });
        block.style.display = 'none';
    });

    var variables = document.getElementsByTagName('var');
    document.getElementsByTagName('variables')[0].style.display = 'none';
    variables = [...variables];
    var body = document.body.innerHTML;
    variables.forEach(function (elm) {
        var name = '[' + elm.className + ']';
        var value = elm.innerHTML;
        body = body.split(name).join(value);
    });
    document.body.innerHTML = body;

    document.getElementsByTagName('blocks')[0].style.display = 'none';
    document.getElementsByTagName('variables')[0].style.display = 'none';
    document.getElementsByTagName('imports')[0].style.display = 'none';
}

function SetVar (name, value)
{
    document.body.innerHTML = originalBody;
    document.getElementsByClassName(name)[0].innerHTML = value;
    FillCopies();
}

function error(message) {
    console.error("Error: " + message);
    return null;
}

processImports();
var originalBody = document.body.innerHTML;
FillCopies();