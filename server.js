var path = require('path')
var Koa = require('koa')
var app = new Koa()
var koaStatic = require('koa-static')
var server = require('http').createServer(app.callback())
var io = require('socket.io')(server)
var socketsList = {}
var key = 'key_'

app.use(koaStatic(path.join(__dirname, '/')))
app.use(koaStatic(path.join(__dirname, '/src')))

io.on('connection', function (socket) {

	socket.on('joined', function (data) {
		socketsList[key + data.uid] = socket
	})

	
	// 向指定客户端发送事件
	// io.sockets.connected[socket.id].emit('message','private')
	
	// 广播（不包含当前客户端）
	// socket.broadcast.emit('message', 'public')

	// 广播（且包含当前客户端）
	// io.sockets.emit('message', "this is a test")

	// 授权登录
	socket.on('authorized', function (data) {
		var uidSocket = socketsList[key + data.uid]
		if (uidSocket && io.sockets.connected[uidSocket.id]) {
			io.sockets.connected[uidSocket.id].emit('message', data.uid)
			socket.emit('message', 'pc 已收到登录授权 ' + data.uid)
		}
	})


})

server.listen(3001, function () {
	console.log('Server runing at: localhost:3001/pc-login.html')
})
