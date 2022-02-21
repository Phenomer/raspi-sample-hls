#!/bin/sh

ffmpeg	-f video4linux2 \
	-input_format h264 \
	-video_size 1920x1080 \
	-framerate 30 \
	-i /dev/video0 \
	-f dash -c:v copy \
	-use_timeline 1 \
	-use_template 1 \
 	-window_size 5 \
	-adaptation_sets "id=0,streams=v" \
	-hls_playlist 1 \
	-hls_master_name "out.m3u8" \
	-streaming 1 \
	-seg_duration 1 \
	-remove_at_exit 1 \
	stream/manifest.mpd
