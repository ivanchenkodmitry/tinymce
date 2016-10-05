define(
  'ephox.echo.api.AriaRegister',

  [
    'ephox.classify.Type',
    'ephox.echo.api.Styles',
    'ephox.epithet.Id',
    'ephox.highway.Merger',
    'ephox.peanut.Fun',
    'ephox.sugar.api.Attr',
    'ephox.sugar.api.Class',
    'ephox.sugar.api.Element',
    'ephox.sugar.api.Insert',
    'ephox.sugar.api.InsertAll'
  ],

  function (Type, Styles, Id, Merger, Fun, Attr, Class, Element, Insert, InsertAll) {
    var helpStyle = Styles.resolve('aria-help');
    var helpVisibleStyle = Styles.resolve('aria-help-visible');

    var roleDocument = function (element) {
      Attr.set(element, 'role', 'document');
    };

    var presentation = function (element) {
    // https://www.w3.org/TR/wai-aria/roles#presentation
      Attr.set(element, 'role', 'presentation');
    };

    var region = function (element) {
      Attr.set(element, 'role', 'region');
    };

    var editor = function (container, editor, label, ariaHelp, showHelpHint) {
      // The editor needs to be role application otherwise ainspector will complain about event listeners
      Attr.setAll(container, {
        'role': 'application',
        'aria-label': label
      });

      ariaHelp.each(function (helpText) {
        var aria = Element.fromTag('span');
        presentation(aria);
        Insert.append(aria, Element.fromText(helpText));
        var labelId = Id.generate('ephox-aria');
        Attr.set(aria, 'id', labelId);
        describedBy(editor, labelId);
        Class.add(aria, helpStyle);
        if (showHelpHint === true) Class.add(aria, helpVisibleStyle);
        Insert.append(container, aria);
      });

      var destroy = function () {
        Attr.remove(editor, 'aria-describedby');
      };

      return {
        destroy: destroy
      };
    };

    // Set the role 'group'
    var group = function (element) {
      Attr.set(element, 'role', 'group');
    };

    // Sets the role 'group', with a label
    var toolbar = function (element, label) {
      Attr.setAll(element, {
        'role': 'group',
        'aria-label': label
      });
    };

    var menu = function (element, label) {
      Attr.setAll(element, {
        'aria-label': label,
        'role': 'menu'
      });
    };

    var textButton = function (element, contentElement) {
      // Add 'button' roleto a pastry button, and 'presentation' role
      // to the contentElement that contains the button text.
      Attr.set(element, 'role', 'button');
      presentation(contentElement);
    };

    // Set the role 'button'
    var toolbarButton = function (element, label, hasPopup, isToggle) {
      Attr.setAll(element, {
        'role': 'button',
        'aria-label': label,
        'aria-haspopup': '' + hasPopup
      });
      if (isToggle) Attr.set(element, 'aria-pressed', 'false');
      if (hasPopup) Attr.set(element, 'aria-expanded', 'false');
    };

    // Set the role 'toolbar' and aria-label if provided
    var toolbarGroup = function (element, label) {
      // TODO: duplicated from 'ephox.polish.alien.Query', consolidate isEmpty();
      var isEmpty = function (val) {
        // TODO: Move to compass Arr and violin Strings
        return (val === null) || (val === undefined) || (val === '') || (Type.isArray(val) && val.length === 0);
      };
      // End TODO

      Attr.set(element, 'role', 'toolbar');

      // customer groups may have empty label, don't use it
      if (!isEmpty(label)) {
        Attr.set(element, 'aria-label', label);
      }
    };

    var menuItem = function (element, label, hasPopup) {
      var labelTxt = label.map(function (txt) {
        return { 'aria-label': txt };
      }).getOr({});

      Attr.setAll(element, Merger.merge(labelTxt, {
        'role': 'menuitem',
        'aria-haspopup': hasPopup.getOr(false)
      }));
    };

    var menuItemCheckbox = function (element) {
      Attr.setAll(element, {
        'role': 'menuitemcheckbox',
        'aria-checked': false
      });
    };

    var checkbox = function (element, label) {
      Attr.setAll(element, {
        'role': 'checkbox',
        'aria-label': label,
        'aria-checked': false
      });
    };

    var dialog = function (element, label) {
      Attr.setAll(element, {
        'role': 'dialog',
        'aria-label': label
      });
    };

    var button = function (element, label) {
      Attr.setAll(element, {
        'aria-label': label,
        'role': 'button'
      });
    };

    // return a container object with methods {element, field} containing an html field and label
    var labelledField = function (field, name, labelText) {
      var container = Element.fromTag('div');
      presentation(container);
      var id = name + Id.generate('');
      var label = Element.fromHtml('<label>' + labelText + '</label>');
      Attr.set(label, 'for', id);
      Attr.set(field, 'id', id);
      InsertAll.append(container, [ label, field ]);

      return {
        element: Fun.constant(container),
        field:   Fun.constant(field)
      };
    };

    var textarea = function (element) {
      Attr.setAll(element, {
        'aria-multiline': 'true',
        'role': 'textbox'
      });
    };

    var widget = function (element) {
      Attr.set(element, 'role', 'widget');
    };

    var listBox = function (element) {
      Attr.set(element, 'role', 'listbox');
    };

    var tabList = function (element) {
      Attr.set(element, 'role', 'tablist');
    };

    var tabButton = function (element, label) {
      Attr.setAll(element, {
        'aria-label': label,
        'role': 'tab'
      });
    };

    var tabPanel = function (element) {
      Attr.setAll(element, {
        'role': 'tabpanel'
      });
    };

    var linkTabToPanel = function (tab, panel) {
      var id = Id.generate('ephox-aria');
      Attr.set(panel, 'id', id);
      Attr.setAll(tab, {
        'aria-controls': id
      });
    };

    var describedBy = function (element, id) {
      Attr.set(element, 'aria-describedby', id);
    };

    var labelledBy = function (element, id) {
      Attr.set(element, 'aria-labelledby', id);
    };

    var live = function (element, id, _priority) {
      var priority = _priority ? _priority : 'polite';
      Attr.setAll(element, {
        'aria-live': priority,
        'id': id
      });
    };

    var controls = function (element, id) {
      Attr.set(element, 'aria-controls', id);
    };

    var required = function (element) {
      Attr.set(element, 'aria-required', 'true');
    };

    // TODO: Implement form ARIA support
    // var form = function (element, label) {
    //   throw 'Form ARIA support not implemented yet.';
    // };

    var label = function (element, label) {
      Attr.set(element, 'aria-label', label);
    };

    var option = function (element) {
      Attr.set(element, 'role', 'option');
    };

    // TODO: Implement link ARIA support
    // var link = function (element) {
    //   throw 'Link ARIA support not implemented yet.';
    // };

    // TODO: Implement other ARIA support
    // var other = function () {
    //   throw 'Other ARIA support not implemented yet.';
    // };

    var hidden = function (element, status) {
      // Note: aria-hidden=true says this element and all of its descendents are not percievable
      // https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
      if (status) {
        Attr.set(element, 'aria-hidden', status);
      } else {
        Attr.remove(element, 'aria-hidden'); // same as setting aria-hidden:false
      }
    };

    var invalid = function (element, status) {
      if (status === true) {
        Attr.set(element, 'aria-invalid', 'true');
      } else {
        Attr.remove(element, 'aria-invalid');
      }
    };

    return {
      document: roleDocument,
      presentation: presentation,
      region: region,
      controls: controls,
      editor: editor,
      group: group,
      toolbar: toolbar,
      toolbarGroup: toolbarGroup,
      toolbarButton: toolbarButton,
      textButton: textButton,
      menu: menu,
      menuItem: menuItem,
      menuItemCheckbox: menuItemCheckbox,
      checkbox: checkbox,
      dialog: dialog,
      button: button,
      labelledField: labelledField,
      textarea: textarea,
      label: label,
      widget: widget,
      option: option,
      listBox: listBox,
      live: live,
      tabList: tabList,
      tabButton: tabButton,
      tabPanel: tabPanel,
      linkTabToPanel: linkTabToPanel,
      describedBy: describedBy,
      labelledBy: labelledBy,
      required: required,
      hidden: hidden,
      invalid: invalid
    };
  }
);