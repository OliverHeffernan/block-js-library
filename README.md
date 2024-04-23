# Block.js
## What is it?
Block.js is a lightweight, simple-to-use JavaScript front-end framework. It makes it extremely simple to have multiple similar elements, without extremely repetitive code.
## Features
### Repeatable blocks: 
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
This allows the developer to have seperate files for the blocks to be imported from. This means that these files can be imported into each page of the website. This is very useful for things like navbars, which should be exactly the same on each page of the website. (This feature only works when the website is being run on a server; localhost will work.)
### Block Attributes:
When you have multiple copies of an element on your webpage, but they each have slight differences. e.g. A product container on an online shopping website, the same container, but with a different image, title, and other attributes. On a block, you can have attributes, that can be set for each copy of the block.
```html
<blocks>
    <block class="egblock a1,a2,a3">
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
