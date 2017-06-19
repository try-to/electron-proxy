const ipcRenderer = require('electron').ipcRenderer;
const shell = require('electron').shell
const package = require('../package')

$(function () {
	$('.version').html('version:'+package.version);
	//表单提交
	$('.run').on('click',function (event) {
		event.preventDefault();

		var local_host='';
		var subdomain = $('[name="subdomain"]').val();
		var host = $('[name="host"]').val();
		var port = $('[name="port"]').val();
		if(subdomain.length<4 && subdomain.length>0){
			$('.tools').html('<div class="alert alert-warning" role="alert"><strong>名称长度不能少于4！</strong></div>');
			return false;
		}
		if(!port){
			$('.tools').html('<div class="alert alert-warning" role="alert"><strong>端口不能为空！</strong></div>');
			return false;
		}
		//数据组装
		var data={
			subdomain:subdomain,
			host:host?host:'huahuashe.com',
			port:port?port:80,
			local_host:local_host,

		};

		console.log('form: %s', data);

		//发送表单
		ipcRenderer.send('submit', data);

		//监听返回消息
		ipcRenderer.on('localtunnel', function(event, data) {

			console.log('return: %s', data);

			var alert,tool;
			if(data.code == 0){
				$('.run').attr('disabled','disabled');
				$('.stop').removeClass('hide');
				alert = 'success';
				tool='启动成功！<br>公网地址为：<a href="'+data.url+'" class="open">'+data.url+'</a>';
			}else if(data.code == 1){
				alert = 'danger';
				tool='程序错误！<br>请重启打开软件';
			}else{
				alert = 'warning';
				tool='与服务器断开...';
			}
			var _t='<div class="alert alert-'+alert+'" role="alert"><strong>'+tool+'</strong></div>';
			$('.tools').html(_t);
		})
	});

	//浏览器打开
	$("body").delegate(".open",'click',function(){
		var url=$(this).attr('href');
		shell.openExternal(url)
		return false;
	});

	//停止服务
	$('.stop').on('click',function (event) {
		ipcRenderer.send('stop')
	});
})