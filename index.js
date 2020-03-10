/**
 * Dependencies
 */

const emitter = require('zeroin')


module.exports = (init, map) => {
  let state = current(map || init)
  const machine = emitter({
    /**
     * Add state.
     *
     * @private
     */

    add (before, event, transition, after) {
      if (typeof event === 'function') {
        machine.on(before, (...args) => {
          event(...args)
          if (transition) state = transition
          // Promise.resolve(event(...args))
          //   .then(() => {
          //     if (transition) state = transition
          //   })
        })
      } else {

      }
    },

    /**
     * Return current state.
     *
     * @return {String}
     * @public
     */

    state() {
      return state
    }
  })
  add(machine, map || init)
  machine.emit(state)
  return machine
}

/**
 * Add map states to the state machine.
 *
 * @param {Object} machine
 * @param {Object} map
 * @private
 */

function add (machine, map = {}) {
  if (typeof map === 'object') Object.keys(map).map(key => machine.add(key, ...map[key]))
}

/**
 * Get current state from
 *
 * @param {String|Function|Object} state
 * @return {String} (null if not passed)
 * @private
 */

function current (state) {
  const type = typeof state
  if (type === 'string') return state
  else return Object.keys(state)[0]
}
