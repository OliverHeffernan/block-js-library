function importFromFile(url)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false); // Synchronous request
    xhr.send();

    if (xhr.status === 200)
    {
        return xhr.responseText;
    }
    else
    {
        return null; // Error handling, you can adjust this as needed
    }
}

var tempImports = document.getElementsByTagName("imports");
if (tempImports.length > 1)
{
    console.log("Error: you should only have 1 imports tag. To have more than one import, seperate each file directory with a comma.");
}
else if (tempImports.length == 1)
{
    tempImports[0].style.display = "none";
    var imports = tempImports[0].innerHTML.split(",");
    imports.forEach(function (file) {
        var temp = document.getElementsByTagName("blocks")[0].innerHTML;
        document.getElementsByTagName("blocks")[0].innerHTML = importFromFile(file) + temp;
    });
}

var originalBody = document.body.innerHTML;

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

FillCopies();