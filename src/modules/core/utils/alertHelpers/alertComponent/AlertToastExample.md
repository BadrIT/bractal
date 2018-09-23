### Basic Example

```js
    <AlertToastExample 
        topFullWidth
        messageText="Hi Sarah"
        type="info"
    />     
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
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="warning"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="success"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
                type="info"
            />
            <AlertToastExample 
                topFullWidth
                messageText="Alert Toast"
            />
        </Column>
    </Examples>
```