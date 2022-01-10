// -*- web -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// externals
import React from 'react'
import { zip } from 'lodash'

// project
// widgets
import { Tile } from '~/widgets'

// locals
import styles from './styles'


// a large raster represented as a rectangular grid of tiles
export const Mosaic = ({ uri, raster, tile, style }) => {
    // mix my paint
    const mosaicStyle = { ...styles.mosaic, ...style.mosaic }

    // render
    return (
        <div style={mosaicStyle} >
            {mosaic(raster, tile).map(spec => {
                // unpack
                const [origin, extent] = spec
                // form the uri
                const tileURI = `${uri}/${origin.join("x")}+${extent.join("x")}`
                // mix the paint
                const tileStyle = {
                    // the local settings
                    ...styles.tile,
                    // the client request
                    ...style.tile,
                    // the tile shape
                    width: extent[1],
                    height: extent[0],
                }
                // render
                return (
                    <Tile key={origin} uri={tileURI} style={tileStyle} />
                )
            })}
        </div>
    )
}


// helpers
// form a grid of mostly {tile} chunks that cover {shape}
function mosaic(shape, tile) {
    // form (origin, tile) pairs
    const specs = cartesian(
        ...zip(shape, tile).map(pair => Array.from(partition(...pair)))
    ).map(p => zip(...p))

    // and return them
    return specs
}

// form the cartesian product of n arrays
const cartesian = (first, ...rest) => rest.reduce(
    // given the partial result in {prefix} and the {current} array
    (prefix, current) => prefix.flatMap(
        // replace each entry in {prefix} with an array
        prefixEntry => current.map(
            // formed by splicing every entry of {current} into every entry of {prefix}
            argEntry => [prefixEntry, argEntry]
        )
    ),
    // starting with the first entry
    first
)

// given a {shape} and a {tile}, generate an array of pairs of (starting index, chunk) that
// partition {shape} into chunks
function* partition(shape, tile) {
    // figure out how many times {tile} fits in {shape}
    const div = Math.trunc(shape / tile)
    // and what's left behind
    const mod = shape % tile

    // so, the first {div} entries are
    for (let i = 0; i < div; ++i) {
        // chunks of length {tile} at a multiple of {tile}
        yield [i * tile, tile]
    }
    // and if there is anything left over
    if (mod > 0) {
        // it must be of length {mod} from the last multiple of {tile} that fits in {shape}
        yield [div * tile, mod]
    }

    // all done
    return
}


// end of file