## react-touchable-component

> Touchable / draggable react component with an easy to use API

<br />

## Install

```
$ npm install react-touchable-component --save
```


## Usage

```js
import Touchable from 'react-touchable-component'

..

render () {
  return (
    <Touchable>
      {({x, y}) => (
        <div style={{transform: `translate3d(${x}px, ${y}px, 0)`}}>
          Yo, Im moving around
        </div>
      )}
    </Touchable>
  )
}
```

## License

MIT © [Jack Hanford](http://jackhanford.com)
