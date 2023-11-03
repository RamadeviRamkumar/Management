Service = require('../service/service.js');

exports.index = function(err,user)
{
    Service.Service_index(err,user);
    if (err) return console.error(err);
};

exports.add = function(err,user)
{
    Service.Service_add(err,user);
    if (err) return console.error(err);
}

exports.view = function(err,user)
{
    Service.Service_view(err,user);
    if (err) console.error(err);
}

exports.see = function(err,user)
{
    Service.Service_see(err,user);
    if (err) console.error(err);
}

exports.update = function(err,user)
{
    Service.Service_update(err,user);
    if (err) console.error(err);
}

exports.updatepassword = function(err,user)
{
    Service.Service_updatepassword(err,user);
    if(err) console.error(err);
}

exports.forgotpassword = function(err,user)
{
    Service.Service_forgotpassword(err,user);
    if(err) console.error(err);
}

// exports.data = function(err,user)
// {
//     Service.Service_data(err,user);
//     if(err) console.log(err);
// }

exports.Delete = function(err,user)
{
    Service.Service_Delete(err,user);
    if (err) console.error(err);
}