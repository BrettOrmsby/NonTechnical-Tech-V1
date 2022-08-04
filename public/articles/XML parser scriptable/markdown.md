I originally made a XML parser in scriptable for my [HTML Widget](https://github.com/Normal-Tangerine8609/Scriptable-HTML-Widget) project to replace the previous one. But if we find the right resource, XML parsing can be used for so much more!

Scriptable widgets regularly rely on data from outside sources to be presented and what data comes in the form of XML and is readable available? If you guessed [RSS feeds](https://www.lifewire.com/what-is-an-rss-feed-4684568) you would be correct!

So now let’s start to make a simple XML parser for Scriptable!

## Goal

Our goal is to make a XML parser to parse RSS feeds into a JSON that is easier to interact with in JavaScript.

Input:

```xml
<root>
  <node>
    <text>text node</text>
    <details>text node</details>
    <key>value</key>
  </node>
  <list>
    <item>text node</item>
    <item>text node</item>
    <item><tag>text node</tag></item>
    <key>value</key>
  </list>
</root>
```

Output:

```json
{
  "root": {
    "node": {
      "text": "text node",
      "details": "text node",
      "key": "value"
    },
    "list": {
      "item": [
        "text node",
        "text node",
        {
          "tag": "text node"
        }
      ],
      "key": "value"
    }
  }
}
```

Notice in this example how most tags are transformed so their tag name is a key in the JSON and their contents is changed to the key’s value. If the tag contents is simple text, the key value will be a string. If the tag has multiple values (children) the key value will be another object with those values stored. If a tag has multiple children of the same tag name, the key value will be an array.

## Part 1 To a DOM-like JSON

First we will convert the input to a [DOM](https://miro.medium.com/max/950/0*Sk5AAj4ze_bDFPA0.png)-like JSON using the incredibly useful (and native) [`XMLParser`](https://docs.scriptable.app/xmlparser/) class. 

The `XMLParser` class is exactly what we need for this project and has some properties that we will need to use.

- `didStartElement` runs the provided function with the name of the tag and attributes whenever the parser runs into a starting XML tag
- `didEndElement` runs the provided function whenever the parser runs into a closing XML tag
- `foundCharacters` runs the provided function with the found characters when the parser runs into character not in a tag
- `parseErrorOccurred` runs the provided function when a error occurs

Let’s create our `parseXML` function and prepare the `XMLParser` object.

```javascript
function parseXML(string) {
  let parser = new XMLParser(string)

  parser.didStartElement = (name, attrs) => {
  }
  parser.didEndElement = (name) => {
  }
  parser.foundCharacters = (text) => {
  }
  parser.parseErrorOccurred = () => {
    console.warn(
      "A parse error occurred, ensure the document is formatted properly."
    )
  }
}
```

Before we start to create the parser, we need to declare some variable at the top of the function. The `main` variable will store the root of the XML. Our root node and each other node in our DOM-like JSON will have a `name` key set to the tag name, a `children` key to store an array of it's children and an `attrs` key to store it's attributes. Our root node also has a `isRoot` key that will be used later in our parser. 

```javascript
function parseXML(string) {
  let main = {
    isRoot: true,
    name: "root",
    attrs: {},
    children: []
  }
  ...
}
```

Next, we will create a `target` variable to store the target node that we will manipulate (it will start with our root node, `main`). The target will change whenever the parser enters a new tag and will have to change back to the last target when leaving. To do this, we will also make a `goBack` variable to store `Symbol()`s leading back to the older target tag.

```javascript
  ...
  let main = {
    isRoot: true,
    name: "root",
    attrs: {},
    children: []
  }
  let target = main
  let goBack = {}
  ...
```

With the variables out of the way, we can start parsing. We will begin with entering a tag.

First we will create a unique symbol leading to the previous target in the `goBack` object. Now, we can make the new target and we will store the tag name, attributes (`attrs`), inner text, children and the symbol that we will latter use to go back to the previous target. We will push `newTarget` to the previous target’s `children` array and finally set `target` to `newTarget`.

```javascript
  ...
  parser.didStartElement = (name, attrs) => {
    let backTo = Symbol()
    goBack[backTo] = target
    let newTarget = {
      name,
      attrs,
      innerText: "",
      children: [],
      end: backTo
    }
    target.children.push(newTarget)
    target = newTarget
  }
  ...
```

Ending an element is much simpler. All we do is get the symbol leading the the previous target, delete that now useless key and set the target back to the previous target.

```javascript
  ...
  parser.didEndElement = (name) => {
    let sym = target.end
    delete target.end
    target = goBack[sym]
  }
  ...
```

When we find characters in the XML we need to check to see if our target already has some inner text and, if it does, add the found text with a space or, otherwise, set the inner text to the found characters.

```javascript
  ...
  parser.foundCharacters = (text) => {
    target.innerText +=
      target.innerText === "" ? text.trim() : " " + text.trim()
  }
  ...
```

The parser is almost done, now we just have to start the parser. 

```javascript
  ...
  parser.foundCharacters = (text) => {
   ...
  }
  parser.parse()
  ...
```

There is a small catch. The XML could be improperly formatted and cause an error for our parser that is undetected. The error generally removes all parent elements and makes the errored element the new root. The easy fix is to make sure `main` still has the `isRoot` property and then we will delete it because it is unnecessary.

```javascript
  ...
  parser.parse()
  if (!main.isRoot) {
    console.warn(
      "A parse error occurred, ensure the document is formatted properly."
    )
  }
  delete main.isRoot
  ...
```

And that finished the first part of the parser. If you test it with the test XML and log `main` you should get the following jumble of unworkable JSON.

Input:

```xml
<root>
  <node>
    <text>text node</text>
    <details>text node</details>
    <key>value</key>
  </node>
  <list>
    <item>text node</item>
    <item>text node</item>
    <item><tag>text node</tag></item>
    <key>value</key>
  </list>
</root>
```

Output:

```json
{
  "name": "root",
  "children": [
    {
      "name": "root",
      "attrs": {},
      "innerText": "",
      "children": [
        {
          "name": "node",
          "attrs": {},
          "innerText": "",
          "children": [
            {
              "name": "text",
              "attrs": {},
              "innerText": "text node",
              "children": []
            },
            {
              "name": "details",
              "attrs": {},
              "innerText": "text node",
              "children": []
            },
            {
              "name": "key",
              "attrs": {},
              "innerText": "value",
              "children": []
            }
          ]
        },
        {
          "name": "list",
          "attrs": {},
          "innerText": "",
          "children": [
            {
              "name": "item",
              "attrs": {},
              "innerText": "text node",
              "children": []
            },
            {
              "name": "item",
              "attrs": {},
              "innerText": "text node",
              "children": []
            },
            {
              "name": "item",
              "attrs": {},
              "innerText": "",
              "children": [
                {
                  "name": "tag",
                  "attrs": {},
                  "innerText": "text node",
                  "children": []
                }
              ]
            },
            {
              "name": "key",
              "attrs": {},
              "innerText": "value",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}
```

## Part 2 To a Readable JSON

Now we need to change what we saw above into a more readable and easier to work with JSON like below

```json
{
  "root": {
    "node": {
      "text": "text node",
      "details": "text node",
      "key": "value"
    },
    "list": {
      "item": [
        "text node",
        "text node",
        {
          "tag": "text node"
        }
      ],
      "key": "value"
    }
  }
}
```

To do this, we will leverage a bit of [recursion](https://en.m.wikipedia.org/wiki/Recursion_(computer_science)) and call a function on each node of `main`. We will start by returning our traversed `main` and creating the function to go over each node called `traverse`.

```javascript
  ...
  delete main.isRoot

  return traverse(main)
  function traverse(node) {
  }
  ...
```

We will begin our `traverse` function by creating a variable that will store a new node. We will then repeat with each child of the current node and end by returning `newNode`.

```javascript
  ...
  function traverse(node) {
    let newNode = {}
    for (let child of node.children) {
    }
    return newNode
  }
  ...
```

When we loop through all the children of the node we will first have to call `traverse` on them so we can reach all children in the DOM-like JSON. 

```javascript
  ...
    for (let child of node.children) {
      let newChild = traverse(child)
    }
  ...
```

In the loop, we will follow by updating `newNode` with the value from the traversed children. If the child has no children we will set `newChild` to a string of it’s inner text.

```javascript
  ...
      let newChild = traverse(child)
      if (child.children.length === 0) {
        newChild = child.innerText
      }
  ...
```

Next, we will check if the child’s tag name is already in `newNode`.  If it’s name is in `newNode` we need to turn the value into an array with the other values or, if it is already an array, we can push it to the array. If it’s tag name is not a key in `newNode` we can just set it to `newChild`.

```javascript
  ...
    for (let child of node.children) {
      ...
      if (newNode[child.name]) {
        if (Array.isArray(newNode[child.name])) {
          newNode[child.name].push(newChild)
        } else {
          newNode[child.name] = [newNode[child.name], newChild]
        }
      } else {
        newNode[child.name] = newChild
      }
    }
  ...
```

And there we have it. Our XML parser is complete. There are just a few notes before we continue to test it!

1. In Part 1 we never used the `attrs` value for the nodes. We still added it to the nodes for if you ever need to only use the DOM-like JSON of the XML.
2. Because we don’t collect the attributes for the nodes, our output JSON does not cover the full XML but it is easier to use the collected data and collects most of the information you will ever need.

<details>
<summary><span class="primary">View Full Code</span></summary>

```javascript
function parseXML(string) {

  let main = {
    isRoot: true,
    name: "root",
    attrs: {},
    children: []
  }
  let target = main
  let goBack = {}

  let parser = new XMLParser(string)

  parser.didStartElement = (name, attrs) => {
    let backTo = Symbol()
    goBack[backTo] = target
    let newTarget = {
      name,
      attrs,
      innerText: "",
      children: [],
      end: backTo
    }
    target.children.push(newTarget)
    target = newTarget
  }

  parser.didEndElement = (name) => {
    let sym = target.end
    delete target.end
    target = goBack[sym]
  }

  parser.foundCharacters = (text) => {
    target.innerText +=
      target.innerText === "" ? text.trim() : " " + text.trim()
  }

  parser.parseErrorOccurred = () => {
    console.warn(
      "A parse error occurred, ensure the document is formatted properly."
    )
  }

  parser.parse()

  if (!main.isRoot) {
    console.warn(
      "A parse error occurred, ensure the document is formatted properly."
    )
  }
  delete main.isRoot

  return traverse(main)

  function traverse(node) {
    let newNode = {}
    for (let child of node.children) {
      let newChild = traverse(child)

      if (child.children.length === 0) {
        newChild = child.innerText
      }

      if (newNode[child.name]) {
        if (Array.isArray(newNode[child.name])) {
          newNode[child.name].push(newChild)
        } else {
          newNode[child.name] = [newNode[child.name], newChild]
        }
      } else {
        newNode[child.name] = newChild
      }
    }
    return newNode
  }
}
```

</details>

## Testing

Now that we have our XML parser complete we can start to test it on one of the [many](https://github.com/plenaryapp/awesome-rss-feeds)  RSS feeds. I will use the [Shareable](https://shareable.vercel.app) [feed](https://shareable.vercel.app/feed) because it relates more to what we are using.

We just need to use some simple code to make the request and then we can see how well our XML parser works.

```javascript
const req = new Request("https://shareable.vercel.app/feed")
const xml = await req.loadString()
const data = parseXML(xml)
console.log(JSON.stringify(data, null, 2))

function parseXML(string) {
  ...
}
```

And we get something like the below with more items in the `item` array.

```json
{
  "rss": {
    "channel": {
      "title": "Shareable feed",
      "description": "Shareable feed",
      "link": "https://shareable.vercel.app",
      "image": {
        "url": "https://shareable.vercel.app/logo.png",
        "title": "Shareable feed",
        "link": "https://shareable.vercel.app"
      },
      "generator": "RSS for Node",
      "lastBuildDate": "Mon, 01 Aug 2022 17:39:27 GMT",
      "atom:link": "",
      "item": [
        {
          "title": "Shareable - New home screen widget published!",
          "description": "rik-rosseel just published their new <b>home screen widget</b>: <a href=\"https://shareable.vercel.app/script/32\">Launch Schedule</a>",
          "link": "https://shareable.vercel.app/script/32",
          "guid": "https://shareable.vercel.app/script/32",
          "pubDate": "Thu, 21 Jul 2022 00:00:00 GMT"
        },
        ...
      ]
    }
  }
}
```

Because the data is so easy to use, I will make a simple Shareable widget.

```javascript
const req = new Request("https://shareable.vercel.app/feed")
const xml = await req.loadString()
const data = parseXML(xml)

const latest = data.rss.channel.item[0]

const widget = new ListWidget()
widget.url = latest.link
widget.setPadding(0, 0, 0, 0)

let header = widget.addStack()
header.setPadding(10, 10, 5, 10)
header.backgroundColor = Color.blue()
header.addSpacer()

let title = header.addText(latest.title)
title.centerAlignText()
title.textColor = Color.white()
title.font = Font.boldSystemFont(10)
title.minimumScaleFactor = 0.5
title.lineLimit = 3

header.addSpacer()

widget.addSpacer()

let body = widget.addStack()
body.setPadding(5, 10, 10, 10)
body.layoutVertically()

let description = body.addText(latest.description.replace(/<[^>]*?>/g, ""))
description.font = Font.regularSystemFont(12)
description.minimumScaleFactor = 0.5

body.addSpacer(5)

let published = body.addText(new Date(latest.pubDate).toDateString())
published.font = Font.regularSystemFont(10)
published.minimumScaleFactor = 0.5
published.textColor = Color.blue()

widget.addSpacer()

Script.setWidget(widget)
widget.presentSmall()

function parseXML(string) {
  ...
}
```

![Widget Image](./widget.png)

## Conclusion

And voilà, that is how easy it is to use our simple XML parser to make widgets. Thanks for reading and I hope you share the widgets you make on the Scriptable Discord, [Reddit community](https://www.reddit.com/r/Scriptable/), or [Shareable](https://shareable.vercel.app)!