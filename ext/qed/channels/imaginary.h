// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved

// code guard
#if !defined(qed_py_channels_imaginary_h)
#define qed_py_channels_imaginary_h


// decorators
namespace qed::py::channels {
    // the tile generator for the imaginary part of a complex source
    template <typename sourceT>
    auto imaginaryTile(
        // the source
        const sourceT & source,
        // the zoom level
        int zoom,
        // the origin of the tile
        typename sourceT::index_type origin,
        // the tile shape
        typename sourceT::shape_type shape,
        // the range of values to render
        double min, double max) -> bmp_t;
}


// pull in the implementations
#define qed_py_channels_imaginary_icc
#include "imaginary.icc"
#undef qed_py_channels_imaginary_icc

#endif

// end of file