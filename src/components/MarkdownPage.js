import React, { useState } from 'react'
import marked from 'marked'
import { Accordion, Card, Button } from 'react-bootstrap'
import './MarkdownPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'


export default function MarkdownPage() {
    const [editorInput, setEditorInput] = useState(placeholder)

    let changehandler = (e) => {
        setEditorInput(e.target.value)
    }

    marked.setOptions({
        breaks: true
    })

   const renderer = new marked.Renderer();
   renderer.link = function(href, title, text) {
     return `<a target="_blank" href="${href}">${text}</a>`
   }
      
    return (
        <div className="wrap markdown">
            <Accordion defaultActiveKey="0">
                <Card>
                    <CardHeader name="editor" eventKey="0" />
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <textarea 
                                id="editor"
                                value={editorInput}
                                onChange={changehandler}
                                >
                            </textarea>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="1">
                <Card className="mb-3">
                    <CardHeader name="previewer" eventKey="1" />
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: marked(editorInput, { renderer: renderer })
                                }}
                                id='preview'
                            /> 
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}


function CardHeader({ name, eventKey }) {
    return (
        <Card.Header>
            {name}
            <Accordion.Toggle eventKey={eventKey} as={Button} variant="link" className="text-white">
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
            </Accordion.Toggle>
        </Card.Header>
    )
}

const placeholder = 
//© freecodecamp.org 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course, there are lists.
    - Some are bulleted.
        - With different indentation levels.
            - That looks like this.
            
1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![alejandracol logo](https://github.com/alejandracol/front-end-libraries-projects/blob/main/src/multimedia/logo.jpg?raw=true)
`;