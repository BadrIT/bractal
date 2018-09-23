### Basic Example

```js
  <VerticalExamples>
    <Checkbox checked label='Checked Example !' />
    <Checkbox label='Un checked Example !'/>
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