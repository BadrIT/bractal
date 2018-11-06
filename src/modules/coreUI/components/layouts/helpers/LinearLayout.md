This is a thin wrapper around the native FlexBox implementation.


### Basic Example

```js
    <LinearLayout>
      <Box />
      <Box color="red" />
      <Box />
      <Box color="red" />
    </LinearLayout>    
```

### Rows & Columns 

#### Rows
```js
    <LinearLayout row>
      <Box />
      <Box color="red" />
      <Box />
      <Box color="red" />
    </LinearLayout>  
```
#### Columns
```js
    <LinearLayout column>
      <Box />
      <Box color="red" />
      <Box />
      <Box color="red" />
    </LinearLayout>  
```
#### Short Hand
```js
    <Row>
      <Column>
        <Box />
        <Box color="red" />
        <Box />
        <Box color="red" />
      </Column>  
      <Column>
        <Box />
        <Box color="red" />
        <Box />
        <Box color="red" />
      </Column> 
    </Row>
```

### Spacing 
By default, spaceBetween of 1 = 10px
```js
    <Row spaceBetween="1">
      <Column spaceBetween="1">
        <Box />
        <Box color="red" />
        <Box />
        <Box color="red" />
      </Column>  
      <Column spaceBetween="1">
        <Box />
        <Box color="red" />
        <Box />
        <Box color="red" />
      </Column> 
    </Row>
```

### Rows Alignment & Justification
Most of these are direct mappers for Flex Box layout options
#### Default
```js
    <Row spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Row>
```
#### Align Top
```js
    <Row topAligned spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Row>
```
#### Align Bottom
```js
    <Row bottomAligned spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Row>
```
#### Pull Right
```js
    <Row fullWidth rightJustified spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Row>
```
#### Center
```js
    <Row fullWidth centerJustified spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Row>
```


### Columns Alignment, Space Distribution & Justification 
Most of these are direct mappers for Flex Box layout options
#### Default
```js
    <Column spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Align Left
```js
    <Column leftAligned spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Align Right
```js
    <Column rightAligned spaceBetween="1">      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Pull Bottom
```js
    <Column bottomJustified spaceBetween="1" style={{height: '400px', backgroundColor: '#cccccc'}}>       
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Pull Top
```js
    <Column topJustified spaceBetween="1" style={{height: '400px', backgroundColor: '#cccccc'}} >      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Pull Middle
```js
    <Column centerJustified spaceBetween="1" style={{height: '400px', backgroundColor: '#cccccc'}} >      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Space Between
```js
    <Column spaceBetweenJustified style={{height: '400px', backgroundColor: '#cccccc'}} >      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Space Around
```js
    <Column spaceAroundJustified style={{height: '400px', backgroundColor: '#cccccc'}} >      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
#### Space Evenly
```js
    <Column spaceEvenlyJustified style={{height: '400px', backgroundColor: '#cccccc'}} >      
      <Box />
      <Box color="red" size={9}/>
      <Box />
      <Box color="red" size={4.5}/>      
    </Column>
```
