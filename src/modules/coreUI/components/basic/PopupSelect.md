### Basic Example

```js
  <Examples fullWidth>
    <PopupSelect trigger_label='Select' />   
  </Examples>
```

### Trigger Size

```js
  <Examples fullWidth>
    <VerticalExamples fullWidth>
      Primary
      <PopupSelect trigger_xs trigger_label='Select' />
      <PopupSelect trigger_sm trigger_label='Select' />
      <PopupSelect trigger_md trigger_label='Select' />
      <PopupSelect trigger_lg trigger_label='Select' />
      <PopupSelect trigger_xl trigger_label='Select' />
    </VerticalExamples>
    <VerticalExamples fullWidth>
      Primary Inverted
      <PopupSelect trigger_xs trigger_inverted trigger_label='Select' />
      <PopupSelect trigger_sm trigger_inverted trigger_label='Select' />
      <PopupSelect trigger_md trigger_inverted trigger_label='Select' />
      <PopupSelect trigger_lg trigger_inverted trigger_label='Select' />
      <PopupSelect trigger_xl trigger_inverted trigger_label='Select' />
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

### Trigger Content

```js
  <Examples fullWidth>
    <VerticalExamples fullWidth>
      Normal
      <PopupSelect
        trigger_label='Normal'
      />
    </VerticalExamples>
    <VerticalExamples fullWidth>
      Full Width
      <PopupSelect
        trigger_buttonContent_fullWidth
        trigger_label='Full Width'
      />
    </VerticalExamples>
  </Examples>
```

### Trigger Styles

Almost any styling option used with normal buttons, can be used here, by using the prefix trigger_

```js
  <VerticalExamples>
    <PopupSelect trigger_fullRound trigger_label='Full Round' />
    <PopupSelect trigger_tight trigger_label='Tight' />
    <PopupSelect trigger_loading trigger_label='Loading' />

  </VerticalExamples>
```