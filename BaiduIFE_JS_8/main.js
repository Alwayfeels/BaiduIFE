/**
 * Created by Alwayfeels on 2017/8/20.
 */
window.onload = function () {
    var buttons = document.getElementsByTagName("button");
    var deepTraverseBtn = buttons[0];
    var wideTraverseBtn = buttons[1];
    var deepCheckBtn = buttons[2];
    var wideCheckBtn = buttons[3];
    var startNode = document.getElementById("firstNode");
    var showList = [];
    var index = 0;
    var timer = null;

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
}