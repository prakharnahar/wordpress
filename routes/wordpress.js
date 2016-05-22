/**
 * Routes file for Login
 */
var ejs = require("ejs");
var session = require('client-sessions');
var wordpress = require( "wordpress" );
var fs = require('fs');

exports.getposts = function(req,res)
{
	console.log( "Inside wordpress!" );
	// check user already exists
	var client = wordpress.createClient({
		url: "https://extra273.wordpress.com/",
		username: "extra273",
		password: "qwerty123"
	});
	 
	client.getPosts(function( error, posts ) {
		console.log( "Found " + JSON.stringify(posts) + " posts!" );
		res.render('createpost', {data: posts});
	});
}

exports.findtag = function(req,res)
{
	console.log( "Inside wordpress!" );
	// check user already exists
	var client = wordpress.createClient({
		url: "https://extra273.wordpress.com/",
		username: "extra273",
		password: "qwerty123"
	});
	 
	client.getPosts(function( error, posts ) {
		console.log( "Found " + JSON.stringify(posts) + " posts!" );
		res.render('findtagr', {data: posts, tag: req.param("tag")});
	});
}

exports.createpost = function(req,res)
{
	console.log( "Inside wordpress!" );
	// check user already exists
	var client = wordpress.createClient({
		url: "https://extra273.wordpress.com/",
		username: "extra273",
		password: "qwerty123"
	});
	 
	client.getPosts(function( error, posts ) {
		console.log( "Found " + JSON.stringify(posts) + " posts!" );
		res.render('createpost', {data: posts});
	});
	 
	/*client.newPost({
		title: "My third Post",
		content: "Publishing to WordPress from node.js sure is fun!",
		status: "publish",
		termNames: {
			"category": ["Javascript", "Node"],
			"post_tag": ["api", "fun", "js"]
			}}, function( error, id ) {
		console.log( "post with id:"+id+" created!" );
		client.getPosts(function( error, posts ) {
			console.log( "Found " + JSON.stringify(posts) + " posts!" );
			res.render('posts', {data: posts});
		});
	});*/
	//res.render('createpost', {});
}




exports.makepost = function(req,res)
{
	console.log( "Inside wordpress!" );
	// check user already exists
	var client = wordpress.createClient({
		url: "https://extra273.wordpress.com/",
		username: "extra273",
		password: "qwerty123"
	});
	console.log( "title:"+req.param("title")+" content:"+ req.param("content"));
	client.newPost({
		title: req.param("title"),
		content: req.param("content"),
		status: "publish",
		termNames: {
			"category": ["Javascript", "Node"],
			"post_tag": ["api", "fun", "js"]
			}}, function( error, id ) {
		console.log( "post with id:"+id+" created!" );
		client.getPosts(function( error, posts ) {
			console.log( "Found " + JSON.stringify(posts) + " posts!" );
			res.render('posts', {data: posts});
		});
	});
}



exports.gettags = function(req,res)
{
	/*console.log( "Inside wordpress!" );
	// check user already exists
	var client = wordpress.createClient({
		url: "https://extra273.wordpress.com/",
		username: "extra273",
		password: "qwerty123"
	});
	 
	client.getTaxonomy( {name:"post_tag"}, function( error, id ) {
		console.log( "post with id:"+id+" created!" );
		client.getPosts(function( error, tags ) {
			console.log( "Found " + JSON.stringify(tags) + " tags!" );
			//res.render('posts', {data: posts});
		});
	} );*/
	
	res.render('findtag', {});

}

exports.fileu = function(req,res)
{
	res.render('fileupload', {});
};

exports.fileupload = function(req,res)
{
	console.log( "Inside wordpress!" );
	// check user already exists
	var client = wordpress.createClient({
		url: "https://extra273.wordpress.com/",
		username: "extra273",
		password: "qwerty123"
	});
	
	//console.log(req.body);
    //console.log(req.files);
    //console.log(req.files.thumbnail);
    //console.log(req.files.thumbnail.size);
	
	var tmp_path = req.files.thumbnail.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    var target_path = './public/uploads/' + req.files.thumbnail.name;
    console.log(req.files);
    // move the file from the temporary location to the intended location
    fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
            client.uploadFile( {name:req.files.thumbnail.name, type:"img/jpg", postId:42, bits:req.files.thumbnail }, function( error, file ) {
        		console.log( "post with id:"+JSON.stringify(file)+" posted!" );
        		
        			res.render('fileupload', {});
        		});
        });
    });
	
	
	
	
};

exports.homepage = function(req,res)
{
	res.render('homepage', {});
};
//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};
