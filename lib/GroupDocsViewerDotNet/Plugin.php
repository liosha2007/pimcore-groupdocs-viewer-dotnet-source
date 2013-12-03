<?php


class GroupDocsViewerDotNet_Plugin  extends Pimcore_API_Plugin_Abstract implements Pimcore_API_Plugin_Interface {

    public static function needsReloadAfterInstall() {
        return true;
    }

    public static function install (){
        Pimcore_API_Plugin_Abstract::getDb()->query("CREATE TABLE IF NOT EXISTS `groupdocs_viewer_dotnet` (
			`id` INTEGER,
	        `url` varchar(512) DEFAULT '',
	        `width` varchar(8) DEFAULT '100%',
			`height` varchar(8) DEFAULT '600px',
	        `defaultFileName` varchar(512) DEFAULT '',
	        `useHttpHandlers` BOOLEAN DEFAULT true,
				PRIMARY KEY  (`id`)
				) ENGINE=MyISAM DEFAULT CHARSET=utf8;");
        Pimcore_API_Plugin_Abstract::getDb()->query("INSERT INTO `groupdocs_viewer_dotnet` (`id`, `url`, `width`, `height`, `defaultFileName`, `useHttpHandlers`) VALUES (1, '', '100%', '600px', '', true);");

        if (self::isInstalled()) {
            return "GroupDocs Signature Plugin successfully installed.";
        } else {
            return "GroupDocs Signature Plugin could not be installed.";
        }
    }

    public static function uninstall (){
        Pimcore_API_Plugin_Abstract::getDb()->query("DROP TABLE `groupdocs_viewer_dotnet`;");
        if (!self::isInstalled()) {
            return "GroupDocs Signature Plugin successfully uninstalled.";
        } else {
            return "GroupDocs Signature Plugin could not be uninstalled.";
        }
    }

    public static function isInstalled() {
        $result = null;
        try {
            $result = Pimcore_API_Plugin_Abstract::getDb()->query("SELECT * FROM `groupdocs_viewer_dotnet` WHERE `id`=1;") or die ("Table 'plugin_groupdocs' don't exists!");
        } catch (Zend_Db_Statement_Exception $e) {

        }
        return (!empty($result)) && count($result->fetchAll()) == 1;
    }

    public static function getInstallPath() {
        return PIMCORE_PLUGINS_PATH . "/GroupDocsViewerDotNet/install";
    }
}
