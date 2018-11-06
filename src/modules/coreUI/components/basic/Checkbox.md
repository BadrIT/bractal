### Basic Example

```js
  <VerticalExamples>
    <Checkbox md checked label='Checked Example !' />
    <Checkbox md label='Un checked Example !'/>
  </VerticalExamples>
```

### Sizes
You can go with the normal version, or inverted one
```js
  <VerticalExamples>
    <Checkbox xs checked label='Checked Example !' />
    <Checkbox sm checked label='Checked Example !' />
    <Checkbox checked label='Checked Example !' />
    <Checkbox lg checked label='Checked Example !' />
    <Checkbox xl checked label='Checked Example !' />
  </VerticalExamples>
```

### Type
Two types are supported, `Primary` &amp; `Secondary`
```js
  <VerticalExamples>
    <Checkbox checked label='Primary !' />
    <Checkbox secondary checked label='Secondary !' />
  </VerticalExamples>
```

### Fill
You can go with the normal version, or inverted one
```js
  <VerticalExamples>
    <Checkbox inverted checked label='Primary Inverted !' />
    <Checkbox inverted secondary checked label='Secondary Inverted !' />
  </VerticalExamples>
```


### Disabled State
You can go with the disabled version, or normal one
```js
  <Examples>
    <VerticalExamples>
      <Checkbox checked />
      <Checkbox disabled checked />
    </VerticalExamples>
    <VerticalExamples>
      <Checkbox inverted checked />
      <Checkbox disabled inverted checked />
    </VerticalExamples>
    <VerticalExamples>
      <Checkbox secondary checked />
      <Checkbox disabled secondary checked />
    </VerticalExamples>
    <VerticalExamples>
      <Checkbox secondary inverted checked label='Normal....' />
      <Checkbox disabled secondary inverted checked label='Disabled....' />
    </VerticalExamples>
  </Examples>
```

### Border Radius
```js
  <VerticalExamples>
    <Checkbox checked label='Normal' />
    <Checkbox secondary fullRound label='Full Round' />
  </VerticalExamples>
```

### Responsive Size

```js
  <Examples leftAligned testForScreens={['xsmall', 'mobile', 'tablet', 'desktop', 'largeDesktop']}>
    <Checkbox
      checked
      size={['xs', 'sm', 'md', 'lg', 'xl']}
      label='Responsive Label, try to resize the screen to see the effect.'
    />
  </Examples>
```

### Space Props

It accept all the standard space props

```js
  <VerticalExamples>
    <Checkbox p={5} checked label='Padding' />
    <Checkbox minWidth={6} checked label='Width' />
    <Checkbox minHeight={6} checked label='Height' />
    <Checkbox margin={2} checked label='Margin' />
  </VerticalExamples>
```

### Label Styles

Almost all label styles, but with 'label_' prefix

```js
  <VerticalExamples>
    <Checkbox label_bold checked label='Bold Label' />
    <Checkbox label_important label_bold checked label='Important/bold Label' />
    <Checkbox label_xl checked label='Large Label' />
  </VerticalExamples>
```
