<?php

namespace Renegare\FormTestBundle\Form\Object;

use Symfony\Component\Validator\Constraints as Assert;

class Feature
{
    /**
     * @Assert\NotBlank(
     *	message = "You have a missing feature label"
     * )
     */
		public $label;
		
    /**
     * @Assert\NotBlank(
     *	message = "You have a missing feature value"
     * )
     */
		public $value;
}