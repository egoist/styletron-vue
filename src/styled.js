import utils from 'styletron-utils'

const STYLETRON_KEY = '__STYLETRON'

function createComponent(tag, stylesArray) {
  const Component = {
    functional: true,
    [STYLETRON_KEY]: {
      tag,
      styles: stylesArray
    },
    inject: ['theme', 'styletron'],
    render(h, ctx) {
      const resolvedStyle = {}

      for (const style of Component[STYLETRON_KEY].styles) {
        if (typeof style === 'function') {
          assign(resolvedStyle, style(ctx.props, ctx))
        } else if (typeof style === 'object') {
          assign(resolvedStyle, style)
        }
      }

      const styletron = ctx.parent.$styletron || ctx.injections.styletron || ctx.parent.$root.$options.styletron

      if (process.env.NODE_ENV === 'development' && !styletron) {
        throw new Error('[styletron-vue] You need to bind styletron instance first!')
      }

      const styletronClassName = utils.injectStylePrefixed(
        styletron,
        resolvedStyle
      )

      const data = assign({}, ctx.data)
      data.class = [ctx.data.class, styletronClassName]

      return h(tag, data, ctx.children)
    }
  }

  return Component
}

export default function styled(base, styleArg) {
  if (typeof base === 'object' && base[STYLETRON_KEY]) {
    const { tag, styles } = base[STYLETRON_KEY]
    return createComponent(tag, styles.concat(styleArg))
  } else if (typeof base === 'string' || typeof base === 'object') {
    return createComponent(base, [styleArg])
  }
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('`styled` takes either a DOM element name or a component')
  }
}

function assign(target, source) {
  for (const key in source) {
    target[key] = source[key]
  }
  return target
}
