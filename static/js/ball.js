var colorInc = 100 / 3;

var changeTheBall = function(){
        //从服务器获取的值，赋给#percent-box
        var val = $("#percent-box").text();

        if (val != "" && !isNaN(val) && val <= 100 && val >= 0) {
            var valOrig = val;
            val = 100 - val;

            if (valOrig == 0) {
                $("#percent-box").text(0);
                $(".progress .percent").text(0 + "%");
            } else $(".progress .percent").text(valOrig + "%");

            $(".progress").parent().removeClass();
            $(".progress .water").css("top", val + "%");

            if (valOrig < colorInc * 1)
                $(".progress").parent().addClass("red");
            else if (valOrig < colorInc * 2)
                $(".progress").parent().addClass("orange");
            else
                $(".progress").parent().addClass("green");
        } else {
            $(".progress").parent().removeClass();
            $(".progress").parent().addClass("red");
            $(".progress .water").css("top", 100 - 0 + "%");
            $(".progress .percent").text(0 + "%");
            $("#percent-box").text("");
        }
}