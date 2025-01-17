# -*- coding: utf-8 -*-
#
# michael a.g. aïvázis <michael.aivazis@para-sim.com>
# (c) 1998-2022 all rights reserved


# externals
import csv
import io
import journal
# support
import qed


# application engine
class Panel(qed.shells.command, family="qed.cli.ux"):
    """
    Select application behavior that is mapped to the capabilities of the web client
    """


    # interface
    def dataset(self, name):
        """
        Get the named dataset
        """
        # look it up and return it
        return self.datasets[name]


    def tile(self, data, channel, zoom, origin, shape, **kwds):
        """
        Generate a BMP encoded tile from the supplied specification
        """
        # look up the dataset
        dataset = self.dataset(name=data)
        # ask to make the tile and return it
        return dataset.render(channel=channel, zoom=zoom, origin=origin, shape=shape)


    def profile(self, encoding, data, points):
        """
        Sample {dataset} along a path defined by {points}
        """
        # normalize the encoding
        encoding = encoding.lower()
        # look up the dataset
        dataset = self.dataset(name=data)
        # get the profile
        profile = dataset.profile(points=points)
        # form the file name
        filename = f"{dataset.pyre_name}.{encoding}"

        # dispatch
        if encoding == "csv":
            # to my {CSV} handler
            return filename, self._profileCSV(dataset=dataset, profile=profile)

        # if i don't understand the encoding, call it a bug
        channel = journal.firewall("qed.datasets.raw")
        # explain
        channel.line(f"unsupported encoding '{encoding}'")
        channel.line(f"while generating a data profile for {dataset.pyre_name}")
        # and complain
        channel.log()
        # bail, just in case the firewall is not fatal
        return None, None


    # metamethods
    def __init__(self, plexus, docroot, **kwds):
        # chain up
        super().__init__(plexus=plexus, **kwds)

        # get the known data sources and build a registry of available data sets
        self.datasets = {
            # map the pyre name to the dataset
            str(data.pyre_name): data
            # for all known readers
            for src in plexus.datasets
            # for all available datasets in each reader
            for data in src.datasets}

        # all done
        return


    # implementation details
    def _profileCSV(self, dataset, profile):
        """
        Encode the {dataset} {profile} as CSV
        """
        # grab the dataset channels
        channels = dataset.channels
        # make a buffer so {csv} has someplace to write into
        buffer = io.StringIO()
        # make a writer
        writer = csv.writer(buffer)

        # get the headers
        headers = ("line", "sample") + tuple(channels)
        # write them
        writer.writerow(headers)

        # go through the entries in the {profile}
        for entry in profile:
            # unpack
            line, sample, pixel = entry
            # build the channel specific representations
            reps = tuple(channel.project(pixel) for channel in channels.values())
            # and record each one
            writer.writerow((line, sample) + reps)

        # all done
        return buffer.getvalue()


# end of file
