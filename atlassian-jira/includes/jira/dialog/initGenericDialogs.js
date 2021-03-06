define('jira/dialog/init-generic-dialogs', ['jira/dialog/dialog-register', 'jira/dialog/dialog-util', 'jira/dialog/form-dialog', 'jira/ajs/keyboardshortcut/keyboard-shortcut-toggle', 'jquery', 'exports'], function (DialogRegister, DialogUtil, FormDialog, KST, jQuery, exports) {
    exports.init = function () {
        DialogRegister.keyboardShortcuts = new FormDialog({
            id: "keyboard-shortcuts-dialog",
            trigger: "#keyshortscuthelp",
            widthClass: "large",
            onContentRefresh: function onContentRefresh() {
                var context = this.get$popupContent();
                jQuery("a.submit-link", context).click(function (e) {
                    e.preventDefault();
                    jQuery("form", context).submit();
                });
            },
            onSuccessfulSubmit: function onSuccessfulSubmit() {
                if (KST.areKeyboardShortcutsDisabled()) {
                    KST.enable();
                } else {
                    KST.disable();
                }
            }
        });

        DialogRegister.deleteIssueLink = new FormDialog({
            type: "ajax",
            id: "delete-issue-link-dialog",
            trigger: "#linkingmodule .delete-link > a",
            ajaxOptions: DialogUtil.getDefaultAjaxOptions,
            isIssueDialog: true
        });

        new FormDialog({
            id: "credits-dialog",
            trigger: "#view_credits",
            widthClass: "creditsContainer",
            onContentRefresh: function onContentRefresh() {
                if (!jQuery("html").hasClass("safari")) {
                    var center = function center() {
                        jQuery.each(arguments, function () {
                            this.show().css({
                                marginLeft: -this.outerWidth() / 2,
                                marginTop: -this.outerHeight() / 2
                            }).hide();
                        });
                    };
                }
            }
        });

        new FormDialog({
            id: "about-dialog",
            trigger: "#view_about",
            ajaxOptions: {
                url: this.href,
                data: {
                    decorator: "dialog",
                    inline: "false"
                }
            },
            widthClass: "large"
        });

        jQuery(document).on("click", "a.trigger-dialog", function (e) {
            e.preventDefault();
            var stacked = e.target !== undefined && jQuery(e.target).hasClass("stacked-dialog");
            var dialog = new FormDialog({
                id: this.id + "-dialog",
                ajaxOptions: {
                    url: this.href,
                    data: {
                        decorator: "dialog",
                        inline: "false"
                    }
                },
                stacked: stacked
            });
            dialog.show();
        });
    };
});