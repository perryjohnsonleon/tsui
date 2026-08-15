$(document).ready(function () {
 //select_main(1);
   if (default_main === null) {
        select_recommend(-1);
    }
    else {
        //select_main(default_main);
        select_recommend(default_main);
    };

   //  $('div.row').height(screen.height);
   // ======
    var infoHeight = $('div.row').height;
    var defHeight = screen.height ;
    // 如果高度超出
    if (infoHeight < defHeight) {
       $('div.row').height(screen.height);              
    } 
   
   //======
    $("#tb_keyword").on("keyup", function (e) {
        if (e.keyCode == 13) {
            send_keyword();
        }
    });  	
});

function select_main(mid) {
    $("#tb_keyword").val("");
    set_main_active(mid);
    get_chart_data(mid, -1, "", "N");
}

function select_sub(mid, sid) {
    $("#tb_keyword").val("");
    set_sub_active(mid, sid);
    get_chart_data(mid, sid, "", "N");
}

function set_main_active(id) {
    $(".main-type").removeClass("active");
    $(".sub-type .line").removeClass("active");
    $(".line .recommend").removeClass("active");
    $(".main-type[data-main-id=" + id + "]").addClass("active");
}

function set_sub_active(mid, sid) {
    set_main_active(mid);
    $(".sub-type .line[data-sub-id=" + sid + "]").addClass("active");
}

function show_text(object) {
    var obj_text = $(object).find(".text");
    obj_text
        .html(obj_text.attr("data-text"))
        .stop()
        .animate({
            height: "85px"
        }, 0);
}

function hide_text(object) {
    var obj_text = $(object).find(".text");
    obj_text
        .html((obj_text).attr("data-short"))
        .stop()
        .animate({
            height: "40px"
        }, 0);
}

function send_keyword() {
    var text = $.trim($("#tb_keyword").val());
    if (text == "") return;

    set_sub_active(-1, -1);
    get_chart_data(-1, -1, text, "N");
}

function get_chart_data(mid, sid, keyword, recommend) {

    $("#navbarNav").collapse("hide");

    $.ajax({
        url: chart_url,
        data: {
            main: mid,
            sub: sid,
            keyword: keyword,
            recommend: recommend
        },
        success: function (result) {
            $(".chart-container .row").empty();
            var cut_len = 18;
			var _width =  $(".row").width();
			var n = Math.ceil(_width / 480);
			var x = 1;
			var tb = "";
			tb += "<table width='100%' cellpadding='10'>";	
			tb += "<tr>";			
            for (var i = 0; i < result.length; i++) 
			{				
				tb += "<td>"
				var data = result[i];
				var short_name = data.name;
				if (short_name.length > cut_len) {
					short_name = short_name.substr(0, cut_len) + " ...";
				}

				var html = $("#chart_item_templete").html();
				html = html.replace("{name}", data.name);
				html = html.replace("{id}", data.id);
				html = html.replace(/{short-name}/g, short_name);

                var url = data.url;
                var isurl = IsURL(url);

                if (isurl)
                    html = html.replace("%7burl%7d", data.url);
                else
                {
                    if (data.typeid == "1")
				        html = html.replace("{url}", "http://127.0.0.1/GiraffeMeal/index.html?target=" + data.id + "&title=" + data.name);
                    else if (data.typeid == "2")
                        html = html.replace("{url}", "http://127.0.0.1/GiraffeMeal/index.html" + data.id + "&title=" + data.name);
                    else if (data.typeid == "3")
                        html = html.replace("{url}", "http://127.0.0.1//index.html" + data.id + "&title=" + data.name);
                }
                
				html = html.replace("%7bimg%7d", cover_path + data.img );   // cover_path + data.img  ; %7bimg%7d
				tb += html;
				tb += "</td>";
				if (x == n)
				{
					tb += "</tr>";
					tb += "<tr>";	
					x = 0;
				}
				x++;
            }
			$(".chart-container .row").append(tb);
			tb += "</table>";
            if (result.length == 0) {
                var html = $("#chart_no_data").html();
                $(".chart-container .row").append(html);
            }

        },
        error: function () {
            console.error("get_chart_data error");
        }
    });

}

function select_recommend(main_id) {
    set_sub_active(main_id, -1);
    $(".sub-type .line[data-recommend=" + main_id + "]").addClass("active");
    get_chart_data(main_id, -1, "", "Y");
}

function IsURL(str_url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@
    + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP URL- 123.123.123.123
    + "|" // allow IP和DOMAIN
    + "([0-9a-zA-Z_!~*'()-]+.)*" // DOMAIN- www.
    + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]." // second DOMAIN
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // port- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    
    var re = new RegExp(strRegex);
    //re.test()
    if (re.test(str_url))
        return true;        //符合
    else
        return false;      //不符合
}