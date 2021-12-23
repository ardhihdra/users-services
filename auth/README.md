example using httpie

# Register
http -f --json POST :3011/register username=ardhihdra pwd=garut12 email=cinta@ardhi.com role=admin
http -f --json POST :3011/register username=johndoe pwd=moscow12 email=kasih@ardhi.com role=user

# Login
http -f --json POST :3011/login username=ardhihdra pwd=garut12
http -f --json POST :3011/login username=johndoe pwd=moscow12

# Refresh Token
http -f --json POST :3011/token username=ardhihdra refreshToken='9e6Z6i4x2zo1vglCo9rkKoYB21WQtbLBCQ7ObOtK3nzmGyHZxJ69Y6x3SC8scLKoDAr3L9PGHfskarozwlwsR60ioTEKJ2XbsWMLVgiUgSsQ5jDQT8XyohQsfaMRKU1VAKCsYEcpcGmx5Pov5lZ0PgtYDYDrFIiSGIAd5lcIcmNlpakWHpyAYMqeIbinUoAcflHtUpfEtUx0bqj3uHOsehnorAxm3wY8IYvR9Lf34ukM340IM2uU9ewjf7udLnRB'

# Delete Refresh Token
http -f --json POST :3011/token/revoke refreshToken='9e6Z6i4x2zo1vglCo9rkKoYB21WQtbLBCQ7ObOtK3nzmGyHZxJ69Y6x3SC8scLKoDAr3L9PGHfskarozwlwsR60ioTEKJ2XbsWMLVgiUgSsQ5jDQT8XyohQsfaMRKU1VAKCsYEcpcGmx5Pov5lZ0PgtYDYDrFIiSGIAd5lcIcmNlpakWHpyAYMqeIbinUoAcflHtUpfEtUx0bqj3uHOsehnorAxm3wY8IYvR9Lf34ukM340IM2uU9ewjf7udLnRB'

# Authorization
http -f --json POST :3011/authorization Authorization:'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM0N2VjZjdjNWIxOWU2NDc2OGE1MzIiLCJ1c2VybmFtZSI6ImFyZGhpaGRyYSIsImVtYWlsIjoiY2ludGFAYXJkaGkuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwMjY3NDc4LCJleHAiOjE2NDM4Njc0Nzh9.xW38VorekqqJCLgrr055QDvYGrKX2Nd2B9zlZDVt0ow'
