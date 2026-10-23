// 后管公共脚本：Logout 二次确认弹窗
// 用原生 <dialog> 元素实现，与后管「零框架、原生元素」的设计语言一致；
// 浏览器不支持 <dialog> 时退化为原生 confirm()，保证功能可用。
(function () {
    "use strict";

    function initLogoutConfirm(form) {
        if (typeof HTMLDialogElement !== "undefined"
                && typeof HTMLDialogElement.prototype.showModal === "function") {
            var dialog = document.createElement("dialog");
            dialog.className = "confirm-dialog";
            dialog.setAttribute("aria-labelledby", "logout-confirm-title");
            dialog.innerHTML =
                '<p class="confirm-title" id="logout-confirm-title">Sign out?</p>' +
                '<p class="confirm-text">You will need to sign in again to access the admin panel.</p>' +
                '<div class="confirm-actions">' +
                '<button type="button" class="btn btn-ghost" data-cancel>Cancel</button>' +
                '<button type="button" class="btn" data-confirm>Sign out</button>' +
                "</div>";
            document.body.appendChild(dialog);

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                dialog.showModal();
            });
            dialog.querySelector("[data-cancel]").addEventListener("click", function () {
                dialog.close();
            });
            dialog.querySelector("[data-confirm]").addEventListener("click", function () {
                dialog.close();
                form.submit(); // form.submit() 不再触发 submit 事件，直接提交登出
            });
            // 点击遮罩（backdrop）视为取消
            dialog.addEventListener("click", function (event) {
                if (event.target === dialog) {
                    dialog.close();
                }
            });
        } else {
            form.addEventListener("submit", function (event) {
                if (!window.confirm("Are you sure you want to sign out?")) {
                    event.preventDefault();
                }
            });
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.querySelector("form.logout-form");
        if (form) {
            initLogoutConfirm(form);
        }
    });
})();
