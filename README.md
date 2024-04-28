# Block.js
# What is it?
Block.js is an open-source, lightweight, simple-to-use JavaScript front-end framework. It makes it extremely simple to have multiple similar elements, without extremely repetitive code.

# Importing block.js
Copy this line of code into the bottom of the body of any page using block.js.

```html
<script src="https://cdn.jsdelivr.net/gh/OliverHeffernan/block-js-library@latest/block.js"></script>
```
#### Simple localhost:
The import feature will only work when the website is being hosted. A localhost would be suitable for testing and development purposes. There is more about the imports feature below.
Simple way to set up localhost.
<ol>
    <li>If not already installed, install python.</li>
    <li>Open terminal/command prompt at project folder.</li>
    <li>
        Type command
        
```yaml
python3 -m http.server 8000
```
</li>
</ol>

# Features
## Repeatable blocks: 
This is the main feature, it allows the developer to write a block once, and never have to repeat it again throughout the website.

```html
<blocks>
    <block class="egblock">
        <table>
            <tr>
                <td>text 1</td>
                <td>text 2</td>
                <td>text 3</td>
            </tr>
        </table>
    </block>
</blocks>
<egblock></egBlock>
```

Within the blocks tag, we define what the egblock tag will have within it. Then we can repeat this by placing a egblock tag anywhere on the page.
### Imports:
This allows the developer to have seperate files for the blocks to be imported from. This means that these files can be imported into each page of the website. This is very useful for things like navbars, which should be exactly the same on each page of the website. (This feature only works when the website is being run on a server; localhost will work.)<br><br>
navbar.html

```html
<block class="navbar">
    <ul>
        <li>Home</li>
        <li>About Us</li>
    </ul>
</block>
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <imports>navbar.html</imports>
    <blocks></blocks>
    <navbar></navbar>
</body>
</html>
```
        
</li>
    <li>Open link 'http://localhost:8000' in a web browser.</li>
    <li>To terminate the localhost session, go back to the terminal/command prompt. Then use the keyboard shortcut control+c</li>
</ol>

### Block Attributes:
When you have multiple copies of an element on your webpage, but they each have slight differences. e.g. A product container on an online shopping website, the same container, but with a different image, title, and other attributes. On a block, you can have attributes, that can be set for each copy of the block.

```html
<blocks>
    <block class="egblock-a1,a2,a3">
        <table>
            <tr>
                <td>[a1]</td>
                <td>[a2]</td>
                <td>[a3]</td>
            </tr>
        </table>
    </block>
</blocks>
<egblock class="text 1,text 2,text 3"></egBlock>
<egblock class="text 1,Hello,text 3"></egBlock>
```

In the block, the name of each attribute is listed in the className, seperated by a comma. Then to reference the attributes within the block, you put the attribute name within square brackets. <br>
Then, in the copy of the block, set the className to a list of the values of each attribute seperated by commas.

### copyBlock (name, parent, atrs)
#### Parameters:
<ul>
    <li>Name: The name of the block that is being copied.</li>
    <li>Parent: A string to which would be entered into the query selector function to access the desired parent of the new copy.</li>
    <li>Atrs: the attributes of the new copy of the block.</li>
</ul>

An example of how this could be used is in a simple todo list.
task.html

```html
<block class="task-name">
    <table id="task">
        <tr>
            <td>[name]</td>
        </tr>
    </table>
</block>
```

todo.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo</title>
</head>
<body>
    <imports>task.html</imports>
    <blocks></blocks>
    <variables>
    </variables>
    <div id="tasks"></div>
    <input id="taskInput" type="text">
    <button onclick="copyBlock('task', '#tasks', document.getElementById('taskInput').value)">Add</button>
</body>
<script src="block.js"></script>
</html>
```

### numberOfCopies(name)
This function returns the number of copies of a specified block.
<ul>
    <li>Name: the name of the block.</li>
</ul>

## Variables
When there is a value that is string value that is used multiple times throughout the page, you can use a block.js variable.
<br>
An example of this is when the username is repeated several times throughout the page.
<br>
Variables are set within the variables tag, which is within the body. A variable is set using a var tag.
<br>
The name of the variable is set using the className, while the value is set using the content of the var tag.

```html
<body>
    <variables>
        <var class='username'>John Doe</var>
    </variables>
    <p>Welcome to the website <ref class='username'></ref>.</p>
</body>
```

### setVar(name, value)
#### Parameters:
<ul>
    <li>name: The variable name e.g. 'username'</li>
    <li>value: The value of the variable e.g. 'John Doe'</li>
</ul>
To change the value of a variable, simply use the setVar function.

```javascript
setVar(name, value);
```

A great way to use this function is to set it as the onclick function for a button, and setting the value as the value of a input field. This is useful for allowing users to enter their username.

```html
<body>
    <variables>
        <var class='username></var>
    </variables>
    <input id='nameInput' type='text'>
    <button onclick='setVar("username", document.getElementById("nameInput").value)'>Submit</button>
    <p>Welcome to this website <ref class='username'></ref>
</body>
```

When using this function, if the variable name provided does not already exist, it will create a new variable.
            
### Saved Variables
You can also set a variable to be saved in the localStorage of the user's device.
<br>
This is done by setting the className of the var tag to the name of the variable and the word save, seperated by a hyphen. An example is shown below.

```html
<var class='username-save'>John Doe</var>
```

### getVar(name)
#### Parameters:
<ul>
    <li>name: The name of the variable</li>
</ul>
This function returns the value of a specified variable. Can be called in any javaScript.
