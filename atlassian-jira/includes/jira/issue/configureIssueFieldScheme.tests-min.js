AJS.test.require(["jira.webresources:configure-issue-field-scheme"],function(){"use strict";var e=require("jquery"),i=require("jira/issue/configureissuefieldscheme");module("test add priority schemes",{setup:function(){var e=this.setUpMockElements();this.sandbox=sinon.sandbox.create(),this.moveAllSpy=this.sandbox.spy(i.prototype,"moveAll"),this.restrictOptionsSpy=this.sandbox.spy(i.prototype,"restrictOptions"),this.getSelectedOptionsSpy=this.sandbox.spy(i.prototype,"getSelectedOptions"),this.submitformSpy=this.sandbox.spy(i.prototype,"submitForm"),this.issueFieldView=new i({el:e})},teardown:function(){this.issueFieldView.remove(),this.sandbox.restore()},setUpMockElements:function(){var i=e('<form onsubmit="return false"/>').append('<select id="default-option-select">\n                    <option id="-1" value="\'\'">1</option>\n                    <option id="1">1</option>\n                    <option id="2">2</option>\n                 </select>','<div id="addAllAvailableOptions"/>','<div id="removeAllSelectedOptions"/>','<ul id="selectedOptions">\'\n                    <li id="selectedOptions_1">1</li>\n                </ul>','<ul id="availableOptions">\n                    <li id="availableOptions_2">2</li>\n                </ul>','<button id="submitSave"/>');return i.appendTo("#qunit-fixture"),i}}),test("Events are bound correctly",function(){this.issueFieldView.ui.addAllButton.click(),ok(this.moveAllSpy.calledOnce),this.issueFieldView.ui.removeAllButton.click(),ok(this.moveAllSpy.calledTwice),this.issueFieldView.ui.submitButton.click(),ok(this.submitformSpy.calledOnce)}),test("Initialized correctly",function(){ok(this.issueFieldView.ui.selectedOptions.hasClass("ui-sortable")),ok(this.issueFieldView.ui.availableOptions.hasClass("ui-sortable")),ok(this.restrictOptionsSpy.calledOnce)}),test("Add/remove all options buttons works correctly",function(){this.issueFieldView.ui.addAllButton.click();var e=this.issueFieldView.getSelectedOptions().replace(/selectedOptions=/g,"").split("&");deepEqual(e,["1","2"]),this.issueFieldView.ui.removeAllButton.click(),e=this.issueFieldView.getSelectedOptions().replace(/selectedOptions=/g,"").split("&"),deepEqual(e,[""])}),test("Select options are displayed correctly",function(){this.restrictOptionsSpy.reset(),this.issueFieldView.ui.addAllButton.click(),ok(this.restrictOptionsSpy.calledOnce);var e=this.issueFieldView.ui.defaultOptionSelect.find('option:not(".hidden")').map(function(e,i){return i.id}).get();deepEqual(e,["-1","1","2"]),this.issueFieldView.ui.removeAllButton.click(),ok(this.restrictOptionsSpy.calledTwice),e=this.issueFieldView.ui.defaultOptionSelect.find('option:not(".hidden")').map(function(e,i){return i.id}).get(),deepEqual(e,["-1"])}),test("Serialization works correctly",function(){this.issueFieldView.ui.addAllButton.click(),equal(this.issueFieldView.getSelectedOptions(),"selectedOptions=1&selectedOptions=2"),this.issueFieldView.ui.removeAllButton.click(),equal(this.issueFieldView.getSelectedOptions(),"selectedOptions=")}),test("Form data is updated correctly before submission",function(){equal(this.issueFieldView.$el.attr("action"),void 0),this.issueFieldView.ui.addAllButton.click(),this.getSelectedOptionsSpy.reset(),this.issueFieldView.ui.submitButton.click(),ok(this.getSelectedOptionsSpy.calledOnce),ok(this.issueFieldView.$el.attr("action").endsWith("?selectedOptions=1&selectedOptions=2"))}),test("Check whether hidden option are also disabled (needed for IE11)",function(){this.restrictOptionsSpy.reset(),this.issueFieldView.ui.addAllButton.click(),ok(this.restrictOptionsSpy.calledOnce);var e=this.issueFieldView.ui.defaultOptionSelect.find("option:disabled").map(function(e,i){return i.id}).get();deepEqual(e,[]),this.issueFieldView.ui.removeAllButton.click(),ok(this.restrictOptionsSpy.calledTwice),e=this.issueFieldView.ui.defaultOptionSelect.find("option:disabled").map(function(e,i){return i.id}).get(),deepEqual(e,["1","2"])})});