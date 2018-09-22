### Basic Example

```js
    <Button>Click This</Button>    
```

### Sizing 

```js
    <Examples>        
        <Button xl>Click This</Button>
        <Button lg>Click This</Button>
        <Button>Click This</Button>
        <Button sm>Click This</Button>
        <Button xs>Click This</Button>    
    </Examples>
```

### Types 
Two types are supported, `Primary` &amp; `Secondary`
```js
    <Examples>
        <Button>Click This</Button>
        <Button secondary>Click This</Button>
    </Examples>
```

### Fill
You can go with the normal version, or inverted one
```js
    <Examples>
        <Button>Click This</Button>
        <Button inverted>Click This</Button>
        <Button inverted secondary>Click This</Button>
    </Examples>
```

### Disabled State
You can go with the disabled version, or normal one
```js
    <Examples>
        <Column spaceBetween={1}>
            <Button>Click This</Button>
            <Button disabled>Click This</Button>
        </Column>
        <Column spaceBetween={1}>
            <Button inverted>Click This</Button>
            <Button disabled inverted>Click This</Button>
        </Column>
        <Column spaceBetween={1}>
            <Button secondary>Click This</Button>
            <Button disabled secondary>Click This</Button>
        </Column>        
        <Column spaceBetween={1}>
            <Button inverted secondary>Click This</Button>
            <Button disabled inverted secondary>Click This</Button>
        </Column>
    </Examples>
```

### Corners
You can go for a full circle corner
```js
    <Examples>
        <Button fullRound>Click This</Button>
        <Button fullRound inverted>Click This</Button>
    </Examples>
```

### Label Style
Only bold is supported
```js
    <Examples>
        <Button bold>Click This</Button>
        <Button bold inverted>Click This</Button>
    </Examples>
```