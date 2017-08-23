/**
 * Created by Alwayfeels on 2017/8/21.
 */
window.onload = function () {
    var buttons = document.getElementsByTagName("button");
    var deepTraverseBtn = buttons[0];
    var wideTraverseBtn = buttons[1];
    var deepCheckBtn = buttons[2];
    var wideCheckBtn = buttons[3];
    var delBtn = buttons[4];
    var addBtn = buttons[5];
    var startNode = document.getElementById("firstNode");
    var showList = [];
    var index = 0;
    var timer = null;
    /*
    本来想用focus伪类做，但是实现太复杂了。不如直接给div绑定一个点击事件改变style属性
    var divs = document.getElementsByTagName("div");
    function giveTabindex () {
        for (var i = 0; i < divs.length; i++) {
            divs[i].tabIndex = "-1";
        }
    }
    giveTabindex();
    */
    // 深度遍历
    function deepTraverse(node) {
        if (node != null) {
            showList.push(node);
            for (var i = 0; i < node.children.length; i++ ) {
                deepTraverse(node.children[i]);
            }
        }
    }

    //广度遍历
    function wideTraverse (node) {
        if (node != null) {
            showList.push(node);
            wideTraverse(node.nextElementSibling);
            node = showList[index++];
            wideTraverse(node.firstElementChild);
        }
    }
    //上色
    function showNode(text) {
        var i = 0;
        if (showList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"") == text) {
            showList[i].style.backgroundColor = "blue";
            return true;
        }
        showList[i].style.backgroundColor = "green";
        timer = setInterval(function () {
            i++;
            if (i < showList.length) {
                showList[i-1].style.backgroundColor = "white";
                if (showList[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g,"") == text) {
                    showList[i].style.backgroundColor = "blue";
                    clearInterval(timer);
                } else {
                    showList[i].style.backgroundColor = "green";
                }
            } else {
                showList[i-1].style.backgroundColor = "white";
                if (text != undefined) {
                    alert("搜索完成，未找到查找字符！");
                } else {
                    alert("搜索完成！")
                }
                clearInterval(timer);
            }
        }, 300);
    }
    //初始化
    function Init() {
        index = 0;
        showList = [];
        clearInterval(timer);
        var divs = document.getElementsByTagName("div");
        for (var i=0; i < divs.length; i++) {
            divs[i].style.backgroundColor = "white";
        }
    }
    //绑定
    deepTraverseBtn.addEventListener("click", function () {
        Init();
        deepTraverse(startNode);
        showNode();
    });
    wideTraverseBtn.addEventListener("click", function () {
        Init();
        wideTraverse(startNode);
        showNode();
    });
    deepCheckBtn.addEventListener("click", function () {
        var inputText = document.getElementById("checkNum").value;
        Init();
        deepTraverse(startNode);
        if (inputText != "") {
            showNode(inputText);
        } else {
            alert("输入为空！");
        }
    });
    wideCheckBtn.addEventListener("click", function () {
        var inputText = document.getElementById("checkNum").value;
        Init();
        wideTraverse(startNode);
        if (inputText != "") {
            showNode(inputText);
        } else {
            alert("输入为空！");
        }
    });
    var root = document.getElementById("firstNode");
    root.addEventListener("click", function (event) {
        var target = event.target;
        if (target.nodeName == "DIV") {
            if (target.className.indexOf("focus") == -1) {
                var focus = document.getElementsByClassName("focus");
                for (var i = 0; i < focus.length; i++) {
                    focus[i].style.backgroundColor = "transparent";
                    var reg = new RegExp("(\\s|^)" + 'focus' + "(\\s|$)");
                    focus[i].className = focus[i].className.replace(reg, " ");
                }
                target.style.backgroundColor = "rgba(0,255,0,0.4)";
                target.className += " focus";
            }
        }

    });
    delBtn.addEventListener("click", function () {
        var focusNode = document.getElementsByClassName("focus")[0];
        if (focusNode == undefined) {
            alert("删除节点未选中！");
        } else {
            focusNode.remove();
        }
    });
    addBtn.addEventListener("click", function () {
        var addText = document.getElementById("addBox").value;
        var newNode = document.createElement("div");
        var focusNode = document.getElementsByClassName("focus")[0];
        if (addText == "") {
            alert("输入元素为空！");
        } else if (focusNode == undefined){
            alert("插入节点未选中！");
        } else {
            newNode.className += "lv" + (parseInt(focusNode.className.slice(2,3)) + 1);
            newNode.innerHTML = addText;
            focusNode.appendChild(newNode);
        }
    })
}