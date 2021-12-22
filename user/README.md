example using httpie

http :3000/ name==ardhi

http -f POST :3000/ name=cinta email=cinta@ardhi.com pwd=test role=client

http PUT :3000/ _id==61c3313617d751b266560a32 pwd==test2

http DELETE :3000/ _id=61c3313617d751b266560a32