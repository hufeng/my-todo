//promsie
var promise = (callback) =>{
  var defered = new $.Deferred;
  var resolve = defered.resolve;
  var reject = defered.reject;
  
  callback(resolve, reject);
  
  return defered.promise();
};


exports.list = () => {
  return promise((resolve, reject) => {
    $.get('/todo')
      .done((res) => {
	resolve(res);
      });
  });
};


exports.save = (param) => {
  return promise((resolve, reject) => {
    $.post('/todo/save', param)
      .done((res) => {
	res === 'success' ? resolve() : reject();
      });
  });
};


exports.toggle = (id) => {
  return promise((resolve, reject) => {
    $.post('/todo/toggle/' + id)
      .done((res) => {
	res === 'success' ? resolve() : reject();
      });
  });
};


exports.toggleAll = (status) => {
  return promise((resolve, reject) => {
    $.post('/todo/toggleall', {status: status})
      .done(() => {
	resolve();
      });
  });
};

exports.destroy = (id) => {
  return promise((resolve, reject) => {
    $.get('/todo/destroy/' + id)
      .done((res) => {
	res === 'success' ? resolve() : reject();
      });
  });
};
