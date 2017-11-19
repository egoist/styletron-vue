import utils from 'styletron-utils'
import assign from 'nano-assign'

const STYLETRON_KEY = '__STYLETRON'

function createComponent(tag, stylesArray, { props }) {
  const Component = {
    functional: true,
    [STYLETRON_KEY]: {
      tag,
      styles: stylesArray
    },
    inject: {
      theme: {
        default: null
      },
      styletron: {
        default: null
      }
    },
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

      const className = [ctx.data.class, styletronClassName]
      
      // transform attrs to props if exposed
      const exposedProps = props.reduce((result, key) => {
        const attr = ctx.data.attrs[key]
        const newResult = assign({}, result)
        if (attr) newResult[key] = attr
        return newResult
      }, {})
      const mergedProps = assign({}, ctx.data.props, exposedProps)
      
      return h(tag, assign({}, ctx.data, { class: className, attrs: null, props: mergedProps }), ctx.children)
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
