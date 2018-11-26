### Basic Example

```js
  <RadioButton.Group defaultValue="two">
    <VerticalExamples>
      <RadioButton value="one" md label='one' />
      <RadioButton value="two" md label='two'/>
      <RadioButton value="three" md label='three'/>
    </VerticalExamples>
  </RadioButton.Group>
```

### Basic Example with render props

we could add reset button

```js
  <RadioButton.Group defaultValue="two">
    {({value, setValue}) => (
      <div>
        <Button onClicked={() => setValue('two')}>reset</Button>    
        <p>{value}</p>
        <VerticalExamples>
          <RadioButton value="one" md label='one' />
          <br/>
          <RadioButton value="two" md label='two'/>
          <br/>
          <RadioButton value="three" md label='three'/>
        </VerticalExamples>
      </div>
    )}
  </RadioButton.Group>
```

### Type

Two types are supported, `Primary` &amp; `Secondary`

```js
  <RadioButton.Group defaultValue="one">
    <VerticalExamples>
      <RadioButton value="one" label='Primary !' />
      <RadioButton value="two" secondary label='Secondary !'/>
      <RadioButton value="three" inverted label='Primary Inverted !'/>
      <RadioButton value="four" inverted secondary label='Secondary Inverted !'/>
    </VerticalExamples>
  </RadioButton.Group>
```

### Disabled State

You can go with the disabled version, or normal one

```js
  <Examples>
    <RadioButton.Group defaultValue="one">
      <VerticalExamples>
        <RadioButton value="one" />
        <RadioButton value="two" disabled />
      </VerticalExamples>
    </RadioButton.Group>
  </Examples>
```

### Border Radius

```js
  <RadioButton.Group defaultValue="one">
    <VerticalExamples>
      <RadioButton value="one" fullRound label='Normal'  />
      <RadioButton value="two" secondary fullRound label='Full Round' />
    </VerticalExamples>
  </RadioButton.Group>
```

### Responsive Size

```js
  <Examples leftAligned testForScreens={['xsmall', 'mobile', 'tablet', 'desktop', 'largeDesktop']}>
    <RadioButton.Group defaultValue="one">
      <RadioButton
        value="one"
        fullRound label='Normal' size={['xs', 'sm', 'md', 'lg', 'xl']}
        label='Responsive Label, try to resize the screen to see the effect.'
      />
    </RadioButton.Group>
  </Examples>
```

### Space Props

It accept all the standard space props

```js
  <RadioButton.Group defaultValue="one">
    <VerticalExamples>
      <RadioButton value="one" p={5} checked label='Padding'/>
      <RadioButton value="two" minWidth={6} checked label='Width'/>
      <RadioButton value="three" minHeight={6} checked label='Height'/>
      <RadioButton value="four" margin={2} checked label='Margin'/>
    </VerticalExamples>
  </RadioButton.Group>
```

### Label Styles

Almost all label styles, but with 'label_' prefix

```js
  <RadioButton.Group defaultValue="one">
    <VerticalExamples>
      <RadioButton value="one" label_bold checked label='Bold Label' />
      <RadioButton value="two" label_important label_bold checked label='Important/bold Label' />
      <RadioButton value="three" label_xl checked label='Large Label' />
    </VerticalExamples>
  </RadioButton.Group>
```

### Controlled Component

using value props on Group make The Component controlled by outer state
like select element

```js
  <RadioButton.Group value="one">
    <VerticalExamples>
      <RadioButton value="one" md label='one' />
      <RadioButton value="two" md label='two'/>
      <RadioButton value="three" md label='three'/>
    </VerticalExamples>
  </RadioButton.Group>
```

select and RadioButton will be in sync

```js
  (() => {
    class ControlledExample extends React.Component {
      constructor() {
        super()
        this.state = {value: 'one'}
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this)
      }
      handleSelectChange(e) {
        this.setState({value: e.target.value})
      } 
      handleRadioButtonChange(value) {
        this.setState({value})
      }
      render() {
        const {value} = this.state
        return (
          <div>
            <select value={value} onChange={this.handleSelectChange}>
              <option value="one">one</option>
              <option value="two">two</option>
              <option value="three">three</option>
            </select>
            <hr />
            <RadioButton.Group value={value} onChange={this.handleRadioButtonChange}>
              <VerticalExamples>
                <RadioButton value="one" md label='one' />
                <RadioButton value="two" md label='two'/>
                <RadioButton value="three" md label='three'/>
              </VerticalExamples>
            </RadioButton.Group>
          </div>
        )
      }
    }

    return <ControlledExample />
  })()
```
