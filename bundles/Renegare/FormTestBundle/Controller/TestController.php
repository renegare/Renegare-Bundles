<?php

/*
 * This file is part of the Symfony framework.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Renegare\FormTestBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Renegare\FormTestBundle\Form\ProductType;
use Renegare\FormTestBundle\Form\MultiProductType;

use Renegare\FormTestBundle\Form\Object\Product;

use Renegare\FormTestBundle\Utils\FormTools;


class TestController extends Controller
{

    /**
     * @Route("/multi-product-features", name="multi_product_features")
     * @Template()
     */
    public function multiProductFeaturesAction()
    {
    		$product = new Product();
    		
        $form = $this->get('form.factory')->create(new ProductType(), $product);

        $request = $this->get('request');
        
    		$data = array();
    		
        if ('POST' == $request->getMethod()) {
            $form->bindRequest($request);
            if ($form->isValid()) {
            
            	// save object etc ...
            	echo 'success'; die;
            	
            } else {
            	// echo '<pre>'; var_dump(FormTools::getAllErrors($form)); die;
            }
	    	}
	    	
	    	$data['form'] = $form->createView();
	    	
        return $data;
    }

    /**
     * @Route("/multi-products-features", name="multi_products_features")
     * @Template()
     */
    public function multiProductsFeaturesAction()
    {
        $form = $this->get('form.factory')->create(new MultiProductType());

        $request = $this->get('request');
        
    		$data = array();
    		
        if ('POST' == $request->getMethod()) {
            $form->bindRequest($request);
            
            if ($form->isValid()) {
            	$response_obj->success = true;
            	// save to session
            	echo 'success'; die;
            	
            } else {
            	// echo '<pre>'; var_dump(FormTools::getAllErrors($form)); die;
            }
	    	}
	    	
	    	$data['form'] = $form->createView();
	    	
        return $data;
    }
}
