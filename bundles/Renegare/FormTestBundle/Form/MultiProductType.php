<?php

namespace Renegare\FormTestBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;


use Renegare\FormTestBundle\Entity\Transaction;

class MultiProductType extends AbstractType
{
	
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder->add('products', 'collection',array(
        	'type' => new ProductType(),
        	'allow_add' => true,
        	'allow_delete' => true,
        	'error_bubbling' => false
        ));
    }
    
    public function getDefaultOptions(array $options)
    {
        return array(
        );
    }
  
}
