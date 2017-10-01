import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import window from 'global/window'

export default class ReactTouchableComponent extends PureComponent {

  static defaultProps = {
    onDragMove: () => {},
    onDragStart: () => {},
    onDragStop: () => {},
  }

  static propTypes = {
    children: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragStop: PropTypes.func,
    onDragMove: PropTypes.func
  }

  touching = false
  start = {}

  state = {
    x: 0,
    y: 0,
    listeners: false
  }

  componentWillUnmount () {
    this.removeListeners()
  }

  componentDidMount () {
    this.applyListeners()
  }

  applyListeners = () => {
    if (this.root && !this.state.listeners) {
      this.root.addEventListener('touchstart', this.onTouchStart)
      this.root.addEventListener('touchmove', this.onTouchMove)
      this.root.addEventListener('touchend', this.onTouchEnd)

      this.setState({ listeners: true })
    }
  }

  removeListeners = () => {
    if (this.root && this.state.listeners) {
      this.root.removeEventListener('touchstart', this.onTouchStart)
      this.root.removeEventListener('touchmove', this.onTouchMove)
      this.root.removeEventListener('touchend', this.onTouchEnd)

      this.setState({ listeners: false })
    }
  }

  onTouchStart = event => {
    if (event.touches.length === 0) return

    event.stopPropagation()

    const { onDragStart } = this.props

    onDragStart(this.state)

    this.touching = true
    this.start = normalizeTouch(event)

    event.preventDefault()
  }

  onTouchMove = event => {
    if (this.touching) event.stopPropagation()

    const movePoint = normalizeTouch(event)
    const { onDragMove } = this.props

    const next = {
      x: movePoint.x - this.start.x,
      y: movePoint.y - this.start.y
    }

    window.requestAnimationFrame(() => this.setState(next, () => onDragMove(this.state)))
  }

  onTouchEnd = event => {
    this.touching = false
    // reset?
    // this.setState({ x: 0, y: 0 })
  }

  render () {
    return (
      <div ref={root => { this.root = root }}>
        {this.props.children(this.state)}
      </div>
    )
  }
}

function isTouch () {
  return (('ontouchstart' in window) ||
    (navigator.MaxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0))
}

function normalizeTouch (e) {
  const p = isTouch() ? e.touches[0] : e

  return {
    x: p.clientX,
    y: p.clientY
  }
}
