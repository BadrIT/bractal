### Basic Example

```js
    <AlertToastExample 
        topFullWidth
        messageText="Alert Toast"
        type="info"
    />     
```
### Sizing 

```js
    <Examples fullWidth>
        <Column spaceBetween="1" fullWidth>  
            <AlertToastExample
                xs 
                topFullWidth
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample
                sm
                topFullWidth
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample
                lg
                topFullWidth
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample
                xl
                topFullWidth
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
        </Column>
    </Examples>

```

### Type 
Five types are supported, error, warning, success, info and default
```js
    <Examples fullWidth>
        <Column spaceBetween="1" fullWidth>      
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="error"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="warning"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="success"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
        </Column>
    </Examples>
```

### Button Action
```js
    <AlertToastExample 
        topFullWidth
        messageText="Alert Toast"
        type="info"
        buttonAction={() => console.log("action triggered !!")}
        buttonText="Click for action !"
    />
```

### Custom Style
```js
    <AlertToastExample 
        topFullWidth
        messageText="Alert Toast"
        type="info"
        buttonAction={() => console.log("action triggered !!")}
        buttonText="Click for action !"
        color="#005e8b"
        backgroundColor="#03528033"
        opacity="0.7"
    />
```

### Custom Component
```js
    <AlertToastExample 
        topFullWidth
        type="info"
        component={
            <div style={{display: 'flex', justifyContent: 'center'}}> Alert Toast </div>
        }
    />
```
### Position 
```js
    <Examples fullWidth style={{height: '400px', backgroundColor: '#cccccc'}}>
        <Column spaceBetween="25" fullWidth>      
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            /> 
            <AlertToastExample 
                messageText="Alert Toast"
                type="info"
                buttonAction={() => console.log("action triggered !!")}
                buttonText="Click for action !"
            />
        </Column>
    </Examples>
```
