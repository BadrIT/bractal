### Basic Example

```js
  <Examples fullWidth>
    <PopupSelect />   
  </Examples>
```

### Trigger Size

```js
  <Examples fullWidth>
    <VerticalExamples fullWidth>
      Primary
      <PopupSelect trigger_xs />
      <PopupSelect trigger_sm />
      <PopupSelect trigger_md />
      <PopupSelect trigger_lg />
      <PopupSelect trigger_xl />
    </VerticalExamples>
    <VerticalExamples fullWidth>
      Primary Inverted
      <PopupSelect trigger_xs trigger_inverted />
      <PopupSelect trigger_sm trigger_inverted />
      <PopupSelect trigger_md trigger_inverted/>
      <PopupSelect trigger_lg trigger_inverted />
      <PopupSelect trigger_xl trigger_inverted />
    </VerticalExamples>
  </Examples>
```


### Trigger Button Colors

```js
  <Examples fullWidth>
    <VerticalExamples fullWidth>
      Primary
      <PopupSelect trigger_label='Normal' />
      <PopupSelect trigger_bright trigger_label='Bright'/>
      <PopupSelect trigger_inverted trigger_label='Inverted'/>
      <PopupSelect trigger_inverted trigger_bright trigger_label='Bright/Inverted'/>
    </VerticalExamples>
    <VerticalExamples fullWidth>
      Secondary
      <PopupSelect trigger_secondary trigger_label='Secondary' />
      <PopupSelect trigger_bright trigger_secondary trigger_label='Secondary/Bright' />
      <PopupSelect trigger_inverted trigger_secondary trigger_label='Secondary/Inverted' />
      <PopupSelect trigger_inverted trigger_bright trigger_secondary trigger_label='Secondary/Bright/Inverted' />
    </VerticalExamples>
  </Examples>
```