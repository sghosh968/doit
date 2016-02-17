(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main_menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id='main_menu'>\n  <input type='button' class='ui-block-a' data-theme=\"b\" data-icon='flat-menu' id='all_tasks_button' value='All Tasks' \\>\n  <input type='button' class='ui-block-a' data-theme=\"b\" data-icon='flat-checkround' id='new_task_button' value='New Task' \\>\n  <input type='button' class='ui-block-a' data-theme=\"b\" data-icon='arrow-l' id='exit_app_button' value='Exit' \\>\n</div>\n";
},"useData":true});
templates['new_task_form'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<fieldset class=\"ui-grid-solo\">\n  <div class=\"ui-field-contain\">\n    <label for=\"fname\">Name:</label>\n    <input type=\"text\" name=\"fname\" id=\"task_name\">\n    <label for=\"lname\">Status:</label>\n    <input type=\"text\" name=\"lname\" id=\"task_status\">\n    <label for=\"email\">Complete by:</label>\n    <input type=\"text\" name=\"email\" id=\"task_complete_by\">\n    <input type='button' class='ui-block-a' data-theme=\"b\" data-icon='arrow-l' id='add_task_button' value='Add Task' \\>\n  </div>\n</fieldset>\n";
},"useData":true});
templates['tasks_table'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.task_row,depth0,{"name":"task_row","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table data-role=\"table\" data-mode=\"columntoggle\" class=\"ui-responsive\" id=\"all_tasks_table\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th data-priority=\"1\">Status</th>\n      <th data-priority=\"2\">Complete by</th>\n    </tr>\n  </thead>\n  <tbody id='tasks_table_body'>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </tbody>\n</table>\n";
},"usePartial":true,"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials['task_row'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<tr>\n  <td>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n  <td>"
    + alias2(alias1((depth0 != null ? depth0.status : depth0), depth0))
    + "</td>\n  <td>"
    + alias2(alias1((depth0 != null ? depth0.complete_by : depth0), depth0))
    + "</td>\n</tr>\n";
},"useData":true});
})();