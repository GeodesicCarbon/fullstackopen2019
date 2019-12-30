import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('good is incremented twice', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    deepFreeze(newState)
    const twiceState = counterReducer(newState, action)
    expect(twiceState).toEqual({
      good: 2,
      ok: 0,
      bad: 0
    })
  })
  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('ok is incremented twice', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    deepFreeze(newState)
    const twiceState = counterReducer(newState, action)
    expect(twiceState).toEqual({
      good: 0,
      ok: 2,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('bad is incremented twice', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    deepFreeze(newState)
    const twiceState = counterReducer(newState, action)
    expect(twiceState).toEqual({
      good: 0,
      ok: 0,
      bad: 2
    })
  })
  test('zero resets the state', () => {
    const action1 = {
      type: 'GOOD'
    }
    const action2 = {
      type: 'OK'
    }
    const action3 = {
      type: 'BAD'
    }
    const action4 = {
      type: 'BAD'
    }
    const reset = {
      type: 'ZERO'
    }
    let state = counterReducer(initialState, action1)
    state = counterReducer(state, action2)
    state = counterReducer(state, action3)
    state = counterReducer(state, action4)
    deepFreeze(state)
    expect(state).toEqual({
      good: 1,
      ok: 1,
      bad: 2
    })
    const newState = counterReducer(state, reset)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})
