This would draw a horizonal/vertical separator

### Basic Example

```js
  <VerticalExamples fullWidth centerAligned>
    Some text above the separator
    <Separator separatorColorTone='dark'/>
    Some text below the separator
  </VerticalExamples>
```

### Separator Length

```js
  <VerticalExamples fullWidth centerAligned>
    Small Separator
    <Separator separatorLength='small' separatorColorTone='dark'/>
    Normal Separator
    <Separator separatorLength='normal' separatorColorTone='dark'/>
    Large Separator
    <Separator separatorLength='large' separatorColorTone='dark'/>
    XLarge Separator
    <Separator separatorLength='xLarge' separatorColorTone='dark'/>
    Full Separator
    <Separator separatorLength='full' separatorColorTone='dark'/>
  </VerticalExamples>
```

### Separator Weights

```js
  <VerticalExamples fullWidth centerAligned>
    Thin Separator
    <Separator separatorWeight='thin' separatorColorTone='dark'/>
    Normal Separator
    <Separator separatorWeight='normal' separatorColorTone='dark'/>
    Bold Separator
    <Separator separatorWeight='bold' separatorColorTone='dark'/>
  </VerticalExamples>
```

### Separator Color

```js
  <VerticalExamples fullWidth centerAligned>
    Light Separator
    <Separator separatorColorTone='light' />
    Normal Separator
    <Separator separatorColorTone='normal' />
    Dark Separator
    <Separator separatorColorTone='dark' />
  </VerticalExamples>
```

### Vertical

```js
  <Examples fullWidth centerAligned height={20}>
    Small Separator
    <Separator vertical separatorLength='small' separatorColorTone='dark'/>
    Normal Separator
    <Separator vertical separatorLength='normal' separatorColorTone='dark'/>
    Large Separator
    <Separator vertical separatorLength='large' separatorColorTone='dark'/>
    XLarge Separator
    <Separator vertical separatorLength='xLarge' separatorColorTone='dark'/>
    Full Separator
    <Separator vertical separatorLength='full' separatorColorTone='dark'/>
  </Examples>
```