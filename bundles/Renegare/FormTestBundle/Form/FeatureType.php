<?php

namespace Renegare\FormTestBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;


use Renegare\FormTestBundle\Entity\Transaction;

class FeatureType extends AbstractType
{
	
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder->add('label', 'text', array('error_bubbling' => false) );
        $builder->add('value', 'text', array('error_bubbling' => false) );
    }
    
    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Renegare\FormTestBundle\Form\Object\Feature',
            'allow_delete' => false,
            'error_bubbling' => false,
        );
    }
  
}
