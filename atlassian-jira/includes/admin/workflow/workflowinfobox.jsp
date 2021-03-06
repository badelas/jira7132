<%--
  -- workflowinfobox.jsp
  --
  -- This is used to display information about a draft/active workflow that is being edited and provides
  -- a link to jump from the draft to the active and vice versa.  This requires a getWorkflow() method to be
  -- available by the calling webwork action (see /workflow below).
  -- Information being displayed also depends on a getStep() or getTransition() method being available.  If no
  -- step and no transition can be found, no information about who last edited the page will be displayed.
  --%>
<%@ taglib uri="jiratags" prefix="jira" %>
<%@ taglib uri="webwork" prefix="aui" %>
<ww:if test="/workflow/systemWorkflow == false && /workflow/active == true">
    <aui:component template="auimessage.jsp" theme="'aui'">
        <aui:param name="'cssClass'">draft-workflow-message</aui:param>
        <aui:param name="'messageType'">warning</aui:param>
        <aui:param name="'messageHtml'">
            <ww:if test="/workflow/draftWorkflow == false">
                    <ww:text name="'admin.workflow.infobox.viewing.active'"/>
                    <ww:if test="/workflow/hasDraftWorkflow == true">
                        <a id="view-draft" href="<ww:url page="ViewWorkflowSteps.jspa"><ww:param name="'workflowMode'" value="'draft'"/><ww:param name="'workflowName'" value="/workflow/name"/></ww:url>">
                            <ww:text name="'admin.workflow.infobox.edit.draft.action'" />
                        </a>
                    </ww:if>
                    <ww:else>
                        <a id="create-draft" href="<ww:url page="CreateDraftWorkflow.jspa"><ww:param name="'draftWorkflowName'" value="/workflow/name"/></ww:url>">
                            <ww:text name="'admin.workflow.infobox.create.draft.action'" />
                        </a>
                    </ww:else>
                </ww:if>
                <ww:else>
                    <ww:text name="'admin.workflow.infobox.draft.editing'" />
                    <a class="aui-button aui-button-link" id="view-original" href="<ww:url page="ViewWorkflowSteps.jspa"><ww:param name="'workflowName'" value="/workflow/name" /><ww:param name="'workflowMode'" value="'live'" /></ww:url>">
                        <ww:text name="'admin.project.workflows.view.original.action'" />
                    </a>
                    <div class="aui-buttons">
                        <a class="aui-button trigger-dialog" id="publish-draft" href="<ww:url page="PublishDraftWorkflow!default.jspa"><ww:param name="'workflowName'" value="/workflow/name" /><ww:param name="'workflowMode'" value="'draft'" /><ww:param name="'project'" value="/project" /><ww:param name="'issueType'" value="/issueType" /></ww:url>">
                            <ww:text name="'admin.workflows.actions.publish.draft'" />
                        </a>
                        <a class="aui-button trigger-dialog" id="discard-draft" href="<ww:url page="DeleteWorkflow.jspa"><ww:param name="'workflowName'" value="/workflow/name" /><ww:param name="'workflowMode'" value="'draft'" /><ww:param name="'project'" value="/project" /><ww:param name="'issueType'" value="/issueType" /></ww:url>">
                            <ww:text name="'admin.workflows.actions.discard.draft'" />
                        </a>
                    </div>
                </ww:else>
        </aui:param>
    </aui:component>
</ww:if>
