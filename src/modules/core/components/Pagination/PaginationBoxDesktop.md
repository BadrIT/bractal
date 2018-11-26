### Basic Example
```js
 <VerticalExamples centerAligned fullWidth>
    <PaginationBoxDesktop
      currentPage={1}
      limit={1}
      itemsCount={2000}
    /> 
    <PaginationBoxDesktop
      currentPage={11}
      limit={1}
      itemsCount={20}
    /> 
    <PaginationBoxDesktop
      currentPage={20}
      limit={1}
      itemsCount={20}
    /> 
  </VerticalExamples> 
```

### Types example
```js
 <VerticalExamples centerAligned fullWidth>
        <PaginationBoxDesktop
          currentPage={9}
          limit={1}
          itemsCount={20}
        /> 
        <PaginationBoxDesktop
          secondary
          currentPage={9}
          limit={1}
          itemsCount={20}
        />  
    </VerticalExamples>
```
### Sizing 

```js
    <VerticalExamples centerAligned fullWidth>
        <PaginationBoxDesktop
          xs
          currentPage={9}
          limit={1}
          itemsCount={20}
        /> 
        <PaginationBoxDesktop
          sm
          currentPage={9}
          limit={1}
          itemsCount={2000}
        /> <PaginationBoxDesktop
          md
          currentPage={9}
          limit={1}
          itemsCount={2000}
        /> 
        <PaginationBoxDesktop
          lg
          currentPage={9}
          limit={1}
          itemsCount={2000}
        />  
        <PaginationBoxDesktop
          xl
          currentPage={9}
          limit={1}
          itemsCount={2000}
        />  
    </VerticalExamples>
```
### Custom Icons

```js
  <VerticalExamples centerAligned fullWidth>
    <PaginationBoxDesktop
      currentPage={11}
      limit={1}
      itemsCount={20}
      rightIconClassName="fas fa-caret-right"
      leftIconClassName="fas fa-caret-left"
      ellipsisIconClassName="fas fa-ellipsis-h"
    /> 
  </VerticalExamples> 
```
