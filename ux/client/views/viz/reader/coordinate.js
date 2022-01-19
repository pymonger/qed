// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'

// locals
// hooks
import { useReader } from './useReader'
import { useSelector } from './useSelector'
import { useToggleCoordinate } from './useToggleCoordinate'
import { useGetView } from '../viz/useGetView'
// styles
import styles from './styles'


// display the bindings associated with this selector
export const Coordinate = ({ axis, coordinate }) => {
    // get the current view
    const view = useGetView()
    // get the reader
    const reader = useReader()
    // and the current selector
    const selector = useSelector()
    // make a toggle
    const toggleCoordinate = useToggleCoordinate(axis, coordinate)
    // park extra state dependent styling here
    const [polish, setPolish] = React.useState(false)

    // get the current value of my axis
    const current = selector.get(axis)

    // figure out my state
    let state = "disabled"
    // if i'm the currently selected value of {axis} my reader is in the active view
    if (view?.reader?.uuid === reader.uuid && current === coordinate) {
        // mark me as selected
        state = "selected"
    }
    // otherwise, check whether i'm viable
    else {
        // go through the datasets
        for (const dataset of reader.datasets) {
            // clone the {selector}
            // N.B.: don't factor this out of the loop: we destroy it, so we need a new one
            //       on every iteration
            const candidate = new Map(selector)
            // set me as the value of {axis}
            candidate.set(axis, coordinate)
            // go though the selector of the {dataset}
            for (const { name, value } of dataset.selector) {
                // if the {value} for {name} matches what my {candidate} has
                if (candidate.get(name) === value) {
                    // remove it
                    candidate.delete(name)
                }
            }
            // if the candidate is now empty
            if (candidate.size === 0) {
                // the dataset selector matched everything in the candidate, so...
                state = "enabled"
                // and look no further
                break
            }
        }
    }

    // make a handler that toggles me as the value of my {axis}
    const toggle = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // and quash any side effects
        evt.preventDefault()
        // toggle me as the value of my {axis}
        toggleCoordinate()
        // reset the extra polish
        setPolish(false)
        // all done
        return
    }
    // make a handler that highlights enabled values
    const highlight = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // and quash any side effects
        evt.preventDefault()
        // if i am available
        if (state === "enabled") {
            // highlight
            setPolish(true)
        }
        // all done
        return
    }
    // and one that puts everything back
    const reset = (evt) => {
        // stop this event from bubbling up
        evt.stopPropagation()
        // and quash any side effects
        evt.preventDefault()
        // reset the extra polish
        setPolish(false)
        // all done
        return
    }

    // build my controllers
    const behaviors = state === "disabled" ? {} : {
        // select/unselect when clicked
        onClick: toggle,
        // when the cursor hovers
        onMouseEnter: highlight,
        // and when it leaves
        onMouseLeave: reset,
    }

    // mix my paint
    const paint = styles.coordinate(state, polish)
    // and render
    return (
        <span style={paint} {...behaviors} >
            {coordinate}
        </span>
    )
}


// end of file
