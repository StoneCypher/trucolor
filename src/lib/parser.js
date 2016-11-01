/* ─────────╮
 │ trucolor │ Command parser
 ╰──────────┴─────────────────────────────────────────────────────────────────── */
/* eslint complexity: 0 */

import createProcessor from './classes/processor'
import createInterpreter from './classes/interpreter'
// import {console} from '../index'

let currentAutoName = 1

export default function (color) {
	let queue = []
	let processor = createProcessor(`color_${currentAutoName++}`)
	const tokens = color.split(' ')

	while (tokens.length > 0) {
		const token = tokens.shift()
		switch (token) {
			// Character types
			case 'background':
				processor.background()
				break
			case 'bold':
				processor.bold()
				break
			case 'faint':
				processor.dim()
				break
			case 'dim':
				processor.dim()
				break
			case 'italic':
				processor.italic()
				break
			case 'invert':
				processor.invert()
				break
			case 'underline':
				processor.underline()
				break
			case 'blink':
				processor.blink()
				break

			// Colour processes
			case 'saturate':
			case 'sat':
				processor.saturate({
					percent: tokens.shift()
				})
				break
			case 'desaturate':
			case 'desat':
				processor.desaturate({
					percent: tokens.shift()
				})
				break
			case 'light':
				processor.lighten({
					percent: 20
				})
				break
			case 'dark':
				processor.darken({
					percent: 20
				})
				break
			case 'lighten':
				processor.lighten({
					percent: tokens.shift()
				})
				break
			case 'darken':
				processor.darken({
					percent: tokens.shift()
				})
				break
			case 'spin':
				processor.spin({
					rotation: tokens.shift()
				})
				break
			case 'mono':
				processor.mono()
				break
			case 'mix':
				processor.mix({
					color: tokens.shift()
				})
				break
			// case 'contrast':
			// 	processor.contrast
			// 		color_dark: do tokens_.shift if commands[0]?
			// 		color_light: do tokens_.shift if commands[0]?
			// 		threshold: do tokens_.shift if commands[0]?
			default:
				if (/^[A-Za-z0-9_-]+:$/.test(token)) {
					if (processor.hasSource) {
						queue.push(processor)
						processor = createProcessor(`color_${currentAutoName++}`)
					}
					processor.lock(token.trim().replace(':', ''))
				} else {
					if (processor.hasSource) {
						queue.push(processor)
						processor = createProcessor(`color_${currentAutoName++}`)
					}
					processor.source = createInterpreter(token)
				}
		}
	}
	queue.push(processor)
	return queue
}
