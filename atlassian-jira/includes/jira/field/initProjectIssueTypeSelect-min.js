define("jira/field/init-project-issue-type-select",["jira/ajs/select/suggestion-collection-model","jquery","jira/ajs/select/single-select","jira/util/events/reasons","jira/util/events/types","jira/util/events","jira/field/project-issue-type-select"],function(e,t,i,s,n,l,r){function c(s){var n=s||t("body");n.find(".issuetype-field").each(function(s){var l=n.find(".project-field, .project-field-readonly"),c=t(this),d=n.find("#"+c.attr("id")+"-projects"),o=n.find("#"+c.attr("id")+"-defaults"),a=new i({element:c,revertOnInvalid:!0,model:e});a.model.remove(""),l.length>0&&new r({project:l.eq(s),issueTypeSelect:a,projectIssueTypesSchemes:d,issueTypeSchemeIssueDefaults:o})})}l.bind(n.NEW_CONTENT_ADDED,function(e,t,i){i!==s.panelRefreshed&&c(t)})});