<?php

namespace Renegare\FormTestBundle\Utils;

use Symfony\Component\Form\Form;
use Symfony\Component\Form\FormError;

class FormTools
{

	public static function getAllErrors(Form $form, $parent_prefix = ''){	
		$id = $parent_prefix.($parent_prefix? '_' : '').$form->getName();
		$errors = array($id.'_errors' => array());
		
		foreach($form->getErrors() as $error){
			$errors[$id.'_errors'][] = array('error' => self::formatErrors($error));
		}
		
		if(!count($errors[$id.'_errors'])) unset($errors[$id.'_errors']);
		
		foreach($form->getChildren() as $child){
			if($_errors = self::getAllErrors($child, $id))
			{
				$errors = array_merge($errors, $_errors);
			}
		}
		
		if( count($errors) )
		{
			return $errors; 
		} 
		else 
		{	
			return false;
		}
	}
	
	public static function formatErrors( FormError $error ){
		return $error->getMessageTemplate();
	}
	
}
