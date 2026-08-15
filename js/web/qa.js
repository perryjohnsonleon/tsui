function mapping(html, item, value) {
    var reg = new RegExp("\{\{" + item + "\}\}", "g");
    return html.replace(reg, value);
};

$(document).ready(function () {
    get_data(1, 1);
    get_data(2, 1);
    get_data(3, 1);
});

function change_type(index) {
    $(".tabs > div").removeClass("active");
    $(".tabs .type_" + index).addClass("active");

    $(".data-body > div").removeClass("show");
    $(".data-body .type_" + index).addClass("show");
};

function get_data(type, page_index) {
    var page_size = 5;
    var sub_type = $(".type_" + type + " .sub_type select").val();

    $.ajax(
        {
            url: data_url,
            data: {
                type_id: type,
                page_index: page_index,
                sub_type: sub_type,
                page_size: page_size
            },
            success: function (result) {
                if (result.status == "success") {
                    $("#type_" + type + "_list .list").find(".item").remove();
                    var temp = $("#item_templete").html();

                    for (var i = 0; i < result.data.length; i++) {
                        var html = "" + temp;
                        html = mapping(html, "title", result.data[i].qa.title);
                        html = mapping(html, "content", result.data[i].qa.qa_content);
                        html = html.replace(/\r\n/g, "<br/>");
                        var obj_item = $(html);
                        obj_item.data("index", i);

                        var fn_show_text = (function (type, item, index) {
                            return function () {
                                var show = $(item).hasClass("active");
                                $("#type_" + type + "_list .list").find(".item").each(function (idx, elm) {
                                    if ($(elm).data("index") !== index) {
                                        $(elm).removeClass("active");
                                        $(elm).children(".data").slideUp(300, function () {
                                        });
                                    };
                                });

                                if (show === false) {
                                    $(item).addClass("active");
                                    $(item).children(".data").slideDown(300, function () {
                                    });
                                }
                                else {
                                    $(item).removeClass("active");
                                    $(item).children(".data").slideUp(300, function () {
                                    });
                                }
                            };
                        })(type, obj_item, i);
                        $(obj_item).children(".title").click(fn_show_text);

                        $("#type_" + type + "_list .list").append(obj_item);
                        for (var p in result.data[i].photo) {
                            var img_container = $("<div></div>").attr("class", "item");
                            var img = $("<img></img>").attr("src", result.data[i].photo[p]);
                            img_container.append(img);
                            obj_item.find(".photo").append(img_container);
                        };
                    }

                    //no data
                    if (result.data.length === 0) {
                        var div_no_data = $("<div></div>").attr("class", "no_data item").html("此分類目前無資料");
                        $("#type_" + type + "_list .list").append(div_no_data);
                    };

                    //page
                    var page_item_max = 5;
                    var page_temp = $("#page_templete").html();
                    $("#type_" + type + "_page").empty();
                    var page_s = (Math.ceil(page_index / page_item_max) - 1) * page_item_max + 1;
                    var page_e = Math.min(result.page_count, page_s + page_item_max - 1);

                    if (page_s > page_item_max) {
                        var html = "" + page_temp;
                        html = mapping(html, "type", type);
                        html = mapping(html, "index", page_s - 1);
                        html = mapping(html, "page", " < ");
                        var obj_page = $(html);
                        $("#type_" + type + "_page").append(obj_page);
                    };

                    for (var i = page_s; i <= page_e; i++) {
                        var html = "" + page_temp;
                        html = mapping(html, "type", type);
                        html = mapping(html, "index", i);
                        html = mapping(html, "page", i);

                        var obj_page = $(html);
                        if (i === page_index) {
                            $(obj_page).addClass("active");
                        }

                        $("#type_" + type + "_page").append(obj_page);
                    };

                    if (page_e < result.page_count) {
                        var html = "" + page_temp;
                        html = mapping(html, "type", type);
                        html = mapping(html, "index", page_e + 1);
                        html = mapping(html, "page", " > ");
                        var obj_page = $(html);
                        $("#type_" + type + "_page").append(obj_page);
                    };

                }
                else {
                    console.error("load data fail\n" + result.error);
                }
            },
            error: function (rep) {
                console.error("load data fail\n" + rep);
            }
        }
    );
}