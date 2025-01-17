// -*- c++ -*-
//
// michael a.g. aïvázis <michael.aivazis@para-sim.com>
// (c) 1998-2022 all rights reserved


// external
#include "external.h"
// namespace setup
#include "forward.h"

// my declarations
#include "datatypes.h"


// build the submodule
void
qed::py::nisar::nisar(py::module & m)
{
    // create a {nisar} submodule
    auto nisar = m.def_submodule(
        // the name of the module
        "nisar",
        // its docstring
        "NISAR specific support");

    // add the supported nisar
    datatypes(nisar);

    // all done
    return;
}


// end of file
