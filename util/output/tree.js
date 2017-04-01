;(function ($, window, document, undefined) {

    'use strict';

    var pluginName = 'treeview';

    var _default = {};

    _default.settings = {
        injectStyle: true,
        levels: 2,
        expandIcon: 'glyphicon',
        collapseIcon: 'glyphicon',
        emptyIcon: 'glyphicon',
        nodeIcon: '',
        selectedIcon: '',
        checkedIcon: 'glyphicon',
        uncheckedIcon: 'glyphicon',
        color: undefined,
        backColor: un
        borderColor: undefined,
        onhoverColor: '#fff',
        selectedColor: '#428bca',
        searchResultColor: '#d9534f',
        searchResultBackColor: undefined,

        enableLinks: false,
        highlightSelected: true,
        highlightSearchResults: true,
        showBorder: true,
        showIcon: true,
        showCheckbox: true,
        showTags: false,
        multiSelect: false,

        onNodeChecked: undefined,
        onNodeCollapsed: undefined,
        onNodeDisabled: undefined,
        onNodeEnabled: undefined,
        onNodeExpanded: undefined,
        onNodeSelected: undefined,
        onNodeUnchecked: undefined,
        onNodeUnselected: undefined,
        onSearchComplete: undefined,
        onSearchCleared: undefined
    }

    _default.options = {
        silent: false,
        ignoreChildren: false
    }

    _default.searchOptions = {
        ignoreCase: true,
        exactMatch: false,
        revealResults: true
    }

    var Tree = function (element, options) {
        this.$element = $(element);
        this.elementId = element.id;
        this.styleId = this.elementId + '-style';

        this.init(options);

        return {
            options: this.options,
            init: $.proxy(this.init, this),
            remove: $.proxy(this.remove, this)
        }
    }

})