<?php

namespace Renegare\FormTestBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;


use Renegare\FormTestBundle\Entity\Transaction;

class ProductType extends AbstractType
{
	
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder->add('name');
        $builder->add('description', 'textarea');
        $builder->add('features', 'collection',array(
        	'type' => new FeatureType(),
        	'allow_add' => true,
        	'allow_delete' => true,
        	'error_bubbling' => false
        ));
    }
    
    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class'      => 'Renegare\FormTestBundle\Form\Object\Product'
        );
    }
  
}
