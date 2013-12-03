<?php


class GroupDocsViewerDotNet_IndexController extends Pimcore_Controller_Action_Admin {
    // reachable via http://your.domain/plugin/GroupDocsViewerDotNet/index/index

    /**
     * Return current values as json
     */
    public function loaddataAction(){
        $this->_helper->viewRenderer->setNoRender();
        $conf = new GroupDocsViewerDotNet_GroupDocs();
        $this->_helper->json(
            array(
                'url' => $conf->getConfig('url'),
                'width' => $conf->getConfig('width'),
                'height' => $conf->getConfig('height'),
                'defaultFileName' => $conf->getConfig('defaultFileName'),
                'useHttpHandlers' => ($conf->getConfig('useHttpHandlers') ? 'true' : 'false')
            )
        );
    }

    /**
     * Save new values
     */
    public function savedataAction(){
        $conf = new GroupDocsViewerDotNet_GroupDocs();

        $url = $this->_getParam("url");
        $width = $this->_getParam("width");
        $height = $this->_getParam("height");
        $defaultFileName = $this->_getParam("defaultFileName");
        $useHttpHandlers = $this->_getParam("useHttpHandlers");

        if ($url != '' && $useHttpHandlers != '' && $width != '' && $height != '') {
            $conf->setConfig(array(
                'url' => $url,
                'width' => $width,
                'height' => $height,
                'defaultFileName' => $defaultFileName,
                'useHttpHandlers' => ($useHttpHandlers == 'true' ? true : false)
            ));
            $this->getResponse()->setHttpResponseCode(200);
        } else {
            $this->getResponse()->setHttpResponseCode(500);
            $this->view->message = 'Please, enter all data!';
        }
        $this->_helper->viewRenderer->setNoRender();
    }
}
