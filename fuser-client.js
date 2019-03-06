const infra = require('libx.js');
infra.node = require('libx.js/node');

// console.log('projconfig: ', infra.gulp.projconfig, infra.shuffle([1,2,3,4]));
// console.log(infra.node.args.env);


(async ()=>{

	var modes = {
		devenv: async ()=> {
			console.log('starting devenv');

			// libx.js files changed -> libx.fuser pulls those files and builds the `dist` folder ->
			// clear libs cache -> rebuild index.pug
			infra.gulp.watchSimple(['./node_modules/libx.js/**/*.js', '!./node_modules/libx.js/node_modules/**'], (ev, p)=>{
				if (ev.type != 'changed') return;
				console.log('change! ', ev, p)
				infra.gulp.exec(['node ./node_modules/libx.fuser/build-libs.js'], true);
			});

			var res = await infra.gulp.exec([
				'node ./node_modules/libx.fuser/build-libs.js',
				'node ./node_modules/libx.fuser/fuser.js --build --serve --watch --clearLibs --api-run', 
			], true);
			// console.log('res: ', res);
		},
		build: async()=> {
			await infra.gulp.exec([
				'node ./node_modules/libx.fuser/fuser.js --build --env=prod --secret='+(infra.node.args.secret || process.env.FUSER_SECRET_KEY), 
			], true);
		},
		api_deploy: async ()=> {
			var res = await infra.gulp.exec([
				'node ./node_modules/libx.fuser/fuser.js --deploy', 
			], true);
		},
	};

	if (infra.node.args.apiDeploy) {
		modes.api_deploy();
	} else if (infra.node.args.build) {
		modes.build();
	} else if (infra.node.args.dev) {
		modes.devenv();
	} else {
		modes.devenv();
	}

})();