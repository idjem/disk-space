var cp       = require('child_process');

module.exports  = function(mountedon , chain){
    var ps   = cp.spawn("df", ["-BK" , mountedon]);
    var _ret = "";

    ps.stdout.on("data", function(data){
        _ret = data.toString();
    });
    
    ps.on('error' , function(err){
      chain(err)
    });

    ps.on('close', function() {
        var storageDeviceInfo ;
        if(_ret.split('\n')[1]){
          var arr = _ret.split('\n')[1].split(/[\s,]+/);
          storageDeviceInfo = {};
          storageDeviceInfo.usedSize  = parseInt(arr[2].replace("K" , "")) * 1024;    // exp "300K" => 300
          storageDeviceInfo.totalSize = parseInt(arr[3].replace("K" , ""))  * 1024 + storageDeviceInfo.usedSize;        
        }
        chain(null , storageDeviceInfo);
    });
};