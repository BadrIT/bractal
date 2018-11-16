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

### Loading Icon
```js
    <Examples>
        <Button xs tight loading inverted>Click This</Button>    
        <Button xs loading inverted>Click This</Button>   
        <Button sm loading inverted>Click This</Button>        
        <Button sm loading inverted>Click This</Button>
        <Button md loading secondary>Click This</Button>        
        <Button lg loading secondary inverted>Click This</Button>
        <Button xl loading secondary>Click This</Button>        
        <Button xxl loading secondary inverted>Click This</Button>
    </Examples>
```

### Arbitrary Icon
```js
    <Examples>
        <Button iconName='far fa-save'>Click This</Button>
        <Button loading iconName='far fa-save'>Click This</Button>
        <Button loading inverted iconName='far fa-save'>Click This</Button>
        <Button loading secondary iconName='far fa-save'>Click This</Button>        
        <Button loading secondary inverted iconName='far fa-save'>Click This</Button>
    </Examples>
```


### Label Style
semiBold, bold & extraBold are supported
```js
    <Examples>
        <Button>Regular</Button>
        <Button semiBold>Semi Bold (600)</Button>
        <Button bold>Bold (700)</Button>
        <Button extraBold>Extra Bold (900)</Button>
    </Examples>
```

### Using size prop
semiBold, bold & extraBold are supported
```js
    <Examples>
        <Button size="xl">Click This</Button>
        <Button size="lg">Click This</Button>
        <Button>Click This</Button>
        <Button size="sm">Click This</Button>
        <Button size="xs">Click This</Button>  
    </Examples>
```

### Responsive button size

This text size will be :

- xs -> On media size from the XSmall devices and below
- sm -> On media size from the XSmall devices and above 
- md -> On media size from the Mobile devices and above 
- lg -> On media size from the Tablet devicesand above 
- xl -> On media size from the Desktop devices and above 
- xxl -> On media size from the Large Desktop devices and above 


```js
    <Examples>
        <Button important size={['xs', 'sm', 'md', 'lg', 'xl', 'xxl']}>
          Responsive Button
        </Button>
    </Examples>
```

### Padding customizations

#### Normal, tight, custom

```js
    <Examples>
        <Button tight>Normal</Button>
        <Button>Normal</Button>
        <Button pxRatio={4}>Wide horizontal Padding</Button>
    </Examples>
```

#### Full Width

```js
    <Examples fullWidth>
        <Button block>Normal</Button>
    </Examples>
```