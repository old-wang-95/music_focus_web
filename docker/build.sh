cd ..
dt=`date '+%Y%m%d_%H%M%S'`
docker build -f docker/Dockerfile -t music_focus_web:$dt .
docker tag music_focus_web:$dt music_focus_web:latest
