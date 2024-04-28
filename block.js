const usingBlocks = document.getElementsByTagName('blocks')[0] !== undefined;
const usingVariables = document.getElementsByTagName('variables')[0] !== undefined;
const usingImports = document.getElementsByTagName('imports')[0] !== undefined;

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

    xhr.open("GET", url, false); // Prepare the request
    xhr.send(); // Send the request

    // Return the response text if the request was successful
    return xhr.status === 200 ? xhr.responseText : error("Failed to import file: " + url);
}

/**
 * This function is used to process the page and populate the blocks, variables.
 * Additinally, hide the <blocks>, <variables>, and <imports> tags.
 */
function populatePage() {
    if (usingBlocks) {
        populateBlocks();
        document.getElementsByTagName('blocks')[0].style.display = 'none';
    }

    if (usingVariables) {
        populateVariables();
        document.getElementsByTagName('variables')[0].style.display = 'none';
    }

    if (usingImports)
        document.getElementsByTagName('imports')[0].style.display = 'none';
}

/**
 * This function populates all 'block' elements in the document.
 */
function populateBlocks() {
    // Get an array of all 'block' definitions in the document
    const blockDefinitions = Array.from(document.getElementsByTagName('block'));

    // Ensure there are block definitions
    if (blockDefinitions.length === 0)
        return error("No block definitions found within the <blocks> tag. Please ensure you have at least one block definition within the <blocks> tag, or remove the <blocks> tag if you are not using blocks.")

    // Iterate over each 'block' definition
    blockDefinitions.forEach(function (blockDef) {
        // Get the attributes of the block definition
        const blockClassName = blockDef.className;
        const blockAttributes = blockClassName.includes('-') ? blockClassName.split(' ')[0].split('-')[1].split(',') : null;

        // Get the name of the block element
        const blockName = blockAttributes !== null ? blockClassName.split(' ')[0].split('-')[0] : blockClassName;
        
        // Get an array of all 'block' elements in the document
        const blockElements = Array.from(document.getElementsByTagName(blockName));

        // Ensure there are block elements by the definition
        if (blockElements.length === 0)
            return error("No block elements found for block definition: " + blockName + ". Please ensure you have at least one block element with the name '" + blockName + "'.");

        // Iterate over each 'block' element
        blockElements.forEach(function (element) {
            // Initially set element content to block definition content
            let elementContent = blockDef.innerHTML;
            if (blockAttributes !== null) {
                // Apply attributes from block definition to block element
                const elementAttributes = element.className.split(',');
                blockAttributes.forEach(function (attribute, index) {
                    elementContent = elementContent.replace("[" + attribute + "]", elementAttributes[index]);
                });
            }
            element.innerHTML = elementContent;
            element.style.display = 'block';
        });
        blockDef.style.display = 'none';
    });
}

/**
 * This function populates all 'ref' elements in the document with their related variables.
 */
function populateVariables() {
    // Get references and variables
    const references = Array.from(document.getElementsByTagName('ref'));
    const variables = Array.from(document.getElementsByTagName('var'));

    // Ensure there are variables and references
    if (variables.length === 0)
        return error("No variable elements found within the <variables> tag. Please ensure you have at least one variable element within the <variables> tag, or remove the <variables> tag if you are not using variables");

    if (references.length === 0)
        return error("No reference elements found within the document, but you have variables. Please ensure you have at least one reference element for each variable, or remove unused variables.");

    // Loop through each reference element
    references.forEach(reference => {
        // Get the class name prefix of the reference
        const referenceClassName = reference.className.split('-')[0];

        // Find the corresponding variable element
        const correspondingVariable = variables.find(variable => {
            const variableClassName = variable.className.split('-')[0];
            return variableClassName === referenceClassName;
        });

        if (correspondingVariable)
            reference.innerHTML = correspondingVariable.innerHTML;
        else
            return error("No variable found for reference: " + referenceClassName);
    });
}

function setVar (name, value)
{
    var variables = document.getElementsByTagName('var');
    variables = [...variables];
    var existing = false;
    variables.forEach(function (variable) {
        var atrs = variable.className.split('-');
        if (atrs[0] == name)
        {
            variable.innerHTML = value;
            existing = true;
            if (atrs[1] == 'save')
            {
                localStorage.setItem(name, value);
            }
        }
    });
    if (!existing)
    {
        var newVar = document.createElement('var');
        var variables = document.getElementsByTagName('variables');
        variables.appendChild(newVar);
    }
    fillCopies();
}

function loadSavedVars ()
{
    var variables = document.getElementsByTagName('var');
    variables = [...variables];
    variables.forEach(function (variable) {
        var atrs = variable.className.split('-');
        if (atrs[1] == 'save')
        {
            if (localStorage.getItem(atrs[0]) != null)
            {
                variable.innerHTML = localStorage.getItem(atrs[0]);
            }
        }
    });
}

function getVar (name)
{
    var variables = document.getElementsByTagName('var');
    variables = [...variables];
    variables.forEach(function (variable) {
        var atrs = variable.className.split('-');
        if (atrs[0] == name)
        {
            return variable.innerHTML;
        }
    });
}

function numberOfCopies (name)
{
    return document.getElementsByTagName(name).length;
}

function copyBlock (name, parent, atrs)
{
    var newCopy = document.createElement(name);
    newCopy.className = atrs;
    var parentElm = document.querySelector(parent); 
    parentElm.appendChild(newCopy);
    populateBlocks();
}

function error(message) {
    console.error("Error: " + message);
    return null;
}

console.log('block.js has been successfully loaded and is ready for use.');
processPage();
loadSavedVars();
populateBlocks();