### Basic Example

```js
  <Label>The quick brown fox jumps over the lazy dog</Label>
```

### Sizing 

```js
  <VerticalExamples>        
    <Label xs>The quick brown fox jumps over the lazy dog</Label>
    <Label sm>The quick brown fox jumps over the lazy dog</Label>
    <Label>The quick brown fox jumps over the lazy dog</Label>
    <Label lg>The quick brown fox jumps over the lazy dog</Label>
    <Label xl>The quick brown fox jumps over the lazy dog</Label>
  </VerticalExamples>
```

### Colors 

```js
  <VerticalExamples>        
    <Label hint>The quick brown fox jumps over the lazy dog</Label>
    <Label subtle>The quick brown fox jumps over the lazy dog</Label>    
    <Label normal>The quick brown fox jumps over the lazy dog</Label>
    <Label emphasized>The quick brown fox jumps over the lazy dog</Label>
    <Label important>The quick brown fox jumps over the lazy dog</Label>
  </VerticalExamples>
```

### Weights

3 weights are supported, normal, semiBold & Bold

```js
  <VerticalExamples>        
    <Label important>The quick brown fox jumps over the lazy dog</Label>
    <Label semiBold important>The quick brown fox jumps over the lazy dog</Label> 
    <Label bold important>The quick brown fox jumps over the lazy dog</Label>
    <Label extraBold important>The quick brown fox jumps over the lazy dog</Label>
  </VerticalExamples>
```

### Inverted Mode 

```js
  <VerticalExamples style={{backgroundColor: 'blue'}}>        
    <Label inverted hint>The quick brown fox jumps over the lazy dog</Label>
    <Label inverted subtle>The quick brown fox jumps over the lazy dog</Label> 
    <Label inverted normal>The quick brown fox jumps over the lazy dog</Label>
    <Label inverted emphasized>The quick brown fox jumps over the lazy dog</Label>
    <Label inverted important>The quick brown fox jumps over the lazy dog</Label>
  </VerticalExamples>
```

### Responsive Font Sizes

This text size will be :

- xs -> On media size from the XSmall devices and above 
- sm -> On media size from the Mobile devices and above 
- md -> On media size from the Tablet devicesand above 
- lg -> On media size from the Desktop devices and above 
- xl -> On media size from the Large Desktop devices and above 

```js
  <VerticalExamples testForScreens={['xsmall', 'mobile', 'tablet', 'desktop', 'largeDesktop']}>
    <Label semiBold important size={['xs', 'sm', 'md', 'lg', 'xl']}>
      Responsive Label, I'll show up differently on each screen size.
    </Label>
  </VerticalExamples>
```
