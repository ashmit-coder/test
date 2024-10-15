import socketio 

sio = socketio.AsyncServer(cors_allowed_origins="*",async_mode='asgi')
sio_app = socketio.ASGIApp(sio)


@sio.event
async def connect(sid):
    print("ashmit" ,sid)
 

