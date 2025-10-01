ARG tag
FROM ghcr.io/home-assistant/home-assistant:$tag

RUN echo "$tag" > /config/.HA_VERSION

RUN wget -O - https://get.hacs.xyz | bash -
