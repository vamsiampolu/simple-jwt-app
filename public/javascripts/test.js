var options = {
  // Namespace. Namespace your Basil stored data
  // default: 'b45i1'
  namespace: 'foo',

  // storages. Specify all Basil supported storages and priority order
  // default: `['local', 'cookie', 'session', 'memory']`
  storages: ['session'],

  // expireDays. Default number of days before cookies expiration
  // default: 365
  expireDays: 31

};
var basil = new window.Basil(options);

var $form = $('form'),$btn = $('.shiny');
$form.on('submit',function(e){
	e.preventDefault();
	var $el = $(this);
	var payload = {
		username:$el.find('#username').val(),
		password:$el.find('#password').val()
	};
	$.ajax({
		type:'POST',
		url:'/users/login',
		data:JSON.stringify(payload),
		contentType:'application/json'
	}).done(function(data){
		console.log("Successfully sent",data,"has been recieved");
		basil.set('token',data.token);
	});
});

$btn.on('click',function(){
	var token = basil.get('token')
	$.ajax({
		type:'GET',
		url:'/users/login/shiny_button',
		headers:{
			Authorization: 'Bearer '+ token
		}
	}).then(function(data){
		console.log("Obtained this url",data.href);
		$('.after-shine').attr('href',data.href);
		$('.after-shine').trigger('click');
	});
})

