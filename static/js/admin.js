pimcore.registerNS("pimcore.plugin.groupdocsviewerdotnet");

pimcore.plugin.groupdocsviewerdotnet = Class.create(pimcore.plugin.admin, {
    getClassName: function() {
        return "pimcore.plugin.groupdocsviewerdotnet";
    },

    initialize: function() {
        pimcore.plugin.broker.registerPlugin(this);
    },

    pimcoreReady: function (params,broker){
        // add a sub-menu item under "Extras" in the main menu
        var toolbar = pimcore.globalmanager.get("layout_toolbar");

        var action = new Ext.Action({
            id : "groupdocs_viewer_dotnet_menu_item",
            text : "Configure GroupDocs Viewer for .NET",
            iconCls : "groupdocs_viewer_dotnet_menu_icon",
            handler : this.showTab
        });

        toolbar.extrasMenu.add(action);
    },

    showTab : function() {
        Ext.Ajax.request({
            url : '/plugin/GroupDocsViewerDotNet/index/loaddata',
            success : function(response, options) {
                var objAjax = Ext.decode(response.responseText);
                groupdocsviewerdotnetPlugin.dataLoaded(objAjax);
            },
            failure : function(response, options) {
                Ext.MessageBox.show({
                    title : 'GroupDocs Plugin Error',
                    msg : 'GroupDocs Plugin Error - can\'t load data!',
                    buttons : Ext.MessageBox.OK,
                    animateTarget : 'mb9',
                    icon : Ext.MessageBox.ERROR
                });
            }
        });

    },
    dataLoaded : function(objAjax) {
        groupdocsviewerdotnetPlugin.panel = new Ext.Panel({
            id : "groupdocs_viewer_dotnet_tab_panel",
            title : "Configure GroupDocs Viewer for .NET",
            iconCls : "groupdocs_viewer_dotnet_tab_icon",
            border : false,
            layout : {
                type: 'table',
                columns: 2
            },
            closable : true,
            items : [
                {
                    xtype : 'label',
                    text : 'Viewer URL: ',
                    style: 'margin: 8px 3px 3px 8px;'
                },
                {
                    xtype: 'textfield',
                    id : 'url',
                    value: objAjax.url,
                    width: 250,
                    allowBlank: false,
                    style: 'margin: 8px 3px 3px 3px;'
                },
                {
                    xtype : 'label',
                    text : 'Width: ',
                    style: 'margin: 8px 3px 3px 8px;'
                },
                {
                    xtype: 'textfield',
                    id : 'width',
                    value: objAjax.width,
                    width: 250,
                    allowBlank: false,
                    style: 'margin: 8px 3px 3px 3px;'
                },
                {
                    xtype : 'label',
                    text : 'Height: ',
                    style: 'margin: 3px 3px 3px 8px;'
                },
                {
                    id: 'height',
                    xtype: 'textfield',
                    value: objAjax.height,
                    width: 250,
                    allowBlank: false,
                    style: 'margin: 3px;'
                },
                {
                    xtype : 'label',
                    text : 'Default file name: ',
                    style: 'margin: 3px 3px 3px 8px;'
                },
                {
                    id: 'defaultFileName',
                    xtype: 'textfield',
                    value: objAjax.defaultFileName,
                    width: 250,
                    allowBlank: true,
                    style: 'margin: 3px;'
                },
                {
                    xtype : 'label',
                    text : 'Use Http Handlers: ',
                    style: 'margin: 3px 3px 3px 8px;'
                },
                {
                    id: 'useHttpHandlers',
                    xtype: 'checkbox',
                    checked: objAjax.useHttpHandlers,
                    width: 250,
                    allowBlank: false,
                    style: 'margin: 3px;'
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    colspan: 2,
                    width: 150,
                    style: 'margin: 3px 3px 3px 8px;',
                    handler: groupdocsviewerdotnetPlugin.saveClick
                }
            ]
        });

        var tabPanel = Ext.getCmp("pimcore_panel_tabs");
        tabPanel.add(groupdocsviewerdotnetPlugin.panel);
        tabPanel.activate("groupdocs_viewer_dotnet_tab_panel");

        pimcore.layout.refresh();
    },
    saveClick : function () {
        var url = Ext.getCmp('url').getValue();
        var width = Ext.getCmp('width').getValue();
        var height = Ext.getCmp('height').getValue();
        var defaultFileName = Ext.getCmp('defaultFileName').getValue();
        var useHttpHandlers = Ext.getCmp('useHttpHandlers').getValue();
        Ext.Ajax.request({
            url : '/plugin/GroupDocsViewerDotNet/index/savedata',
            params: {
                'url' : url,
                'width' : width,
                'height' : height,
                'defaultFileName' : defaultFileName,
                'useHttpHandlers' : useHttpHandlers
            },
            success : function(response, options) {
                Ext.MessageBox.show({
                    title : 'GroupDocs Plugin',
                    msg : 'Operation complete!',
                    buttons : Ext.MessageBox.OK,
                    animateTarget : 'mb9',
                    icon : Ext.MessageBox.SUCCESS
                });
            },
            failure : function(response, options) {
                Ext.MessageBox.show({
                    title : 'GroupDocs Plugin Error',
                    msg : 'GroupDocs Plugin Error - can\'t save data!',
                    buttons : Ext.MessageBox.OK,
                    animateTarget : 'mb9',
                    icon : Ext.MessageBox.ERROR
                });
            }
        });
    }
});

var groupdocsviewerdotnetPlugin = new pimcore.plugin.groupdocsviewerdotnet();

