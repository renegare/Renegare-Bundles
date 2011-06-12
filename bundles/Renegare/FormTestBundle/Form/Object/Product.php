<?php

namespace Renegare\FormTestBundle\Form\Object;

use Symfony\Component\Validator\Constraints as Assert;

class Product
{
    /**
     * @Assert\NotBlank(
     *	message = "Please enter a name"
     * )
     */
		public $name;
		
		public $description;
		
		public $features = null;
		
		public function __construct(){
			$this->features = array();
		}
}