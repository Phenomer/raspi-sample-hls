#!/bin/sh

mkdir -p stream
sudo umount stream
sudo mount -t tmpfs -osize=64m tmpfs stream

ffmpeg	-f video4linux2 -input_format h264 -video_size 1920x1080 -framerate 30 -i /dev/video0 \
	-f hls -c:v copy -flags +cgop -g 30 \
       	-hls_time 1 \
	-hls_base_url "/stream/" \
	-hls_list_size 10 \
	-hls_flags delete_segments \
	stream/out.m3u8
sudo umount stream

#ffmpeg -f video4linux2 -input_format h264 -video_size 1920x1080 -framerate 30 -i /dev/video0 -vcodec copy -an test.h264

