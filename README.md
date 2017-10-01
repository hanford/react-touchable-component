## react-touchable-component

> Draggable react component with an insanely easy to use API

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
        <div style={{transform: translateY(`${yDelta}px`)}}>
          Yo, Im moving around
        </div>
      )}
    </Touchable>
  )
}
```

## License

MIT © [Jack Hanford](http://jackhanford.com)
