<?php
/**
 * $JA#COPYRIGHT$
 */

defined('_JEXEC') or die( 'Restricted access' );

jimport('joomla.form.formfield');

class JFormFieldJarequest extends JFormField {
    protected $type = 'Jarequest';    
    protected function getInput() {
    	$input = JFactory::getApplication()->input;
		$params = $this->form->getValue('params');
		//remove request param lable
		$doc = JFactory::getDocument();
		$doc->addScriptDeclaration("jQuery(document).ready(function(){jQuery('#jform_params_jarequest-lbl').parent().remove();});");
		$task = $input->getString('jatask', '');
		$request = $input->getString('jarequest') !== null
			? $input->getString('jarequest') : '';
		$jarequest = strtolower($request);
		//process
        if ($jarequest && $task) {
			
			//load file to excute task
			require_once(dirname(dirname(dirname(__FILE__))).'/admin/jarequest/'.$jarequest.'.php');
            $obLevel = ob_get_level();
			if($obLevel){
				while ($obLevel > 0 ) {
					ob_end_clean();
					$obLevel --;
				}
			}else{
				ob_clean();
			}
            $obj = new $jarequest();
			
			$data = $obj->$task($params);
			echo json_encode($data);
			
            exit;
        }
    }    
    
}