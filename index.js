var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}


function express_logger(config)
{
    if(config=="detailed")/*logger detailed config*/
    {
        return function(req,res)
            {
                /*obtaining necessary details from request object*/
                var output = "Method = "+req.method+" Url= "+req.url+
                            " IP Address= "+req.ip;
                console.log(output);
                if(!isEmpty(req.query))
                {
                    process.stdout.write("Query String = ");  
                    for(i in req.query)
                    {
                        process.stdout.write(i+" = "+req.query+"\n");
                    }
                }
                //console.log(res);
            }
    }
    else if(config=="simple")/*logger simple config*/
    {
        return function(req,res)
        {
            var output = "Method = "+req.method+" Url= "+req.url; 
            console.log(output);
        }
        
    }
    else 
    {
        return function(req,res)/*if config is not set properly*/
        {
            console.log("Invalid logger option")   
        }
    }
    
}
module.exports = express_logger;