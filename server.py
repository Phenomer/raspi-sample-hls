from aiohttp import web
import json

async def index(request):
    return web.FileResponse('index.html')

async def dash(request):
    return web.FileResponse('dash.html')

async def wscontroller(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async for msg in ws:
        if msg.type == web.WSMsgType.text:
            print(json.loads(msg.data))
        elif msg.type == web.WSMsgType.binary:
            await ws.send_bytes(msg.data)
        elif msg.type == web.WSMsgType.close:
            break

    return ws

app = web.Application()
app.add_routes([web.get('/', index),
                web.get('/dash', dash),
                web.get('/controller', wscontroller),
                web.static('/static', 'static'),
                web.static('/stream', 'stream'),
                ])
if __name__ == '__main__':
    web.run_app(app)
