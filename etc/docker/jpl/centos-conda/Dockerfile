# based on NISAR ADE
FROM nisar_ade_base:r1.7.4

# set up some build variables
ARG instance=jpl/centos-conda
# python version
ARG python_version=3.9
ARG python=python${python_version}
# locations
ARG prefix=/opt/conda
ARG srcdir=${prefix}/src
# the build system
ARG mm="${python} ${srcdir}/mm/mm.py"

USER root
WORKDIR /root

# install the base software stack; captured in the environment.yaml;
# leaving the conda and pip commands here commented out for posterity
#RUN conda uninstall -y nodejs \
#  && conda install -y -c conda-forge gxx gfortran make numpy pybind11 yaml pyyaml gsl hdf5 fftw nodejs \
#  && conda update -y -c conda-forge nodejs \
#  && pip install graphene \
COPY etc/docker/${instance}/environment.yaml environment.yaml
RUN set -ex \
 && yum install git vim zip unzip openssh-server -y \
 && conda env update -n=base --file=environment.yaml \
 && mkdir /opt/conda/src \
 && cd /opt/conda/src \
 && git clone https://github.com/aivazis/mm \
 && git clone https://github.com/pyre/pyre \
 && git clone https://github.com/aivazis/qed \
 && mkdir /root/.pyre \
 && mkdir /root/.mm

WORKDIR /root/.pyre
COPY etc/docker/${instance}/mm.pfg mm.pfg.in
RUN set -ex \
 && sed -e "s:@PREFIX@:${prefix}:g" mm.pfg.in > mm.pfg

WORKDIR /root/.mm
COPY etc/docker/${instance}/config.mm config.mm.in
RUN set -ex \
 && sed -e "s:@PYTHON_VERSION@:${python_version}:g" config.mm.in > config.mm

# go to the {pyre} top level directory
WORKDIR ${srcdir}/pyre
# build
RUN ${mm} --serial
# go to the {qed} top level directory
WORKDIR ${srcdir}/qed
# build
RUN ${mm} --serial
