// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'

// local
// context
import { Context } from './context'


// access to the viewport sync registry
export const useZoom = () => {
    // grab the sync table
    const { zoom } = React.useContext(Context)
    // and return it
    return zoom
}


// end of file
