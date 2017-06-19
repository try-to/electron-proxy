var grunt=require('grunt');

//配置
grunt.config.init({
    pkg: grunt.file.readJSON('gruntPackage.json'),
    'create-windows-installer': {
        x64:{
            version:'1.0.1',
            authors:'wenjie',
            appDirectory:'./OutApp/proxy-win32-x64',//要打包的输入目录
            outputDirectory:'./OutPut/win64/',//grunt打包后的输出目录
            exe:'proxy.exe',
            description:'Wenjie Development of Intranet penetration tools',
            setupIcon:'./src/icon/favicon@64.ico',
            remoteReleases:'http://downloads.tryto.cn/proxy/new/win64/',
            noMsi:true
        },
        x32:{
            version:'1.0.1',
            authors:'wenjie',
            appDirectory:'./OutApp/proxy-win32-ia32',//要打包的输入目录
            outputDirectory:'./OutPut/win32/',//grunt打包后的输出目录
            exe:'proxy.exe',
            description:'Wenjie Development of Intranet penetration tools',
            setupIcon:'./src/icon/favicon@64.ico',
            remoteReleases:'http://downloads.tryto.cn/proxy/new/win32/',
            noMsi:true
        },
    }
});

//加载任务
grunt.loadNpmTasks('grunt-electron-installer');

//设置为默认
grunt.registerTask('default', ['create-windows-installer']);