# iLUMINA

1. LOAD text
2. Annotate by Highlighting

```json
{
paragraphs:{[
id: ""
words: [{
  "w": "Lorem",
  "g": "[0,1,2]",
  "color": "#ffff",
  "id": "j5"
}]
]
}
```

TXT => JSON => HTMl

## Server

GET /text/{text_id}
POST /text
PATCH /text/{text_id}

## App

- gets JSON
- displays it as text

1. DOCUMENT => { PARSER } => JSON => DB
2. DB => JSON => { RENDER } => HTML
3. ANNOTATIONS => { OBSERVER } => JSON => { ANALYZIS } => 2. [INTERACTION LOOP]
