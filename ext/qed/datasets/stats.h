// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved

// code guard
#if !defined(qed_py_datasets_stats_h)
#define qed_py_datasets_stats_h


// decorators
namespace qed::py::datasets {
    // stats for a complex grid source
    template <typename sourceT>
    auto statsGrid(
        // the source
        const sourceT & source,
        // the zoom level
        int zoom,
        // the origin of the tile
        typename sourceT::index_type origin,
        // the tile shape
        typename sourceT::shape_type tile) -> stats_t;

    // stats for a complex HDF5 source
    template <typename sourceT>
    auto statsHDF5(
        // the source
        const dataset_t & source,
        // the data layout
        const datatype_t & datatype,
        // the zoom level
        int zoom,
        // the origin of the tile
        typename sourceT::index_type origin,
        // the tile shape
        typename sourceT::shape_type tile) -> stats_t;
}


// pull in the implementations
#define qed_py_datasets_stats_icc
#include "stats.icc"
#undef qed_py_datasets_stats_icc

#endif

// end of file
